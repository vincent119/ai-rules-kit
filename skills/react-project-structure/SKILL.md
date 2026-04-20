---
name: react-project-structure
description: React 專案目錄結構。用於 Feature-based 組織、元件分層、共用模組擺放、測試與設定檔配置。
---

# React 專案目錄結構

## Feature-based 結構（推薦）

依功能模組組織，每個 feature 自包含：

```
src/
├── app/                     # 應用層：路由、Provider、全域設定
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
├── features/                # 功能模組（核心業務）
│   ├── auth/
│   │   ├── components/      # 該 feature 專用元件
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginForm.test.tsx
│   │   ├── hooks/           # 該 feature 專用 hooks
│   │   │   └── useAuth.ts
│   │   ├── api/             # API 呼叫
│   │   │   └── authApi.ts
│   │   ├── types/           # 該 feature 型別
│   │   │   └── index.ts
│   │   ├── utils/           # 該 feature 工具函式
│   │   └── index.ts         # 公開 API（barrel export）
│   ├── users/
│   │   ├── components/
│   │   │   ├── UserList.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── UserList.test.tsx
│   │   ├── hooks/
│   │   │   └── useUsers.ts
│   │   ├── api/
│   │   │   └── usersApi.ts
│   │   └── index.ts
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── components/              # 全域共用 UI 元件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Modal/
│   ├── Form/
│   └── Layout/
├── hooks/                   # 全域共用 hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
├── lib/                     # 第三方整合與封裝
│   ├── axios.ts             # HTTP client 設定
│   ├── queryClient.ts       # TanStack Query 設定
│   └── analytics.ts
├── types/                   # 全域型別定義
│   └── index.ts
├── utils/                   # 全域工具函式
│   ├── format.ts
│   └── validation.ts
├── styles/                  # 全域樣式
│   └── globals.css
├── constants/               # 全域常數
│   └── index.ts
└── main.tsx                 # 進入點
```

## 元件目錄結構

每個元件一個資料夾，包含相關檔案：

```
components/
└── Button/
    ├── Button.tsx           # 元件本體
    ├── Button.test.tsx      # 測試
    ├── Button.stories.tsx   # Storybook（選用）
    ├── Button.module.css    # 樣式（選用）
    └── index.ts             # barrel export
```

`index.ts` 範例：

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## Monorepo 結構（大型專案）

```
packages/
├── web/                     # 主要 Web 應用
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── ui/                      # 共用 UI 元件庫
│   ├── src/
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── index.ts
│   └── package.json
├── shared/                  # 共用邏輯（hooks、utils、types）
│   ├── src/
│   └── package.json
├── api-client/              # API client（自動產生或手動）
│   ├── src/
│   └── package.json
├── package.json             # workspace root
└── turbo.json               # Turborepo 設定
```

## 匯入路徑規則

使用 path alias 避免深層相對路徑：

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

匯入順序：

```tsx
// 1. 外部套件
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. 全域共用模組
import { Button } from '@/components/Button';
import { useDebounce } from '@/hooks/useDebounce';

// 3. 同 feature 內模組
import { useUsers } from '../hooks/useUsers';
import { UserCard } from './UserCard';
```

## Feature 模組邊界

```tsx
// features/users/index.ts - 只公開必要 API
export { UserList } from './components/UserList';
export { UserCard } from './components/UserCard';
export { useUsers } from './hooks/useUsers';
export type { User } from './types';

// 禁止：跨 feature 直接引用內部檔案
// import { something } from '@/features/auth/components/internal';

// 正確：透過 feature 的 index.ts 引用
// import { LoginForm } from '@/features/auth';
```

## 規則摘要

- 採用 feature-based 結構；每個 feature 自包含 components/hooks/api/types
- 全域共用元件放 `components/`；feature 專用元件放 `features/<name>/components/`
- 每個元件一個資料夾，含 `.tsx`、`.test.tsx`、`index.ts`
- Feature 透過 `index.ts` barrel export 控制公開 API
- 禁止跨 feature 引用內部檔案；只能引用 `index.ts` 公開的內容
- 使用 path alias（`@/`）避免 `../../../` 相對路徑
- 第三方整合封裝放 `lib/`；全域工具放 `utils/`
- 大型專案用 monorepo（Turborepo/Nx）拆分 packages
