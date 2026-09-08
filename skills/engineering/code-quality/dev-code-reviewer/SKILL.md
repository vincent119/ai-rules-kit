---
name: dev-code-reviewer
description: "自動化程式碼審查完整流程。協調 4 個審查領域：風格、安全性、效能、架構，最終產出綜合審查報告。適用於「review this code」、「看一下這段程式碼」、「程式碼審查」、「PR review」、「程式碼品質分析」、「安全性審查」、「效能審查」、「架構審查」、「程式碼風格檢查」等任務。支援指定單一領域審查。注意：CI/CD 整合、自動修正、Git commit/merge 操作不在此技能範圍內。"
keywords:
  - code review
  - code inspection
  - pr review
  - pull request
  - code quality
  - security review
  - performance review
  - architecture review
  - style check
  - static analysis
  - solid
  - owasp
  - cwe
  - refactoring
  - code smell
  - technical debt
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/21-code-reviewer
license: Apache-2.0
---

# Code Reviewer — 自動化程式碼審查流程

系統性地從風格、安全性、效能、架構 4 個領域審查程式碼。

## 此技能的功能

- 引導使用者提供審查目標（程式碼、PR diff、目錄）
- 依序或並行執行 4 個領域審查，每個領域產出結構化報告
- 交叉驗證各領域發現（安全措施的效能影響、架構瓶頸等）
- 整合所有審查結果，產出優先級排序的最終報告
- 支援全域審查或指定單一領域審查

## 適用時機

- PR 合併前的程式碼審查
- 新功能開發完成後的品質檢查
- 安全性稽核
- 效能問題排查
- 技術債評估

## 觸發範例

以下輸入會啟動此技能：
- 「幫我 review 這段 Python 程式碼」
- 「這個 PR 有沒有安全性問題？」
- 「分析這個函式的效能」
- 「檢查這個模組的架構設計」
- 「全面審查這個專案」

啟動後，先確認以下資訊：

```
請提供以下審查資訊：

1. 目標程式碼（必填）：檔案路徑、PR 號碼、diff 或直接貼上程式碼
2. 語言/框架（選填）：可自動偵測
3. 審查範圍（選填）：全域 / 僅安全性 / 僅效能 / 僅架構 / 僅風格
4. 背景資訊（選填）：PR 描述、相關 Issue、變更原因
5. 風格指南（選填）：團隊特定規範
```

---

## 執行流程

### Phase 1：準備

1. 從使用者輸入提取：
   - **目標程式碼**：檔案路徑、PR 號碼、diff、目錄
   - **語言/框架**：自動偵測或使用者指定
   - **審查範圍**：若只要求特定領域
   - **背景資訊**：PR 描述、相關 Issue、變更原因
   - **風格指南**：團隊特定規範

2. 建立 `_workspace/` 目錄
3. 整理輸入存為 `_workspace/00_input.md`
4. 識別目標程式碼，確定審查範圍
5. 根據請求範圍決定**執行模式**

### Phase 2：審查執行

| 順序 | 任務 | 負責領域 | 相依 | 產出 |
|------|------|---------|------|------|
| 1a | 風格審查 | style-inspector | 無 | `_workspace/01_style_review.md` |
| 1b | 安全性審查 | security-analyst | 無 | `_workspace/02_security_review.md` |
| 1c | 效能審查 | performance-analyst | 無 | `_workspace/03_performance_review.md` |
| 1d | 架構審查 | architecture-reviewer | 無 | `_workspace/04_architecture_review.md` |
| 2 | 綜合報告 | review-synthesizer | 1a-1d | `_workspace/05_review_summary.md` |

任務 1a-1d **全部並行執行**。

**領域間資訊傳遞：**
- style-inspector → 將注釋中的敏感資訊傳給 security-analyst，複雜函式清單傳給 performance-analyst
- security-analyst → 將安全措施的效能影響傳給 performance-analyst，認證架構傳給 architecture-reviewer
- performance-analyst → 將結構性瓶頸傳給 architecture-reviewer
- review-synthesizer 整合所有審查，發現跨領域衝突時向相關分析師請求補充分析

### Phase 3：整合與最終產出

1. 驗證 `_workspace/` 中的所有審查報告
2. 確定最終裁決（Approve / Request Changes / Reject）
3. 向使用者報告最終摘要

---

## 執行模式

| 使用者請求模式 | 執行模式 | 部署領域 |
|--------------|---------|---------|
| 「review 這段程式碼」、「全面審查」 | **Full Review** | 全部 4 個領域 |
| 「只做安全性審查」 | **Security Mode** | security-analyst + synthesizer |
| 「分析效能」 | **Performance Mode** | performance-analyst + synthesizer |
| 「架構審查」 | **Architecture Mode** | architecture-reviewer + synthesizer |
| 「只檢查程式碼風格」 | **Style Mode** | style-inspector + synthesizer |

**PR Review**：提供 PR 號碼時，提取 diff 並聚焦於變更的程式碼，參考完整檔案上下文但集中審查 diff。

---

## 各領域審查重點

### 風格審查（style-inspector）
- 命名慣例（變數、函式、類別）
- 格式化與縮排一致性
- 程式碼可讀性（函式長度、巢狀深度）
- 注釋品質與文件完整性
- 語言特定慣例（PEP 8、ESLint、gofmt 等）

### 安全性審查（security-analyst）
參考 `dev-vulnerability-patterns` 技能：
- OWASP Top 10 / CWE Top 25 漏洞掃描
- 注入攻擊（SQL、Command、Path Traversal）
- 認證與授權缺陷
- 敏感資料暴露（硬編碼憑證、日誌洩漏）
- 不安全的反序列化

### 效能審查（performance-analyst）
- 演算法複雜度（時間/空間）
- N+1 查詢問題
- 記憶體洩漏風險
- 並行/競態條件
- 快取機會識別

### 架構審查（architecture-reviewer）
參考 `dev-refactoring-catalog` 技能：
- SOLID 原則違反
- 設計模式適用性
- 模組耦合度與內聚性
- 依賴方向正確性
- 程式碼異味（Code Smells）

---

## 審查報告格式

每個領域的報告使用統一格式：

```markdown
# [領域] 審查報告

## 摘要
- 整體評估：PASS / WARN / FAIL
- 發現問題數：Critical X, High X, Medium X, Low X

## 問題清單

### [嚴重度] 問題標題
- 位置：`file.py:42`
- 說明：問題描述
- 建議：修正方式
- 參考：CWE-89 / SOLID-SRP 等
```

### 最終綜合報告格式

```markdown
# 程式碼審查報告

## 最終裁決
Approve / Request Changes / Reject

## 執行摘要
[2-3 句總結]

## 優先修正項目（Critical & High）
[跨領域排序的必修項目]

## 各領域摘要
| 領域 | 評估 | 問題數 |
|------|------|--------|

## 完整問題清單
[依優先級排序]

## 優點（What Went Well）
[值得保留的良好實踐]
```

---

## 錯誤處理

| 錯誤類型 | 策略 |
|---------|------|
| 無法識別語言 | 從副檔名 + 程式碼模式自動偵測 |
| 大型程式碼庫 | 聚焦於變更或核心檔案，在報告中說明範圍 |
| 跨領域衝突 | review-synthesizer 進行取捨分析並裁決 |
| 背景資訊不足 | 僅基於程式碼審查，在報告中說明限制 |

## 延伸技能

| 技能 | 目標領域 | 功能 |
|------|---------|------|
| `dev-vulnerability-patterns` | security-analyst | CWE 分類、語言特定漏洞模式、安全替代方案 |
| `dev-refactoring-catalog` | architecture-reviewer, performance-analyst | 程式碼異味到重構的對應、SOLID 違反識別、複雜度指標 |
