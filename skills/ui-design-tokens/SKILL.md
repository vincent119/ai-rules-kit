---
name: ui-design-tokens
description: Design Token 管理。用於色彩、字型、間距的 token 命名結構、CSS 變數組織、Light/Dark 主題切換、token 分層架構。
---

# Design Token 管理

> 參照：Design Tokens W3C Community Group、Material Design 3 Token 架構

## Token 分層架構

```
┌─────────────────────────────────────────┐
│  Component Token（元件層）               │
│  --button-primary-bg                     │
│  --card-border-radius                    │
├─────────────────────────────────────────┤
│  Semantic Token（語意層）                │
│  --color-primary                         │
│  --spacing-md                            │
├─────────────────────────────────────────┤
│  Primitive Token（基礎層）               │
│  --blue-500                              │
│  --space-16                              │
└─────────────────────────────────────────┘
```

- **Primitive**：原始值，不帶語意（色票、數值）
- **Semantic**：帶語意的引用（primary、error、spacing-md）
- **Component**：元件專用 token（button-bg、input-border）

## 色彩 Token

### Primitive（基礎色票）

```css
:root {
  /* Gray */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;
  --gray-950: #0a0a0a;

  /* Blue */
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;

  /* Red */
  --red-50: #fef2f2;
  --red-500: #ef4444;
  --red-600: #dc2626;
  --red-700: #b91c1c;

  /* Green */
  --green-50: #f0fdf4;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
}
```

### Semantic（語意層）

```css
/* Light Theme */
:root, [data-theme="light"] {
  /* 文字 */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-400);
  --color-text-disabled: var(--gray-300);
  --color-text-inverse: #ffffff;

  /* 背景 */
  --color-bg-page: #ffffff;
  --color-bg-surface: var(--gray-50);
  --color-bg-elevated: #ffffff;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  /* 品牌 / 互動 */
  --color-primary: var(--blue-600);
  --color-primary-hover: var(--blue-700);
  --color-primary-pressed: var(--blue-800);
  --color-primary-subtle: var(--blue-50);

  /* 狀態 */
  --color-success: var(--green-600);
  --color-warning: var(--amber-500);
  --color-error: var(--red-600);
  --color-info: var(--blue-500);

  /* 邊框 */
  --color-border-default: var(--gray-200);
  --color-border-hover: var(--gray-300);
  --color-border-focus: var(--blue-500);
  --color-border-error: var(--red-500);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-text-primary: var(--gray-50);
  --color-text-secondary: var(--gray-400);
  --color-text-tertiary: var(--gray-500);
  --color-text-disabled: var(--gray-700);
  --color-text-inverse: var(--gray-900);

  --color-bg-page: var(--gray-950);
  --color-bg-surface: var(--gray-900);
  --color-bg-elevated: var(--gray-800);
  --color-bg-overlay: rgba(0, 0, 0, 0.7);

  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-400);
  --color-primary-pressed: var(--blue-300);
  --color-primary-subtle: rgba(59, 130, 246, 0.1);

  --color-border-default: var(--gray-800);
  --color-border-hover: var(--gray-700);
  --color-border-focus: var(--blue-500);
  --color-border-error: var(--red-500);
}
```

## 間距 Token

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* 語意別名 */
  --spacing-xs: var(--space-1);   /* 4px */
  --spacing-sm: var(--space-2);   /* 8px */
  --spacing-md: var(--space-4);   /* 16px */
  --spacing-lg: var(--space-6);   /* 24px */
  --spacing-xl: var(--space-8);   /* 32px */
  --spacing-2xl: var(--space-12); /* 48px */
}
```

## 字型 Token

```css
:root {
  /* Font Family */
  --font-sans: "Inter", "Noto Sans TC", "PingFang TC", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Font Size */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */

  /* Font Weight */
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Height */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

## 圓角與陰影 Token

```css
:root {
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Box Shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-toast: 500;
}
```

## 動畫 Token

```css
:root {
  /* Duration */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Easing */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Transition 組合 */
  --transition-colors: color, background-color, border-color var(--duration-normal) var(--ease-in-out);
  --transition-transform: transform var(--duration-normal) var(--ease-out);
  --transition-opacity: opacity var(--duration-normal) var(--ease-in-out);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}
```

## Component Token 範例

```css
:root {
  /* Button */
  --button-height-sm: 32px;
  --button-height-md: 40px;
  --button-height-lg: 48px;
  --button-padding-x: var(--spacing-md);
  --button-radius: var(--radius-md);
  --button-font-size: var(--text-sm);
  --button-font-weight: var(--font-medium);

  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: var(--color-text-inverse);

  /* Input */
  --input-height: 40px;
  --input-padding-x: var(--spacing-sm);
  --input-radius: var(--radius-md);
  --input-border: var(--color-border-default);
  --input-border-focus: var(--color-border-focus);
  --input-border-error: var(--color-border-error);
  --input-bg: var(--color-bg-page);
  --input-text: var(--color-text-primary);
  --input-placeholder: var(--color-text-tertiary);

  /* Card */
  --card-padding: var(--spacing-lg);
  --card-radius: var(--radius-lg);
  --card-bg: var(--color-bg-elevated);
  --card-border: var(--color-border-default);
  --card-shadow: var(--shadow-sm);
}
```

## 主題切換實作

```tsx
// 偵測系統偏好 + 手動切換
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggle };
}
```

## 命名規則

```
--{category}-{property}-{variant}-{state}

範例：
--color-text-primary
--color-bg-surface
--color-primary-hover
--button-primary-bg-hover
--spacing-md
--radius-lg
--shadow-sm
```

## 規則摘要

- 三層架構：Primitive → Semantic → Component
- 元件只引用 Semantic 或 Component token；禁止直接用 Primitive
- 色彩 token 必須提供 Light + Dark 兩組值
- 間距使用 4px 倍數；透過 token 統一管理
- 命名格式：`--{category}-{property}-{variant}-{state}`
- 動畫 token 尊重 `prefers-reduced-motion`
- z-index 透過 token 管理，避免隨意數值
- 主題切換用 `data-theme` attribute + CSS 變數覆寫
