---
name: ui-design-principles
description: UI 設計原則。用於間距系統、色彩層級、排版階層、響應式斷點、無障礙 WCAG 2.1 AA、視覺一致性。
---

# UI 設計原則

> 參照：Material Design 3、Apple HIG、WCAG 2.1 AA

## 間距系統（Spacing）

使用 4px 為基礎單位的倍數系統：

```
4px   - 極小間距（icon 與 label 之間）
8px   - 緊湊間距（相關元素之間）
12px  - 預設內間距（按鈕 padding）
16px  - 標準間距（段落之間、卡片內間距）
24px  - 區塊間距（section 之間）
32px  - 大區塊間距
48px  - 頁面級間距
64px  - 最大間距（hero 區域）
```

規則：
- 相關元素間距小，無關元素間距大（接近性原則）
- 同層級元素使用相同間距
- 內間距（padding）≥ 外間距（gap）的一半

```css
/* 卡片範例 */
.card {
  padding: 24px;           /* 內間距 */
  gap: 16px;               /* 子元素間距 */
  border-radius: 12px;     /* 圓角也遵循 4px 倍數 */
}

.card-header {
  margin-bottom: 8px;      /* 標題與內容的緊湊間距 */
}
```

## 色彩層級（Color Hierarchy）

### 語意色彩

```
Primary    - 主要操作、品牌色（CTA 按鈕、連結）
Secondary  - 次要操作（次要按鈕、標籤）
Neutral    - 背景、邊框、分隔線、文字
Success    - 成功狀態（綠色系）
Warning    - 警告狀態（橙/黃色系）
Error      - 錯誤狀態（紅色系）
Info       - 資訊提示（藍色系）
```

### 文字色彩層級

```
Text Primary     - 主要文字（標題、正文）    對比度 ≥ 7:1
Text Secondary   - 次要文字（說明、時間戳）  對比度 ≥ 4.5:1
Text Tertiary    - 輔助文字（placeholder）   對比度 ≥ 3:1
Text Disabled    - 停用狀態文字
Text Inverse     - 反色文字（深色背景上）
```

### 背景層級

```
Background       - 頁面底層背景
Surface          - 卡片、面板背景（比 background 亮/暗一階）
Surface Elevated - 浮動元素（Modal、Dropdown）
Overlay          - 遮罩層（半透明黑）
```

規則：
- 每個色彩提供 Light / Dark 兩組值
- 互動狀態：default → hover → pressed → focused → disabled
- 不用色彩作為唯一資訊傳達方式（色盲友善）

## 排版階層（Typography）

```
Display Large    - 48-57px  - 行高 1.1  - 首頁大標題
Display Medium   - 36-45px  - 行高 1.1  - 區塊標題
Headline Large   - 28-32px  - 行高 1.25 - 頁面標題（h1）
Headline Medium  - 24px     - 行高 1.3  - 區塊標題（h2）
Title Large      - 20-22px  - 行高 1.3  - 卡片標題（h3）
Title Medium     - 16px     - 行高 1.4  - 小標題
Body Large       - 16px     - 行高 1.5  - 主要正文
Body Medium      - 14px     - 行高 1.5  - 次要正文
Body Small       - 12px     - 行高 1.5  - 輔助文字
Label Large      - 14px     - 行高 1.4  - 按鈕文字
Label Medium     - 12px     - 行高 1.4  - 標籤、Badge
Caption          - 11-12px  - 行高 1.4  - 最小文字（時間戳、註腳）
```

規則：
- 一個頁面最多使用 3-4 種字級
- 正文最小 14px（行動裝置 16px）
- 行高：標題 1.1-1.3，正文 1.5-1.75
- 字重：Regular(400)、Medium(500)、Semibold(600)、Bold(700)
- 中文字體 fallback：`"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`

## 響應式斷點（Responsive Breakpoints）

```
Mobile S     - 320px   - 最小支援寬度
Mobile       - 375px   - 主要手機尺寸
Mobile L     - 428px   - 大螢幕手機
Tablet       - 768px   - 平板直向
Laptop       - 1024px  - 平板橫向 / 小筆電
Desktop      - 1280px  - 標準桌面
Desktop L    - 1440px  - 大螢幕桌面
Desktop XL   - 1920px  - 超寬螢幕
```

```css
/* Mobile First 斷點 */
/* 預設：Mobile */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Laptop */ }
@media (min-width: 1280px) { /* Desktop */ }
@media (min-width: 1440px) { /* Desktop L */ }
```

佈局規則：
- Mobile：單欄，全寬元件
- Tablet：可選雙欄，側邊欄可收合
- Desktop：多欄佈局，固定側邊欄
- 內容最大寬度：1200-1440px，置中對齊
- 觸控目標最小 44x44px（Apple HIG）/ 48x48dp（Material Design）

## 無障礙（WCAG 2.1 AA）

### 對比度

```
一般文字（< 18px）    - 對比度 ≥ 4.5:1
大文字（≥ 18px bold） - 對比度 ≥ 3:1
UI 元件與圖形         - 對比度 ≥ 3:1
```

### 鍵盤操作

```
Tab        - 在可互動元素間移動焦點
Enter      - 啟動按鈕、連結
Space      - 切換 checkbox、radio、toggle
Escape     - 關閉 Modal、Dropdown、Popover
Arrow Keys - 在選單、Tab、Radio Group 中移動
```

### Focus 樣式

```css
/* 必須提供可見的 focus 指示器 */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 不移除 focus 樣式 */
/* 禁止：*:focus { outline: none; } */
```

### 必要 ARIA

```tsx
// 圖片
<img src="photo.jpg" alt="使用者頭像" />
<img src="decorative.svg" alt="" role="presentation" />

// 互動元素
<button aria-label="關閉對話框">✕</button>
<div role="alert">儲存成功</div>

// 表單
<label htmlFor="email">電子郵件</label>
<input id="email" type="email" aria-required="true" aria-describedby="email-hint" />
<span id="email-hint">我們不會分享你的信箱</span>

// 動態內容
<div aria-live="polite">搜尋到 5 筆結果</div>
```

## 視覺一致性

### 圓角

```
Small   - 4px   - Badge、Tag
Medium  - 8px   - 按鈕、輸入框
Large   - 12px  - 卡片、面板
XLarge  - 16px  - Modal、Sheet
Full    - 9999px - 頭像、Pill 按鈕
```

### 陰影

```
Elevation 1 - 輕微浮起（卡片）     box-shadow: 0 1px 3px rgba(0,0,0,0.12)
Elevation 2 - 明顯浮起（Dropdown） box-shadow: 0 4px 6px rgba(0,0,0,0.12)
Elevation 3 - 高浮起（Modal）      box-shadow: 0 8px 24px rgba(0,0,0,0.16)
```

### 動畫

```
Duration:
  Micro    - 100ms  - Hover、Toggle
  Short    - 200ms  - Fade、Collapse
  Medium   - 300ms  - Slide、Modal 進出
  Long     - 500ms  - 頁面轉場

Easing:
  ease-out    - 進入畫面的元素
  ease-in     - 離開畫面的元素
  ease-in-out - 狀態切換
```

規則：
- 同類型元素使用相同圓角、陰影、動畫
- 減少動畫偏好：`prefers-reduced-motion: reduce` 時停用非必要動畫
- 陰影層級對應 z-index 層級

## 規則摘要

- 間距使用 4px 倍數系統；相關元素靠近，無關元素拉遠
- 色彩分語意角色；每個角色提供完整互動狀態 + Light/Dark
- 排版最多 3-4 種字級；正文最小 14px
- Mobile First 響應式；觸控目標最小 44x44px
- WCAG 2.1 AA：對比度 4.5:1、鍵盤可操作、focus 可見
- 圓角、陰影、動畫全域統一；尊重 `prefers-reduced-motion`
