---
name: react-component-patterns
description: React 元件設計模式。用於 Compound Components、Render Props、HOC、Polymorphic Components、Slot Pattern、受控/非受控元件設計。
---

# React 元件設計模式

## Compound Components

父元件透過 Context 共享狀態，子元件自由組合：

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

interface AccordionContextValue {
  activeIndex: number | null;
  toggle: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('useAccordion must be used within Accordion');
  return ctx;
}

interface AccordionProps {
  children: ReactNode;
  defaultIndex?: number;
}

export function Accordion({ children, defaultIndex = null }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);
  const toggle = (index: number) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  return (
    <AccordionContext.Provider value={{ activeIndex, toggle }}>
      <div role="tablist">{children}</div>
    </AccordionContext.Provider>
  );
}

interface ItemProps {
  index: number;
  title: string;
  children: ReactNode;
}

Accordion.Item = function AccordionItem({ index, title, children }: ItemProps) {
  const { activeIndex, toggle } = useAccordion();
  const isOpen = activeIndex === index;

  return (
    <div>
      <button role="tab" aria-expanded={isOpen} onClick={() => toggle(index)}>
        {title}
      </button>
      {isOpen && <div role="tabpanel">{children}</div>}
    </div>
  );
};
```

使用方式：

```tsx
<Accordion defaultIndex={0}>
  <Accordion.Item index={0} title="Section 1">Content 1</Accordion.Item>
  <Accordion.Item index={1} title="Section 2">Content 2</Accordion.Item>
</Accordion>
```

## Polymorphic Component（as prop）

讓元件可渲染為不同 HTML 元素：

```tsx
import { type ElementType, type ComponentPropsWithoutRef } from 'react';

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary';
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';
  return <Component className={`btn btn-${variant} ${className ?? ''}`} {...props} />;
}
```

使用方式：

```tsx
<Button>Click me</Button>
<Button as="a" href="/about">About</Button>
<Button as={Link} to="/home">Home</Button>
```

## 受控與非受控元件

同時支援受控與非受控模式：

```tsx
import { useState, useCallback } from 'react';

interface ToggleProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

export function Toggle({ value, defaultValue = false, onChange }: ToggleProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleToggle = useCallback(() => {
    const next = !currentValue;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [currentValue, isControlled, onChange]);

  return (
    <button
      role="switch"
      aria-checked={currentValue}
      onClick={handleToggle}
    >
      {currentValue ? 'ON' : 'OFF'}
    </button>
  );
}
```

## Slot Pattern（具名插槽）

透過 props 傳入不同區域的內容：

```tsx
import { type ReactNode } from 'react';

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function Card({ header, footer, children }: CardProps) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
```

## Render Props（函式作為子元件）

將渲染邏輯委託給呼叫端：

```tsx
import { useState, useEffect } from 'react';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface DataFetcherProps<T> {
  url: string;
  children: (result: FetchResult<T>) => ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [state, setState] = useState<FetchResult<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ data: null, loading: false, error });
        }
      });
    return () => controller.abort();
  }, [url]);

  return <>{children(state)}</>;
}
```

## One-Time Code Input

OTP、邀請碼與恢復碼使用可重用的 `OneTimeCodeInput`。元件只收集與呈現 code；驗證、重送、過期與 rate limit 屬於外層流程，不得寫進元件。

### 公開 API

沿用受控／非受控模式。`onComplete` 只表示字元數已滿，不代表可以直接呼叫驗證 API；外層應以 `useOneTimeCode` 或相等邏輯防止重複提交。

```tsx
type OneTimeCodeInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  pattern?: 'numeric' | 'alphanumeric';
  status?: 'idle' | 'error' | 'success';
  disabled?: boolean;
  autoFocus?: boolean;
  errorId?: string;
};
```

- `length` 由產品或 server 契約決定，不預設假設所有 OTP 都是六碼。
- `value` 與 `defaultValue` 必須先依 `pattern` 正規化，再截斷至 `length`。
- `onChange` 回傳完整 code；當 code 首次或再次變完整時可觸發 `onComplete`。
- `status` 只控制呈現；錯誤文字與驗證狀態由外層管理。

### 輸入模型與互動

優先採「一個原生 input 加多格 slot 視覺」以取得最簡單的貼上、SMS autofill 與讀屏體驗。多個 input 也可接受，但必須完整實作以下行為：

- 純數字 OTP 使用 `type="text"`、`inputMode="numeric"`；不使用 `type="number"`，避免 spinner、前導零與格式化問題。
- SMS OTP 的第一個輸入欄位使用 `autoComplete="one-time-code"`；其他多格欄位使用 `autoComplete="off"`。
- 貼上與 autofill 的完整字串要過濾不合法字元、依序填入剩餘 slot，並更新完整 value。
- 輸入一個合法字元後前進；`ArrowLeft`、`ArrowRight` 可移動；空 slot 按 `Backspace` 要回前一格並清除；點擊已填 slot 可編輯。
- `disabled` 或驗證送出期間禁止輸入與重複互動。
- 動畫只能輔助焦點、成功或錯誤；必須尊重 `prefers-reduced-motion`，錯誤不能只靠 shake 或紅色外框傳達。

### 無障礙與錯誤

將整組輸入包在有名稱的 group，並使用同一個錯誤訊息連結。多格實作時每格需要位置 label；單 input 實作只需描述完整 code。

```tsx
<div role="group" aria-labelledby="code-label" aria-describedby="code-hint code-error">
  <span id="code-label">輸入驗證碼</span>
  <p id="code-hint">請輸入簡訊中的 6 位數驗證碼。</p>
  <OneTimeCodeInput
    length={6}
    value={code}
    onChange={setCode}
    onComplete={(completeCode) => {
      // 將 completeCode 交由外層驗證狀態處理；元件本身不發送 request。
    }}
    pattern="numeric"
    status={error ? 'error' : 'idle'}
    errorId="code-error"
    disabled={isSubmitting}
  />
  {error && <p id="code-error" role="alert">{error}</p>}
</div>
```

- 每個真實 input 在錯誤時設 `aria-invalid="true"`，並以 `aria-describedby={errorId}` 關聯錯誤文字。
- 錯誤訊息要指出可採取的下一步，例如「驗證碼不正確，請重新輸入」或「驗證碼已失效，請重新取得」。
- 預設不遮蔽 SMS OTP；只有明確產品威脅模型需要時才提供 masking。
- 不要在元件內假設或實作重送倒數；由外層按鈕與服務流程處理。

## 規則摘要

- 多個相關子元件共享狀態用 Compound Components
- 需要動態切換 HTML 元素用 Polymorphic Component
- 同時支援受控/非受控用 `value` + `defaultValue` 模式
- 元件有多個可自訂區域用 Slot Pattern
- 渲染邏輯需由呼叫端決定用 Render Props（現代 React 優先用 custom hooks）
- 避免超過 2 層的 HOC 嵌套；優先使用 hooks 替代
- OTP input 採受控／非受控 API；完整輸入與 server 驗證結果分離
- 多格 OTP 必須支援 paste、SMS autofill、鍵盤導覽、可見 focus 與 group ARIA
