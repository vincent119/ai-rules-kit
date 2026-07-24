# Specs 共用規範

本文件定義 `.specs` 目錄的共用命名與文件結構，供 Codex、Claude、Kiro 與其他 agent 使用。

## 使用時機

當功能需要先釐清需求、設計與實作任務時，使用 `.specs` 建立規格文件。

適用情境：

- 使用者要求先規劃、先寫文件、需求設計 task、SDD 或 Spec Driven Development。
- 功能影響多個檔案、CLI 行為、安裝流程、公開文件或發布流程。
- 實作前需要固定 scope、驗收條件與任務順序。

## 正式 Spec 命名

正式 spec 目錄格式：

```text
.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/
```

規則：

- timestamp 使用執行環境的系統時區。
- timestamp 格式固定為 `YYYY-MM-DD-HH-mm`。
- timestamp 與 `Type` 之間使用 `_`。
- `Type` 與 `name` 之間使用 `-`。
- `Type` 僅允許 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`。
- `name` 使用 kebab-case。
- 不使用空白與中文資料夾名稱。

取得 timestamp：

```bash
date +"%Y-%m-%d-%H-%M"
```

範例：

```text
.specs/2026-07-24-11-15_Feature-user-login/
.specs/2026-07-24-11-30_BugFix-claude-hook-path/
```

## Draft 命名

需求模糊或大型需求時，先建立 draft：

```text
.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/
```

Draft 可包含：

```text
brief.md
discovery.md
roadmap.md
```

最小 draft 只需要 `brief.md`。

Draft 用於探索與拆分，不直接實作。Draft 在 `Status: Draft` 時可修改；拆出正式 spec 後標記為 `Status: Promoted`，作為歷史來源不再修改。

正式 spec 來自 draft 時，需引用來源：

```markdown
## 來源

- Draft: `.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/brief.md`
```

## Type 定義

| Type | 用途 |
|------|------|
| `Feature` | 新增功能或能力 |
| `BugFix` | 修正錯誤、壞掉的行為、解析問題 |
| `Refactor` | 不改變外部行為的內部重構 |
| `Docs` | 文件、規格、README、說明內容 |
| `Chore` | 維護性工作，例如版本、打包、設定、工具調整 |

若一件事同時包含多種 Type，選擇主要目的。

## 正式文件

每個正式 spec 至少包含：

```text
requirements.md
design.md
tasks.md
```

`requirements.md` 記錄背景、目標、非目標、驗收情境、驗收條件與驗證需求。

`design.md` 記錄設計原則、受影響檔案計畫、目標結構或流程、Mermaid diagrams、風險與處理方式。

`tasks.md` 記錄 `Status`、`Execution Context`、`Protected Behavior`、實作任務、驗證任務、品質檢查清單與 `Implementation Notes`。

## 實作讀取原則

實作前不得預設掃描整個 `.specs` 目錄。

實作前必讀目前目標 spec：

```text
.specs/{current}/tasks.md
```

依需要讀取：

```text
.specs/{current}/requirements.md
.specs/{current}/design.md
.specs/{current}/roadmap.md
```

文件很大時，先用標題與關鍵字定位：

```bash
rg -n "^#|^##|^###|Boundary:|Depends:|Implementation Notes|Status:" .specs/{current}
```

只讀當前 task 相關段落。
