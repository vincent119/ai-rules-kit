# Rust 核心開發規範

> **參照**：[Rust API Guidelines](https://rust-lang.github.io/api-guidelines/) | [Microsoft Pragmatic Rust Guidelines](https://microsoft.github.io/rust-guidelines/) | [Rust Style Guide](https://doc.rust-lang.org/stable/style-guide/)
> **Rust Edition**：2024

---

## 格式與工具

- 必須通過 `cargo fmt`、`cargo clippy`、`cargo check`
- 縮排 4 spaces；使用 `rustfmt.toml` 統一風格
- Lint 覆寫使用 `#[expect]` 而非 `#[allow]`（M-LINT-OVERRIDE-EXPECT）
- 靜態驗證：啟用 `clippy::pedantic` 於 CI

## 命名慣例（C-CASE）

- Types / Traits：`PascalCase`
- Functions / Methods / Variables：`snake_case`
- Constants / Statics：`SCREAMING_SNAKE_CASE`
- Modules / Crates：`snake_case`
- 轉換方法：`as_`（借用）、`to_`（複製/計算）、`into_`（消耗所有權）
- Getter 不加 `get_` 前綴；Iterator 方法用 `iter`、`iter_mut`、`into_iter`

## 錯誤處理

- 使用 `Result<T, E>` 和 `Option<T>`；禁止 production code 使用 `unwrap()`
- 用 `?` 傳播錯誤；自訂錯誤型別實作 `std::error::Error`
- Library：定義 canonical error struct（M-ERRORS-CANONICAL-STRUCTS）
- Application：可用 `anyhow`（M-APP-ERROR）
- Panic 僅用於程式 bug（M-PANIC-ON-BUG），不用於可恢復錯誤
- 文件標註 `# Errors`、`# Panics`、`# Safety` 段落（C-FAILURE）

## 所有權與借用

- 優先借用（`&T`、`&mut T`）；僅在需要所有權時 move
- 邊界處明確 clone；避免隱式複製
- Lifetime 標註僅在編譯器需要時加入
- 接受 `impl AsRef<T>` 提升 API 彈性（M-IMPL-ASREF）

## Trait 與型別設計

- 公開型別必須實作 `Debug`（M-PUBLIC-DEBUG）
- 可讀型別實作 `Display`（M-PUBLIC-DISPLAY）
- 積極實作常見 traits：`Clone`、`PartialEq`、`Eq`、`Hash`、`Default`、`Send`、`Sync`（C-COMMON-TRAITS）
- 使用 Newtype 提供靜態區分（C-NEWTYPE）
- 避免 `bool` 參數，改用具名型別（C-CUSTOM-TYPE）
- 複雜建構使用 Builder Pattern（C-BUILDER / M-INIT-BUILDER）
- Sealed traits 防止下游實作（C-SEALED）

## 模組組織

- 拆小 crate（M-SMALLER-CRATES）；單一職責
- 不使用 glob re-export（M-NO-GLOB-REEXPORTS）
- `pub use` 加 `#[doc(inline)]`（M-DOC-INLINE）
- Features 必須是 additive（M-FEATURES-ADDITIVE）
- 避免 statics（M-AVOID-STATICS）

## 並行安全

- 型別預設 `Send + Sync`（M-TYPES-SEND / C-SEND-SYNC）
- 共享狀態用 `Arc<Mutex<T>>` 或 lock-free 結構
- Async：長時間任務加 yield points（M-YIELD-POINTS）
- I/O 和系統呼叫可 mock（M-MOCKABLE-SYSCALLS）

## 安全性

- 避免 `unsafe`；必要時需文件說明原因（M-UNSAFE）
- `unsafe` 意味著可能 UB（M-UNSAFE-IMPLIES-UB）
- 所有程式碼必須 sound（M-UNSOUND）
- 外部輸入驗證；函式驗證參數（C-VALIDATE）

## 效能

- 優化吞吐量，避免空轉（M-THROUGHPUT）
- 識別、profiling、優化 hot path（M-HOTPATH）
- Application 使用 mimalloc（M-MIMALLOC-APP）

## 文件

- 第一句 ≤ 15 字，作為摘要（M-FIRST-DOC-SENTENCE）
- 公開模組必須有 `//!` 文件（M-MODULE-DOCS）
- 標準段落：Examples、Errors、Panics、Safety（M-CANONICAL-DOCS）
- 所有公開項目附 rustdoc 範例（C-EXAMPLE）
- 範例用 `?` 而非 `unwrap`（C-QUESTION-MARK）

## 測試

- 單元測試放 `#[cfg(test)] mod tests`
- 整合測試放 `tests/` 目錄
- 測試工具 feature gate（M-TEST-UTIL）
- Property-based testing 用 `proptest` 或 `quickcheck`

## 產出要求

- 輸出完整可編譯檔案或明確 diff
- 新增依賴附 `cargo add <crate>@<version>` 與理由
- 多檔變更列出：檔名 / 變更摘要 / 風險

## Review Checklist

- [ ] 通過 `cargo fmt` / `cargo clippy` / `cargo check`
- [ ] 錯誤用 `Result`/`?` 處理；無 `unwrap()` in production
- [ ] 公開型別實作 Debug + 常見 traits
- [ ] 無不必要的 `unsafe`；有的話附 Safety 文件
- [ ] 所有公開 API 有 rustdoc + 範例
- [ ] `Send + Sync` 正確；無 data race
- [ ] Features additive；無 glob re-export
- [ ] 測試涵蓋主要路徑 + 邊界條件
