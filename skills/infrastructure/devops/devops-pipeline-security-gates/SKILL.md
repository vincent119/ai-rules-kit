---
name: devops-pipeline-security-gates
description: "CI/CD Pipeline 安全閘門設計指南。提供 SAST/DAST/SCA/Container Scan/Secret Detection 的掃描工具選擇、Gate 位置策略、閾值設定與漏洞分類標準。適用於「安全閘門」、「SAST」、「DAST」、「SCA」、「Container 掃描」、「Secret 偵測」、「漏洞閾值」等 Pipeline 安全整合任務。強化 security-scanner 的設計能力。注意：實際掃描執行與漏洞修復不在此技能範圍內。"
keywords:
  - security gates
  - sast
  - dast
  - sca
  - container scanning
  - secret detection
  - iac scanning
  - semgrep
  - codeql
  - trivy
  - gitleaks
  - snyk
  - dependabot
  - owasp
  - cvss
  - vulnerability
  - pipeline security
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/20-cicd-pipeline
license: Apache-2.0
---

# Pipeline Security Gates — CI/CD 安全閘門設計指南

security-scanner 在設計 Pipeline 安全時使用的掃描工具選擇、Gate 位置與閾值設定參考。

## 此技能的功能

- 提供各掃描類型的工具選擇指南
- 提供 Pipeline 各階段的 Gate 位置策略
- 提供 Block/Warn 政策設定
- 提供 CVSS v3.1 漏洞嚴重度分類與 SLA

## 適用時機

- 為 Pipeline 設計安全掃描整合
- 選擇適合的安全掃描工具
- 搭配 `devops-cicd-pipeline` 技能使用

## 觸發範例

- 「在 GitHub Actions 加入 SAST 掃描」
- 「設定 Container Image 掃描的閾值」
- 「如何偵測 Pipeline 中的 hardcoded secrets？」

---

## 掃描類型總覽

| 類型 | 全名 | 掃描目標 | 執行時機 | 成本 |
|------|------|---------|---------|------|
| **SAST** | Static Application Security Testing | 原始碼 | Commit/PR | 低 |
| **SCA** | Software Composition Analysis | 依賴套件/函式庫 | Build 前 | 低 |
| **Secret** | Secret Detection | 程式碼中的敏感資料 | Commit/PR | 低 |
| **Container** | Container Image Scanning | Docker 映像 | Build 後 | 中 |
| **DAST** | Dynamic Application Security Testing | 執行中的應用程式 | Staging | 高 |
| **IaC** | Infrastructure as Code Scanning | Terraform/K8s | PR | 低 |
| **License** | License Compliance | 開源授權 | Build | 低 |

---

## 工具選擇指南

### SAST（靜態分析）

| 工具 | 語言支援 | 開源 | 特點 |
|------|---------|------|------|
| **Semgrep** | 20+ 語言 | 是 | 自訂規則容易、速度快 |
| **CodeQL** | 10+ 語言 | 是（GitHub） | GitHub 原生、深度分析 |
| **SonarQube** | 25+ 語言 | 部分 | 品質 + 安全整合 |
| **Bandit** | 僅 Python | 是 | Python 專用 |
| **ESLint Security** | 僅 JS/TS | 是 | ESLint Plugin |

### SCA（依賴套件分析）

| 工具 | 特點 |
|------|------|
| **Dependabot** | GitHub 原生、自動 PR |
| **Snyk** | 最大漏洞資料庫、自動修復建議 |
| **OWASP Dependency-Check** | OWASP 官方、開源 |
| **Trivy** | Container + SCA 整合 |
| **npm audit / pip-audit** | 語言原生工具 |

### Secret Detection

| 工具 | 特點 |
|------|------|
| **Gitleaks** | 完整 Git 歷史掃描、速度快 |
| **TruffleHog** | Entropy + Pattern 雙重偵測 |
| **detect-secrets** | Yelp 開發、支援 pre-commit hook |
| **GitHub Secret Scanning** | GitHub 原生、Partner Pattern |

### Container Scanning

| 工具 | 特點 |
|------|------|
| **Trivy** | 最全面、OS + App 套件 |
| **Grype** | Anchore 開源、速度快 |
| **Docker Scout** | Docker 官方 |
| **Snyk Container** | 含修復指引 |

### IaC Scanning

| 工具 | 目標 |
|------|------|
| **tfsec** | Terraform |
| **Checkov** | Terraform、K8s、CloudFormation |
| **KICS** | 多 IaC 支援 |
| **kubescape** | 僅 Kubernetes |

---

## Gate 位置策略

```
[1. Pre-Commit]
├── Secret Detection（Gitleaks pre-commit hook）
└── Lint Security Rules

[2. PR / Commit]
├── SAST（Semgrep / CodeQL）
├── SCA（Dependabot / Snyk）
├── Secret Detection（完整掃描）
├── License Check
└── IaC Scan（若適用）

[3. Build]
├── Container Image Scan（Trivy）
└── SBOM 產生（Software Bill of Materials）

[4. Staging]
├── DAST（選用）
└── 整合安全測試

[5. Production 部署]
└── 最終審核 Gate（安全報告審查）
```

---

## Gate Block / Warn 政策

| 掃描類型 | Critical | High | Medium | Low |
|---------|----------|------|--------|-----|
| SAST | Block | Block | Warn | Ignore |
| SCA（CVE） | Block | Block | Warn | Ignore |
| Secret | Block | Block | Block | Warn |
| Container | Block | Warn | Ignore | Ignore |
| IaC | Block | Warn | Ignore | Ignore |
| License（GPL） | Block | Warn | Ignore | Ignore |

---

## 漏洞嚴重度分類（CVSS v3.1）

| 等級 | CVSS 分數 | 修復 SLA | Gate 行動 |
|------|---------|---------|---------|
| Critical | 9.0~10.0 | 24 小時內 | Block 部署 |
| High | 7.0~8.9 | 7 天內 | Block 部署 |
| Medium | 4.0~6.9 | 30 天內 | Warn，允許部署 |
| Low | 0.1~3.9 | 90 天內 | Ignore |

---

## GitHub Actions 整合範例

### Semgrep SAST

```yaml
- name: Semgrep SAST
  uses: semgrep/semgrep-action@v1
  with:
    config: >-
      p/security-audit
      p/owasp-top-ten
  env:
    SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

### Trivy Container Scan

```yaml
- name: Trivy Container Scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ env.IMAGE_TAG }}
    format: sarif
    exit-code: 1
    severity: CRITICAL,HIGH
```

### Gitleaks Secret Detection

```yaml
- name: Gitleaks Secret Detection
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## SBOM（Software Bill of Materials）

建議在 Build 階段產生 SBOM，記錄所有依賴套件：

```yaml
- name: Generate SBOM
  uses: anchore/sbom-action@v0
  with:
    image: ${{ env.IMAGE_TAG }}
    format: spdx-json
    output-file: sbom.spdx.json
```
