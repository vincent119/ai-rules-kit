# Changelog

所有重要變更皆記錄於此檔案。格式基於 [Keep a Changelog](https://keepachangelog.com/)，版本遵循 [Semantic Versioning](https://semver.org/)。

## [Unreleased]

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
