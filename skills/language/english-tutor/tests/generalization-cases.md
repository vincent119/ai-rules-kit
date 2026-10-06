# English Tutor Generalization Cases

本文件用來驗證 `english-tutor` 是否能將既有分析原則遷移到未直接寫入 templates、references 或 regression cases 的新英文材料。

Generalization evaluation 與 regression evaluation 的目的不同：

- Regression：確認已知能力沒有退化。
- Generalization：確認 Skill 能理解並遷移規則，而不是只重現 reference 中的範例。

## 測試原則

Generalization cases 應遵守：

1. 優先使用未出現在 Skill 教材中的新句子。
2. 可以測試相同 grammar principle，但應更換詞彙與語境。
3. 不要求輸出逐字一致。
4. 只驗證核心 routing、grammar、meaning、naturalness 與 reasoning。
5. 不因回答風格不同判定失敗。
6. 不應為了讓測試通過而把測試句子加入 references。
7. 若案例揭露新的通用規則缺口，才考慮修改 Skill。
8. 若只是單一例句知識不足，不應立即擴充 core reference。
9. 若測試案例本身已直接出現在 templates 或 references，該案例不得作為有效 generalization 證據，應更換測試資料。
10. 存在多種合理 grammar framework 或 routing 時，可標記 `AMBIGUOUS`，但必須說明原因。

每個案例評為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`

---

# Routing Generalization

## GEN-001 — Word Analysis

### Input

在：

`The situation changed dramatically overnight.`

這個 `dramatically` 怎麼解釋？

### Expected intent

`word`

### Expected template

`templates/word-analysis.md`

### Must identify

- `dramatically` = adverb
- 它修飾 `changed`
- 表示變化的程度／顯著程度
- 不需要分析整句所有成分

### Must not

- 將 `dramatically` 標成 adjective
- 將它標成 C
- 因為使用者提供完整句子就自動 route 到完整 sentence analysis
- 展開與問題無關的所有 dictionary senses

---

## GEN-002 — Phrase Analysis

### Input

`shut the service down`

這個片語怎麼理解？

### Expected intent

`phrase`

### Expected template

`templates/phrase-analysis.md`

### Must identify

- `shut ... down` 應作整體分析
- `the service` 是其受詞
- `down` 不應只按字面「向下」解釋
- 在系統／服務語境通常涉及停止服務或關閉

### Must explain

片語的整體語意優先於逐字翻譯。

### Must not

- 將 `down` 單純翻成「向下」
- 因為涉及 service 就展開完整服務架構教學
- 強制 route 到完整 sentence analysis

---

## GEN-003 — Pattern Analysis

### Input

`Keep the connection alive.`

請分析這個句型。

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `keep` = V
- `the connection` = NP / O
- `alive` = AdjP / OC
- 可抽象為 `keep + O + OC`

### Must explain

`alive` 描述 O 所維持的狀態。

### Must not

- 將 `alive` 標成 C
- 將 `the connection` 標成 S
- 因為既有 reference 有 `keep + O + V-ing`，就強迫本句套成 `keep + O + V-ing`

---

## GEN-004 — Sentence Analysis

### Input

分析：

`The deployment became unstable after the configuration change.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

核心：

`SVC`

其中：

- `The deployment` = NP / S
- `became` = linking V
- `unstable` = AdjP / C
- `after the configuration change` = PP

### Must explain

PP 提供時間／事件關係，但不屬於核心 `SVC`。

### Must not

- 將 `unstable` 標成 OC
- 將 PP 直接標成 C
- 因為 `deployment` 可能是技術詞就假設一定是 Kubernetes Deployment

---

## GEN-005 — Word Comparison with New Vocabulary

### Input

`safe` 和 `safely` 有什麼差別？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

- `safe` 通常是 adjective
- `safely` 是 adverb
- 兩者具有相關語意，但 grammatical function 不同
- 是否能替換取決於句法位置

### Minimal pair

`The connection is safe.`

vs.

`The data was transmitted safely.`

### Must explain

第一句：

`safe`

描述 `the connection` 的狀態。

第二句：

`safely`

以副詞功能說明傳送動作進行的方式。

### Must not

- 因兩者中文都可能涉及「安全」就宣稱可以直接互換
- 將 `safely` 標成 adjective
- 將 `safe` 與 `safely` 的差異只解釋成拼字不同
- 展開與問題無關的 security 技術教學

---

# Grammar Generalization

## GEN-006 — Object Complement with Adjective

### Input

分析：

`The update made the service unavailable.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

核心：

`SVOC`

其中：

- `The update` = NP / S
- `made` = V
- `the service` = NP / O
- `unavailable` = AdjP / OC

### Must explain

`unavailable`

描述：

`the service`

在 `make + O + OC` 結構中形成的結果狀態。

### Must not

- 使用 `make + O + C`
- 將 `unavailable` 標成 C
- 將 `the service` 標成 IO

---

## GEN-007 — V-ing as Subject

### Input

分析：

`Running multiple replicas improves availability.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `Running multiple replicas` 整體作 S
- `improves` = finite V
- `availability` = NP / O
- `multiple replicas` 是 `Running` 內部的受詞

### Must explain

`Running`

具有 V-ing 形式，但不能只依表面形式決定所有文法功能。

### Must not

- 將 `Running` 當主要 finite verb
- 將 `multiple replicas` 當整句 S
- 因為看到 V-ing 就停止於「gerund」標籤而不分析其句中功能

---

## GEN-008 — Progressive V-ing

### Input

分析：

`The server is processing the request.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The server` = NP / S
- `is processing` 是 progressive verb construction
- `the request` = NP / O
- `processing` 的 V-ing 形式在此是 progressive construction 的一部分

### Must not

- 將 `processing` 分析成 gerund
- 將 `processing` 分析成 OC
- 因為 V-ing reference 常談 subject / OC 就強行套用那些案例

---

## GEN-009 — Infinitive Purpose

### Input

分析：

`The client retries the request to improve reliability.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The client` = NP / S
- `retries` = V
- `the request` = NP / O
- `to improve reliability` = infinitival construction
- 此處主要表達目的

### Must not

- 只標 `to + V` 為 infinitive 而不說明其功能
- 將 `to improve reliability` 直接標成 O
- 將 `reliability` 當成主句 O

---

## GEN-010 — Prepositional Phrase Attachment

### Input

分析：

`The service failed after the deployment.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The service` = NP / S
- `failed` = V
- `after the deployment` = PP
- PP 與 `failed` 所描述的事件形成時間關係

### Must not

- 將 PP 自動標成 C
- 將 `deployment` 直接標成主句 O
- 只因 PP 提供重要資訊就稱為 OC

---

# Pattern Generalization

## GEN-011 — keep + O + adjective

### Input

`Keep the cache warm.`

這個句型怎麼分析？

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `keep` = V
- `the cache` = NP / O
- `warm` = AdjP / OC
- 可抽象為 `keep + O + OC`

### Must explain

`warm`

描述 cache 要維持的狀態。

### Must not

- 因 reference 中已有 `keep + O + V-ing` 就把 `warm` 當 V-ing
- 將 `warm` 標成 C
- 將所有 `keep` 結構視為完全相同

---

## GEN-012 — leave + O + PP

### Input

`The failure left the cluster in an inconsistent state.`

請分析 `left the cluster in an inconsistent state`。

### Expected intent

`phrase` 或 `pattern`

若重點是局部意思：

`phrase`

若重點是可重用結構：

`pattern`

兩者皆可接受，但必須說明採用的分析層級。

### Must identify

- `left` = V
- `the cluster` = NP / O
- `in an inconsistent state` = PP
- PP 語意上描述結果狀態

### Must not

- 僅因 PP 描述 O 的結果狀態就自動標成 OC
- 將 `cluster` 標成 IO
- 把 PP 與 grammatical function 當成同一分析層級

---

## GEN-013 — send + IO + DO with Clear Recipient

### Input

分析：

`Send the client a notification.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

`send + IO + DO`

其中：

- `the client` = NP / IO
- `a notification` = NP / DO

### Must explain

IO 是接收者，DO 是被傳送的內容。

### Must not

- 將 `the client` 標成 O 而忽略 double-object structure
- 將 `a notification` 標成 OC
- 因為先前測過 `send + O + as + NP` 就錯套該結構

---

## GEN-014 — send + O + as + NP with New Vocabulary

### Input

分析：

`Send the payload as XML.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `send` = V
- `the payload` = NP / O
- `as XML` = `as + NP`
- 本 Skill 可預設分析為 PP
- 語意上說明 payload 被傳送時的形式

### Must not

- 將 `payload` 標成 IO
- 將 `as XML` 一律標成 OC
- 因為 XML 是技術詞就展開 XML 教學

---

# Vocabulary Generalization

## GEN-015 — close vs closely

### Input

`close` 和 `closely` 都可以當副詞嗎？有什麼差別？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

- `close` 可以具有 adverb 用法
- `closely` 也是 adverb
- 兩者不能視為完全相同的副詞形式
- 實際意思與搭配不同

### Minimal pair

`Stay close to the server.`

vs.

`Monitor the server closely.`

### Must explain

`close`

在第一句表示：

> 距離接近／靠近

`closely`

在第二句表示：

> 仔細地／密切地

兩者雖然形式相關，但不能因為都有副詞用法就直接互換。

### Must not

- 宣稱 `closely` 只是 `close` 的一般 `-ly` 副詞形式
- 宣稱兩者意思完全相同
- 只根據 `-ly` 判斷語意
- 因為例句出現 server 就展開技術教學

---

## GEN-016 — high vs highly

### Input

`high` 和 `highly` 有什麼差別？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

- `high` 可以依語境作 adjective 或 adverb
- `highly` 是 adverb
- `highly` 通常不是單純表示物理位置「高」
- 兩者的搭配與語意不同

### Minimal pair

`The CPU usage is high.`

vs.

`This approach is highly effective.`

### Must explain

第一句：

`high`

描述 CPU usage 的程度／數值很高。

第二句：

`highly`

修飾 `effective`，表示：

> 非常／高度地

### Must not

- 宣稱 `highly` 只是所有 `high` 用法的副詞版本
- 宣稱兩者在所有語境可以互換
- 只因中文都可能翻成「高」就視為相同用法
- 展開 CPU 效能教學

---

## GEN-017 — Collocation Generalization

### Input

為什麼通常說：

`heavy traffic`

而不是：

`strong traffic`

### Expected intent

`phrase` 或 `comparison`

若重點是搭配：

`phrase`

若重點是比較：

`comparison`

兩者皆可接受，但分析必須以 collocation 為核心。

### Must identify

- `heavy traffic` 是自然且常見的 collocation
- `strong` 與 `heavy` 即使在某些中文語境都可能表達「強／重／大量」概念，也不能因此互換
- collocation 不能只靠中文翻譯推導

### Must explain

自然英文中的 adjective + noun 搭配具有慣用限制。

### Must not

- 只回答「英文就是這樣」
- 宣稱 `heavy` 和 `strong` 一般而言意思相同
- 宣稱所有表示大量的名詞都搭配 `heavy`
- 展開大量與目前問題無關的 adjective + noun 搭配

---

# Technical Context Generalization

## GEN-018 — Technical Verb Generalization

### Input

在：

`The proxy forwards traffic to the backend.`

這個 `forwards` 是什麼意思？

### Expected intent

`word`

### Expected template

`templates/word-analysis.md`

### Must identify

在目前 technical context：

`forward`

是 verb。

此處表示：

> 將流量轉送／轉發到另一個目的地

並辨識：

`traffic`

是被轉送的內容。

### Must explain

只補充理解 `forward` 所需的最小技術背景。

### Must not

- 只使用一般英文「向前」的字面意思解釋
- 因為出現 proxy / backend 就展開 reverse proxy architecture
- 自行假設 HTTP、TCP、Nginx 或特定產品
- 因為提供完整句子就過度展開完整 sentence analysis

### Expected references

- `references/vocabulary/usage.md`
- `references/domains/technical-context.md`

---

## GEN-019 — Ambiguous Technical Referent

### Input

在：

`The worker is stuck.`

這個 `worker` 指什麼？

### Expected intent

`word`

### Expected template

`templates/word-analysis.md`

### Must identify

目前上下文不足以唯一判定 `worker` 的技術指涉。

在不同系統中可能指：

- background worker
- worker process
- worker thread
- worker node
- job worker
- 其他負責執行工作的元件或執行單元

但目前句子不足以確定是哪一種。

### Must explain

需要更多 context 才能確定實際 referent。

回答可以提出少量主要可能性，但不能自行選定其中一個。

### Must not

- 武斷判定為 Kubernetes worker node
- 武斷判定為 background job worker
- 自行假設 programming language
- 自行假設 framework
- 自行假設 infrastructure 或 cloud provider
- 展開與英文問題無關的系統架構教學

### Expected references

- `references/vocabulary/usage.md`
- `references/domains/technical-context.md`

---

## GEN-020 — Domain Entity + Grammar

### Input

分析：

`The Pod remains healthy during the rollout.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The Pod` = NP / S
- `remains` = linking V
- `healthy` = AdjP / C
- `during the rollout` = PP
- 核心結構 = SVC

### Must explain

在 Kubernetes context：

`Pod`

可能指 Kubernetes resource。

但這不改變主要 grammar analysis。

`during the rollout`

提供 rollout 期間的時間關係，不屬於核心 `SVC`。

### Must not

- 因 `Pod` 是 Kubernetes resource 就忽略句法分析
- 展開 Pod lifecycle 或 Kubernetes architecture 教學
- 將 `healthy` 標成 OC
- 將 `during the rollout` 標成 C
- 將 PP 與 grammatical function 混為同一分析層級

### Expected references

- `references/grammar/core.md`
- `references/domains/technical-context.md`

---

# Routing Boundary Generalization

## GEN-021 — English Technical Question without Learning Intent

### Input

`Why does the server keep restarting?`

### Expected routing

不應觸發 `english-tutor`。

使用者表面上使用英文，但沒有表達英文學習意圖；在一般情況下應將它理解為 server troubleshooting / technical question。

### Must identify

- 英文內容本身不是觸發 English Tutor 的充分條件
- technical content 本身也不是觸發 English Tutor 的充分條件
- 使用者主要意圖應優先於句子中是否存在可分析的英文結構

### Must not

- 自動分析 `keep restarting`
- 自動講解 `keep + V-ing`
- 因輸入是英文就啟動 English Tutor
- 把 troubleshooting 問題改成英文課

---

## GEN-022 — Same Sentence with Explicit Learning Intent

### Input

`Why does the server keep restarting? 這句的 keep restarting 怎麼分析？`

### Expected intent

`phrase` 或 `pattern`

若重點是：

`keep restarting`

在原句中的局部意思，可 route：

`phrase`

若重點是：

`keep + V-ing`

的可重用規則，可 route：

`pattern`

兩者皆可接受，但分析深度必須符合使用者的英文學習意圖。

### Expected template

可接受：

- `templates/phrase-analysis.md`
- `templates/pattern-analysis.md`

### Must identify

- 使用者已明確提出英文學習意圖
- `keep restarting` 不能被當成純 troubleshooting 問題
- `restarting` 是 V-ing form
- `keep + V-ing` 在此表示某動作持續或反覆發生

### Must explain

在：

`the server keeps restarting`

中，

`keeps restarting`

表示：

> server 持續／反覆重新啟動

若進一步抽象句型，可表示為：

`keep + V-ing`

→ 持續／反覆做某事

### Must not

- 只回答 server 為什麼重新啟動
- 因為是技術內容而忽略英文分析要求
- 將 `restarting` 自動標成 gerund
- 將此處錯套成 `keep + O + V-ing`
- 展開與英文問題無關的 server troubleshooting

### Expected references

- `references/grammar/core.md`
- 必要時 `references/sentence-patterns/core.md`
- 必要時 `references/domains/technical-context.md`

---

# Generalization Pass Criteria

一次 generalization evaluation 應確認：

- [ ] 所有測試案例內容完整，沒有因檔案截斷而缺少驗收條件
- [ ] 未直接出現在 templates、references 或 regression cases 的新句子仍能正確分析
- [ ] word / phrase / pattern / sentence / comparison routing 正確
- [ ] 問題只詢問局部單字時，不因提供完整句子而過度 route
- [ ] phrase 與 pattern 邊界可依使用者真正學習意圖判斷
- [ ] `S / V / O / C / OC / IO / DO` 使用一致
- [ ] `NP / VP / PP / AdjP / AdvP / Clause` 與 grammatical function 分離
- [ ] C / OC 沒有混用
- [ ] O / IO / DO 沒有混用
- [ ] V-ing 依實際功能分析，而不是固定標成 gerund
- [ ] progressive V-ing 能與其他 V-ing usage 區分
- [ ] infinitive 不只辨識形式，也能說明實際功能
- [ ] PP 先分析形式與 attachment，不因語意重要就自動標成 C 或 OC
- [ ] collocation 不依中文直譯推導
- [ ] `-ly` 形式不被機械式解讀成「相同詞義的副詞版本」
- [ ] technical context 不造成不必要的領域教學
- [ ] technical referent 不足時不自行補 architecture、product 或 infrastructure
- [ ] 純英文 technical question 不因語言形式誤觸 English Tutor
- [ ] 明確英文學習意圖能正確觸發 English Tutor
- [ ] grammatical / natural / common / register / interchangeable 維持不同判斷維度
- [ ] 沒有為了讓 generalization 測試通過而把測試例句加入 references

## Evaluation Result

每個案例只能標記為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`

### PASS

所有必要條件成立，且沒有違反 `Must not`。

### FAIL

至少一項必要分析錯誤、routing 錯誤，或違反 `Must not`。

### AMBIGUOUS

僅在以下情況使用：

- 存在多種合理 grammar framework
- 測試明確允許多種 routing，且無法唯一決定
- context 本身不足以唯一判定

不得因：

- evaluator 沒有完整讀取案例
- 測試檔案被截斷
- 回答措辭不同
- optional section 未輸出

而標記為 `AMBIGUOUS`。

## Final Judgment

完成全部案例後，回報：

- Total
- PASS
- FAIL
- AMBIGUOUS
- Pass rate

並給出：

- `READY`
- `READY WITH MINOR ISSUES`
- `NEEDS REVISION`

若存在 `FAIL`，應指出問題屬於：

- routing
- template
- reference
- grammar reasoning
- test specification

不要在 evaluation 階段自動修改 Skill。
