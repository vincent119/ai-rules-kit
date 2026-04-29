---
name: git-repo-init
description: |
  Git repo 初始化範本產生器。掃描目錄偵測語言與工具，自動產生 .gitignore、LICENSE、README.md、.editorconfig 等檔案。
  用於新專案初始化、補齊既有 repo 缺少的標準檔案。
keywords:
  - git init
  - gitignore
  - license
  - readme
  - editorconfig
  - repo setup
  - project init
  - dockerignore
  - helmignore
author: Vincent Yu
status: unpublished
updated: '2026-04-29'
version: 1.0.0
tag: skill
type: skill
---

# Git Repo Init

掃描目錄偵測語言與工具，產生 repo 初始化所需的標準檔案。

## 觸發時機

使用者要求初始化 git repo、建立 .gitignore、補齊專案範本檔案時啟動。

## 工作流程

### 1. 掃描目錄偵測語言與工具

列出目錄內容，依據特徵檔案判斷：

| 特徵檔案 | 語言/工具 |
|----------|----------|
| `go.mod` | Go |
| `package.json` | Node.js |
| `Cargo.toml` | Rust |
| `requirements.txt`, `pyproject.toml`, `setup.py` | Python |
| `pom.xml`, `build.gradle` | Java |
| `*.csproj`, `*.sln` | .NET |
| `Gemfile` | Ruby |
| `composer.json` | PHP |
| `Dockerfile` | Docker |
| `Chart.yaml` | Helm |
| `Pulumi.yaml` | Pulumi |
| `Makefile` | Make |
| `.terraform/`, `*.tf` | Terraform |

多語言專案同時偵測所有符合項目。

### 2. 確認產生清單

掃描後向使用者確認：
- 偵測到的語言/工具
- 將產生的檔案清單
- 是否需要調整（新增/移除）

### 3. 產生檔案

依偵測結果產生以下檔案：

#### 必產生（所有專案）

| 檔案 | 說明 |
|------|------|
| `.gitignore` | 依偵測語言組合對應規則 |
| `LICENSE` | 預設 MIT，詢問使用者偏好 |
| `README.md` | 專案名稱 + 基本結構 |
| `.editorconfig` | 統一編輯器格式設定 |

#### 條件產生

| 條件 | 檔案 |
|------|------|
| 有 `Dockerfile` | `.dockerignore` |
| 有 `Chart.yaml` | `.helmignore` |
| 有 `Makefile` 或偵測到語言 | `Makefile`（若不存在） |
| 有 CI 目錄（`.github/`） | `.github/CODEOWNERS`（若不存在） |
| 有 `.github/` | `.github/PULL_REQUEST_TEMPLATE.md`（若不存在） |

### 4. 各檔案產生規則

#### .gitignore

合併所有偵測到的語言規則，結構：

```gitignore
# === OS ===
.DS_Store
Thumbs.db

# === IDE ===
.idea/
.vscode/
*.swp
*.swo

# === {Language} ===
# 依偵測結果加入對應區塊
```

語言對應規則：

| 語言 | 忽略項目 |
|------|---------|
| Go | `bin/`, `*.exe`, `vendor/`（若無 vendor 管理） |
| Node.js | `node_modules/`, `dist/`, `.env`, `.env.local`, `*.log` |
| Rust | `target/`, `Cargo.lock`（library 專案） |
| Python | `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `*.egg-info/`, `.mypy_cache/` |
| Java | `target/`, `*.class`, `.gradle/`, `build/` |
| .NET | `bin/`, `obj/`, `*.user`, `*.suo` |
| Terraform | `.terraform/`, `*.tfstate`, `*.tfstate.backup`, `.terraform.lock.hcl` |

通用忽略（所有專案）：
- `*.log`
- `*.tmp`
- `.env`（提醒使用者建立 `.env.example`）
- `coverage/`

#### LICENSE

預設 MIT License，支援選項：
- MIT
- Apache-2.0
- BSD-3-Clause
- GPL-3.0

詢問使用者：「License 使用 MIT 還是其他？」

自動填入年份與作者名稱（從 `git config user.name` 取得）。

#### README.md

```markdown
# {project-name}

{一句話描述，請使用者補充}

## 快速開始

{依偵測語言產生對應指令}

## 開發

{依偵測語言產生 build/test 指令}

## 授權

{對應 LICENSE 類型}
```

依語言填入對應指令：
- Go: `go build ./...`, `go test ./...`
- Node.js: `npm install`, `npm run dev`
- Rust: `cargo build`, `cargo test`
- Python: `pip install -r requirements.txt`, `pytest`

#### .editorconfig

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.go]
indent_style = tab

[*.rs]
indent_size = 4

[*.py]
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

僅包含偵測到的語言對應區塊。

#### .dockerignore

```dockerignore
.git
.gitignore
.editorconfig
.env
*.md
LICENSE
.github/
.vscode/
.idea/

# {語言特定}
# Go: vendor/ (若不需要)
# Node.js: node_modules/
# Rust: target/
# Python: __pycache__/, .venv/
```

#### .helmignore

```
.git
.gitignore
.editorconfig
.env
*.md
LICENSE
.github/
.vscode/
.idea/
```

## 注意事項

- 已存在的檔案**不覆蓋**，列出差異讓使用者決定是否合併
- `.gitignore` 若已存在，以附加模式補齊缺少的規則
- 產生前顯示完整檔案清單供確認
- 所有檔案使用 UTF-8、LF 換行
