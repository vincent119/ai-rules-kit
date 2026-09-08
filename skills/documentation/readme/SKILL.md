---
name: readme
description: 建立、改善或稽核 GitHub 專案的 README。僅在使用者明確要求 README、README 正確性、可讀性、範例或 README 稽核時使用；不處理完整文件站、純 API reference 或廣泛 repository 審查。
---

# README

README 是專案的入口頁；先回答「這是什麼、為何重要、如何開始」，再提供讀者需要的下一步。

## 選擇模式

- Create：README 不存在或使用者要求從零建立。
- Improve：使用者要求修訂既有 README；先找事實漂移，再調整結構與表達。
- Audit：使用者要求評估 README；預設只回報發現與證據，不直接修改。

若需求是架構文件、操作手冊、教學、ADR 或概念說明，使用 `technical-writing`，不要使用本 skill。

## 共同流程

1. 閱讀 README、專案結構、manifest、entrypoint、公開 export、CLI parser、設定 schema 與 CI 設定。
2. 建立事實清單：專案名稱、受眾、安裝方式、實際命令、公開介面、設定與執行環境。
3. 對每個準備文件化的命令、旗標、import、API、設定 key 和範例，找出權威來源；找不到就標為待確認。
4. 依 [anatomy](references/anatomy.md) 選擇必要區段，參考 [examples](references/examples.md) 的模式，依 [quality checklist](references/quality-checklist.md) 審查，避免 [anti-patterns](references/anti-patterns.md)。
5. 對技術事實的驗證依 [evidence checklist](references/evidence-checklist.md) 執行；能執行的範例應驗證，不能執行時說明原因。
6. 依 [project type matrix](references/project-type-matrix.md) 選擇專案需要的 README 區段，並依 [documentation navigation](references/documentation-navigation.md) 為不同讀者連到深入文件。

## Create

資訊不足時，詢問目標讀者與希望讀者最先理解的一件事。產出前先列出已驗證的事實與待確認事項。以最短步驟提供可運作的 quick start，僅加入此專案需要的區段。

從 [templates](templates/) 選取 `library.md`、`cli.md`、`kubernetes-controller.md`、`service.md` 或 `internal-tool.md` 作為起始結構。刪除不適用段落，將 `[待確認]` 替換為來源佐證的事實；不得用推測補齊命令、版本、權限或安全承諾。

## Improve 與 Audit

先抽取 README 中的命令、旗標、設定與公開符號，逐一比對來源。將落差分類為過時、已移除、改名、簽名變更、未文件化或歧義。Improve 只以已確認的事實修正；Audit 提供精簡表格，列出原宣稱、來源證據與建議。

## 邊界

不要把 README 變成文件站。LICENSE、CONTRIBUTING、CHANGELOG 有獨立檔案時只連結；缺少時提出缺口，不猜測內容。不要虛構相容 API、安裝方式、版本支援或效能宣稱。
