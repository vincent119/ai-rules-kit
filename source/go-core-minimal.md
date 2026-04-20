---
applyTo: "**/*.go,**/go.mod,**/go.sum"
---

# Go 核心規範（Minimal）

> Go 1.25+ | Uber Go Style Guide | Effective Go

## 檔案與 Package

- 每檔一行 `package <name>`（置頂），全小寫、單字、無底線
- 可執行程式：`cmd/<app>/main.go`；library 不含 `main()`
- Imports 排序：標準庫 → 第三方 → 專案內部（空行分隔）
- 必須通過 `gofmt -s`、`goimports`、`go vet`

## 錯誤處理

- 呼叫後立即檢查 `err`，採 early return
- 包裝：`fmt.Errorf("context: %w", err)`；跨層用 `errors.Is/As`
- 聚合：`errors.Join`（驗證列表、defer Close）
- 訊息小寫開頭、不加標點
- 僅不可恢復初始化用 `panic`；library 禁用
- 記錄與回傳擇一，禁止吞沒錯誤

## 函式設計

- 簡短單一職責（≤ 50 行）；參數 ≤ 4 個
- 第一參數 `context.Context`；最後回傳值 `error`
- 多參數用 Functional Options：`opts ...Option`
- 避免 `bool` 參數；避免 naked return

## 並行與 I/O

- 每個 goroutine 需退出機制（context / WaitGroup / channel）
- 嚴禁 goroutine 泄漏；`defer Close()` 落在呼叫點
- 邊界（入/出）一律複製 slice/map，避免別名共享
- `req.Body` 不可重用，需 clone

## 命名

- Package：全小寫單字；變數/函式：小駝峰
- 介面以 `-er` 結尾；小介面優先
- 縮略詞大小寫一致：`HTTPServer`、`URLParser`
- 建構子：`NewType(...)`；常數駝峰式，禁全大寫底線

## JSON / Struct

- 對外型別加 `json,yaml,mapstructure` tags
- 選填欄位 `omitempty`；解碼拒絕未知欄位
- 時間 RFC3339 UTC；使用 `any` 取代 `interface{}`

## 測試

- Table-driven + `t.Run`；輔助用 `t.Helper()` / `t.Cleanup()`
- 使用 `t.Context()`（Go 1.24+）
- 匯出 API 提供 `example_test.go`

## Context

- 對外 API 第一參數 `ctx context.Context`
- 禁用 `context.Background()` 直傳深層
- 逾時設於呼叫邊界；不將 ctx 存於 struct

## 安全

- 僅用標準 `crypto/*`；外部輸入需驗證與長度限制
- 納入 `gosec` 於 CI；敏感資訊不進日誌

## 依賴

- `go.mod` 嚴格釘版；移除依賴跑 `go mod tidy`
- 新增外部套件附 `go get <module>@<version>` 與風險評估

## 產出要求

- 輸出完整可編譯檔案或明確 diff
- 多檔變更列出：檔名 / 變更摘要 / 風險

## 偏好套件

| 類別 | 套件 |
|------|------|
| Web | `net/http`, `gin-gonic/gin` |
| DB | `database/sql`, `jmoiron/sqlx`, `gorm.io/gorm` |
| CLI | `spf13/cobra` |
| Config | `spf13/viper` |
| Logger | `vincent119/zlogger` |
| DI | `uber-go/fx` |
| Graceful | `vincent119/commons/graceful` |
| Metrics | `prometheus/client_golang` |
| Redis | `redis/go-redis/v9` |
| Validator | `go-playground/validator` |
| Mock | `uber-go/mock` |
| Swagger | `swaggo/swag` |

## Do / Don't

Do：imports 分群、`%w` 包裝、邊界複製、table-driven 測試
Don't：struct 存 ctx、library 用 panic、暴露可變 slice/map、迴圈內 defer
