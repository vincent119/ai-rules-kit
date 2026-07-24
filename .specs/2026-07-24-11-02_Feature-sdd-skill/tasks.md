# 任務文件：SDD Skill

## 實作任務

- [x] 建立 Skill 目錄
  - 建立 `skills/sdd-skill/`。
  - 建立 `skills/sdd-skill/assets/templates/`。
  - 建立 `skills/sdd-skill/scripts/`。

- [x] 建立 `SKILL.md`
  - 加入 frontmatter。
  - `name` 設為 `sdd-skill`。
  - `description` 設為：`SDD（Spec Driven Development）工作流程。用於在實作前建立 .specs 下的 requirements.md、design.md、tasks.md，規劃功能邊界、驗收條件、技術設計與實作任務，並在實作過程中依 tasks 追蹤進度。`

- [x] 撰寫使用時機
  - 包含「先規劃」、「先寫文件」、「需求設計 task」、「SDD」、「Spec Driven Development」等觸發條件。

- [x] 撰寫 spec 目錄命名規則
  - 格式為 `.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/`。
  - timestamp 使用系統時區。
  - Type 僅允許 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`。

- [x] 同步 `.specs` 共用規則
  - 將正式 spec 目錄格式、draft 目錄格式、Type 清單、timestamp 規則、文件清單同步到 `source/kiro-specs.md`。
  - README 只新增簡短入口與連結，不重複完整規範。
  - Boundary: `README.md`, `source/kiro-specs.md`
  - Depends: 撰寫 spec 目錄命名規則
  - Context: 多個 agent 需要共用 `.specs` 規則，不能只依賴 `sdd-skill`。
  - Verify: `rg -n "\\.specs/\\{YYYY-MM-DD-HH-mm\\}_\\{Type\\}-\\{kebab-case-name\\}|\\.specs/drafts/\\{YYYY-MM-DD-HH-mm\\}_Draft-\\{kebab-case-name\\}|Feature|BugFix|Refactor|Docs|Chore" README.md source/kiro-specs.md`

- [x] 撰寫 draft 流程規則
  - 需求明確且範圍小時，直接建立正式 spec。
  - 需求模糊或大型需求時，先建立 `.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/`。
  - 最小 draft 只需要 `brief.md`。
  - Draft 可包含 `brief.md`、`discovery.md`、`roadmap.md`。
  - Draft 不直接實作。
  - Draft 在 `Status: Draft` 時可以修改。
  - Draft promotion 後標記 `Status: Promoted` 並不再修改。
  - 正式 spec 必須引用來源 draft。

- [x] 撰寫前後端拆分原則
  - 同一個使用者可感知功能預設使用同一個 spec。
  - 只有交付時間、團隊、API/UI 範圍明確分離時才拆分。

- [x] 撰寫三份文件責任
  - `requirements.md`：背景、目標、非目標、使用情境、驗收情境、驗收條件。
  - `requirements.md`：驗收情境可包含場景、測試、假設、當、那麼。
  - `requirements.md`：變更既有行為時補現有行為、新行為、影響範圍。
  - `requirements.md`：可選用 EARS，但不強制。
  - `design.md`：設計原則、受影響檔案計畫、流程、風險。
  - `tasks.md`：Status、Execution Context、Protected Behavior、實作任務、驗證任務、品質檢查清單、Implementation Notes、後續改善。

- [x] 撰寫任務邊界與相依規則
  - 每個實作任務必須標註 `Boundary:`。
  - 每個實作任務必須標註 `Verify:`。
  - 每個任務可選標註 `Depends:`。
  - 每個任務可選標註 `Context:`。
  - `Boundary` 應拆成 `Allowed Changes` 與 `Forbidden`。

- [x] 撰寫大型需求拆分規則
  - 大型需求可拆成多個 spec。
  - 拆分時建立 `roadmap.md`。
  - `roadmap.md` 記錄拆分理由、spec 清單、交付順序、跨 spec 相依、blocked / ready 狀態、整合驗證方式。

- [x] 撰寫工作流程
  - Phase 1：理解需求。
  - Phase 2：建立 spec 文件。
  - Phase 3：等待確認或進入實作。
  - Phase 4：實作、驗證、回填 tasks。
  - Phase 5：完成摘要。
  - 建立或更新 spec 後，回覆簡短摘要。

- [x] 撰寫輕量 SDLC 規則
  - 流程為 Discovery、Requirements、Design、Tasks、Implementation、Verification、Release Notes。
  - 每個階段只要求必要產出。
  - 不接管 Deployment、Monitoring、Incident、Postmortem、完整 release automation。

- [x] 撰寫品質標準
  - 文件要具體、可驗收、可執行。
  - 不足資訊需明確標註缺口。
  - 不在 spec 階段做實作修改。

- [x] 撰寫 Mermaid diagrams 規則
  - Mermaid diagrams 放在 `design.md`。
  - 可用於 architecture diagrams、flow charts、sequence diagrams。
  - 僅在跨模組互動或流程較複雜時加入。
  - 支援 `flowchart`、`sequenceDiagram`、`stateDiagram-v2`、`classDiagram`。

- [x] 撰寫 Feature 狀態規則
  - `tasks.md` 包含 `Status`。
  - `Status` 僅允許 `Planned`、`InProgress`、`Complete`、`Blocked`。

- [x] 撰寫 Brownfield 支援規則
  - 既有專案變更前，先閱讀相關程式碼與既有文件。
  - 避免只根據需求想像設計。

- [x] 撰寫品質檢查清單規則
  - 不新增 `checklist.md`。
  - 品質檢查清單放在 `tasks.md` 的驗證任務中。

- [x] 撰寫實作上下文讀取規則
  - 實作前不得掃描整個 `.specs` 目錄。
  - 實作前必讀目前 spec 的 `tasks.md`。
  - 依需要讀取 `requirements.md`、`design.md`、`roadmap.md` 的相關段落。
  - 大型文件先用標題與關鍵字搜尋定位。

- [x] 撰寫 Execution Context 規則
  - `tasks.md` 開頭包含 `Execution Context`。
  - 內容包含意圖、非目標、已定決策、邊界、關鍵檔案、完成條件、Protected Behavior。

- [x] 撰寫 Protected Behavior 與回歸護欄
  - `tasks.md` 可包含 `Protected Behavior`。
  - 每個 task 的 `Verify` 包含新行為驗證與必要回歸驗證。
  - 不得修改 Boundary 以外檔案。
  - 修改已完成 task 相關邏輯時，記錄原因到 `Implementation Notes` 並重跑回歸驗證。
  - 每個 task 完成後檢查 `git diff --stat` 與 `git diff --check`。

- [x] 撰寫三份文件樣本參考
  - 提供 `requirements.md` 最小樣本。
  - 提供 `design.md` 最小樣本。
  - 提供 `tasks.md` 最小樣本。
  - 樣本需包含 Execution Context、Protected Behavior、Allowed Changes、Forbidden、Verify、品質檢查清單。

- [x] 建立文件範本
  - 建立 `skills/sdd-skill/assets/templates/requirements.md`。
  - 建立 `skills/sdd-skill/assets/templates/design.md`。
  - 建立 `skills/sdd-skill/assets/templates/tasks.md`。
  - 建立 `skills/sdd-skill/assets/templates/draft-brief.md`。
  - 建立 `skills/sdd-skill/assets/templates/draft-discovery.md`。
  - 建立 `skills/sdd-skill/assets/templates/draft-roadmap.md`。
  - 正式 spec templates 需對應 `requirements.md`、`design.md`、`tasks.md` 的樣本參考定義。
  - draft templates 需對應 brief、discovery、roadmap 的最小格式。
  - 正式 templates 需吸收 brownfield 大型 spec 的泛化結構：文件定位、已知契約狀態、Bounded Context。
  - Boundary: `skills/sdd-skill/assets/templates/**`
  - Depends: 撰寫三份文件樣本參考
  - Context: templates 用於降低不同 agent 產生文件時的章節漂移。
  - Verify: `find skills/sdd-skill/assets/templates -maxdepth 1 -type f -print`

- [x] 建立 spec 產生 script
  - 建立 `skills/sdd-skill/scripts/create_spec.js`。
  - 支援 `spec <Type> <name>`。
  - 支援 `draft <name>`。
  - timestamp 使用系統時區，格式為 `YYYY-MM-DD-HH-mm`。
  - Type 僅允許 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`。
  - name 自動轉 kebab-case。
  - 建立正式 spec 時複製 `requirements.md`、`design.md`、`tasks.md`。
  - 建立 draft 時複製 `draft-brief.md`、`draft-discovery.md`、`draft-roadmap.md`，輸出為 `brief.md`、`discovery.md`、`roadmap.md`。
  - 不覆蓋既有目錄。
  - 僅使用 Node.js 標準函式庫。
  - 錯誤訊息使用繁體中文。
  - Boundary: `skills/sdd-skill/scripts/create_spec.js`
  - Depends: 建立文件範本
  - Context: script 僅建立目錄與空白文件，不負責撰寫 spec 內容。
  - Verify: `node -c skills/sdd-skill/scripts/create_spec.js`

- [x] 撰寫測試 selector 與完成條件規則
  - 驗收情境應盡量綁定測試 selector。
  - 沒有測試時填寫 `測試: 待建立`。
  - 完成條件應引用驗收情境或 task 的 `Verify`。
  - 測試名稱、package、filter 或執行方式變更時，需同步更新 spec。

- [x] 撰寫 SDD 限制
  - 不保證需求本身正確。
  - 不取代人工產品判斷。
  - 不取代人工架構審查。
  - 不保證所有 non-functional requirements 都可機械驗證。
  - 不保證驗收情境完整覆蓋所有風險。

## 驗證任務

- [x] 檢查 Skill frontmatter

```bash
sed -n '1,20p' skills/sdd-skill/SKILL.md
```

預期包含：

```yaml
name: sdd-skill
description:
```

- [x] 檢查 Skill 長度

```bash
wc -l skills/sdd-skill/SKILL.md
```

預期不超過 500 行。

- [x] 檢查命名規則

確認 `SKILL.md` 包含：

```text
.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/
.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/
Feature
BugFix
Refactor
Docs
Chore
```

- [x] 檢查前後端拆分原則

確認 `SKILL.md` 說明同一個使用者可感知功能預設使用同一個 spec，不因 frontend/backend 自動拆分。

- [x] 檢查 Mermaid 規則

確認 `SKILL.md` 包含：

```text
Mermaid
Mermaid diagrams
architecture diagrams
flow charts
sequence diagrams
design.md
flowchart
sequenceDiagram
stateDiagram-v2
classDiagram
```

- [x] 檢查 SDLC 規則

確認 `SKILL.md` 包含：

```text
Discovery
Requirements
Design
Tasks
Implementation
Verification
Release Notes
```

- [x] 檢查文件清單

確認 `SKILL.md` 明確要求：

```text
requirements.md
design.md
tasks.md
assets/templates
scripts/create_spec.js
Implementation Notes
```

- [x] 檢查 templates

```bash
find skills/sdd-skill/assets/templates -maxdepth 1 -type f -print
```

預期包含：

```text
skills/sdd-skill/assets/templates/requirements.md
skills/sdd-skill/assets/templates/design.md
skills/sdd-skill/assets/templates/tasks.md
skills/sdd-skill/assets/templates/draft-brief.md
skills/sdd-skill/assets/templates/draft-discovery.md
skills/sdd-skill/assets/templates/draft-roadmap.md
```

- [x] 檢查 script 語法

```bash
node -c skills/sdd-skill/scripts/create_spec.js
```

預期無語法錯誤。

- [x] 檢查建立正式 spec

```bash
node skills/sdd-skill/scripts/create_spec.js spec Feature sample-feature
```

預期建立：

```text
.specs/{YYYY-MM-DD-HH-mm}_Feature-sample-feature/
```

且包含：

```text
requirements.md
design.md
tasks.md
```

- [x] 檢查建立 draft

```bash
node skills/sdd-skill/scripts/create_spec.js draft sample-feature
```

預期建立：

```text
.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-sample-feature/
```

且包含：

```text
brief.md
discovery.md
roadmap.md
```

- [x] 檢查 `.specs` 共用規則

```bash
rg -n "\.specs/\{YYYY-MM-DD-HH-mm\}_\{Type\}-\{kebab-case-name\}|\.specs/drafts/\{YYYY-MM-DD-HH-mm\}_Draft-\{kebab-case-name\}|Feature|BugFix|Refactor|Docs|Chore" README.md source/kiro-specs.md
```

預期 README 有入口摘要，`source/kiro-specs.md` 有完整規則。

- [x] 檢查吸收規則

確認 `SKILL.md` 包含：

```text
驗收情境
EARS
現有行為
新行為
影響範圍
受影響檔案計畫
Boundary:
Allowed Changes
Forbidden
Depends:
Context:
Verify:
roadmap.md
brief.md
discovery.md
Status: Draft
Status: Promoted
Promoted specs
Status
Planned
InProgress
Complete
Blocked
Execution Context
Protected Behavior
品質檢查清單
關鍵決策
待確認項目
requirements.md 樣本
design.md 樣本
tasks.md 樣本
場景
測試
假設
當
那麼
意圖
已定決策
邊界
完成條件
測試 selector
non-functional requirements
```

- [x] 檢查 git diff

```bash
git diff --check
```

預期無 trailing whitespace 或格式錯誤。

## 後續改善

- [ ] 評估是否將 `create_spec.js` 包裝進未來完整 CLI。
- [ ] 評估是否新增更多 agent-specific 使用說明。
