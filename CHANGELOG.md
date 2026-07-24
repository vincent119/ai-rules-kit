# Changelog

所有重要變更皆記錄於此檔案。格式基於 [Keep a Changelog](https://keepachangelog.com/)，版本遵循 [Semantic Versioning](https://semver.org/)。

## [Unreleased]

## [1.0.6] - 2026-07-24

### ✨ Added
- 新增 Codex 安裝目標，支援 `--codex`
  - 專案層級：`AGENTS.md`、`.codex/rules/`、`.codex/skills/`
  - 使用者層級：`~/.codex/AGENTS.md`、`~/.codex/rules/`、`~/.codex/skills/`
- 新增 `sdd-skill` Skill，Skills 總數從 51 增加至 52 個
  - 支援在實作前建立 `.specs` 下的 `requirements.md`、`design.md`、`tasks.md`
  - 提供正式 spec 與 draft 文件範本
  - 新增 `scripts/create_spec.js`，可建立正式 spec 或 draft 目錄與初始文件
  - 加入文件定位、已知契約狀態、Bounded Context、Protected Behavior、Boundary 與 Verify 等規劃護欄
- 新增 `.specs` 共用規範，供 Codex、Claude、Kiro 與其他 agent 使用
  - 正式 spec 目錄格式：`.specs/{YYYY-MM-DD-HH-mm}_{Type}-{kebab-case-name}/`
  - Draft 目錄格式：`.specs/drafts/{YYYY-MM-DD-HH-mm}_Draft-{kebab-case-name}/`
  - Type 支援 `Feature`、`BugFix`、`Refactor`、`Docs`、`Chore`

### 📝 Changed
- 更新 README.md：新增 Codex、`sdd-skill`、`.specs` 共用規範入口與已安裝規範更新說明
- 將 `source/kiro-specs.md` 從 Kiro-only 規範調整為多 agent 共用 `.specs` 規範
- 更新 package version 至 `1.0.6`

### 🔧 Fixed
- 修正 npm package metadata，避免 publish 時由 npm 自動校正 `bin` 與 `repository.url`

## [1.0.5] - 2026-05-07

### ✨ Added
- 新增 `financial-health-risk` Skill（Financial 分類），Skills 總數從 50 增加至 51 個
  - 支援讀入本地 PDF、PDF URL、財務網頁 URL（自動判斷類型）
  - 六維度財務健康分析：流動性、獲利能力、槓桿/償債、現金流、Altman Z-Score、成長性
  - 附 Python 解析腳本 `extract_financials.py`：針對台灣 TWSE/MOPS 財報格式優化（IFRS 科目代碼精確定位）
  - 附三份 references：指標公式速查手冊、台灣/國際行業基準值、風險評分規則
  - 支援繁體中文與英文雙語財報
  - 輸出含風險儀表板、詳細分析表格、Altman Z-Score、改善建議的 Markdown 報告

### 📝 Changed
- 更新 README.md：新增 Financial 分類區塊，Skills 總數更新為 51 個

## [1.0.4] - 2026-05-07

### ✨ Added
- 新增 12 個領域 Skills，總數從 38 增加至 50 個
- **Dev 分類**（3 個）：`dev-code-reviewer`、`dev-vulnerability-patterns`、`dev-refactoring-catalog`
  - 自動化程式碼審查完整流程（風格、安全性、效能、架構 4 領域並行）
  - CWE Top 25 漏洞模式資料庫（Python/JS/Java/Go）
  - 程式碼重構目錄（Code Smells、SOLID、複雜度指標）
- **SRE 分類**（3 個）：`sre-incident-postmortem`、`sre-rca-methodology`、`sre-sla-impact-calculator`
  - 事故事後分析（Postmortem）完整 7 階段流程
  - 根因分析方法論（5 Whys、Fishbone、Fault Tree）
  - SLA/SLO 影響計算與 Error Budget 管理
- **DevOps 分類**（3 個）：`devops-cicd-pipeline`、`devops-deployment-strategies`、`devops-pipeline-security-gates`
  - CI/CD Pipeline 設計與建置（產出可用 YAML 設定檔）
  - 部署策略目錄（Blue-Green/Canary/Rolling + DORA Metrics）
  - Pipeline 安全閘門設計（SAST/SCA/Container Scan 工具選擇）
- **Presentation 分類**（3 個）：`pres-presentation-designer`、`pres-slide-layout-patterns`、`pres-data-visualization-guide`
  - 簡報設計完整製作流程（故事結構 → 視覺設計 → 講者備稿）
  - 投影片版面模式庫（20 種版面 + 設計 Token）
  - 資料視覺化指南（圖表選擇矩陣 + LATCH + 色彩無障礙）

### 🔗 Changed
- 建立 skills 間的雙向關聯（`sre-cicd-pipeline` ↔ `devops-cicd-pipeline`、`sre-sla-impact-calculator` ↔ `sre-documentation-generation` 等）
- 更新 README.md Skills 總數為 50 個，新增 Dev 與 Presentation 分類區塊

## [1.0.3] - 2026-04-29

### ✨ Added
- 新增 GitHub Copilot Skills 安裝支援（專案層級 `.github/skills/`、使用者層級 `~/.copilot/skills/`）
- 新增 `git-repo-init` Skill：掃描目錄偵測語言與工具，自動產生 .gitignore、LICENSE、README.md 等初始化檔案

### 📝 Changed
- 更新 README.md：Skills 支援 IDE 從 2 個增加為 3 個（Copilot、Kiro、Antigravity）
- 更新 Skills 總數為 38 個

## [1.0.1] - 2026-04-21

### ✨ Added
- 新增會議錄音轉錄技能（meeting-transcriber），支援透過 whisper.cpp 將音訊/視訊轉為結構化會議紀要
- 更新 README.md 技能數量與說明

### 🐛 Fixed
- 修正版本號至 1.0.1

## [1.0.0] - 2026-04-20

### ✨ Added
- 初始版本發布
- 支援 5 種 AI IDE（Copilot、Cursor、Claude Code、Kiro、Antigravity）
- 涵蓋 9 種程式語言規範（Go、Rust、Python、TypeScript、React、Bash、YAML、Helm、Pulumi）
- 內建 37 個領域 Skills
- 支援專案層級與全域安裝
- 提供 `--dry-run` 預覽模式
