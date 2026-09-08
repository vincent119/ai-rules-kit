---
name: ui-component-guidelines
description: UI 元件設計規範。用於按鈕狀態、表單驗證、Modal 行為、Toast 通知、表格互動、導航模式、載入狀態。
---

# UI 元件設計規範

> 參照：Material Design 3、Ant Design、Shopify Polaris

## 按鈕（Button）

### 層級

```
Primary    - 頁面主要操作（每頁最多 1 個）
Secondary  - 次要操作（取消、返回）
Tertiary   - 低優先操作（文字按鈕、連結樣式）
Danger     - 破壞性操作（刪除、移除）
```

### 狀態

```
Default  → Hover → Pressed → Focused → Loading → Disabled
```

### 規則

- 按鈕文字用動詞開頭：「儲存」「刪除」「新增項目」
- 禁止只用「確定」「是」「否」；需明確描述操作
- Loading 狀態顯示 spinner + 文字（如「儲存中...」），禁止重複點擊
- Disabled 需搭配 tooltip 說明原因
- Icon-only 按鈕必須有 `aria-label`
- 破壞性操作需二次確認

```tsx
// 按鈕組排列
<div className="button-group">
  <Button variant="secondary">取消</Button>
  <Button variant="primary" loading={isSubmitting}>儲存變更</Button>
</div>
// 規則：Primary 在右（LTR）、在下（Mobile stack）
```

## 表單（Form）

### 驗證時機

```
即時驗證   - 離開欄位時（onBlur）驗證格式
提交驗證   - 送出時驗證必填與業務邏輯
延遲驗證   - 輸入停止 300ms 後驗證（搜尋、帳號檢查）
```

### 錯誤訊息

```tsx
// 錯誤訊息放在欄位下方，紅色文字 + icon
<div className="form-field">
  <label htmlFor="email">電子郵件 *</label>
  <input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby="email-error"
  />
  {error && (
    <span id="email-error" role="alert" className="error-message">
      <ErrorIcon /> 請輸入有效的電子郵件地址
    </span>
  )}
</div>
```

### 規則

- 必填欄位標示 `*` 或 `（必填）`
- 錯誤訊息具體說明如何修正，不只說「格式錯誤」
- 成功驗證顯示綠色勾勾（密碼強度、帳號可用）
- 表單送出失敗時，焦點移到第一個錯誤欄位
- 長表單分步驟（Stepper），顯示進度
- 密碼欄位提供顯示/隱藏切換

## Modal / Dialog

### 類型

```
Alert Dialog   - 需要使用者確認的重要訊息（不可點背景關閉）
Confirmation   - 破壞性操作前的二次確認
Form Dialog    - 包含表單的對話框
Info Dialog    - 資訊展示（可點背景關閉）
```

### 行為規則

- 開啟時：focus 移到 Modal 內第一個可互動元素
- 開啟時：背景加 overlay，禁止背景滾動（`body overflow: hidden`）
- 關閉方式：ESC 鍵、關閉按鈕、點擊 overlay（非 Alert 類型）
- 關閉時：focus 回到觸發 Modal 的元素
- Focus trap：Tab 只在 Modal 內循環
- 寬度：Small(400px)、Medium(560px)、Large(720px)、Full

```tsx
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">確認刪除</h2>
  <p id="modal-desc">此操作無法復原，確定要刪除嗎？</p>
  <footer>
    <Button variant="secondary">取消</Button>
    <Button variant="danger">刪除</Button>
  </footer>
</dialog>
```

## Toast / Notification

### 類型

```
Success  - 操作成功（綠色，3-5 秒自動消失）
Error    - 操作失敗（紅色，不自動消失，需手動關閉）
Warning  - 警告提示（橙色，5-8 秒自動消失）
Info     - 一般資訊（藍色，3-5 秒自動消失）
```

### 規則

- 位置：右上角（Desktop）或頂部全寬（Mobile）
- 多個 Toast 垂直堆疊，最新在上
- 最多同時顯示 3 個；超過時排隊
- 包含操作按鈕時不自動消失（如「復原」）
- 使用 `role="alert"` 或 `aria-live="polite"` 通知螢幕閱讀器
- 不用 Toast 傳達關鍵資訊（使用者可能錯過）

```tsx
<div role="alert" aria-live="assertive" className="toast toast-error">
  <ErrorIcon />
  <span>儲存失敗，請稍後再試</span>
  <button aria-label="關閉通知">✕</button>
</div>
```

## 表格（Table）

### 功能

```
排序       - 點擊欄位標題切換升序/降序/無排序
篩選       - 欄位級篩選或全域搜尋
分頁       - 顯示總筆數、每頁筆數選擇、頁碼導航
選取       - Checkbox 多選、全選/取消全選
空狀態     - 無資料時顯示插圖 + 說明 + 操作按鈕
載入狀態   - Skeleton 或 Spinner
```

### 規則

- 文字左對齊；數字右對齊；狀態/操作置中
- 欄位寬度：固定重要欄位，其餘自適應
- 行高最小 48px（觸控友善）
- 超長文字用 ellipsis + tooltip 顯示完整內容
- 固定表頭（sticky header）；超過 5 欄考慮水平捲動
- 行操作：hover 顯示操作按鈕，或固定在最右欄

```tsx
<table role="grid" aria-label="使用者列表">
  <thead>
    <tr>
      <th aria-sort="ascending">
        <button>名稱 ↑</button>
      </th>
      <th>電子郵件</th>
      <th aria-sort="none">建立日期</th>
    </tr>
  </thead>
</table>
```

## 導航（Navigation）

### 模式

```
Top Nav       - 主要導航（5-7 項以內）
Side Nav      - 多層級導航（後台系統）
Breadcrumb    - 層級路徑指示
Tab           - 同頁面內容切換（2-6 項）
Bottom Nav    - Mobile 主要導航（3-5 項）
```

### 規則

- 當前頁面在導航中明確標示（`aria-current="page"`）
- Breadcrumb 最後一項不可點擊（當前頁面）
- Tab 使用 `role="tablist"` + `role="tab"` + `role="tabpanel"`
- Mobile 側邊欄用 overlay + slide-in 動畫
- 導航項目文字簡短（2-4 字）；搭配 icon 輔助辨識

## 載入狀態（Loading）

### 類型

```
Skeleton     - 頁面首次載入（佔位元素模擬最終佈局）
Spinner      - 操作等待（按鈕、小區域）
Progress Bar - 已知進度（上傳、多步驟）
Shimmer      - 列表/卡片載入中
```

### 規則

- 載入時間 < 300ms：不顯示任何載入指示
- 載入時間 300ms-1s：顯示 Spinner
- 載入時間 > 1s：顯示 Skeleton 或進度條
- Skeleton 形狀模擬最終內容（文字用長條、圖片用方塊）
- 避免全頁 Spinner；優先局部載入

```tsx
// Skeleton 範例
<div className="card-skeleton">
  <div className="skeleton skeleton-avatar" />
  <div className="skeleton skeleton-title" />
  <div className="skeleton skeleton-text" />
  <div className="skeleton skeleton-text short" />
</div>
```

## 空狀態（Empty State）

```tsx
<div className="empty-state">
  <Illustration />
  <h3>尚無任何項目</h3>
  <p>建立你的第一個項目開始使用</p>
  <Button variant="primary">新增項目</Button>
</div>
```

規則：
- 提供插圖或 icon 視覺化
- 說明為什麼是空的
- 提供下一步操作（CTA 按鈕）
- 搜尋無結果時建議修改搜尋條件

## 規則摘要

- 按鈕文字用動詞；Primary 每頁最多 1 個；破壞性操作需確認
- 表單即時驗證（onBlur）；錯誤訊息具體可行動
- Modal 必須 focus trap + ESC 關閉 + focus 回歸
- Toast 錯誤類不自動消失；成功類 3-5 秒消失
- 表格文字左對齊、數字右對齊；提供排序/篩選/空狀態
- 載入 < 300ms 不顯示指示；> 1s 用 Skeleton
- 所有互動元件提供完整鍵盤支援與 ARIA 標記
