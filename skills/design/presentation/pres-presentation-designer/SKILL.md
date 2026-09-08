---
name: pres-presentation-designer
description: "簡報設計完整製作流程。協調 5 個製作階段：故事結構 → 資訊設計 → 視覺設計 → 講者備稿 → 品質審查，最終產出完整的簡報套件。適用於「製作簡報」、「Presentation 規劃」、「PPT 製作」、「Slide Deck 設計」、「簡報故事線」、「投影片設計」等請求。注意：PowerPoint/Keynote 檔案直接輸出、投影片動畫設定不在此技能範圍內。"
keywords:
  - presentation
  - slide deck
  - ppt
  - keynote
  - storytelling
  - slide design
  - speaker notes
  - storyboard
  - information design
  - visual design
  - data visualization
  - pitch deck
  - business presentation
  - slide layout
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/13-presentation-designer
license: Apache-2.0
---

# Presentation Designer — 簡報完整製作流程

協調完整的簡報製作流程：故事結構 → 資訊設計 → 視覺設計 → 講者備稿 → 品質審查。

## 此技能的功能

- 引導使用者提供簡報目的、受眾、格式等資訊
- 依序執行 5 個製作階段，每階段產出結構化文件
- 交叉驗證故事線、資訊設計、視覺設計的一致性
- 產出完整的簡報套件（故事結構 + 投影片內容 + 講者備稿）

## 適用時機

- 從零開始規劃並製作簡報
- 需要結構化的故事線設計
- 需要資料視覺化建議
- 需要投影片版面設計指引
- 需要講者備稿與 Q&A 準備

## 觸發範例

以下輸入會啟動此技能：
- 「幫我做一份產品發表的簡報」
- 「我需要一個 10 頁的投資人 Pitch Deck」
- 「幫我規劃這份季度報告的簡報結構」
- 「設計一份技術分享的投影片」

啟動後，先詢問使用者提供以下資訊：

```
請提供以下簡報資訊：

1. 簡報主題與目的（必填）：這份簡報要傳達什麼？
2. 目標受眾（選填）：誰會看這份簡報？背景、期望、決策權限
3. 簡報時長與頁數（選填）：預計幾分鐘？幾頁？
4. 簡報格式（選填）：現場演講 / 自閱文件 / 混合
5. 現有素材（選填）：已有的資料、數據、圖片
```

---

## 執行流程

### Phase 1：準備

1. 從使用者輸入提取並整理資訊
2. 建立 `_workspace/` 目錄
3. 存為 `_workspace/00_input.md`
4. 確定執行模式（完整製作 / 指定階段）

### Phase 2：故事結構設計（storyteller）

**目標**：設計清晰的訊息架構與邏輯流程

執行內容：
1. **受眾分析**：背景知識、關心議題、決策情境
2. **核心訊息**：一句話說清楚這份簡報要傳達什麼
3. **故事線設計**：開場 → 問題/機會 → 解決方案 → 行動呼籲
4. **邏輯流程**：每頁的論點與前後頁的因果關係
5. **訊息層級**：主標題、副標題、支撐論點的層次結構

常用故事結構：
- **問題-解決**：現狀 → 痛點 → 解方 → 效益
- **機會-行動**：市場機會 → 我們的方案 → 為何現在 → 下一步
- **過去-現在-未來**：回顧 → 現況分析 → 未來規劃
- **SCQA**：Situation → Complication → Question → Answer

輸出：`_workspace/01_story_structure.md`

### Phase 3：資訊設計（info-architect）

**目標**：決定每頁的資訊呈現方式與資料視覺化

執行內容（參考 `pres-data-visualization-guide` 技能）：
1. **每頁資訊架構**：主訊息、支撐資料、視覺元素
2. **圖表選擇**：依資料類型選擇最適合的圖表
3. **資訊層級**：決定每頁的視覺焦點與閱讀順序
4. **數據呈現**：數字格式化、比較基準、趨勢標示

輸出：`_workspace/02_info_design.md`

### Phase 4：視覺設計（visual-designer）

**目標**：設計每頁投影片的版面與視覺系統

執行內容（參考 `pres-slide-layout-patterns` 技能）：
1. **版面選擇**：依內容類型選擇最適合的版面模式
2. **設計系統**：色彩、字型、間距的一致性規範
3. **投影片內容**：以 Markdown 格式輸出每頁的完整內容
4. **視覺層級**：標題、內文、強調元素的視覺權重

輸出：`_workspace/03_slide_deck.md`（Markdown 格式的完整投影片）

### Phase 5：講者備稿（presentation-coach）

**目標**：準備講者備稿、時間分配與 Q&A 應對

執行內容：
1. **講者備稿**：每頁的口說重點（非照稿唸）
2. **時間分配**：每頁建議停留時間
3. **過場銜接**：頁面之間的口語轉場語
4. **Q&A 準備**：預測可能問題與建議回答方向
5. **排練指引**：重點強調、停頓節奏、眼神接觸建議

輸出：`_workspace/04_speaker_notes.md`

### Phase 6：品質審查（deck-reviewer）

**目標**：交叉驗證各階段一致性

驗證項目：
- 故事線 ↔ 投影片：每頁內容是否符合故事結構？
- 資訊設計 ↔ 視覺設計：圖表選擇與版面是否一致？
- 核心訊息一致性：每頁是否都在支撐核心訊息？
- 受眾適配性：內容深度與語言是否符合目標受眾？
- 時間可行性：頁數與時長是否匹配？

發現問題時：
- RED（必須修正）：立即要求修正
- YELLOW（建議修正）：提出建議
- GREEN（資訊性）：記錄

輸出：`_workspace/05_review_report.md`

---

## 執行模式

| 使用者請求 | 執行模式 | 部署階段 |
|-----------|---------|---------|
| 「完整製作簡報」 | **Full** | 全部 5 個階段 |
| 「只規劃故事線」 | **Story Mode** | Phase 2 |
| 「只做投影片內容」 | **Deck Mode** | Phase 3-4 |
| 「幫我準備講者備稿」 | **Coach Mode** | Phase 5 |

---

## 輸出目錄結構

```
_workspace/
├── 00_input.md          # 整理後的使用者輸入
├── 01_story_structure.md # 故事結構與訊息地圖
├── 02_info_design.md    # 資訊設計與資料視覺化指引
├── 03_slide_deck.md     # 投影片內容（Markdown 格式）
├── 04_speaker_notes.md  # 講者備稿、時間分配、Q&A
└── 05_review_report.md  # 審查報告
```

## 延伸技能

| 技能 | 目標階段 | 功能 |
|------|---------|------|
| `pres-slide-layout-patterns` | visual-designer | 20 種版面模式、格線系統、設計 Token |
| `pres-data-visualization-guide` | info-architect | 圖表選擇矩陣、LATCH 資訊架構、色彩無障礙 |
