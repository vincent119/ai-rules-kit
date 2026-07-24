# ai-rules-kit

一鍵安裝 AI 開發規範與 Skills 到你的 AI IDE，統一團隊的 AI 輔助開發標準。

透過預先定義的語言規範（Rules）與領域技能（Skills），讓 AI 助手在不同 IDE 中產生一致、高品質的程式碼。

## 目錄

- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [更新已安裝規範](#更新已安裝規範)
- [系統需求](#系統需求)
- [支援的 IDE](#支援的-ide)
- [語言規範](#語言規範)
- [Skills 清單](#skills-清單)
- [CLI 參考](#cli-參考)
- [安裝範圍](#安裝範圍)
- [規範模式](#規範模式)
- [Specs 共用規範](#specs-共用規範)
- [IDE 安裝路徑對照](#ide-安裝路徑對照)
- [使用範例](#使用範例)
- [專案結構](#專案結構)
- [貢獻指南](#貢獻指南)
- [Hooks](#hooks)
- [授權](#授權)

## 功能特色

- 支援 5 種主流 AI IDE，一套規範多處部署
- 涵蓋 9 種程式語言的編碼規範
- 內建 52 個領域 Skills，涵蓋 Go、Rust、React、SRE、DevOps、Financial 等
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

## 更新已安裝規範

已安裝過的專案或使用者層級規範，可重新執行相同指令更新。

```bash
# 更新 Kiro 專案層級 rules、skills、hooks
npx @vincent119/ai-rules-kit --kiro

# 更新全域 Copilot 規範
npx @vincent119/ai-rules-kit --copilot --global

# 更新指定 Skills
npx @vincent119/ai-rules-kit --kiro --skills "sdd-skill,go-ddd"
```

更新前可先使用 `--dry-run` 檢查寫入路徑：

```bash
npx @vincent119/ai-rules-kit --kiro --dry-run
```

更新會依目前選項重新寫入對應檔案。若專案內曾手動修改已安裝的 rules、skills 或 hooks，請先備份或使用版本控制確認差異。

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

### Financial

| Skill 名稱 | 說明 |
|------------|------|
| `financial-health-risk` | 財務健康風險分析完整流程。 |

### Go

| Skill 名稱 | 說明 |
|------------|------|
| `go-api-design` | Go API 設計與版本管理：JSON Envelope、Request/Response 模式、API Versioning、 Pagination、Filter、Sort、Swagger 文件、棄用通知、HTTP 狀態碼最佳實務。 |
| `go-ci-tooling` | Go CI/CD 工具配置：Makefile、golangci-lint、GitHub Actions、Docker、測試覆蓋率、 自動化流程、Pre-commit Hook。 |
| `go-configuration` | Go 設定管理最佳實務：Viper 配置、環境變數優先級、Secrets 處理、設定驗證、 動態重載、多環境管理、12-Factor App 原則。 |
| `go-database` | Go Database Migration 與 ORM 規範：Migration 工具選擇（golang-migrate/goose）、 命名慣例、版本控制、CI/CD 整合、最佳實務（pt-online-schema-change, gh-ost）。 |
| `go-ddd` | Go DDD 架構設計規範：領域驅動設計 (Domain-Driven Design)、Bounded Context（限界上下文）、 Aggregate Root（聚合根）、Repository Pattern、Shared Kernel（共用核心）、依賴注入整合。 |
| `go-dependency-injection` | Go 依賴注入模式與工具：Interface 設計、Constructor Pattern、Uber Fx/Wire 使用、 測試替身模式、生命週期管理、模組化架構。 |
| `go-domain-events` | Go Domain Events 實作：事件定義、發布模式、Event Bus、Outbox Pattern、冪等處理、 Event Sourcing 基礎、非同步處理。 |
| `go-examples` | Go 實作範例庫：完整的 HTTP Client、Repository Pattern、Use Case、Handler、 Service 實作範例，涵蓋常見場景的最佳實務程式碼。 |
| `go-graceful-shutdown` | Go 優雅關機（Graceful Shutdown）模式：Signal 處理、HTTP Server shutdown、gRPC GracefulStop、 Worker/Consumer 停止、Kubernetes 整合、Context 取消機制、資源清理流程。 |
| `go-grpc` | Go gRPC 完整實作規範：Proto 檔案管理、Buf 使用、Interceptor 設計、健康檢查協議、 Deadline 與 Context 處理、錯誤代碼映射、優雅關機（GracefulStop）。 |
| `go-http-advanced` | Go HTTP 進階實作：Transport 重用與配置、重試策略與指數退避、Body 重播機制、 Multipart 上傳、逾時控制、HTTP Client 最佳實務、Context 傳遞。 |
| `go-observability` | Go 可觀測性規範：結構化日誌（zap/slog）、Prometheus Metrics 規範、OpenTelemetry 整合、 Context 傳遞與 Trace ID 串接、日誌等級管理、Metrics 命名慣例。 |
| `go-testing-advanced` | Go 進階測試策略：Table-driven tests 進階模式、Mocking 策略（uber-go/mock）、 整合測試設計、Benchmark 與 Fuzz testing、測試覆蓋率要求、測試金字塔原則。 |

### Rust

| Skill 名稱 | 說明 |
|------------|------|
| `rust-api-design` | Rust API 設計模式。 |
| `rust-async-concurrency` | Rust 非同步與並行模式。 |
| `rust-error-handling` | Rust 錯誤處理模式。 |
| `rust-project-structure` | Rust 專案目錄結構。 |
| `rust-safety-performance` | Rust 安全性與效能最佳實踐。 |
| `rust-testing` | Rust 測試策略。 |

### React

| Skill 名稱 | 說明 |
|------------|------|
| `react-component-patterns` | React 元件設計模式。 |
| `react-hooks-state` | React Hooks 與狀態管理模式。 |
| `react-performance` | React 效能最佳化模式。 |
| `react-project-structure` | React 專案目錄結構。 |

### Dev

| Skill 名稱 | 說明 |
|------------|------|
| `dev-code-reviewer` | 自動化程式碼審查完整流程。 |
| `dev-refactoring-catalog` | 程式碼重構目錄。 |
| `dev-vulnerability-patterns` | 程式碼漏洞模式資料庫。 |

### SRE / DevOps

| Skill 名稱 | 說明 |
|------------|------|
| `aws-eks-ami` | 查詢 Amazon EKS 專用 AMI (AL2023 x86_64)。 |
| `devops-cicd-pipeline` | CI/CD Pipeline 設計、建置、監控與最佳化完整流程。 |
| `devops-deployment-strategies` | 部署策略目錄。 |
| `devops-pipeline-security-gates` | CI/CD Pipeline 安全閘門設計指南。 |
| `devops-runbooks` | Operational runbook and procedure documentation specialist. |
| `k8s-debug` | Kubernetes troubleshooting workflow - Pod status, logs, events, exec, and resource monitoring. |
| `release-workflow` | Standard release workflow - Test, tag, push. |
| `sre-cicd-pipeline` | CI/CD Pipeline 文件產生器。 |
| `sre-documentation-generation` | SRE 文件產生器。 |
| `sre-incident-postmortem` | 事故事後分析（Postmortem）完整流程。 |
| `sre-rca-methodology` | 根因分析（RCA）方法論詳細指南。 |
| `sre-sla-impact-calculator` | 基於 SLA/SLO 量化評估事故影響的計算模型與業務影響矩陣。 |
| `sre-vpc-architecture` | AWS VPC 架構文件產生器。 |

### Presentation

| Skill 名稱 | 說明 |
|------------|------|
| `pres-data-visualization-guide` | 資料視覺化圖表選擇指南與資訊架構設計。 |
| `pres-presentation-designer` | 簡報設計完整製作流程。 |
| `pres-slide-layout-patterns` | 投影片版面模式庫。 |

### 通用

| Skill 名稱 | 說明 |
|------------|------|
| `changelog-generator` | Transform Git commits into user-facing changelogs. |
| `git-repo-init` | Git repo 初始化範本產生器。 |
| `meeting-transcriber` | 會議錄音轉會議紀要。 |
| `sdd-skill` | SDD（Spec Driven Development）工作流程。 |
| `skill-creator` | Guide for creating effective skills. |
| `test-coverage` | Run tests with coverage reports for Go, Python, and Node. |
| `ui-component-guidelines` | UI 元件設計規範。 |
| `ui-design-principles` | UI 設計原則。 |
| `ui-design-tokens` | Design Token 管理。 |

## CLI 參考

```
npx @vincent119/ai-rules-kit --<ide> [選項]
```

### 必要參數

| 參數 | 說明 |
|------|------|
| `--copilot` / `--vscode` | 安裝到 GitHub Copilot |
| `--cursor` | 安裝到 Cursor |
| `--claude` | 安裝到 Claude Code |
| `--kiro` | 安裝到 Kiro |
| `--antigravity` | 安裝到 Antigravity |

### 安裝項目（預設全部）

| 參數 | 說明 |
|------|------|
| `--rules` | 只安裝語言規範 |
| `--skills` | 只安裝 Skills |
| `--hooks` | 只安裝 Hooks（僅 Kiro / Claude Code，不支援 `--global`） |
| `--all` | 安裝全部（rules + skills + hooks） |

未指定任何安裝項目旗標時，預設為 `--all`。

### 選用參數

| 參數 | 預設值 | 說明 |
|------|--------|------|
| `--global` | `false` | 安裝到使用者目錄（全域），而非專案目錄（hooks 不支援 global） |
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

## Specs 共用規範

`.specs` 用於多個 agent 共用的開發前規格文件。正式 spec 目錄格式為：

```text
.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/
```

Draft 目錄格式為：

```text
.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/
```

`Type` 僅允許 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`。完整規則見 `source/kiro-specs.md`。

## IDE 安裝路徑對照

### 專案層級

| IDE | 全域規範 | 語言規範 | Skills | Hooks |
|-----|---------|---------|--------|-------|
| Copilot | `.github/copilot-instructions.md` | `.github/instructions/<lang>.instructions.md` | `.github/skills/<name>/` | - |
| Cursor | - | `.cursor/rules/<lang>.mdc` | - | - |
| Claude Code | `CLAUDE.md` | `.claude/rules/<lang>.md` | - | `.claude/settings.json` |
| Kiro | - | `.kiro/steering/<lang>.md` | `.kiro/skills/<name>/` | `.kiro/hooks/` + `.kiro/agents/` |
| Antigravity | `.gemini/GEMINI.md` | `.agent/rules/<lang>.md` | `.agent/skills/<name>/` | - |

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
# Go 規範 + 全部 Skills + Hooks 安裝到 Kiro（預設全部）
npx @vincent119/ai-rules-kit --kiro

# Go 規範安裝到 Copilot（minimal 模式）
npx @vincent119/ai-rules-kit --copilot
```

### 選擇性安裝

```bash
# 只安裝語言規範
npx @vincent119/ai-rules-kit --kiro --rules

# 只安裝 Hooks
npx @vincent119/ai-rules-kit --kiro --hooks

# 只安裝 Skills
npx @vincent119/ai-rules-kit --kiro --skills

# 組合安裝（rules + hooks）
npx @vincent119/ai-rules-kit --kiro --rules --hooks
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
│   ├── kiro-specs.md        # Specs 共用規範
│   ├── commit-message.md    # Commit Message 規範
│   └── pull-request.md      # Pull Request 規範
├── skills/                  # 領域 Skills
│   ├── go-ddd/
│   ├── go-grpc/
│   ├── rust-error-handling/
│   ├── sre-vpc-architecture/
│   └── ...（共 52 個）
├── hooks/                   # Hooks（Kiro / Claude Code）
│   └── update-readme/
│       ├── update-readme.kiro.hook      # Kiro IDE UI hook
│       ├── update-readme.json           # Kiro CLI agent hook
│       ├── update-readme.claude.json    # Claude Code hook
│       └── script/
│           └── update-readme.js         # 共用腳本
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

### 新增 Hook

在 `hooks/` 目錄下建立新資料夾，包含：
- `<name>.kiro.hook`：Kiro IDE UI hook（JSON 格式）
- `<name>.json`：Kiro CLI agent hook（JSON 格式）
- `<name>.claude.json`：Claude Code hook（會合併到 `.claude/settings.json`）
- `script/`：共用腳本目錄

Kiro hook 腳本會安裝到 `.kiro/hooks/<name>/script/`，Claude Code hook 腳本會安裝到 `.claude/hooks/<name>/script/`。Hook command 使用 `$PWD` 從專案根目錄解析腳本路徑。

## Hooks

Hooks 是自動化工作流程，當特定事件發生時（如檔案儲存、工具執行後）自動執行腳本或 AI 指令。

### 支援的 IDE

| IDE | 支援 Hooks | 說明 |
|-----|-----------|------|
| Kiro | ✓ | IDE UI hook（`.kiro.hook`）+ CLI agent hook（agent JSON） |
| Claude Code | ✓ | 透過 `.claude/settings.json` 設定 |
| Copilot | - | 不支援 |
| Cursor | - | 不支援 |
| Antigravity | - | 不支援 |

### 內建 Hooks

#### update-readme

自動偵測 `source/*.md` 或 `skills/*/SKILL.md` 被修改後，執行 `update-readme.js` 腳本更新 README 的語言規範表格與 Skills 清單。

**觸發時機**：
- Kiro IDE：檔案儲存時（`fileEdited`）
- Kiro CLI：AI 用 `fs_write` 工具寫入檔案後（`postToolUse`）
- Claude Code：AI 用 `Write` 工具寫入檔案後（`PostToolUse`）

**安裝**：
```bash
npx @vincent119/ai-rules-kit --kiro --hooks
npx @vincent119/ai-rules-kit --claude --hooks
```

### 新增 Skill

在 `skills/` 目錄下建立新資料夾，包含 `SKILL.md` 檔案。可參考 `skill-creator` Skill 的指南。

## 授權

本專案採用 [MIT License](LICENSE) 授權。
