---
name: sre-incident-postmortem
description: "事故事後分析（Postmortem）完整流程。協調 7 個執行階段：資訊收集 → 時間軸重建 → 根因分析 → 影響評估 → 改善規劃 → 報告審查 → 整合報告，最終產出完整的 Postmortem 報告。適用於「寫事故報告」、「post-incident 分析」、「RCA 報告」、「事故時間軸整理」、「建立改善措施」等請求。注意：即時 Incident Response（on-call）、監控系統設定、告警配置不在此技能範圍內。"
keywords:
  - incident
  - postmortem
  - post-mortem
  - incident report
  - rca
  - root cause analysis
  - timeline
  - impact assessment
  - remediation
  - sre
  - blameless
  - mttd
  - mttr
  - sla
  - slo
  - error budget
  - 5 whys
  - fishbone
  - fault tree
author: Vincent Yu
status: published
updated: '2026-05-07'
version: 1.0.1
tag: skill
type: skill
source: https://github.com/revfactory/harness-100/tree/main/en/25-incident-postmortem
license: Apache-2.0
---

# Incident Postmortem — 事故事後分析流程

協調完整的 Postmortem 分析流程：資訊收集 → 時間軸重建 → 根因分析 → 影響評估 → 改善規劃 → 報告審查 → 整合報告。

## 此技能的功能

- 引導使用者提供事故資訊（描述、證據、影響、已採取行動）
- 依序執行 7 個階段，每階段產出結構化文件
- 交叉驗證各階段一致性（時間軸 ↔ 根因 ↔ 影響 ↔ 改善措施）
- 確保 Blameless 文化（聚焦系統/流程，不歸咎個人）
- 產出完整的 Postmortem 報告

## 適用時機

- 服務中斷、效能降級、資料異常等事故發生後
- 需要正式的 RCA 文件
- 需要向管理層或客戶說明事故經過
- 需要建立改善行動計畫

## 觸發範例

以下輸入會啟動此技能：
- 「幫我寫昨天資料庫當機的 postmortem」
- 「我們剛發生了一個 SEV-2 事故，需要 RCA 報告」
- 「付款服務昨晚中斷了 45 分鐘，幫我分析根因」
- 「整理一下這次事故的時間軸和改善計畫」

啟動後，先詢問使用者提供以下資訊（未提供的項目可跳過）：

```
請提供以下事故資訊：

1. 事故描述（必填）：發生了什麼？何時開始？何時恢復？
2. 證據（選填）：Log 片段、Metric 截圖、告警記錄、聊天記錄
3. 影響資訊（選填）：受影響用戶數、服務名稱、持續時間
4. 已採取行動（選填）：緊急措施、Rollback、通知等
```

---

## 執行流程

### Phase 1：資訊收集

從使用者輸入中提取並整理：
- **事故描述**：發生了什麼、何時發生
- **證據**（選填）：Log、Metric 截圖、聊天記錄、告警記錄
- **影響資訊**（選填）：受影響用戶數、服務、持續時間
- **已採取行動**（選填）：已執行的緊急措施

建立 `_workspace/` 目錄，將整理後的輸入存為 `_workspace/00_input.md`。

### Phase 2：時間軸重建

**目標**：將混亂的事故事件依時間順序重建

執行內容：
1. 收集所有相關事件（Log、告警、部署記錄、Metric 變化）
2. 以 UTC 時間戳排序
3. 識別資訊缺口，標記需進一步調查的項目
4. 標記關鍵轉折點（事故開始、偵測、升級、緩解、恢復）
5. 計算 MTTD（平均偵測時間）與 MTTR（平均恢復時間）

輸出：`_workspace/01_timeline.md`

格式：
```
# 事故時間軸

## 事故概覽
- 事故 ID：INC-YYYY-MMDD-NNN
- 嚴重等級：SEV-1 / SEV-2 / SEV-3
- 受影響服務：[服務清單]
- 事故期間：YYYY-MM-DD HH:MM ~ HH:MM (UTC)
- 總停機時間：Xh Xm
- MTTD：Xm
- MTTR：Xh Xm

## 時間軸
| 時間 (UTC) | 事件 | 來源 | 類別 | 備註 |
|-----------|------|------|------|------|

## 資訊缺口
| 時間區間 | 缺少資訊 | 需進一步調查 |

## 關鍵指標變化
| 指標 | 正常值 | 事故期間 | 峰值 | 恢復後 |
```

### Phase 3：根因分析

**目標**：從表面症狀追溯到根本原因

執行內容（參考 `sre-rca-methodology` 技能）：
1. **5 Whys 分析**：從表面症狀重複問「為什麼」至少 5 次
2. **Fishbone 圖**：從 People、Process、Technology、Environment 四個維度分類原因
3. **Fault Tree 分析**：將事故分解為樹狀結構，找出必要/充分條件
4. **貢獻因素識別**：找出加劇事故的間接因素
5. **證據驗證**：為每個假設收集支持/反駁證據

原則：
- 避免單一原因陷阱，考慮複合原因
- Blameless：聚焦「系統為何允許這件事發生」
- 為每個原因標明證據等級（Confirmed / Estimated / Unconfirmed）

輸出：`_workspace/02_root_cause.md`

### Phase 4：影響評估

**目標**：量化事故的業務影響

執行內容（參考 `sre-sla-impact-calculator` 技能）：
1. **用戶影響**：受影響用戶數、比例、地區、用戶群
2. **營收影響**：直接損失、機會成本、補償費用（最佳/預期/最差情境）
3. **SLA 影響**：SLA/SLO 違反狀況、Error Budget 消耗、信用退款義務
4. **聲譽影響**：社群媒體反應、媒體報導、客戶流失風險
5. **營運成本**：事故應對投入的人力、時間、額外基礎設施費用

原則：
- 優先使用量化數據；資料不足時說明估算依據並標記為 Estimated
- 區分直接影響與間接影響（漣漪效應）
- 提供最佳/預期/最差三種情境

輸出：`_workspace/03_impact_assessment.md`

### Phase 5：改善規劃

**目標**：建立可執行的改善行動計畫

執行內容：
1. **短期行動（立即~1週）**：立即降低風險的措施
2. **中期行動（1~4週）**：流程改善、監控強化等系統性改善
3. **長期行動（1~3個月）**：架構調整、文化轉變等根本性改善
4. **行動項目管理**：每個措施指定負責人、截止日期、追蹤方式
5. **效果驗證標準**：設定 KPI 衡量每個措施的效果

原則：
- 可行性優先：只提出實際可執行的措施
- 每個措施遵循 SMART 原則
- 縱深防禦：在預防、偵測、應對、恢復各層面布置措施

輸出：`_workspace/04_remediation_plan.md`

### Phase 6：報告審查

**目標**：交叉驗證各階段一致性，確保報告品質

驗證項目：
- 時間軸 ↔ 根因：觸發事件是否與根因一致？
- 根因 ↔ 改善措施：所有根因都有對應措施？
- 影響 ↔ 改善措施：措施規模是否與影響嚴重度相稱？
- Blameless 文化：是否有歸咎個人的表述？
- 可執行性：所有行動項目是否符合 SMART 原則？

發現問題時：
- RED（必須修正）：立即要求修正，最多重新驗證 2 次
- YELLOW（建議修正）：提出建議
- GREEN（資訊性）：記錄但不阻擋

輸出：`_workspace/05_review_report.md`

### Phase 7：整合報告產出

所有驗證通過後，整合所有分析產出完整的 Postmortem 報告。

輸出格式參考 `sre-documentation-generation` 技能的 `POST-MORTEM.template.md` 範本，確保與團隊既有文件格式一致。

輸出：`_workspace/postmortem_report.md`

格式：
```
# Incident Postmortem Report

## 執行摘要
## 事故概覽
## 時間軸
## 根因分析
## 影響評估
## 改善計畫
## 經驗教訓
## 附錄
```

---

## 輸出目錄結構

```
_workspace/
├── 00_input.md              # 整理後的使用者輸入
├── 01_timeline.md           # 事故時間軸
├── 02_root_cause.md         # 根因分析
├── 03_impact_assessment.md  # 影響評估
├── 04_remediation_plan.md   # 改善計畫
├── 05_review_report.md      # 審查報告
└── postmortem_report.md     # 完整 Postmortem 報告
```

## 錯誤處理

- 資訊不足時：明確標記假設，列出需進一步調查的項目
- 多個根因候選時：全部列出並依證據等級排序
- 無法重現問題時：詳細記錄環境因素與時間條件
- 負責人無法指定時：以團隊/角色層級指定，並標記需確認具體負責人
- 數據缺失時：使用行業基準值估算，並明確標注為估算值
