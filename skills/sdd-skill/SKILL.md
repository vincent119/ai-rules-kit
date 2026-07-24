---
name: sdd-skill
description: SDD（Spec Driven Development）工作流程。用於在實作前建立 .specs 下的 requirements.md、design.md、tasks.md，規劃功能邊界、驗收條件、技術設計與實作任務，並在實作過程中依 tasks 追蹤進度。
---

# Spec Driven Development

## 使用時機

當使用者要求「先規劃」、「先寫文件」、「先產文件」、「需求設計 task」、SDD 或 Spec Driven Development 時使用此技能。

也適用於功能影響多個檔案、CLI 行為、安裝流程、公開文件、發布流程，或需要先固定 scope、驗收條件與實作順序的變更。

此技能不取代 CI/CD、Deployment、Monitoring、Incident、Postmortem、完整 release automation 或建立其他 skill 的專用技能。

## 工作流程

使用輕量 SDLC：

```text
Discovery -> Requirements -> Design -> Tasks -> Implementation -> Verification -> Release Notes
```

1. 理解需求：既有專案變更前，先閱讀相關程式碼與既有文件，避免只根據需求想像設計。
2. 判斷範圍：需求明確且範圍小時建立正式 spec；需求模糊或大型時先建立 draft。
3. 建立文件：正式 spec 建立 `requirements.md`、`design.md`、`tasks.md`。
4. 等待確認：使用者只要求文件時，停在文件產出。
5. 進入實作：使用者要求繼續時，依 `tasks.md` 推進並回填狀態。
6. 驗證完成：執行測試、dry-run、回歸驗證與 `git diff --check`。

建立或更新 spec 後，回覆摘要：關鍵決策、待確認項目、風險、下一步。

## Spec 目錄命名

正式 spec：

```text
.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/
```

Draft：

```text
.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/
```

規則：

- timestamp 使用執行環境的系統時區，格式為 `YYYY-MM-DD-HH-mm`。
- `Type` 僅允許 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`。
- `name` 使用 kebab-case。
- 不使用空白與中文資料夾名稱。

可用 script 建立空白文件：

```bash
node skills/sdd-skill/scripts/create_spec.js spec Feature add-hooks-installer
node skills/sdd-skill/scripts/create_spec.js draft payment-refund-flow
```

## Draft 規則

需求模糊或大型需求時，先建立 draft，不直接實作。

Draft 可包含：

```text
brief.md
discovery.md
roadmap.md
```

最小 draft 只需要 `brief.md`。

Draft 狀態：

```text
Status: Draft
Status: Promoted
```

Draft 在 `Status: Draft` 時可修改；promotion 後標記 `Status: Promoted`，作為歷史來源不再修改。正式 spec 必須引用來源 draft，並可記錄：

```text
Promoted specs
```

## 文件要求

`requirements.md` 必須包含文件定位、背景、目標、非目標、使用情境、驗收情境、驗收條件與驗證需求。變更既有行為時，補現有行為、新行為、影響範圍。可選用 EARS，但不強制。

文件定位需說明本 spec 接續哪個需求、draft、舊 spec、issue 或既有模組，並明確寫出不重寫哪些既有模組或已完成邏輯。

驗收情境使用：

```text
場景
測試
假設
當
那麼
```

`測試` 應盡量綁定測試 selector；沒有測試時填 `待建立`。測試名稱、package、filter 或執行方式變更時，需同步更新 spec。完成條件應引用驗收情境或 task 的 `Verify:`。

`design.md` 必須包含文件定位、已知契約狀態、Bounded Context、設計原則、目標結構或流程、受影響檔案計畫、關鍵行為、風險與處理方式。必要時加入 Mermaid diagrams，放在 `design.md`。

已知契約狀態需列出需求來源、API / CLI / Hook contract、Data contract、既有實作與不可假造的欄位、狀態、權限或資料。Bounded Context 需分開列出包含與不包含。

Mermaid diagrams 可用於 architecture diagrams、flow charts、sequence diagrams、state diagrams、class diagrams。支援 `flowchart`、`sequenceDiagram`、`stateDiagram-v2`、`classDiagram`。

`tasks.md` 必須包含：

- `Status: Planned | InProgress | Complete | Blocked`
- `Execution Context`
- `Protected Behavior`
- 實作任務與驗證任務
- `Boundary:`、`Depends:`、`Context:`、`Verify:`
- 品質檢查清單
- `Implementation Notes`

`Execution Context` 應包含意圖、非目標、已定決策、邊界、關鍵檔案、完成條件。

每個 task 的 `Boundary:` 應拆成 `Allowed Changes` 與 `Forbidden`。大型需求可拆成多個 spec，並建立 `roadmap.md` 記錄拆分理由、spec 清單、交付順序、跨 spec 相依、blocked / ready 狀態與整合驗證方式。

同一個使用者可感知功能預設使用同一個 spec，不因 frontend/backend 自動拆分。只有交付時間、團隊、API/UI 範圍明確分離時才拆分。

## 實作規則

實作前不得掃描整個 `.specs` 目錄。只讀目前目標 spec 的必要文件。

實作前必讀：

```text
.specs/{current}/tasks.md
```

依需要讀取：

```text
.specs/{current}/requirements.md
.specs/{current}/design.md
.specs/{current}/roadmap.md
```

大型文件先用標題與關鍵字定位：

```bash
rg -n "^#|^##|^###|Boundary:|Depends:|Implementation Notes|Status:" .specs/{current}
```

每個 task 前讀取 `Execution Context`、當前 task、`Protected Behavior`。不得修改 `Boundary` 以外檔案；若必須修改，先更新 `tasks.md` 或詢問使用者。

不得重寫已完成 task 的實作，除非有明確原因。若修改已完成 task 相關邏輯，記錄原因到 `Implementation Notes`，並重跑相關回歸驗證。

## 驗證規則

每個 task 的 `Verify:` 必須包含新行為驗證與必要回歸驗證。

每完成一個 task，檢查：

```bash
git diff --stat
git diff --check
```

若 diff 超出 Boundary，標記 `Blocked` 或更新任務邊界後再繼續。

品質檢查清單放在 `tasks.md` 的驗證任務中，不額外建立 `checklist.md`。

## 樣本參考

文件骨架位於 `assets/templates`：

- requirements.md 樣本
- design.md 樣本
- tasks.md 樣本
- draft-brief.md
- draft-discovery.md
- draft-roadmap.md

這些 templates 是輸出素材，不需要預設讀入 context；建立 spec 時複製後再填寫。

## 限制

SDD 不保證需求本身正確，不取代人工產品判斷，不取代人工架構審查，不保證所有 non-functional requirements 都可機械驗證，也不保證驗收情境完整覆蓋所有風險。
