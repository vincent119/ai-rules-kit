---
name: devops-cicd-pipeline
description: "CI/CD Pipeline 設計、建置、監控與最佳化完整流程。協調 5 個專業角色：Pipeline 設計 → 基礎設施設定 → 安全掃描 → 監控設計 → 審查，產出可直接使用的 Pipeline 設定檔（YAML）。適用於「建立 CI/CD pipeline」、「GitHub Actions」、「GitLab CI」、「Jenkins pipeline」、「部署自動化」、「CI 設定」、「CD 設定」等任務。也支援現有 Pipeline 的最佳化與安全強化。注意：實際基礎設施佈建（AWS/GCP 資源建立）、伺服器設定、叢集管理不在此技能範圍內。"
keywords:
  - cicd
  - ci/cd
  - pipeline
  - github actions
  - gitlab ci
  - jenkins
  - deployment automation
  - devops
  - build pipeline
  - docker
  - kubernetes
  - sast
  - dast
  - security scanning
  - dora metrics
  - monitoring
  - canary
  - blue green
  - rolling update
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/20-cicd-pipeline
license: Apache-2.0
---

# CI/CD Pipeline — Pipeline 設計、建置、監控與最佳化

協調完整的 CI/CD Pipeline 製作流程：Pipeline 設計 → 基礎設施設定 → 安全掃描整合 → 監控設計 → 審查。

## 此技能的功能

- 設計 Pipeline 階段、分支策略、部署策略
- 產出可直接使用的 Pipeline YAML 設定檔
- 整合安全掃描（SAST、SCA、Container Scan、Secret Detection）
- 設計監控指標、告警規則、DORA Metrics Dashboard
- 交叉驗證 Pipeline 效率、可靠性、安全性

## 適用時機

- 從零設計新專案的 CI/CD Pipeline
- 為現有 Pipeline 加入安全掃描
- 設計 Pipeline 監控與告警
- 審查現有 CI/CD 設定
- 部署策略規劃（Canary / Blue-Green / Rolling）

> 若只需要 **Pipeline 文件化**（不需要產出 YAML），使用 `sre-cicd-pipeline` 技能。

## 觸發範例

以下輸入會啟動此技能：
- 「幫我建立一個 Node.js 專案的 GitHub Actions Pipeline」
- 「為這個 Python 服務設計 GitLab CI，部署到 Kubernetes」
- 「在現有的 Pipeline 加入安全掃描」
- 「設計 Canary 部署策略的 Pipeline」

啟動後，先確認以下資訊：

```
請提供以下 Pipeline 資訊：

1. 專案類型（必填）：語言/框架（Node.js、Python、Go、Java 等）
2. CI/CD 工具（必填）：GitHub Actions / GitLab CI / Jenkins
3. 部署目標（必填）：AWS / GCP / Azure / Kubernetes / Docker
4. 分支策略（選填）：GitFlow / Trunk-based
5. 現有檔案（選填）：現有 CI/CD 設定、Dockerfile 等
```

---

## 執行流程

### Phase 1：準備

1. 從使用者輸入提取資訊
2. 建立 `_workspace/` 目錄
3. 存為 `_workspace/00_input.md`
4. 若提供現有檔案，複製到 `_workspace/` 並跳過對應階段
5. 根據請求範圍決定執行模式

### Phase 2：團隊執行

| 順序 | 任務 | 負責角色 | 相依 | 產出 |
|------|------|---------|------|------|
| 1 | Pipeline 設計 | pipeline-designer | 無 | `_workspace/01_pipeline_design.md` |
| 2a | 基礎設施設定 | infra-engineer | Task 1 | `_workspace/02_pipeline_config/`（YAML 檔） |
| 2b | 安全掃描設計 | security-scanner | Task 1 | `_workspace/04_security_scan.md` |
| 3 | 監控設計 | monitoring-specialist | Tasks 1, 2a | `_workspace/03_monitoring.md` |
| 4 | Pipeline 審查 | pipeline-reviewer | Tasks 2a, 2b, 3 | `_workspace/05_review_report.md` |

Task 2a（基礎設施）與 2b（安全）**並行執行**。

**角色間資訊傳遞：**
- pipeline-designer → 將階段需求傳給 infra-engineer、掃描位置傳給 security-scanner、部署策略傳給 monitoring-specialist
- infra-engineer → 將 Log/Metric 點傳給 monitoring-specialist、映像/依賴路徑傳給 security-scanner
- security-scanner → 將安全告警規則傳給 monitoring-specialist
- pipeline-reviewer 交叉驗證所有產出，發現 🔴 必修問題時要求修正（最多 2 輪）

### Phase 3：整合與最終產出

1. 驗證 `_workspace/` 中的所有檔案
2. 確認審查報告中的 🔴 必修項目已全部處理
3. 向使用者報告最終摘要

---

## 執行模式

| 使用者請求 | 執行模式 | 部署角色 |
|-----------|---------|---------|
| 「建立 CI/CD Pipeline」、「完整設計」 | **Full Pipeline** | 全部 5 個角色 |
| 「只設定 CI」 | **CI Mode** | pipeline-designer + infra-engineer + reviewer |
| 「為現有 Pipeline 加入安全掃描」 | **Security Mode** | security-scanner + reviewer |
| 「設計 Pipeline 監控」 | **Monitoring Mode** | monitoring-specialist + reviewer |
| 「審查這份 CI/CD 設定」 | **Review Mode** | pipeline-reviewer |

---

## 各角色職責

### pipeline-designer
參考 `devops-deployment-strategies` 技能：
- Pipeline 階段設計（Lint → Test → Build → Scan → Deploy）
- 分支策略（GitFlow / Trunk-based）
- 部署策略（Rolling / Canary / Blue-Green）
- 環境對應（dev / staging / production）

### infra-engineer
- Runner / Agent 設定
- Container 設定（Dockerfile、映像管理）
- Secrets 與環境變數管理
- 快取策略

### security-scanner
參考 `devops-pipeline-security-gates` 技能：
- SAST（靜態程式碼分析）
- SCA（依賴套件漏洞掃描）
- Secret Detection（敏感資料偵測）
- Container Image Scanning
- IaC Scanning

### monitoring-specialist
- DORA Metrics（Deployment Frequency、Lead Time、MTTR、Change Failure Rate）
- Build/Deploy 告警規則
- Pipeline 效能 Dashboard

---

## 輸出目錄結構

```
_workspace/
├── 00_input.md              # 整理後的使用者輸入
├── 01_pipeline_design.md    # Pipeline 設計文件
├── 02_pipeline_config/      # Pipeline 設定檔（YAML）
│   ├── .github/workflows/   # GitHub Actions
│   ├── .gitlab-ci.yml       # GitLab CI
│   └── Dockerfile
├── 03_monitoring.md         # 監控設計文件
├── 04_security_scan.md      # 安全掃描設定
└── 05_review_report.md      # Pipeline 審查報告
```

## 延伸技能

| 技能 | 目標角色 | 功能 |
|------|---------|------|
| `devops-deployment-strategies` | pipeline-designer | Blue-Green/Canary/Rolling 部署、Rollback、DORA Metrics |
| `devops-pipeline-security-gates` | security-scanner | SAST/SCA/Secret Detection 工具選擇、Gate 位置、閾值設定 |

## 錯誤處理

| 錯誤類型 | 策略 |
|---------|------|
| 未指定 CI/CD 工具 | 預設使用 GitHub Actions |
| 未指定部署目標 | Docker Container 通用設定 |
| 現有 YAML 解析失敗 | 手動分析並建立新設定檔 |
| 🔴 審查問題 | 要求相關角色修正 → 重工 → 重新驗證（最多 2 輪） |
