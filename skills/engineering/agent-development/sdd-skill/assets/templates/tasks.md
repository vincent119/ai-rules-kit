# 任務文件：{Feature Name}

Status: Planned

## Execution Context

- 意圖: {本 spec 要達成什麼}
- 非目標: {本次不做什麼}
- 已定決策: {已決定且不反覆討論的事項}
- 邊界: {允許與不允許修改的範圍摘要}
- 關鍵檔案: {關鍵檔案或目錄}
- 完成條件: {主要驗收檢查，需對應 Verify 或驗收情境}

### Protected Behavior

- {不可破壞的既有行為}
- {需要回歸驗證的流程}

### 邊界

#### Allowed Changes

- `{允許修改的檔案、目錄或模組}`

#### Forbidden

- {禁止修改的檔案、目錄、模組或不可破壞的行為}

## 任務依賴

| 任務 | Depends | 狀態 | 備註 |
|------|---------|------|------|
| {任務名稱} | 無 | Planned | {備註} |

## 實作任務

- [ ] {任務名稱}
  - Status: Planned
  - Boundary: 參考 Execution Context 的 Allowed Changes / Forbidden
  - Depends: {相依任務，無則填無}
  - Context: {任務必要背景，讓 agent 不必重讀整份 design}
  - Verify:
    - `{新行為驗證指令或檢查方式}`
    - `{必要回歸驗證指令或檢查方式}`

- [ ] {任務名稱}
  - Status: Planned
  - Boundary: 參考 Execution Context 的 Allowed Changes / Forbidden
  - Depends: {相依任務，無則填無}
  - Context: {任務必要背景}
  - Verify:
    - `{驗證指令或檢查方式}`

## 驗證任務

- [ ] 驗收情境覆蓋
  - Verify: {確認 requirements.md 的主要驗收情境都有測試、dry-run 或人工檢查}

- [ ] 回歸驗證
  - Verify: {確認 Protected Behavior 沒有被破壞}

- [ ] 品質檢查清單
  - 格式檢查通過
  - 測試或 dry-run 通過
  - 文件一致性已確認
  - 主要驗收情境已覆蓋
  - Protected Behavior 回歸驗證通過
  - 風險項目已處理
  - `git diff --stat` 已檢查
  - `git diff --check` 已通過

## 實作中斷恢復

恢復時優先讀取：

1. 本文件的 `Execution Context`
2. 目前未完成 task
3. `Protected Behavior`
4. `Implementation Notes`

不得預設掃描整個 `.specs` 目錄。若文件很大，先用標題與關鍵字定位：

```bash
rg -n "^#|^##|^###|Boundary:|Depends:|Implementation Notes|Status:" .specs/{current}
```

## Implementation Notes

- {實作過程中影響後續任務的發現}

## 驗證結果摘要

- 新行為驗證: {通過 / 失敗 / 未執行，附命令}
- 回歸驗證: {通過 / 失敗 / 未執行，附命令}
- 文件一致性: {已確認 / 待更新}
- 剩餘風險: {無或列出}

## 後續改善

- [ ] {非本次必要但值得追蹤的項目}
