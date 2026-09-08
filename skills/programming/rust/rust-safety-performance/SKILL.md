---
name: rust-safety-performance
description: Rust 安全性與效能最佳實踐。用於 unsafe 使用規範、soundness、記憶體安全、效能優化、profiling、allocator 選擇。
---

# Rust 安全性與效能

## Unsafe 規範（M-UNSAFE）

### 何時允許 unsafe

- FFI 呼叫（C library binding）
- 效能關鍵路徑（經 benchmark 證明）
- 實作底層抽象（如自訂集合）

### 必要文件

```rust
/// # Safety
///
/// `ptr` 必須指向有效的、已初始化的 `T` 值，
/// 且在此函式呼叫期間不得有其他 mutable reference。
pub unsafe fn read_raw<T>(ptr: *const T) -> T {
    // SAFETY: 呼叫者保證 ptr 有效且對齊
    unsafe { ptr.read() }
}
```

### 規則

- 每個 `unsafe` block 必須有 `// SAFETY:` 註解
- `unsafe fn` 必須有 `# Safety` 文件段落
- 優先用 safe abstraction 包裝 unsafe 內部
- 禁止「因為方便」使用 unsafe

## Soundness（M-UNSOUND）

```rust
// 錯誤：unsound — 允許建立無效 UTF-8 的 String
pub fn from_bytes(bytes: Vec<u8>) -> String {
    unsafe { String::from_utf8_unchecked(bytes) } // 呼叫者可能傳入非 UTF-8
}

// 正確：驗證後再轉換
pub fn from_bytes(bytes: Vec<u8>) -> Result<String, std::string::FromUtf8Error> {
    String::from_utf8(bytes)
}
```

## 效能優化

### Allocator（M-MIMALLOC-APP）

```rust
// Application binary 使用 mimalloc
#[global_allocator]
static GLOBAL: mimalloc::MiMalloc = mimalloc::MiMalloc;
```

### Hot Path 優化（M-HOTPATH）

```rust
// 避免在 hot path 分配
fn process_batch(items: &[Item], buffer: &mut Vec<u8>) {
    buffer.clear(); // 重用 buffer，不重新分配
    for item in items {
        item.serialize_into(buffer);
    }
}

// 使用 SmallVec 避免小集合的 heap 分配
use smallvec::SmallVec;
fn collect_ids(items: &[Item]) -> SmallVec<[u64; 8]> {
    items.iter().map(|i| i.id).collect()
}
```

### 避免不必要的 clone

```rust
// 錯誤：不必要的 clone
fn process(data: &str) -> String {
    let owned = data.to_string(); // 不需要所有權時避免
    owned.trim().to_string()
}

// 正確：借用到底
fn process(data: &str) -> &str {
    data.trim()
}
```

### Throughput 優化（M-THROUGHPUT）

```rust
// 批次處理而非逐一
async fn process_events(rx: &mut Receiver<Event>) {
    let mut batch = Vec::with_capacity(64);
    loop {
        // 收集一批再處理
        batch.clear();
        if rx.recv_many(&mut batch, 64).await == 0 {
            break;
        }
        process_batch(&batch).await;
    }
}
```

## Profiling 工具

| 工具 | 用途 |
|------|------|
| `cargo flamegraph` | CPU profiling |
| `cargo bench` (criterion) | Micro-benchmark |
| `tokio-console` | Async task 監控 |
| `dhat` | Heap allocation profiling |
| `valgrind --tool=callgrind` | 指令級 profiling |

## Compile Time 優化

```toml
# Cargo.toml - 開發時加速編譯
[profile.dev]
opt-level = 0
debug = true

[profile.dev.package."*"]
opt-level = 2  # 依賴用 O2 編譯

# Release 最佳化
[profile.release]
opt-level = 3
lto = "thin"
codegen-units = 1
strip = true
```
