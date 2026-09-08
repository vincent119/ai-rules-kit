---
name: technical-writing
description: 建立、改善或稽核 README 以外的技術文件，例如架構文件、操作手冊、教學、ADR 與概念說明。僅在使用者明確要求此類文件時使用；README 需求應使用 readme skill。
---

# 技術寫作

產出可執行、可維護、可追溯的技術文件。以讀者要完成的任務與可驗證的系統事實組織內容，而非堆疊實作細節。

## 選擇模式

- Create：從零建立文件。
- Improve：修正既有文件的結構、清晰度與事實漂移。
- Audit：唯讀檢查，提出有來源佐證的問題與建議。

使用 [document types](references/document-types.md) 判斷文件種類與讀者；README 專案入口頁改用 `readme`。

## 工作流程

1. 確認文件類型、目標讀者、讀者完成後應能做出的決策或操作。
2. 讀取原始碼、設定、部署定義、runbook、ADR、介面契約及現有文件，建立事實與假設清單。
3. 當元件關係或跨系統互動不易由文字理解時，依 [Mermaid 圖表](references/mermaid-diagrams.md) 選擇架構圖或時序圖；圖中的元件、訊息與邊界必須有來源佐證。
4. 依 [structure](references/structure.md) 與 [templates](references/templates.md) 撰寫；每個步驟、介面、限制與風險應能追溯來源。
5. Improve 或 Audit 時，對照現況分類過時、歧義、缺漏與已廢棄內容，提出有證據的優先改善項目。
6. 使用 [quality checklist](references/quality-checklist.md) 與 [evidence checklist](references/evidence-checklist.md) 完成審查。

## 文件模板

建立文件時，從 [templates](templates/) 選擇最接近的起始檔：`architecture.md`、`runbook.md`、`tutorial.md`、`adr.md` 或 `concept.md`。移除不適用段落，再填入已驗證內容；`[待確認]` 不得直接改寫為推測的系統事實。

## 寫作原則

先交代目的、範圍與前置條件，再描述流程、決策、驗證與故障處理。命令與設定範例必須可驗證；不確定的資訊明確標為待確認。不要把 API reference、完整文件站建置或 README 入口頁混入本 skill。
