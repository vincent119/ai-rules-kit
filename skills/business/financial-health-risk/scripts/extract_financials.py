#!/usr/bin/env python3
"""
財務報表解析工具

從本地 PDF、PDF URL 或財務網頁中抽取結構化數據，輸出標準化 JSON。
針對台灣財報格式（TWSE/MOPS）優化：代碼 科目 $ 金額 % $ 金額 %

依賴安裝：
    pip install pdfplumber pymupdf requests beautifulsoup4

用法：
    python extract_financials.py <來源> [--output <json_path>]

範例：
    python extract_financials.py annual_report_2024.pdf
    python extract_financials.py https://doc.twse.com.tw/pdf/xxx.pdf
    python extract_financials.py https://finance.yahoo.com/quote/TSM/financials
"""

import argparse
import json
import re
import sys
import tempfile
from pathlib import Path
from typing import Optional


# ---------------------------------------------------------------------------
# 財報科目代碼（台灣 IFRS 標準代碼，優先使用）
# ---------------------------------------------------------------------------
TW_CODES = {
    "revenue":            ["4000"],
    "gross_profit":       ["5900"],
    "operating_income":   ["6900"],
    "net_income":         ["8200"],
    "interest_expense":   ["7510"],
    "current_assets":     ["11XX"],
    "cash":               ["1100"],
    "inventory":          ["1330"],
    "current_liabilities":["21XX"],
    "total_assets":       ["1XXX"],
    "total_liabilities":  ["2XXX"],
    "equity":             ["3XXX"],
    "retained_earnings":  ["3400", "3350"],
    "operating_cf":       ["AAAA"],
    "capex":              ["B02700", "E0020", "E0010"],
}

# 關鍵字 fallback（非台灣格式財報）
KEYWORDS = {
    "revenue":            ["營業收入淨額", "營業收入", "營收", "Revenue", "Net Sales", "Total Revenue"],
    "gross_profit":       ["營業毛利", "毛利", "Gross Profit"],
    "operating_income":   ["營業淨利", "營業利益", "Operating Income", "Operating Profit"],
    "net_income":         ["本年度淨利", "本期淨利", "稅後淨利", "Net Income", "Net Profit"],
    "interest_expense":   ["利息費用", "Interest Expense", "Finance Costs"],
    "current_assets":     ["流動資產總計", "流動資產合計", "Total Current Assets"],
    "cash":               ["現金及約當現金", "Cash and Cash Equivalents"],
    "inventory":          ["存貨", "Inventory", "Inventories"],
    "current_liabilities":["流動負債總計", "流動負債合計", "Total Current Liabilities"],
    "total_assets":       ["資產總計", "資產合計", "Total Assets"],
    "total_liabilities":  ["負債總計", "負債合計", "Total Liabilities"],
    "equity":             ["權益總計", "股東權益合計", "Total Equity", "Stockholders' Equity"],
    "retained_earnings":  ["保留盈餘", "累積盈虧", "Retained Earnings"],
    "operating_cf":       ["營業活動之淨現金流入", "營業活動淨現金", "Net Cash from Operating Activities"],
    "capex":              ["購置不動產廠房及設備", "資本支出", "Capital Expenditures"],
}

EMPTY_FINANCIALS = {
    "income_statement": {
        "revenue": None, "gross_profit": None, "operating_income": None,
        "net_income": None, "interest_expense": None,
    },
    "balance_sheet": {
        "current_assets": None, "cash": None, "inventory": None,
        "current_liabilities": None, "total_assets": None,
        "total_liabilities": None, "equity": None, "retained_earnings": None,
    },
    "cash_flow": {
        "operating_cf": None, "capex": None,
    },
}

FIELD_SECTION = {
    "revenue": "income_statement", "gross_profit": "income_statement",
    "operating_income": "income_statement", "net_income": "income_statement",
    "interest_expense": "income_statement",
    "current_assets": "balance_sheet", "cash": "balance_sheet",
    "inventory": "balance_sheet", "current_liabilities": "balance_sheet",
    "total_assets": "balance_sheet", "total_liabilities": "balance_sheet",
    "equity": "balance_sheet", "retained_earnings": "balance_sheet",
    "operating_cf": "cash_flow", "capex": "cash_flow",
}


# ---------------------------------------------------------------------------
# 數字解析
# ---------------------------------------------------------------------------

def _parse_number(text: str) -> Optional[float]:
    """將財報數字字串轉為 float，處理括號負數、千分位逗號、$ 符號。"""
    if not text:
        return None
    text = text.strip().replace(",", "").replace("$", "").replace(" ", "")
    if text in ("-", "－", "—", ""):
        return None
    if text.startswith("(") and text.endswith(")"):
        text = "-" + text[1:-1]
    try:
        return float(text)
    except ValueError:
        return None


def _first_amount_in_line(line: str, strip_code: bool = False) -> Optional[float]:
    """
    從財報行中取第一個有效金額。
    strip_code=True 時先去掉行首科目代碼，避免代碼本身被當成金額。
    """
    text = re.sub(r'^[A-Z0-9]{4,}\s+', '', line.strip()) if strip_code else line

    # 優先：$ 後面的數字
    dollar_match = re.search(r'\$\s*([\d,]+(?:\.\d+)?)', text)
    if dollar_match:
        val = _parse_number(dollar_match.group(1))
        if val is not None:
            return val

    # 括號負數（損失）：( 數字 )
    paren_match = re.search(r'\(\s*([\d,]+(?:\.\d+)?)\s*\)', text)
    if paren_match:
        val = _parse_number(f"({paren_match.group(1)})")
        if val is not None:
            return val

    # fallback：找行中所有數字，取第一個 > 100 的（排除代碼、頁碼、百分比）
    numbers = re.findall(r'[\d,]+(?:\.\d+)?', text)
    for n in numbers:
        val = _parse_number(n)
        if val is not None and val > 100:
            return val

    return None


# ---------------------------------------------------------------------------
# 台灣財報代碼定位（主要方法）
# ---------------------------------------------------------------------------

def _extract_by_tw_codes(lines: list[str]) -> dict:
    """
    用台灣 IFRS 科目代碼精確定位財務數字。
    處理兩種情況：
    1. 金額在同行：4000 營業收入... $ 2,481,991 100
    2. 金額在下行（科目名稱換行）：4000 營業收入（附註...\n二九） $ 2,481,991 100
    3. 無 $ 符號的小計行：2XXX 負債總計 3,956,246 32
    """
    result = {k: dict(v) for k, v in EMPTY_FINANCIALS.items()}

    for i, line in enumerate(lines):
        stripped = line.strip()
        for field, codes in TW_CODES.items():
            section = FIELD_SECTION[field]
            if result[section][field] is not None:
                continue
            for code in codes:
                if not re.match(rf'^{re.escape(code)}\s+', stripped, re.IGNORECASE):
                    continue
                # 嘗試同行（去掉行首代碼避免代碼本身被當成金額）
                val = _first_amount_in_line(stripped, strip_code=True)
                # 若同行無金額（科目名稱換行），嘗試下一行
                if val is None and i + 1 < len(lines):
                    val = _first_amount_in_line(lines[i + 1].strip())
                if val is not None:
                    result[section][field] = val
                    break

    return result


# ---------------------------------------------------------------------------
# 關鍵字 fallback
# ---------------------------------------------------------------------------

def _extract_by_keywords(lines: list[str]) -> dict:
    """關鍵字搜尋 fallback，用於非台灣格式財報。"""
    result = {k: dict(v) for k, v in EMPTY_FINANCIALS.items()}

    for field, keywords in KEYWORDS.items():
        section = FIELD_SECTION[field]
        for i, line in enumerate(lines):
            for kw in keywords:
                if kw.lower() in line.lower():
                    val = _first_amount_in_line(line)
                    if val is None and i + 1 < len(lines):
                        val = _first_amount_in_line(lines[i + 1])
                    if val is not None:
                        result[section][field] = val
                        break
            if result[section][field] is not None:
                break

    return result


def _merge(primary: dict, fallback: dict) -> dict:
    merged = {k: dict(v) for k, v in primary.items()}
    for section, fields in fallback.items():
        for field, value in fields.items():
            if merged.get(section, {}).get(field) is None and value is not None:
                merged[section][field] = value
    return merged


def _count_found(data: dict) -> int:
    return sum(1 for fields in data.values() for v in fields.values() if v is not None)


# ---------------------------------------------------------------------------
# PDF 解析
# ---------------------------------------------------------------------------

def _pdf_to_lines(pdf_path: str) -> list[str]:
    """用 pdfplumber 抽取所有文字行（主力）。"""
    try:
        import pdfplumber
    except ImportError:
        return []
    lines: list[str] = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                lines.extend(text.splitlines())
    except Exception as e:
        print(f"[pdfplumber] {e}", file=sys.stderr)
    return lines


def _pdf_to_lines_fitz(pdf_path: str) -> list[str]:
    """用 pymupdf 抽取文字行（fallback）。"""
    try:
        import fitz
    except ImportError:
        return []
    lines: list[str] = []
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            lines.extend((page.get_text("text") or "").splitlines())
        doc.close()
    except Exception as e:
        print(f"[pymupdf] {e}", file=sys.stderr)
    return lines


def _extract_from_pdf(pdf_path: str) -> dict:
    print(f"[1/2] pdfplumber 解析 ...", file=sys.stderr)
    lines = _pdf_to_lines(pdf_path)
    if not lines:
        print(f"[1/2] fallback pymupdf ...", file=sys.stderr)
        lines = _pdf_to_lines_fitz(pdf_path)
    if not lines:
        print("警告：無法讀取 PDF，請確認已安裝 pdfplumber 與 pymupdf", file=sys.stderr)
        return {k: dict(v) for k, v in EMPTY_FINANCIALS.items()}

    print(f"[2/2] 解析財務數字 ...", file=sys.stderr)
    by_code = _extract_by_tw_codes(lines)
    by_kw = _extract_by_keywords(lines)
    return _merge(by_code, by_kw)


# ---------------------------------------------------------------------------
# URL 處理
# ---------------------------------------------------------------------------

def _fetch(url: str) -> tuple[bytes, str]:
    try:
        import requests
    except ImportError:
        print("錯誤：pip install requests", file=sys.stderr)
        sys.exit(1)
    try:
        resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=30)
        resp.raise_for_status()
        return resp.content, resp.headers.get("Content-Type", "")
    except Exception as e:
        print(f"錯誤：無法下載 {url}：{e}", file=sys.stderr)
        sys.exit(1)


def _extract_from_webpage(content: bytes) -> dict:
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("錯誤：pip install beautifulsoup4", file=sys.stderr)
        sys.exit(1)
    soup = BeautifulSoup(content, "html.parser")
    lines: list[str] = []
    for table in soup.find_all("table"):
        for row in table.find_all("tr"):
            cells = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
            if cells:
                lines.append(" ".join(cells))
    for tag in soup.find_all(
        ["div", "span", "p"],
        class_=re.compile(r"(financial|income|balance|cash|revenue|profit)", re.I),
    ):
        text = tag.get_text(strip=True)
        if text:
            lines.append(text)
    by_code = _extract_by_tw_codes(lines)
    by_kw = _extract_by_keywords(lines)
    return _merge(by_code, by_kw)


# ---------------------------------------------------------------------------
# 主要入口
# ---------------------------------------------------------------------------

def extract(source: str) -> dict:
    """
    從本地 PDF、PDF URL 或財務網頁抽取財務數據。

    Args:
        source: 本地 PDF 路徑、PDF URL 或財務網頁 URL

    Returns:
        標準化財務數據 dict
    """
    if source.startswith("http://") or source.startswith("https://"):
        content, content_type = _fetch(source)
        if "pdf" in content_type.lower() or source.lower().endswith(".pdf"):
            print("偵測為 PDF URL，下載中 ...", file=sys.stderr)
            with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
                tmp.write(content)
                tmp_path = tmp.name
            try:
                data = _extract_from_pdf(tmp_path)
            finally:
                Path(tmp_path).unlink(missing_ok=True)
        else:
            print("偵測為網頁，解析 HTML 表格 ...", file=sys.stderr)
            data = _extract_from_webpage(content)
    else:
        path = Path(source)
        if not path.exists():
            print(f"錯誤：找不到檔案 {source}", file=sys.stderr)
            sys.exit(1)
        data = _extract_from_pdf(source)

    total = sum(len(v) for v in EMPTY_FINANCIALS.values())
    found = _count_found(data)
    print(f"抽取完成：{found}/{total} 個欄位成功", file=sys.stderr)

    return {
        "company": "",
        "period": "",
        "currency": "",
        "source": source,
        **data,
        "prior_year": {k: dict(v) for k, v in EMPTY_FINANCIALS.items()},
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="從財務報表 PDF 或網頁抽取結構化數據",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("source", help="本地 PDF 路徑、PDF URL 或財務網頁 URL")
    parser.add_argument("--output", "-o", help="輸出 JSON 檔案路徑（預設輸出至 stdout）")
    args = parser.parse_args()

    data = extract(args.source)
    output = json.dumps(data, ensure_ascii=False, indent=2)

    if args.output:
        Path(args.output).write_text(output, encoding="utf-8")
        print(f"已儲存至 {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
