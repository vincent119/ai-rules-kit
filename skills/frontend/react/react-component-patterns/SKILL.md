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

## 規則摘要

- 多個相關子元件共享狀態用 Compound Components
- 需要動態切換 HTML 元素用 Polymorphic Component
- 同時支援受控/非受控用 `value` + `defaultValue` 模式
- 元件有多個可自訂區域用 Slot Pattern
- 渲染邏輯需由呼叫端決定用 Render Props（現代 React 優先用 custom hooks）
- 避免超過 2 層的 HOC 嵌套；優先使用 hooks 替代
