# 事實驗證

## 命令與安裝

檢查 `package.json` 的 scripts、bin 與 exports，或 `go.mod`、`Cargo.toml`、`pyproject.toml` 等 manifest；再對照實際 CLI parser、Makefile、release workflow 或 CI。確認命令的工作目錄、必要參數、版本、系統依賴與成功輸出。package 名稱與 repo 名稱不同時，以發布設定為準。

## API、設定與範例

API 必須由公開 export、barrel file、型別宣告、文件化 schema 或 entrypoint 證實。對每一個範例記錄 import、函式、參數、回傳或輸出、設定 key 與檔案路徑的來源。搜尋字串不算驗證：要確認符號存在、可由公開入口取得，且簽名未變。無法找出替代項目時，標記歧義，不創造 alias 或相容 wrapper。

## 版本、連結與跨文件一致性

版本與平台支援對照 manifest、lockfile、CI matrix、release/tag；README 連結逐一確認檔案、heading 或外部頁面存在。抽查 CONTRIBUTING、docs、changelog 與 README 的 build、test、install 指令是否一致。驗證不了的範例，明確報告未執行原因及所需環境。

## 漂移紀錄格式

| README 宣稱 | 目前來源 | 證據檔案 | 分類 | 建議 |
|---|---|---|---|---|
| 舊命令或符號 | 已驗證的現況 | 相對路徑 | 改名、移除、移動、簽名變更或歧義 | 修正、移除或待確認 |
