---
name: rust-async-concurrency
description: Rust 非同步與並行模式。用於 tokio runtime、async/await、Send+Sync、共享狀態、graceful shutdown、channel 模式。
---

# Rust Async 與並行

## Tokio Runtime 設定

```rust
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 或手動建立 runtime
    let rt = tokio::runtime::Builder::new_multi_thread()
        .worker_threads(4)
        .enable_all()
        .build()?;
    rt.block_on(async { run().await })
}
```

## 共享狀態

```rust
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, Clone)]
pub struct AppState {
    db: Arc<DatabasePool>,
    cache: Arc<RwLock<HashMap<String, String>>>,
}

// 讀取（多個 reader 並行）
async fn get_cached(state: &AppState, key: &str) -> Option<String> {
    state.cache.read().await.get(key).cloned()
}

// 寫入（獨佔）
async fn set_cached(state: &AppState, key: String, value: String) {
    state.cache.write().await.insert(key, value);
}
```

## Graceful Shutdown

```rust
use tokio::signal;

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c().await.expect("failed to listen for ctrl+c");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to listen for SIGTERM")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}

// 搭配 axum
async fn run() -> anyhow::Result<()> {
    let app = Router::new().route("/", get(|| async { "ok" }));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await?;

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;
    Ok(())
}
```

## Channel 模式

```rust
use tokio::sync::mpsc;

async fn producer_consumer() {
    let (tx, mut rx) = mpsc::channel::<String>(32);

    // Producer
    tokio::spawn(async move {
        for i in 0..10 {
            tx.send(format!("msg-{i}")).await.unwrap();
        }
    });

    // Consumer
    while let Some(msg) = rx.recv().await {
        println!("received: {msg}");
    }
}
```

## Send + Sync 規則

- 跨 `.await` 持有的資料必須 `Send`
- 禁止在 async 中持有 `Rc`、`RefCell`（非 Send）
- 用 `Arc<Mutex<T>>` 或 `tokio::sync::Mutex` 替代
- Struct 內含 `dyn Trait` 時加 `Send + Sync` bound

```rust
// 正確
pub struct Service {
    handler: Box<dyn Handler + Send + Sync>,
}

// 錯誤：不能跨 await
async fn bad() {
    let rc = std::rc::Rc::new(42);
    tokio::time::sleep(Duration::from_secs(1)).await; // rc 不是 Send
    println!("{rc}");
}
```

## Yield Points（M-YIELD-POINTS）

```rust
// 長時間 CPU 密集任務需加 yield
async fn process_large_batch(items: Vec<Item>) {
    for chunk in items.chunks(100) {
        process_chunk(chunk).await;
        tokio::task::yield_now().await; // 讓出執行權
    }
}
```
