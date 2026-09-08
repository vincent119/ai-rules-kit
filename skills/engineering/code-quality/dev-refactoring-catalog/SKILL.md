---
name: dev-refactoring-catalog
description: "程式碼重構目錄。提供基於 Martin Fowler 的重構模式、程式碼異味偵測到重構的對應、SOLID 原則違反識別，以及複雜度量測標準。適用於「重構」、「程式碼異味」、「SOLID 違反」、「複雜度」、「設計模式」、「程式碼品質」等程式碼結構改善審查任務。強化 architecture-reviewer 與 performance-analyst 的分析能力。注意：直接修改程式碼與安全性分析不在此技能範圍內。"
keywords:
  - refactoring
  - code smell
  - solid
  - design pattern
  - complexity
  - cyclomatic complexity
  - cognitive complexity
  - martin fowler
  - extract method
  - long method
  - large class
  - feature envy
  - dependency injection
  - strategy pattern
  - technical debt
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/21-code-reviewer
license: Apache-2.0
---

# Refactoring Catalog — 程式碼重構目錄

architecture-reviewer 與 performance-analyst 在程式碼結構分析時使用的程式碼異味到重構對應、SOLID 違反識別與複雜度指標參考。

## 此技能的功能

- 提供程式碼異味（Code Smells）識別與對應重構技術
- 提供 SOLID 原則違反的識別標準與修正方向
- 提供 Cyclomatic / Cognitive 複雜度量測標準
- 提供設計模式應用指南

## 適用時機

- 執行架構或效能程式碼審查
- 識別需要重構的程式碼結構
- 搭配 `dev-code-reviewer` 技能使用

## 觸發範例

- 「這個類別有哪些程式碼異味？」
- 「這段程式碼違反了哪些 SOLID 原則？」
- 「計算這個函式的 Cyclomatic Complexity」
- 「建議適合的設計模式」

---

## 程式碼異味到重構對應

### 大小相關異味

| 程式碼異味 | 症狀 | 重構技術 |
|-----------|------|---------|
| **Long Method** | 20+ 行 | Extract Method、Replace Temp with Query |
| **Large Class** | 300+ 行或 10+ 欄位 | Extract Class、Extract Subclass |
| **Long Parameter List** | 4+ 個參數 | Introduce Parameter Object、Builder Pattern |
| **Data Clumps** | 相同欄位群組重複出現 | Extract Class |
| **Primitive Obsession** | 用基本型別表達領域概念 | Value Object、Enum |

### 結構相關異味

| 程式碼異味 | 症狀 | 重構技術 |
|-----------|------|---------|
| **Feature Envy** | 過度使用另一個類別的資料 | Move Method |
| **Data Class** | 只有 getter/setter 的類別 | 將行為移入類別 |
| **Shotgun Surgery** | 一個變更影響多個類別 | Move Method/Field、Inline Class |
| **Divergent Change** | 一個類別因多種原因變更 | Extract Class（SRP） |
| **Duplicated Code** | 相同或相似程式碼重複 | Extract Method、Template Method |
| **Middle Man** | 只做委派的類別 | Remove Middle Man、Inline Class |
| **Inappropriate Intimacy** | 類別間過度耦合 | Move Method/Field、Extract Class |
| **Switch/If Chain** | 長條件分支 | Replace Conditional with Polymorphism、Strategy |
| **Refused Bequest** | 繼承但未使用的方法 | Replace Inheritance with Delegation |
| **Comments** | 複雜邏輯需要注釋解釋 | Extract Method（自我說明程式碼） |

---

## SOLID 原則違反識別

### S — 單一職責原則（SRP）

| 違反訊號 | 識別標準 | 重構方向 |
|---------|---------|---------|
| 類別名稱含 "And"、"Manager" | 暗示多重職責 | Extract Class |
| 2+ 個變更原因 | 「X 變更時這個類別要改，Y 變更時也要改」 | 依職責分離類別 |
| 高度多樣的 import | 同時 import DB、HTTP、UI、Logging | 層次分離 |

### O — 開放封閉原則（OCP）

| 違反訊號 | 識別標準 | 重構方向 |
|---------|---------|---------|
| 新增類型時修改 switch/if | 需要修改現有程式碼 | Strategy Pattern、Polymorphism |
| 硬編碼分支 | 每個新條件都加程式碼 | Plugin/Registry Pattern |

### L — Liskov 替換原則（LSP）

| 違反訊號 | 識別標準 | 重構方向 |
|---------|---------|---------|
| 子類別 override 拋出例外 | `NotImplementedError`、`UnsupportedOperationException` | Interface Segregation、繼承改組合 |
| 型別檢查後轉型 | `instanceof` / `typeof` 分支 | 用多型重新設計 |

### I — 介面隔離原則（ISP）

| 違反訊號 | 識別標準 | 重構方向 |
|---------|---------|---------|
| 空的介面實作 | `pass`、`{}`、`noop` | 介面隔離 |
| 「胖」介面 | 10+ 個方法 | 拆分為 Role Interfaces |

### D — 依賴反轉原則（DIP）

| 違反訊號 | 識別標準 | 重構方向 |
|---------|---------|---------|
| 直接實例化具體類別 | 硬編碼 `new ConcreteService()` | Dependency Injection |
| 上層模組 import 下層模組 | 業務邏輯直接使用 DB 函式庫 | Interface/Port 抽象 |

---

## 複雜度量測標準

### Cyclomatic Complexity

分支點（if/else/switch/for/while/catch）+ 1

| 分數 | 複雜度 | 行動 |
|------|--------|------|
| 1-5 | 低 | 適當 |
| 6-10 | 中 | 謹慎審查 |
| 11-20 | 高 | 建議重構 |
| 21+ | 極高 | 必須重構 |

### Cognitive Complexity

人類理解程式碼的難度，巢狀越深權重越高。

| 元素 | 基礎增量 | 巢狀加成 |
|------|---------|---------|
| if/else/switch | +1 | +巢狀層級 |
| for/while/do | +1 | +巢狀層級 |
| catch | +1 | +巢狀層級 |
| break/continue to label | +1 | — |
| 邏輯運算子鏈（&&、\|\|） | +1 | — |
| 遞迴呼叫 | +1 | — |

### 建議閾值

| 指標 | 方法/函式 | 類別/檔案 |
|------|---------|---------|
| 程式碼行數 | 20 行以下 | 300 行以下 |
| Cyclomatic Complexity | 10 以下 | — |
| Cognitive Complexity | 15 以下 | — |
| 參數數量 | 4 個以下 | — |
| 巢狀深度 | 3 層以下 | — |
| 依賴數量 | — | 10 個以下 |

---

## 設計模式應用指南

| 問題情境 | 適用模式 | 效果 |
|---------|---------|------|
| 條件式行為分支 | **Strategy** | OCP 合規，易於新增行為 |
| 複雜物件建立邏輯 | **Factory Method / Builder** | 封裝建立邏輯 |
| 相同演算法骨架，不同細節 | **Template Method** | 消除重複，隔離變更點 |
| 依狀態改變行為 | **State** | 消除條件式，明確狀態轉換 |
| 事件傳播到多個物件 | **Observer** | 鬆耦合 |
| 整合不相容介面 | **Adapter** | 不修改現有程式碼即可整合 |
| 簡化複雜子系統 | **Facade** | 介面簡化 |
| 動態為物件新增功能 | **Decorator** | 不用繼承即可擴充功能 |

---

## 重構優先級決策

### 影響-難度矩陣

| | 低難度 | 高難度 |
|--|--------|--------|
| **高影響** | 立即執行 | 規劃後執行 |
| **低影響** | 有空時執行 | 延後（成本效益低） |

### 重構建議格式

```markdown
**[嚴重度] 程式碼異味：[異味名稱]**

- 位置：`file.py:42`
- 現狀：問題描述
- 重構技術：[技術名稱]
- 預期效果：如何改善
- 估計難度：低 / 中 / 高
```
