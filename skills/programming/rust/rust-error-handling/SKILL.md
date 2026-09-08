---
name: rust-error-handling
description: Rust 錯誤處理模式。用於設計自訂錯誤型別、錯誤傳播、anyhow/thiserror 選擇、Result 組合子使用。
---

# Rust 錯誤處理

## Library 錯誤設計（M-ERRORS-CANONICAL-STRUCTS）

使用 canonical error struct，不用 enum：

```rust
use std::fmt;

#[derive(Debug)]
pub struct ParseConfigError {
    kind: ParseConfigErrorKind,
    source: Option<Box<dyn std::error::Error + Send + Sync>>,
}

#[derive(Debug)]
enum ParseConfigErrorKind {
    InvalidFormat,
    MissingField(&'static str),
    IoError,
}

impl fmt::Display for ParseConfigError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match &self.kind {
            ParseConfigErrorKind::InvalidFormat => write!(f, "invalid config format"),
            ParseConfigErrorKind::MissingField(field) => write!(f, "missing field: {field}"),
            ParseConfigErrorKind::IoError => write!(f, "io error reading config"),
        }
    }
}

impl std::error::Error for ParseConfigError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        self.source.as_deref()
    }
}
```

## Application 錯誤（M-APP-ERROR）

Application 層可用 `anyhow`：

```rust
use anyhow::{Context, Result};

fn load_config(path: &str) -> Result<Config> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("failed to read config from {path}"))?;
    let config: Config = toml::from_str(&content)
        .context("failed to parse config")?;
    Ok(config)
}
```

## thiserror（Library 快速定義）

```rust
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ServiceError {
    #[error("not found: {0}")]
    NotFound(String),
    #[error("unauthorized")]
    Unauthorized,
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}
```

## 規則

- Library crate：自訂 error struct/enum + `std::error::Error`
- Application crate：`anyhow::Result` 或 `eyre::Result`
- 禁止 `unwrap()`/`expect()` 在 production path
- 用 `?` 傳播；用 `.context()` 加上下文
- Panic 僅用於不可恢復的程式 bug
