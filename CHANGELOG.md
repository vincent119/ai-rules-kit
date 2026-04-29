# Changelog

所有重要變更皆記錄於此檔案。格式基於 [Keep a Changelog](https://keepachangelog.com/)，版本遵循 [Semantic Versioning](https://semver.org/)。

## [Unreleased]

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
