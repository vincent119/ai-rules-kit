---
name: devops-deployment-strategies
description: "部署策略目錄。提供 Blue-Green、Canary、Rolling、A/B Test、Shadow 部署策略的優缺點比較、實作模式、Rollback 程序、Health Check 設計與 DORA Metrics。適用於「部署策略」、「Blue-Green」、「Canary」、「Rolling」、「Rollback」、「零停機部署」、「DORA Metrics」等 Pipeline 設計任務。強化 pipeline-designer 的設計能力。注意：實際基礎設施設定與監控工具設定不在此技能範圍內。"
keywords:
  - deployment strategy
  - blue green
  - canary deployment
  - rolling update
  - a/b testing
  - shadow deployment
  - rollback
  - zero downtime
  - health check
  - dora metrics
  - deployment frequency
  - lead time
  - mttr
  - change failure rate
  - kubernetes deployment
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.0
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/20-cicd-pipeline
license: Apache-2.0
---

# Deployment Strategies — 部署策略目錄

pipeline-designer 在設計部署 Pipeline 時使用的部署策略、Rollback 程序、Health Check 與 DORA Metrics 參考。

## 此技能的功能

- 提供各部署策略的優缺點比較與適用情境
- 提供 Kubernetes 部署設定範例
- 提供 Rollback 觸發條件與程序
- 提供三層 Health Check 設計
- 提供 DORA Metrics 定義與目標值

## 適用時機

- 選擇適合的部署策略
- 設計 Rollback 機制
- 搭配 `devops-cicd-pipeline` 技能使用

## 觸發範例

- 「我要零停機部署，用哪種策略？」
- 「Canary 部署怎麼設定自動 Rollback？」
- 「計算我們的 DORA Metrics」

---

## 部署策略比較

| 策略 | 停機時間 | 風險 | 基礎設施成本 | Rollback 速度 | 適用情境 |
|------|---------|------|------------|--------------|---------|
| **Rolling** | 無 | 中 | 低 | 中 | 一般 Web 服務 |
| **Blue-Green** | 無 | 低 | 2x | 即時 | 關鍵任務服務 |
| **Canary** | 無 | 極低 | 略增 | 即時 | 高流量系統 |
| **Recreate** | 有 | 高 | 無 | 慢 | Dev/Staging 環境 |
| **A/B Test** | 無 | 低 | 略增 | 即時 | 功能實驗 |
| **Shadow** | 無 | 無 | 2x | N/A | 效能/相容性驗證 |

---

## 各策略詳細說明

### 1. Rolling Update（滾動更新）

```
Server pool: [v1] [v1] [v1] [v1]
Step 1:      [v2] [v1] [v1] [v1]  ← 1 個替換
Step 2:      [v2] [v2] [v1] [v1]  ← 2 個替換
Step 3:      [v2] [v2] [v2] [v1]  ← 3 個替換
Step 4:      [v2] [v2] [v2] [v2]  ← 完成
```

**Kubernetes 設定：**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1   # 同時最多下線幾個
    maxSurge: 1         # 同時最多新增幾個
```

**注意**：v1 + v2 共存期間需確保 API 向下相容。

---

### 2. Blue-Green 部署

```
Blue（現行）: [v1] [v1] [v1]  ← 100% 流量
Green（待機）: [v2] [v2] [v2]  ← 0% 流量

切換後：
Blue: [v1] [v1] [v1]  ← 0%（待機/移除）
Green: [v2] [v2] [v2]  ← 100% 流量
```

**程序：**
1. 部署新版本到 Green 環境
2. 對 Green 執行 Smoke Test / Health Check
3. 切換 Load Balancer 流量到 Green
4. 監控 Blue 環境（Rollback 待機）
5. 穩定後移除 Blue 或保留至下次部署

**Rollback**：重新切換 Load Balancer 到 Blue（秒級完成）

---

### 3. Canary 部署

```
Stage 1: [v1 x 95%] [v2 x 5%]   ← 5% 流量開始
Stage 2: [v1 x 80%] [v2 x 20%]  ← 指標正常則擴大
Stage 3: [v1 x 50%] [v2 x 50%]  ← 繼續擴大
Stage 4: [v2 x 100%]             ← 全量發布
```

**各階段驗證標準：**

| 階段 | 流量 | 等待時間 | 驗證指標 |
|------|------|---------|---------|
| 1 | 5% | 10~30 分鐘 | 錯誤率、延遲 |
| 2 | 20% | 30~60 分鐘 | 加入業務指標 |
| 3 | 50% | 1~2 小時 | 全部指標 |
| 4 | 100% | — | 完成 |

**自動 Rollback 條件：**
- 錯誤率 > 1%（正常值的 2 倍）
- p99 延遲 > 2 秒（較正常增加 50%）
- 業務指標異常（轉換率、營收等）

---

### 4. A/B Testing（功能實驗）

- 依用戶群分流（User ID、地區、裝置類型）
- 整合 Feature Flag 系統
- 達到統計顯著性後決策

---

### 5. Shadow（鏡像）

- 複製 Production 流量到新版本（回應丟棄）
- 僅用於效能、錯誤率、相容性驗證
- 對用戶零影響

---

## Health Check 設計

### 三層 Health Check

| 類型 | 驗證內容 | Endpoint | 間隔 |
|------|---------|---------|------|
| **Liveness** | 程序存活 | `/healthz` | 10s |
| **Readiness** | 可接收流量 | `/readyz` | 5s |
| **Startup** | 初始化完成 | `/healthz` | 1s（最長 300s） |

### Health Check 回應格式

```json
{
  "status": "healthy",
  "version": "2.1.0",
  "uptime": 86400,
  "checks": {
    "database": { "status": "healthy", "latency": "2ms" },
    "redis": { "status": "healthy", "latency": "1ms" },
    "external_api": { "status": "degraded", "latency": "500ms" }
  }
}
```

### Kubernetes Probe 設定

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /readyz
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3
```

---

## Rollback 程序

### 自動 Rollback 觸發條件

| 指標 | 閾值 | 持續時間 |
|------|------|---------|
| HTTP 5xx 率 | > 5% | 連續 2 分鐘 |
| 延遲 p99 | > 3s | 連續 5 分鐘 |
| Pod 重啟次數 | > 3 次 | 10 分鐘內 |
| Memory/CPU | > 90% | 連續 5 分鐘 |

### Rollback 步驟

```
1. 偵測到異常指標
2. 觸發自動 Rollback（或人工決策）
3. 切換流量到前一版本
4. 驗證服務恢復正常
5. 建立 Incident 記錄
6. 分析根因，修正後重新部署
```

---

## DORA Metrics

Google DevOps Research and Assessment 定義的 4 個關鍵指標：

| 指標 | 定義 | Elite 目標 | High 目標 |
|------|------|-----------|---------|
| **Deployment Frequency** | 部署到 Production 的頻率 | 每天多次 | 每天一次 |
| **Lead Time for Changes** | 從 Commit 到 Production 的時間 | < 1 小時 | 1 天~1 週 |
| **Change Failure Rate** | 導致 Production 問題的部署比例 | < 5% | 5%~10% |
| **MTTR** | 從 Production 故障到恢復的時間 | < 1 小時 | < 1 天 |

### DORA Metrics 計算

```
Deployment Frequency = 部署次數 / 時間週期

Lead Time = Production 部署時間 - Commit 時間（平均值）

Change Failure Rate = 導致 Rollback 或 Hotfix 的部署數 / 總部署數

MTTR = 恢復時間 - 故障開始時間（平均值）
```
