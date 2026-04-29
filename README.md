# ai-rules-kit

一鍵安裝 AI 開發規範與 Skills 到你的 AI IDE，統一團隊的 AI 輔助開發標準。

透過預先定義的語言規範（Rules）與領域技能（Skills），讓 AI 助手在不同 IDE 中產生一致、高品質的程式碼。

## 目錄

- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [系統需求](#系統需求)
- [支援的 IDE](#支援的-ide)
- [語言規範](#語言規範)
- [Skills 清單](#skills-清單)
- [CLI 參考](#cli-參考)
- [安裝範圍](#安裝範圍)
- [規範模式](#規範模式)
- [IDE 安裝路徑對照](#ide-安裝路徑對照)
- [使用範例](#使用範例)
- [專案結構](#專案結構)
- [貢獻指南](#貢獻指南)
- [授權](#授權)

## 功能特色

- 支援 5 種主流 AI IDE，一套規範多處部署
- 涵蓋 9 種程式語言的編碼規範
- 內建 38 個領域 Skills，涵蓋 Go、Rust、React、SRE、DevOps 等
- 自動產生各 IDE 所需的 frontmatter 格式
- 支援專案層級與使用者層級（全域）安裝
- 提供 `--dry-run` 預覽模式，安裝前可確認寫入路徑
- 零依賴，透過 `npx` 直接執行

## 快速開始

```bash
# 安裝 Go 規範與全部 Skills 到 Kiro（專案層級）
npx @vincent119/ai-rules-kit --kiro

# 安裝 Go + Rust 規範到 Cursor
npx @vincent119/ai-rules-kit --cursor --lang "go,rust"

# 安裝到 GitHub Copilot（全域）
npx @vincent119/ai-rules-kit --copilot --global
```

## 系統需求

- Node.js >= 14.0.0
- npm 或 npx

不需要全域安裝，直接透過 `npx` 執行即可。

## 支援的 IDE

| 旗標 | IDE | Skills 支援 |
|------|-----|:-----------:|
| `--copilot` / `--vscode` | GitHub Copilot (VS Code / JetBrains) | O |
| `--cursor` | Cursor | - |
| `--claude` | Claude Code | - |
| `--kiro` | Kiro | O |
| `--antigravity` | Antigravity (Google) | O |

Skills 在 Copilot、Kiro 與 Antigravity 中支援，其他 IDE 僅安裝語言規範與全域規範。

## 語言規範

| 語言 | 規範檔案 | 適用檔案類型 |
|------|---------|-------------|
| `go` | `go-core-minimal.md` / `go-core-extended.md` | `*.go`, `go.mod`, `go.sum` |
| `bash` | `bash.md` | `*.sh`, `*.bash` |
| `rust` | `rust.md` | `*.rs`, `Cargo.toml` |
| `python` | `python.md` | `*.py` |
| `typescript` | `typescript.md` | `*.ts`, `*.tsx`, `*.js`, `*.jsx` |
| `react` | `react.md` | `*.tsx`, `*.jsx` |
| `yaml` | `yaml.md` | `*.yaml`, `*.yml` |
| `helm` | `helm.md` | `Chart.yaml`, `values.yaml`, `templates/**/*.yaml` |
| `pulumi` | `pulumi.md` | `Pulumi.yaml`, `Pulumi.*.yaml` |

額外規範（透過 `--extras` 安裝）：

| 名稱 | 說明 |
|------|------|
| `commit` | Commit Message 撰寫規範 |
| `pr` | Pull Request 撰寫規範 |

Go 語言提供兩種模式：`minimal`（約 3KB，適用 Copilot/Claude 的 context 限制）與 `extended`（約 15KB，完整版）。其他語言兩種模式內容相同。

## Skills 清單

### Go

| Skill 名稱 | 說明 |
|------------|------|
| `go-ddd` | DDD 架構設計：Bounded Context、Aggregate Root、Repository Pattern、Shared Kernel |
| `go-grpc` | gRPC 實作：Proto 管理、Buf、Interceptor、健康檢查、Deadline 處理、GracefulStop |
| `go-api-design` | API 設計：JSON Envelope、Pagination、Filter、Sort、Swagger、版本管理 |
| `go-database` | Database Migration 與 ORM：golang-migrate/goose、命名慣例、CI/CD 整合 |
| `go-testing-advanced` | 進階測試：Table-driven tests、Mocking、整合測試、Benchmark、Fuzz testing |
| `go-observability` | 可觀測性：結構化日誌（zap/slog）、Prometheus Metrics、OpenTelemetry、Trace ID |
| `go-http-advanced` | HTTP 進階：Transport 重用、重試策略、指數退避、Multipart 上傳、逾時控制 |
| `go-ci-tooling` | CI/CD 工具：Makefile、golangci-lint、GitHub Actions、Docker、Pre-commit Hook |
| `go-configuration` | 設定管理：Viper、環境變數優先級、Secrets 處理、動態重載、12-Factor App |
| `go-dependency-injection` | 依賴注入：Interface 設計、Constructor Pattern、Uber Fx/Wire、生命週期管理 |
| `go-domain-events` | Domain Events：事件定義、Event Bus、Outbox Pattern、冪等處理、Event Sourcing |
| `go-graceful-shutdown` | 優雅關機：Signal 處理、HTTP/gRPC shutdown、Kubernetes 整合、資源清理 |
| `go-examples` | 實作範例庫：HTTP Client、Repository、Use Case、Handler、Service 範例 |

### Rust

| Skill 名稱 | 說明 |
|------------|------|
| `rust-error-handling` | 錯誤處理：自訂錯誤型別、錯誤傳播、anyhow/thiserror 選擇、Result 組合子 |
| `rust-api-design` | API 設計：Builder Pattern、Newtype、型別安全、trait 設計、泛型 API、Sealed traits |
| `rust-async-concurrency` | 非同步與並行：tokio runtime、async/await、Send+Sync、共享狀態、channel 模式 |
| `rust-testing` | 測試策略：單元測試、整合測試、mock、property-based testing、benchmark |
| `rust-safety-performance` | 安全性與效能：unsafe 規範、soundness、記憶體安全、profiling、allocator 選擇 |
| `rust-project-structure` | 專案目錄結構：workspace 組織、crate 拆分、模組層級、binary/library 分離 |

### React

| Skill 名稱 | 說明 |
|------------|------|
| `react-component-patterns` | 元件設計模式：Compound Components、Polymorphic、受控/非受控、Slot Pattern、Render Props |
| `react-hooks-state` | Hooks 與狀態管理：自訂 Hooks、useReducer、Context 架構、Server State、表單處理 |
| `react-performance` | 效能最佳化：memo/useMemo/useCallback、虛擬化列表、Code Splitting、Re-render 診斷 |
| `react-project-structure` | 專案目錄結構：Feature-based 組織、元件分層、共用模組擺放、Monorepo 配置 |

### SRE / DevOps

| Skill 名稱 | 說明 |
|------------|------|
| `sre-vpc-architecture` | AWS VPC 架構文件產生器：多環境 VPC、IP 規劃、Subnet 設計、網路拓撲、安全設計 |
| `sre-cicd-pipeline` | CI/CD Pipeline 文件產生器：Pipeline 階段定義、部署策略、Rollback、Secrets 管理 |
| `sre-documentation-generation` | SRE 文件產生器：SLO/SLI 定義、服務架構、容量規劃、變更管理、On-call 手冊 |
| `devops-runbooks` | 運維手冊：Incident Response、Operational Playbooks、系統維護指南 |
| `aws-eks-ami` | 查詢 Amazon EKS 專用 AMI（AL2023 x86_64），支援多版本、多地區查詢 |
| `k8s-debug` | Kubernetes 除錯：Pod 狀態、Logs、Events、Exec、資源監控 |
| `release-workflow` | Release 流程：Test、Tag、Push，支援 Go/Python/Node.js/Bash/YAML 專案 |

### 通用

| Skill 名稱 | 說明 |
|------------|------|
| `ui-design-principles` | UI 設計原則：間距系統、色彩層級、排版階層、響應式斷點、WCAG 2.1 AA 無障礙 |
| `ui-component-guidelines` | 元件設計規範：按鈕狀態、表單驗證、Modal 行為、Toast 通知、表格互動、載入狀態 |
| `ui-design-tokens` | Design Token 管理：三層 token 架構、CSS 變數組織、Light/Dark 主題切換 |
| `changelog-generator` | Changelog 產生器：Git commits 轉換為 Release Notes，自動分類與過濾 |
| `git-repo-init` | Git Repo 初始化：掃描目錄偵測語言與工具，自動產生 .gitignore、LICENSE、README.md、.editorconfig |
| `test-coverage` | 測試覆蓋率報告：支援 Go、Python、Node.js 專案 |
| `skill-creator` | Skill 建立指南：建立或更新 Skills 的最佳實務 |
| `meeting-transcriber` | 會議錄音轉錄：透過 whisper.cpp 將音訊/視訊轉為文字，生成結構化會議紀要與工作日報 |

## CLI 參考

```
npx @vincent119/ai-rules-kit --<ide> [options]
```

### 必要參數

| 參數 | 說明 |
|------|------|
| `--copilot` / `--vscode` | 安裝到 GitHub Copilot |
| `--cursor` | 安裝到 Cursor |
| `--claude` | 安裝到 Claude Code |
| `--kiro` | 安裝到 Kiro |
| `--antigravity` | 安裝到 Antigravity |

### 選用參數

| 參數 | 預設值 | 說明 |
|------|--------|------|
| `--global` | `false` | 安裝到使用者目錄（全域），而非專案目錄 |
| `--mode <minimal\|extended>` | copilot/claude: `minimal`，其他: `extended` | 規範版本 |
| `--lang <languages>` | 全部 | 語言規範，逗號分隔指定語言 |
| `--skills <names>` | 全部 | 只安裝指定的 Skills，逗號分隔 |
| `--extras <names>` | 無 | 額外規範：`commit`（Commit Message）、`pr`（Pull Request） |
| `--dry-run` | `false` | 預覽安裝路徑，不實際寫入檔案 |
| `--help` / `-h` | - | 顯示說明 |

## 安裝範圍

### 專案層級（預設）

規範檔案安裝到目前工作目錄下的 IDE 設定資料夾，僅對該專案生效。

### 使用者層級（`--global`）

規範檔案安裝到使用者家目錄下的 IDE 設定資料夾，對所有專案生效。

## 規範模式

| 模式 | 說明 | 適用場景 |
|------|------|---------|
| `minimal` | 精簡版，約 3KB | Copilot、Claude Code 等有 context 大小限制的 IDE |
| `extended` | 完整版，約 15KB | Cursor、Kiro、Antigravity 等無限制的 IDE |

目前僅 Go 語言區分兩種模式，其他語言兩種模式內容相同。

## IDE 安裝路徑對照

### 專案層級

| IDE | 全域規範 | 語言規範 | Skills |
|-----|---------|---------|--------|
| Copilot | `.github/copilot-instructions.md` | `.github/instructions/<lang>.instructions.md` | `.github/skills/<name>/` |
| Cursor | - | `.cursor/rules/<lang>.mdc` | - |
| Claude Code | `CLAUDE.md` | `.claude/rules/<lang>.md` | - |
| Kiro | - | `.kiro/steering/<lang>.md` | `.kiro/skills/<name>/` |
| Antigravity | `.gemini/GEMINI.md` | `.agent/rules/<lang>.md` | `.agent/skills/<name>/` |

### 使用者層級（`--global`）

| IDE | 全域規範 | 語言規範 | Skills |
|-----|---------|---------|--------|
| Copilot | - | `~/.copilot/instructions/<lang>.instructions.md` | `~/.copilot/skills/<name>/` |
| Cursor | - | `~/.cursor/rules/<lang>.mdc` | - |
| Claude Code | `~/.claude/CLAUDE.md` | `~/.claude/rules/<lang>.md` | - |
| Kiro | - | `~/.kiro/steering/<lang>.md` | `~/.kiro/skills/<name>/` |
| Antigravity | `~/.gemini/GEMINI.md` | `~/.agent/rules/<lang>.md` | `~/.agent/skills/<name>/` |

## 使用範例

### 基本安裝

```bash
# Go 規範 + 全部 Skills 安裝到 Kiro
npx @vincent119/ai-rules-kit --kiro

# Go 規範安裝到 Copilot（minimal 模式）
npx @vincent119/ai-rules-kit --copilot
```

### 多語言

```bash
# 同時安裝 Go、Bash、Rust 規範
npx @vincent119/ai-rules-kit --cursor --lang "go,bash,rust"
```

### 選擇性安裝 Skills

```bash
# 只安裝 DDD 與 gRPC 相關 Skills
npx @vincent119/ai-rules-kit --kiro --skills "go-ddd,go-grpc"
```

### 加入額外規範

```bash
# 加入 Commit Message 與 PR 撰寫規範
npx @vincent119/ai-rules-kit --kiro --extras "commit,pr"
```

### 全域安裝

```bash
# 安裝到使用者目錄，所有專案共用
npx @vincent119/ai-rules-kit --kiro --global
```

### 預覽模式

```bash
# 預覽安裝路徑，不寫入任何檔案
npx @vincent119/ai-rules-kit --kiro --dry-run
```

## 專案結構

```
ai-rules-kit/
├── cli/
│   └── install.js          # CLI 安裝程式
├── source/                  # 語言規範原始檔
│   ├── global.md            # 全域開發規範
│   ├── go-core-minimal.md   # Go 精簡版
│   ├── go-core-extended.md  # Go 完整版
│   ├── react.md
│   ├── rust.md
│   ├── bash.md
│   ├── python.md
│   ├── typescript.md
│   ├── yaml.md
│   ├── helm.md
│   ├── pulumi.md
│   ├── commit-message.md    # Commit Message 規範
│   └── pull-request.md      # Pull Request 規範
├── skills/                  # 領域 Skills
│   ├── go-ddd/
│   ├── go-grpc/
│   ├── rust-error-handling/
│   ├── sre-vpc-architecture/
│   └── ...（共 38 個）
├── package.json
├── LICENSE
└── README.md
```

## 貢獻指南

1. Fork 此專案
2. 建立 feature branch：`git checkout -b feature/your-feature`
3. 提交變更：`git commit -m '新增功能描述'`
4. 推送分支：`git push origin feature/your-feature`
5. 建立 Pull Request

### 新增語言規範

在 `source/` 目錄下新增 `<language>.md`，並在 `cli/install.js` 的 `LANG_CONFIG` 中加入對應設定。

### 新增 Skill

在 `skills/` 目錄下建立新資料夾，包含 `SKILL.md` 檔案。可參考 `skill-creator` Skill 的指南。

## 授權

本專案採用 [MIT License](LICENSE) 授權。
