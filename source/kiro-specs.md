# Specs 共用規範

本文件定義 `.specs` 目錄的共用命名與文件結構，供 Codex、Claude、Kiro 與其他 agent 使用。

## 專案慣例優先

先讀適用的 `AGENTS.md`，解析 spec workspace、任務檔名與 owning spec。以下 `.specs/`、`tasks.md` 是預設值；專案指定外部 workspace 或 `task.md` 時遵循專案規範。私有 workspace 不可用時回報，不在公開 repository 建立替代規劃。建立 helper 只支援預設位置與檔名，不符時直接依模板建立。

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

Draft 用於探索與拆分，不直接實作。Draft 在 `Status: Draft` 時可修改；拆出正式 spec 後標記為 `Status: Promoted`，作為歷史來源不再修改；歸檔時必要的引用路徑維護除外，不改寫歷史決策。

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

## Spec 狀態摘要與完成證據檢查

- 使用者明確要求盤點狀態、待驗證工作或完成證據時，解析指定 workspace 與任務檔名，預設只納入未歸檔正式 spec；draft、archive 僅明確要求時分組納入。
- 查詢為唯讀，不補勾選、改 Status、寫索引、搬移或執行 Verify／CI／部署。一般實作仍只讀目前 spec；查詢才可在指定範圍先讀摘要，再按需追查驗收及結果，不預讀所有歷史。
- 頂層宣告狀態與證據判斷分開；排除子任務、範例及歷史紀錄的 Status。缺失列未知，多個目前宣告衝突時揭露原值；task.md 與 tasks.md 衝突不任選。
- 狀態分布以四種現有狀態及未知／衝突互斥分桶，合計等於納入數；證據缺口與阻塞可重疊，不相加為 spec 總數。無法讀取項目及未檢查範圍另行揭露。
- 將必要條件對應既有執行方式、環境／版本、結果與來源；區分充分、待驗證、證據不足、失敗／矛盾、未知，這些不是新增 Status。裸 PASS 或全部勾選不足；無法查證不等於測試失敗，也不能宣稱此次重新執行。
- 證據須適用相關交付；較舊結果不能涵蓋其後相關修改，不相關修改也不使舊結果自動失效。失效引用若仍有可核對的書面紀錄需說明限制；缺乏依據時保留未知，不自動重跑驗證。
- 可歸檔資格沿用下節規則，所有必要條件未評估前不肯定可歸檔；歷史項目不重算待歸檔。回報範圍、時間、來源、缺口及下一步，不將私有內容複製至公開 repository。

有安裝 `sdd-skill` 時，查詢細節依該技能的 `references/status-evidence.md`。

## 正式 Spec 歸檔

- 歸檔是位置變更，保留 Complete 狀態，不新增 Archived。目的地為解析後 workspace 的 `archive/{原建立年份}/{完整原目錄名稱}/`，建立路徑保持既有慣例。
- 只有正式 spec 標記 Complete、必要任務及驗收完成、有驗證紀錄且無必要阻塞才可歸檔；日期、勾選或狀態本身不足。證據不足列待確認。非必要後續改善已記錄去向或不納入理由即可保留未完成，不得降級必要工作。
- 只要求候選清單時唯讀，列資格、證據、原因與目的地。明確歸檔授權可執行合格目標；不因任務完成自動搬移。
- 歸檔請求可按指定範圍列舉與檢查資格摘要；一般實作仍只讀目前 spec，歷史按需查閱。
- 驗證來源名稱、建立年份與實體路徑；不合格式列待確認，排除 draft、越界來源及外連符號連結。目的地衝突不覆寫或合併；已歸檔回報現況。
- 搬移前檢查既有修改及引用映射；維護專案及私有 workspace 中的來源 draft、roadmap、跨 spec、索引引用與文件內相對連結，核對前後解析目標。保留歷史敘述與結果；既有破損連結及不能控制的外部引用另列限制。
- 成功需確認內容完整、來源移除、有效引用仍有效。部分失敗回報實際位置、已完成與剩餘項目及安全復原方式，不宣稱整批成功。私有規劃不得複製進公開 repository。
- 已完成工作的新增需求或 bug 建立新 spec 引用歷史；同一未完成工作沿用原 spec。第一版不新增 archive CLI、排程或強制索引，不批次搬移使用者專案。

有安裝 `sdd-skill` 時，歸檔操作細節依該技能的 `references/archiving.md`。
