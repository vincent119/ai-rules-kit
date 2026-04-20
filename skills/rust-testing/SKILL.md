---
name: rust-testing
description: Rust 測試策略。用於單元測試、整合測試、mock、property-based testing、test utilities、benchmark。
---

# Rust 測試

## 單元測試

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_valid_input() {
        let result = parse("42");
        assert_eq!(result, Ok(42));
    }

    #[test]
    fn parse_invalid_input() {
        let result = parse("abc");
        assert!(result.is_err());
    }

    #[test]
    #[should_panic(expected = "index out of bounds")]
    fn panics_on_invalid_index() {
        let v: Vec<i32> = vec![];
        let _ = v[0];
    }
}
```

## 整合測試

```
tests/
├── integration_test.rs
└── common/
    └── mod.rs          # 共用 test utilities
```

```rust
// tests/integration_test.rs
mod common;

#[test]
fn full_workflow() {
    let client = common::setup_test_client();
    let result = client.create_user("test@example.com");
    assert!(result.is_ok());
}
```

## Mock（mockall）

```rust
use mockall::automock;

#[automock]
pub trait UserRepository {
    fn find_by_id(&self, id: &str) -> Option<User>;
    fn save(&self, user: &User) -> Result<(), RepositoryError>;
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockall::predicate::*;

    #[test]
    fn service_returns_user() {
        let mut mock_repo = MockUserRepository::new();
        mock_repo
            .expect_find_by_id()
            .with(eq("user-1"))
            .returning(|_| Some(User { id: "user-1".into(), name: "Alice".into() }));

        let service = UserService::new(mock_repo);
        let user = service.get_user("user-1");
        assert_eq!(user.unwrap().name, "Alice");
    }
}
```

## I/O Mockable（M-MOCKABLE-SYSCALLS）

```rust
/// 抽象 I/O 操作為 trait，方便測試
pub trait FileSystem {
    fn read_to_string(&self, path: &str) -> std::io::Result<String>;
    fn write(&self, path: &str, content: &[u8]) -> std::io::Result<()>;
}

pub struct RealFs;
impl FileSystem for RealFs {
    fn read_to_string(&self, path: &str) -> std::io::Result<String> {
        std::fs::read_to_string(path)
    }
    fn write(&self, path: &str, content: &[u8]) -> std::io::Result<()> {
        std::fs::write(path, content)
    }
}
```

## Test Utilities Feature Gate（M-TEST-UTIL）

```toml
# Cargo.toml
[features]
test-util = []
```

```rust
#[cfg(feature = "test-util")]
pub mod test_helpers {
    pub fn create_test_config() -> Config {
        Config { host: "localhost".into(), port: 0 }
    }
}
```

## Property-Based Testing

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn roundtrip_serialization(input in "\\PC{1,100}") {
        let encoded = encode(&input);
        let decoded = decode(&encoded).unwrap();
        prop_assert_eq!(input, decoded);
    }
}
```

## Async 測試

```rust
#[tokio::test]
async fn async_operation_succeeds() {
    let result = fetch_data("https://example.com").await;
    assert!(result.is_ok());
}
```

## Benchmark（criterion）

```rust
// benches/my_benchmark.rs
use criterion::{criterion_group, criterion_main, Criterion};

fn bench_parse(c: &mut Criterion) {
    c.bench_function("parse_config", |b| {
        b.iter(|| parse_config(include_str!("../fixtures/config.toml")))
    });
}

criterion_group!(benches, bench_parse);
criterion_main!(benches);
```
