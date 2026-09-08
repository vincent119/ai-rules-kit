---
name: rust-project-structure
description: Rust 專案目錄結構。用於 workspace 組織、crate 拆分、模組層級、binary/library 分離、設定與測試擺放。
---

# Rust 專案目錄結構

## 單一 Binary 專案

```
my-app/
├── Cargo.toml
├── src/
│   ├── main.rs              # 進入點，僅負責啟動與組裝
│   ├── lib.rs               # 公開 API，re-export 模組
│   ├── config.rs            # 設定載入與驗證
│   ├── error.rs             # 統一錯誤型別
│   ├── routes/              # HTTP handler（依資源分檔）
│   │   ├── mod.rs
│   │   ├── users.rs
│   │   └── health.rs
│   ├── services/            # 業務邏輯
│   │   ├── mod.rs
│   │   └── user_service.rs
│   ├── repositories/        # 資料存取層
│   │   ├── mod.rs
│   │   └── user_repo.rs
│   ├── models/              # 領域模型與 DTO
│   │   ├── mod.rs
│   │   └── user.rs
│   └── middleware/          # 中介層（auth、logging、tracing）
│       ├── mod.rs
│       └── auth.rs
├── tests/                   # 整合測試
│   └── api_tests.rs
├── migrations/              # 資料庫 migration
├── config/                  # 環境設定檔
│   ├── default.toml
│   └── production.toml
└── benches/                 # Benchmark
    └── throughput.rs
```

## Workspace（多 crate）

大型專案拆分為多個 crate，各自單一職責：

```
my-platform/
├── Cargo.toml               # [workspace] 定義
├── crates/
│   ├── api/                 # HTTP API binary
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       └── routes/
│   ├── core/                # 領域邏輯 library（無 I/O 依賴）
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── models/
│   │       ├── services/
│   │       └── error.rs
│   ├── db/                  # 資料庫存取層
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       └── repositories/
│   ├── common/              # 共用工具（tracing、config、types）
│   │   ├── Cargo.toml
│   │   └── src/
│   │       └── lib.rs
│   └── cli/                 # CLI 工具 binary
│       ├── Cargo.toml
│       └── src/
│           └── main.rs
├── tests/                   # 跨 crate 整合測試
├── config/
└── migrations/
```

Workspace `Cargo.toml`：

```toml
[workspace]
resolver = "2"
members = ["crates/*"]

[workspace.dependencies]
tokio = { version = "1", features = ["full"] }
serde = { version = "1", features = ["derive"] }
anyhow = "1"
tracing = "0.1"
```

## Library Crate

```
my-lib/
├── Cargo.toml
├── src/
│   ├── lib.rs               # 公開 API，#[doc(inline)] re-export
│   ├── builder.rs
│   ├── error.rs
│   └── internal/            # pub(crate) 內部模組
│       ├── mod.rs
│       └── parser.rs
├── tests/                   # 整合測試（以使用者角度測試公開 API）
│   ├── basic_usage.rs
│   └── edge_cases.rs
├── examples/                # 使用範例（cargo run --example）
│   └── basic.rs
└── benches/
    └── parse_bench.rs
```

## 模組組織規則

```rust
// src/lib.rs - 頂層 re-export
pub mod models;
pub mod services;
pub mod error;

pub use error::AppError;
pub use models::User;

// src/models/mod.rs - 模組內 re-export
mod user;
mod order;

pub use user::{User, UserId};
pub use order::{Order, OrderStatus};
```

## 規則摘要

- `main.rs` 只做啟動與組裝；業務邏輯放 `lib.rs` 或子模組
- 依職責分目錄：`routes/`、`services/`、`repositories/`、`models/`
- 大型專案用 workspace 拆 crate；核心邏輯獨立為無 I/O 的 library crate
- 整合測試放 `tests/`；單元測試放同檔 `#[cfg(test)] mod tests`
- 共用依賴版本統一在 `[workspace.dependencies]`
- 內部模組用 `pub(crate)`；僅公開必要 API
- 設定檔放 `config/`；migration 放 `migrations/`
- 範例放 `examples/`；benchmark 放 `benches/`
