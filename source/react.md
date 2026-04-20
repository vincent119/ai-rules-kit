# React 開發規範

> **參照**：[React 官方文件](https://react.dev) | [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react) | [Bulletproof React](https://github.com/alan2207/bulletproof-react)
> **適用版本**：React 18+ / React 19

---

## 核心原則

- 元件是純函式：相同 props 產生相同輸出，無副作用
- 組合優於繼承：透過 children 與 composition 組合行為
- 單向資料流：props 向下傳遞，events 向上通知
- 最小狀態原則：只存放無法從其他狀態推導的資料

## 元件設計

- 使用 Function Component；禁止新增 Class Component
- 元件名稱採 **PascalCase**；檔名與元件名一致
- 單一職責：一個元件只做一件事
- 元件行數超過 150 行時考慮拆分
- Props 必須定義 TypeScript interface/type：
  ```tsx
  interface UserCardProps {
    name: string;
    email: string;
    avatar?: string;
    onEdit?: () => void;
  }

  export function UserCard({ name, email, avatar, onEdit }: UserCardProps) {
    return (
      <div className="user-card">
        {avatar && <img src={avatar} alt={name} />}
        <h3>{name}</h3>
        <p>{email}</p>
        {onEdit && <button onClick={onEdit}>編輯</button>}
      </div>
    );
  }
  ```
- 使用解構取得 props；避免 `props.xxx` 存取
- Children pattern 用於 layout 與容器元件：
  ```tsx
  interface LayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
  }

  export function Layout({ children, sidebar }: LayoutProps) {
    return (
      <div className="layout">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{children}</main>
      </div>
    );
  }
  ```

## Hooks 規範

- 遵守 Rules of Hooks：只在頂層呼叫，不放在條件/迴圈中
- 自訂 Hook 以 `use` 開頭，封裝可重用邏輯
- `useEffect` 依賴陣列必須完整；禁止使用 `// eslint-disable-next-line`
- 避免不必要的 `useEffect`：
  ```tsx
  // 錯誤：可從 props 推導的值不需要 useEffect + useState
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // 正確：直接計算
  const fullName = `${firstName} ${lastName}`;
  ```
- `useState` 初始值為複雜計算時使用 lazy initializer：
  ```tsx
  const [data, setData] = useState(() => expensiveComputation());
  ```
- Cleanup function 必須處理訂閱與計時器：
  ```tsx
  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  ```

## 狀態管理

- 優先使用 local state（useState）
- 跨元件共享用 Context + useReducer 或狀態管理庫
- 避免 prop drilling 超過 3 層
- Server state 使用 TanStack Query / SWR 等專用工具
- 表單狀態使用 React Hook Form 或受控元件
- 狀態提升原則：將狀態放在最近的共同父元件

## 條件渲染與列表

- 簡單條件用 `&&` 或三元運算子；複雜邏輯抽成子元件
- `&&` 左側避免數字 0（會渲染 `0`）：
  ```tsx
  // 錯誤：count 為 0 時會渲染 "0"
  {count && <Badge count={count} />}

  // 正確
  {count > 0 && <Badge count={count} />}
  ```
- 列表渲染必須提供穩定且唯一的 `key`；禁止使用 index 作為 key（除非列表靜態不變）
- 避免在 JSX 中使用複雜表達式；抽成變數或函式

## 事件處理

- Handler 命名採 `handle` + 動作：`handleSubmit`、`handleClick`
- Props callback 命名採 `on` + 動作：`onSubmit`、`onClick`
- 避免在 JSX 中定義 inline function（影響效能時）：
  ```tsx
  // 避免：每次 render 建立新函式
  <button onClick={() => handleDelete(id)}>刪除</button>

  // 較佳：使用 useCallback 或提取子元件
  const handleDeleteClick = useCallback(() => handleDelete(id), [id]);
  <button onClick={handleDeleteClick}>刪除</button>
  ```

## 效能最佳化

- 預設不優化；有效能問題時再加 `memo`/`useMemo`/`useCallback`
- `React.memo` 用於接收穩定 props 但父元件頻繁 re-render 的子元件
- `useMemo` 用於昂貴計算；`useCallback` 用於傳遞給 memo 子元件的 callback
- 避免在 render 中建立新物件/陣列作為 props：
  ```tsx
  // 錯誤：每次 render 建立新物件
  <Chart options={{ color: 'red', size: 10 }} />

  // 正確：提取為常數或 useMemo
  const chartOptions = useMemo(() => ({ color: 'red', size: 10 }), []);
  <Chart options={chartOptions} />
  ```
- 大型列表使用虛擬化（react-window / react-virtuoso）
- Code splitting 使用 `React.lazy` + `Suspense`

## 錯誤處理

- 使用 Error Boundary 捕捉渲染錯誤：
  ```tsx
  <ErrorBoundary fallback={<ErrorPage />}>
    <App />
  </ErrorBoundary>
  ```
- 非同步錯誤在 useEffect 或 event handler 中處理
- 顯示使用者友善的錯誤訊息；記錄詳細錯誤到 logging 服務

## 檔案結構

```
src/
├── components/          # 共用元件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── features/            # 功能模組
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── index.ts
│   └── ...
├── hooks/               # 全域共用 hooks
├── utils/               # 工具函式
├── types/               # 全域型別定義
└── App.tsx
```

## 無障礙（Accessibility）

- 互動元素使用語意化 HTML（`button`、`a`、`input`）
- 圖片提供 `alt` 屬性
- 表單元素關聯 `label`
- 自訂元件加入適當 ARIA 屬性
- 確保鍵盤可操作

## 測試

- 元件測試使用 React Testing Library
- 測試使用者行為，不測試實作細節
- 避免測試 state 內部值；測試渲染結果
- 自訂 Hook 使用 `renderHook` 測試
- 關鍵路徑加入整合測試

## Review Checklist

- [ ] 元件為純函式；無 render 階段副作用
- [ ] Props 具完整 TypeScript 型別定義
- [ ] Hooks 遵守呼叫規則；依賴陣列完整
- [ ] 無不必要的 `useEffect`（可推導的值直接計算）
- [ ] 列表渲染使用穩定唯一的 `key`
- [ ] 無 `any` 型別
- [ ] Error Boundary 覆蓋關鍵區域
- [ ] 互動元素具無障礙支援
- [ ] 效能優化有明確理由（非預防性優化）
