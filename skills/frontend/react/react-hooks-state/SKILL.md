---
name: react-hooks-state
description: React Hooks 與狀態管理模式。用於自訂 Hooks 設計、useReducer 複雜狀態、Context 架構、Server State 整合、表單狀態處理。
---

# React Hooks 與狀態管理

## 自訂 Hook 設計

封裝可重用邏輯，回傳值與操作函式：

```tsx
import { useState, useEffect, useCallback } from 'react';

interface UseAsyncResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: () => Promise<void>;
}

export function useAsync<T>(asyncFn: () => Promise<T>): UseAsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  return { data, error, loading, execute };
}
```

## useReducer 管理複雜狀態

多個相關狀態變更用 reducer 集中管理：

```tsx
import { useReducer } from 'react';

interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_END' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_END':
      return { ...state, isSubmitting: false };
  }
}

export function useForm(initialValues: Record<string, string>) {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    isSubmitting: false,
  });

  const setField = (field: string, value: string) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const setError = (field: string, error: string) =>
    dispatch({ type: 'SET_ERROR', field, error });

  return { ...state, setField, setError, dispatch };
}
```

## Context + Provider 架構

避免 prop drilling，提供型別安全的 Context：

```tsx
import { createContext, useContext, useReducer, type ReactNode } from 'react';

// 1. 定義型別
interface AuthState {
  user: User | null;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN'; user: User; token: string }
  | { type: 'LOGOUT' };

interface AuthContextValue {
  state: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// 2. 建立 Context（不給預設值，用 null 搭配 guard）
const AuthContext = createContext<AuthContextValue | null>(null);

// 3. 自訂 hook（含 null check）
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// 4. Provider
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, token: action.token };
    case 'LOGOUT':
      return { user: null, token: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, token: null });

  const login = (user: User, token: string) =>
    dispatch({ type: 'LOGIN', user, token });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## useEffect 正確使用

```tsx
import { useEffect, useRef } from 'react';

// 資料載入：搭配 cleanup 避免 race condition
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      if (!cancelled) setUser(data);
    }

    fetchUser();
    return () => { cancelled = true; };
  }, [userId]);

  return user;
}

// 事件監聽：使用 ref 避免重新綁定
export function useEventListener(
  event: string,
  handler: (e: Event) => void,
  element: HTMLElement | Window = window,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: Event) => handlerRef.current(e);
    element.addEventListener(event, listener);
    return () => element.removeEventListener(event, listener);
  }, [event, element]);
}
```

## Server State（TanStack Query 模式）

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 查詢
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });
}

// 變更 + 自動更新快取
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: CreateUserInput) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

## 規則摘要

- 自訂 Hook 回傳 `{ data, loading, error, action }` 結構
- 3 個以上相關 useState 改用 useReducer
- Context 搭配 null guard hook；不給 Context 預設值
- useEffect 必須處理 cleanup 與 race condition
- Server state 用 TanStack Query / SWR；不用 useEffect + useState 手動管理
- 避免在 useEffect 中設定可從 props/state 推導的值
