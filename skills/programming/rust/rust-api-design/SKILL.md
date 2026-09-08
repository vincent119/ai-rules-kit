---
name: rust-api-design
description: Rust API 設計模式。用於 Builder Pattern、Newtype、型別安全設計、trait 設計、泛型 API、Sealed traits。
---

# Rust API 設計

## Builder Pattern（C-BUILDER / M-INIT-BUILDER）

```rust
#[derive(Debug, Clone)]
pub struct ServerConfig {
    host: String,
    port: u16,
    max_connections: usize,
}

#[derive(Debug, Default)]
pub struct ServerConfigBuilder {
    host: Option<String>,
    port: Option<u16>,
    max_connections: Option<usize>,
}

impl ServerConfigBuilder {
    pub fn host(mut self, host: impl Into<String>) -> Self {
        self.host = Some(host.into());
        self
    }

    pub fn port(mut self, port: u16) -> Self {
        self.port = Some(port);
        self
    }

    pub fn max_connections(mut self, max: usize) -> Self {
        self.max_connections = Some(max);
        self
    }

    pub fn build(self) -> Result<ServerConfig, ConfigError> {
        Ok(ServerConfig {
            host: self.host.unwrap_or_else(|| "localhost".into()),
            port: self.port.unwrap_or(8080),
            max_connections: self.max_connections.unwrap_or(100),
        })
    }
}

impl ServerConfig {
    pub fn builder() -> ServerConfigBuilder {
        ServerConfigBuilder::default()
    }
}
```

## Newtype Pattern（C-NEWTYPE）

```rust
/// 用 Newtype 區分語意相同但用途不同的型別
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct UserId(String);

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct OrderId(String);

impl UserId {
    pub fn new(id: impl Into<String>) -> Self {
        Self(id.into())
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}
```

## 避免 bool 參數（C-CUSTOM-TYPE）

```rust
// 錯誤：bool 參數語意不明
fn connect(host: &str, use_tls: bool) {}

// 正確：使用具名型別
pub enum Transport {
    Plain,
    Tls,
}

fn connect(host: &str, transport: Transport) {}
```

## 接受泛型輸入（M-IMPL-ASREF）

```rust
// 接受 &str、String、PathBuf 等
pub fn read_file(path: impl AsRef<std::path::Path>) -> std::io::Result<String> {
    std::fs::read_to_string(path)
}
```

## Sealed Trait（C-SEALED）

```rust
mod private {
    pub trait Sealed {}
}

/// 外部 crate 無法實作此 trait
pub trait MyTrait: private::Sealed {
    fn do_something(&self);
}

impl private::Sealed for MyType {}
impl MyTrait for MyType {
    fn do_something(&self) { /* ... */ }
}
```

## Services are Clone（M-SERVICES-CLONE）

```rust
/// Service 型別應可 Clone（內部用 Arc 共享狀態）
#[derive(Debug, Clone)]
pub struct UserService {
    db: Arc<DatabasePool>,
    cache: Arc<RedisClient>,
}
```

## 規則摘要

- 複雜建構用 Builder；簡單建構用 `new()`
- 用 Newtype 區分 ID、金額等語意型別
- 避免 `bool`/`Option` 參數；用 enum 表達意圖
- 接受 `impl AsRef<T>` / `impl Into<T>` 提升彈性
- Service 型別實作 `Clone`（內部 `Arc` 共享）
- 防止下游實作用 Sealed trait
