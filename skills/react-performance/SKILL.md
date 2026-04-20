---
name: react-performance
description: React 效能最佳化模式。用於 memo/useMemo/useCallback 正確使用、虛擬化列表、Code Splitting、Bundle 優化、Re-render 診斷。
---

# React 效能最佳化

## React.memo 正確使用

僅在子元件 props 穩定但父元件頻繁 re-render 時使用：

```tsx
import { memo } from 'react';

interface ExpensiveListProps {
  items: Item[];
  onSelect: (id: string) => void;
}

// 適合 memo：接收大量資料，父元件因其他狀態頻繁更新
export const ExpensiveList = memo(function ExpensiveList({
  items,
  onSelect,
}: ExpensiveListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// 搭配自訂比較函式（僅在必要時）
export const UserAvatar = memo(
  function UserAvatar({ user }: { user: User }) {
    return <img src={user.avatarUrl} alt={user.name} />;
  },
  (prev, next) => prev.user.id === next.user.id,
);
```

## useMemo 與 useCallback

```tsx
import { useMemo, useCallback, useState } from 'react';

interface DashboardProps {
  transactions: Transaction[];
  filter: string;
}

export function Dashboard({ transactions, filter }: DashboardProps) {
  // useMemo：昂貴的過濾與計算
  const filtered = useMemo(
    () => transactions.filter((t) => t.category === filter),
    [transactions, filter],
  );

  const total = useMemo(
    () => filtered.reduce((sum, t) => sum + t.amount, 0),
    [filtered],
  );

  // useCallback：傳給 memo 子元件的 callback
  const handleSelect = useCallback((id: string) => {
    console.log('selected:', id);
  }, []);

  return (
    <div>
      <p>Total: {total}</p>
      <ExpensiveList items={filtered} onSelect={handleSelect} />
    </div>
  );
}
```

何時不需要：

```tsx
// 不需要 useMemo：簡單計算
const fullName = `${firstName} ${lastName}`; // 直接計算即可

// 不需要 useCallback：沒有傳給 memo 子元件
const handleClick = () => setCount((c) => c + 1); // 直接定義即可
```

## 避免不必要的 Re-render

```tsx
// 問題：每次 render 建立新物件/陣列
function Parent() {
  return <Child style={{ color: 'red' }} items={[1, 2, 3]} />;
}

// 解法 1：提取為模組層級常數
const STYLE = { color: 'red' } as const;
const ITEMS = [1, 2, 3] as const;

function Parent() {
  return <Child style={STYLE} items={ITEMS} />;
}

// 解法 2：狀態拆分，避免無關更新
// 錯誤：整個物件作為一個 state
const [state, setState] = useState({ name: '', count: 0 });

// 正確：拆分為獨立 state
const [name, setName] = useState('');
const [count, setCount] = useState(0);
```

## 虛擬化長列表

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface VirtualListProps {
  items: string[];
}

export function VirtualList({ items }: VirtualListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
              height: `${virtualItem.size}px`,
              width: '100%',
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Code Splitting

```tsx
import { lazy, Suspense } from 'react';

// 路由層級分割
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// 元件層級分割（大型元件按需載入）
const HeavyChart = lazy(() => import('./components/HeavyChart'));

export function Report({ showChart }: { showChart: boolean }) {
  return (
    <div>
      <h1>Report</h1>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

## Re-render 診斷

```tsx
import { useRef, useEffect } from 'react';

// 開發環境用：追蹤哪個 prop 變更導致 re-render
export function useWhyDidYouRender(name: string, props: Record<string, unknown>) {
  const prevProps = useRef(props);

  useEffect(() => {
    const changes: Record<string, { from: unknown; to: unknown }> = {};
    for (const key of Object.keys(props)) {
      if (prevProps.current[key] !== props[key]) {
        changes[key] = { from: prevProps.current[key], to: props[key] };
      }
    }
    if (Object.keys(changes).length > 0) {
      console.log(`[${name}] re-render caused by:`, changes);
    }
    prevProps.current = props;
  });
}
```

## 規則摘要

- 預設不優化；用 React DevTools Profiler 確認瓶頸後再加
- `React.memo`：子元件 props 穩定但父元件頻繁更新時使用
- `useMemo`：計算成本高（O(n) 以上的迴圈、排序、過濾）時使用
- `useCallback`：callback 傳給 `memo` 子元件時使用
- 避免在 JSX 中建立新物件/陣列 literal 作為 props
- 列表超過 100 項考慮虛擬化
- 路由層級必須 code splitting；大型元件按需載入
- 狀態拆分：不相關的狀態用獨立 useState
