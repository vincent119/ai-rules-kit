# English Tutor Learning Focus Cases

本文件用來驗證 `english-tutor` v1.2 Learning Focus。

Learning Focus 不是獨立 intent，也不是固定輸出版型。

它是 English Tutor 完成主要回答後的可選收斂機制，用來保留目前問題中最值得使用者遷移到其他英文情境的核心規則。

Learning Focus 的目標不是增加內容，而是降低資訊量並提高學習價值。

## 核心原則

Learning Focus 只有在目前問題存在以下至少一項時才應出現：

- 可重用的 grammar rule
- 可遷移的 sentence pattern
- 容易混淆的 distinction
- 使用者實際犯過的錯誤
- 高價值的 collocation
- 對後續英文使用有明確幫助的 usage rule

如果沒有值得泛化的學習點，應省略。

Learning Focus 可以使用：

> **這題記住：**

但不要求固定使用完全相同的標題。

語意等價的簡短收斂形式也可接受。

## Learning Focus 必須

- 對準使用者真正詢問或犯錯的地方
- 能遷移到其他句子
- 比正文更精簡
- 最多 1～2 個重點
- 不引入正文沒有支持的新規則
- 不把單一例句特例包裝成一般規則

## Learning Focus 不得

- 每次回答固定出現
- 重複整段正文
- 變成第二份 summary
- 變成完整 grammar lesson
- 加入大量例句
- 加入使用者沒有問的其他文法
- 為簡單字義、拼字或專有名詞強行建立記憶公式
- 超過 2 個主要學習點

每個案例只能評為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

---

# Word Learning Focus

## LF-001 — Flat Adverb Has Transferable Value

### Input

在：

`The costs increased fast.`

這個 `fast` 為什麼可以放最後？不是應該用 `fastly` 嗎？

### Expected intent

`word`

### Expected template

`templates/word-analysis.md`

### Learning Focus expected

`YES`

### Must identify

- `fast` 可以直接作 adverb
- 不需要 `fastly`
- 此處說明 `increased` 的速度
- 句尾位置自然

### Expected Learning Focus

應收斂到類似：

> **這題記住：**
> `fast` 可以直接作副詞，不需要改成 `fastly`。

### Must not

- 把 Learning Focus 寫成完整 adjective/adverb 教材
- 加入 3 個以上學習點
- 將正文所有內容重新摘要一次
- 引入與 `fast` 無關的副詞規則

---

## LF-002 — Simple Vocabulary Meaning Does Not Need Focus

### Input

`server` 是什麼意思？

### Expected intent

`word`

### Learning Focus expected

`NO`

### Must answer

依 context 可簡潔解釋 `server` 的意思。

若沒有額外語境，可以指出一般技術語境通常指：

> 伺服器／提供服務的系統或程式

但不需要建立 Learning Focus。

### Must not

- 強制加入「這題記住：server = 伺服器」
- 把簡單詞義包裝成 grammar rule
- 展開 server architecture
- 為了 Learning Focus 增加無關內容

---

## LF-003 — Meaning Difference Worth Remembering

### Input

`hard` 和 `hardly` 為什麼差這麼多？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Learning Focus expected

`YES`

### Must identify

- `hard` 可以作 adverb
- `hardly` 常表示「幾乎不」
- `-ly` 並非只是單純改變詞性而保持原義

### Expected Learning Focus

應收斂到 1～2 點，例如：

> **這題記住：**
> - `hard` 可以直接作副詞。
> - `hardly` 通常表示「幾乎不」，不是 `hard` 的一般副詞版本。

### Must not

- 展開所有 flat adverbs
- 列出大量 `-ly` 例外
- 超過 2 個主要重點

---

# Phrase Learning Focus

## LF-004 — Transferable Preposition Pattern

### Input

`without restarting the server`

為什麼是 `restarting`？

### Expected intent

`phrase` 或 `pattern`

兩者皆可接受。

### Learning Focus expected

`YES`

### Must identify

- `without` 是 preposition
- 後面表達動作時可使用 V-ing construction
- 可抽象為 `without + V-ing`

### Expected Learning Focus

類似：

> **這題記住：**
> `without + V-ing` → 在不做某件事的情況下。

### Must not

- 把 `server` 當 Learning Focus
- 展開所有 prepositions
- 將 `V-ing` 一律稱為 gerund 並停止分析

---

## LF-005 — Idiom Meaning without Useful General Rule

### Input

`by the way` 是什麼意思？

### Expected intent

`phrase`

### Learning Focus expected

`NO` 或極簡單 phrase-level memory

優先：

`NO`

### Must answer

解釋其常見 discourse meaning，例如：

> 順帶一提／對了

### Must not

- 為了 Learning Focus 強行建立不存在的 grammar formula
- 分析 `by + the + way` 並把逐字結構當核心規則
- 展開無關介系詞教材

---

# Pattern Learning Focus

## LF-006 — Object Complement Pattern

### Input

`keep the connection alive`

這個句型怎麼記？

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Learning Focus expected

`YES`

### Must identify

- `keep` = V
- `the connection` = O
- `alive` = OC
- `keep + O + OC`

### Expected Learning Focus

例如：

> **這題記住：**
> `keep + O + OC` → 讓 O 維持某種狀態。

### Must not

- 錯套 `keep + O + V-ing`
- 把 `alive` 標成 C
- Learning Focus 重複完整成分表

---

## LF-007 — Pattern Already Simple: Do Not Duplicate

### Input

`send + IO + DO` 是什麼？

### Expected intent

`pattern`

### Learning Focus expected

`OPTIONAL`

### Must identify

- IO = recipient
- DO = transmitted thing / direct object

若正文已經用一句話清楚說：

> IO 是接收者，DO 是被傳送的內容。

則可以不再額外加入 Learning Focus。

### Must not

- 因為 Learning Focus policy 存在就重複同一句話兩次
- 強制增加新的 section
- 增加與 send 無關的 SVOO 教材

### Pass condition

以下兩種都可 PASS：

1. 正文已極度精簡，因此省略 Learning Focus。
2. Learning Focus 出現，但比正文更精簡且沒有重複。

---

# Sentence Learning Focus

## LF-008 — Complex Sentence, One Real Learning Point

### Input

分析：

`The update made the service unavailable after the restart.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Learning Focus expected

`YES`

### Must identify

核心：

`SVOC`

其中：

- `The update` = S
- `made` = V
- `the service` = O
- `unavailable` = OC
- `after the restart` = PP

### Expected Learning Focus

應優先收斂真正可遷移的核心：

> **這題記住：**
> `make + O + OC` → 使 O 變成／處於某種狀態。

### Must not

Learning Focus 同時列出：

- SVOC
- PP
- after
- restart
- unavailable
- make
- adjective

等大量資訊。

最多保留 1～2 個真正核心重點。

---

## LF-009 — Complex Sentence Must Not Become Multi-point Summary

### Input

分析：

`The client retries the request to reduce failures when the network becomes unstable.`

### Expected intent

`sentence`

### Learning Focus expected

`YES`，但最多 1～2 點。

### Must identify

正文可分析：

- 主句
- infinitival purpose
- subordinate clause

### Learning Focus requirement

必須選擇最高價值的 1～2 個重點。

例如可以選：

> `to + V` 在此表示目的。

或：

> `become + adjective` 表示狀態變化。

不要求兩者都輸出。

### Must not

- 將整句所有 clause 重列一次
- Learning Focus 超過 2 個主要規則
- 因為句子複雜就把 Learning Focus 變成 summary

---

## LF-010 — User Asked Only One Local Question

### Input

在：

`The client retries the request to reduce failures.`

我只想知道 `to reduce` 為什麼放這裡。

### Expected intent

`phrase`、`pattern` 或局部 sentence analysis

### Learning Focus expected

`YES`

### Must identify

`to reduce failures`

在此主要表達目的。

### Expected Learning Focus

只應聚焦：

> `to + V` 可以用來表達目的。

### Must not

- 重新分析整句 S / V / O
- 把 `client`、`request`、`retries` 加進 Learning Focus
- 因為原句完整就忽略「我只想知道」

---

# Comparison Learning Focus

## LF-011 — Comparison with Transferable Distinction

### Input

比較：

`The service became unavailable.`

和：

`The update made the service unavailable.`

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Learning Focus expected

`YES`

### Must identify

第一句：

- `unavailable` = C
- 描述 S

第二句：

- `unavailable` = OC
- 描述 O

### Expected Learning Focus

例如：

> **這題記住：**
> 描述主詞的補語是 C；描述受詞的補語是 OC。

### Must not

- 只記 `unavailable = C` 或 `unavailable = OC`
- 忽略其功能取決於句法環境
- 展開完整 complement taxonomy

---

## LF-012 — Comparison Already Answered by Minimal Pair

### Input

`safe` 和 `safely` 有什麼差別？

### Expected intent

`comparison`

### Learning Focus expected

`OPTIONAL`

如果正文已清楚以 minimal pair 說明：

- `safe` = adjective
- `safely` = adverb

則不需要再機械式增加 Learning Focus。

### Must not

- 重複完全相同內容
- 因為 comparison 一定輸出 Learning Focus
- 增加與問題無關的 adjective/adverb 規則

---

# Correction Learning Focus

## LF-013 — Focus on Actual Error

### Input

幫我修：

`You can update it without restart the service.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Learning Focus expected

`YES`

### Expected correction

`You can update it without restarting the service.`

### Must identify

真正錯誤：

`without restart`

→

`without restarting`

### Expected Learning Focus

只聚焦：

`without + V-ing`

### Must not

Learning Focus 加入：

- `update`
- `service`
- modal `can`
- technical deployment concepts

除非這些本身存在錯誤。

---

## LF-014 — Multiple Errors, Select Highest-value Focus

### Input

幫我修：

`The service keep restart because the configuration are invalid.`

### Expected intent

`correction`

### Expected correction

自然的最小修正可為：

`The service keeps restarting because the configuration is invalid.`

### Learning Focus expected

`YES`

### Must identify

存在多個問題，例如：

- `keep` → `keeps`
- `restart` → `restarting`
- `are` → `is`

### Learning Focus requirement

不得把所有 correction points 全部複製成 Learning Focus。

應選 1～2 個最有遷移價值的規則。

例如：

- `keep + V-ing`
- third-person singular / subject-verb agreement

### Must not

- Learning Focus 列 3 個以上錯誤
- 重複 correction table
- 將 Learning Focus 當成 error report

---

## LF-015 — Typo Does Not Need Learning Focus

### Input

幫我修：

`The servre is healthy.`

### Expected intent

`correction`

### Expected correction

`The server is healthy.`

### Learning Focus expected

`NO`

### Must identify

只有 typo：

`servre` → `server`

### Must not

- 強制輸出「這題記住」
- 展開 server vocabulary
- 教 SVC
- 教 adjective
- 因為有 correction 就一定建立學習規則

---

## LF-016 — Correct Sentence Does Not Need Artificial Focus

### Input

我寫：

`The proxy forwards traffic to the backend.`

這句對嗎？

### Expected intent

`correction`

### Expected status

Correct and natural.

### Learning Focus expected

`NO`

除非回答過程發現使用者實際詢問某個可泛化語言點。

### Must not

- 為正確句子硬找一個文法規則
- 輸出「這題記住：forward = 轉發」
- 展開 proxy terminology
- 因為 v1.2 存在就強制產生 Learning Focus

---

# Technical-context Learning Focus

## LF-017 — Technical Meaning Is Relevant but Not the Learning Focus

### Input

`take the service down`

為什麼不是「把服務拿下來」？

### Expected intent

`phrase`

### Learning Focus expected

`YES`

### Must identify

在 Software / Operations context：

`take ... down`

通常表示：

> 讓系統／服務停止運作

### Expected Learning Focus

應聚焦多詞表達的整體義，例如：

> **這題記住：**
> 技術語境中的 `take a service down` 通常表示讓服務停止運作，不能只逐字翻譯。

### Must not

- 展開 service shutdown architecture
- 加入 Kubernetes、systemd 等未提供 context
- 把所有 `take ... down` 用法都宣稱只有「停機」一義

---

## LF-018 — Ambiguous Technical Referent Should Not Become a Rule

### Input

`The worker is unavailable.`

這個 `worker` 是什麼？

### Expected intent

`word`

### Learning Focus expected

`NO`

### Must identify

context 不足以唯一確定：

`worker`

可能的 technical referent。

### Must not

- 建立「worker = worker node」的 Learning Focus
- 建立「worker = background process」的 Learning Focus
- 將不確定假設包裝成可遷移規則
- 因為 technical term 就強制建立記憶點

---

# User Scope and Focus

## LF-019 — Respect Explicit Narrow Scope

### Input

分析這句：

`The server became unstable after the update.`

但我只想知道 `became unstable`。

### Expected intent

`phrase` 或 `pattern`

### Learning Focus expected

`YES`

### Must identify

- `became` = linking V
- `unstable` = C
- `become + adjective` 表示狀態變化

### Expected Learning Focus

只聚焦：

`become + adjective`

### Must not

- Learning Focus 加入 `after + NP`
- 分析整句所有成分
- 因使用者說「分析這句」而忽略後面的 scope restriction

---

## LF-020 — User Already Knows the Rule

### Input

我知道 `without + V-ing`，只是想確認：

`without restarting the server`

這樣寫對嗎？

### Expected intent

`correction`

### Expected answer

確認此表達成立即可。

### Learning Focus expected

`NO` 或極簡確認。

### Must identify

使用者已明確表示：

> 我知道 `without + V-ing`

因此沒有必要再用 Learning Focus 重教同一規則。

### Must not

- 強制加入完整 `without + V-ing` 教學
- 重複使用者已明確表示知道的內容
- 把 confirmation 問題擴張成 grammar lesson

---

# Learning Focus Adversarial Cases

## LF-021 — Do Not Generalize from One Context

### Input

在：

`The server is fast.`

`fast` 是形容詞。

### Expected intent

`word` 或 confirmation

### Learning Focus expected

`OPTIONAL`

如果產生 Learning Focus，必須保留語境限制。

### Must identify

在目前句子：

`The server is fast.`

中：

- `fast` = adjective
- `fast` 描述主詞 `The server`
- `fast` 在此作 C

### Acceptable Learning Focus

例如：

> **這題記住：**
> 在 `The server is fast.` 中，`fast` 是形容詞；但 `fast` 也可以在其他結構中作副詞。

或直接省略 Learning Focus。

### Must not

- 泛化成「`fast` 永遠是 adjective」
- 宣稱 `fast` 不能作 adverb
- 因目前案例是 SVC，就把其他 `fast` 用法都分析成 C
- 把單一 context 的分析包裝成普遍規則

---

## LF-022 — Same Word, Different Function

### Input

比較：

`The server is fast.`

和：

`The server responds fast.`

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Learning Focus expected

`YES`

### Must identify

第一句：

- `fast` = adjective
- `fast` = C
- 描述 `The server`

第二句：

- `fast` = adverb
- 修飾 `responds`
- 說明回應速度

### Expected Learning Focus

應收斂成類似：

> **這題記住：**
> 同一個 `fast` 可以依句法位置與功能作 adjective 或 adverb；不能只看單字形式判斷詞性。

### Must not

- 宣稱 `fast` 固定只有一種詞性
- 宣稱第二句必須改成 `quickly`
- 將兩句中的 `fast` 給予相同 grammatical function
- 展開大量 flat-adverb 教材

---

## LF-023 — Same V-ing Form, Different Functions

### Input

比較：

`The service is running.`

`Keep the service running.`

`Running the service requires privileges.`

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Learning Focus expected

`YES`

### Must identify

第一句：

`The service is running.`

- `is running` = progressive verb construction

第二句：

`Keep the service running.`

- `the service` = O
- `running` = V-ing form / OC

第三句：

`Running the service requires privileges.`

- `Running the service` 整體作 S

### Expected Learning Focus

應優先收斂成：

> **這題記住：**
> `V-ing` 只是形式，實際 grammatical function 必須依它所在的句法結構判斷。

### Must not

- 把三個 `running` 全部標成 gerund
- 把三個 `running` 全部標成 participle
- 把三個 `running` 全部標成 OC
- Learning Focus 重複三句完整分析
- 加入超過 2 個主要學習點

---

## LF-024 — Semantic Role vs Grammatical Function

### Input

比較：

`Send the user the report.`

和：

`Send the report to the user.`

最值得記的是什麼？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Learning Focus expected

`YES`

### Must identify

第一句：

- `the user` = IO
- `the report` = DO

第二句：

- `the report` = O
- `to the user` = PP
- `the user` 在語意上仍是 recipient

### Expected Learning Focus

應聚焦：

> **這題記住：**
> 相同 semantic role 不代表相同 grammatical function；recipient 可以由 IO 表達，也可以出現在 PP 中。

或語意等價的精簡版本。

### Must not

- 因兩句的 user 都是 recipient，就都標成 IO
- 把 PP 與 IO 視為同一分析層級
- Learning Focus 只寫「兩句意思差不多」
- 重複完整 comparison table

---

# Learning Focus Boundary Cases

## LF-025 — User Requests Detailed Analysis

### Input

請詳細分析：

`The update made the service unavailable after the restart.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Learning Focus expected

`YES`

### Must identify

即使正文可以詳細分析，Learning Focus 仍應保持精簡。

核心可包含：

- `The update` = S
- `made` = V
- `the service` = O
- `unavailable` = OC
- `after the restart` = PP

### Expected Learning Focus

最多保留 1～2 個高價值規則，例如：

> **這題記住：**
> `make + O + OC` 表示使 O 進入某種狀態。

### Must not

- 因使用者要求「詳細」就讓 Learning Focus 也變詳細
- 將正文所有分析再次列入 Learning Focus
- 超過 2 個主要重點

---

## LF-026 — User Explicitly Requests Only the Answer

### Input

只告訴我答案，不用教學：

`without restart` 還是 `without restarting`？

### Expected intent

`comparison`、`correction` 或簡短 grammar answer

### Expected answer

在「without 後面表達做某個動作」的 intended context：

`without restarting`

### Learning Focus expected

`NO`

### Must identify

使用者明確要求：

> 不用教學

因此應尊重 scope。

### Must not

- 加入「這題記住」
- 展開 `without + V-ing` 教材
- 提供大量例句
- 因 Learning Focus policy 而忽略使用者明確輸出限制

---

## LF-027 — User Explicitly Requests Memory Rule

### Input

`without restarting the service`

給我一個最好記的規則。

### Expected intent

`pattern`

### Learning Focus expected

`YES`

### Expected behavior

回答可以直接以 Learning Focus 為核心。

例如：

> **這題記住：**
> `without + V-ing` = 在不做……的情況下。

### Must not

- 先輸出完整 sentence analysis
- 加入大量無關文法
- 超過 1～2 個記憶重點
- 因為 Learning Focus 通常位於回答最後，就強制先產生長篇正文

---

# Learning Focus Cross-case Requirements

評估 LF-001 至 LF-027 時，除了各案例條件外，必須進行以下跨案例檢查。

## 1. Learning Focus 是可選收斂，不是固定 Section

必須能區分：

### 應該有

例如：

- LF-001：`fast` 可以直接作 adverb
- LF-004：`without + V-ing`
- LF-006：`keep + O + OC`
- LF-011：C vs OC
- LF-013：correction 中的 `without + V-ing`
- LF-023：相同 V-ing form 可以具有不同功能
- LF-024：semantic role 不等於 grammatical function

### 不應強制有

例如：

- LF-002：簡單詞義
- LF-015：單純 typo
- LF-016：正確且自然的句子
- LF-018：technical referent 不確定
- LF-020：使用者已明確知道規則
- LF-026：使用者明確要求不要教學

Learning Focus 不得變成每次回答固定輸出的尾段。

## 2. 最多 1～2 個主要重點

Learning Focus 的目的：

> 收斂

不是：

> 再摘要一次全文。

複雜句、comparison 或 correction 即使包含很多分析點，也必須選出最高價值的 1～2 個規則。

特別檢查：

- LF-009
- LF-014
- LF-025

不得把所有分析點全部塞進 Learning Focus。

## 3. 必須可以遷移

Learning Focus 應優先保留：

- grammar rule
- reusable pattern
- usage distinction
- collocation
- common confusion

而不是只記單一例句的內容。

例如：

好的 Learning Focus：

`without + V-ing`

較差的 Learning Focus：

`without restarting the server = 不重新啟動伺服器`

後者只是目前例句翻譯，不是可遷移規則。

## 4. 必須對準使用者真正問題

若使用者只問：

`to reduce`

則 Learning Focus 不應擴展到整句其他成分。

若使用者 correction 的真正錯誤是：

`without restart`

則 Learning Focus 應對準：

`without + V-ing`

而不是挑另一個沒有出錯的 technical vocabulary。

特別檢查：

- LF-010
- LF-013
- LF-019

## 5. 不得重複正文

若正文已經非常短，而且核心規則已經用一句話說完，可以省略 Learning Focus。

特別檢查：

- LF-007
- LF-012

`OPTIONAL` 的意思不是：

> 一定要輸出。

而是：

> 有額外收斂價值才輸出。

## 6. 不得過度泛化

從單一 context 得出的分析不得包裝成普遍規則。

例如：

`The server is fast.`

只能證明：

`fast`

在這個句子是 adjective / C。

不能因此建立：

> `fast` 是 adjective。

必須保留：

> `fast` 也可以在其他結構作 adverb。

特別檢查：

- LF-021
- LF-022
- LF-023

## 7. 不確定資訊不得成為 Learning Focus

若 technical referent 不確定：

`worker`

不能建立：

> worker = worker node

之類的記憶規則。

如果 context 本身不足，Learning Focus 應省略。

特別檢查：

- LF-018

## 8. 使用者 Scope 優先

Learning Focus 不得凌駕使用者明確要求。

例如：

> 只告訴我答案，不用教學。

則：

Learning Focus = NO

例如：

> 給我一個最好記的規則。

則：

Learning Focus 可以成為主要回答。

特別檢查：

- LF-026
- LF-027

## 9. Correction Integration

Correction 中：

Learning Focus 應針對真正錯誤，而不是所有修改。

如果只有 typo：

不需要 Learning Focus。

如果存在可遷移 grammar rule：

可以提供 Learning Focus。

特別檢查：

- LF-013
- LF-014
- LF-015

## 10. Technical Context

Technical English 可以影響詞義，但 Learning Focus 不應因此變成 domain tutorial。

例如：

`take the service down`

可以記：

> 技術語境中 `take a service down` 通常表示讓服務停止運作。

但不應因此展開：

- Kubernetes
- systemd
- load balancer
- shutdown procedure

除非使用者另外詢問。

---

# Learning Focus Pass Criteria

一次 Learning Focus evaluation 應確認：

- [ ] LF-001 至 LF-027 全部完成評估
- [ ] Learning Focus 不是固定輸出
- [ ] 有高價值可遷移規則時能正確產生 Learning Focus
- [ ] 沒有學習價值時能正確省略
- [ ] OPTIONAL 案例不會被機械式強制輸出
- [ ] 每次最多 1～2 個主要重點
- [ ] Learning Focus 比正文更精簡
- [ ] 不重複完整 explanation
- [ ] 不重複 correction table
- [ ] 不把單一例句翻譯當成通用規則
- [ ] 不把不確定 technical referent 包裝成規則
- [ ] 不從單一 context 過度泛化詞性或 grammatical function
- [ ] 能正確處理 V-ing 在不同結構中的不同功能
- [ ] 能正確處理 C / OC distinction
- [ ] 能正確處理 grammatical function 與 semantic role distinction
- [ ] correction 中 Learning Focus 對準真正錯誤
- [ ] typo 不強制產生 Learning Focus
- [ ] 正確且自然的句子不強制產生 Learning Focus
- [ ] 使用者明確表示已知道某規則時不重教
- [ ] 使用者要求不要教學時尊重 scope
- [ ] 使用者要求記憶規則時能直接收斂成 Learning Focus
- [ ] technical context 不造成 domain over-expansion

---

# Evaluation Rules

每個案例只能標記：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

## PASS

必須符合：

- intent / routing 合理
- 主要回答正確
- Learning Focus presence / absence 符合案例要求
- Learning Focus 內容對準真正學習點
- Learning Focus 最多 1～2 個主要重點
- 沒有違反 Must not

若案例標示：

`Learning Focus expected: OPTIONAL`

則：

- 合理省略 → PASS
- 合理提供且符合限制 → PASS

## FAIL

符合以下任一情況：

- 應有 Learning Focus 卻完全抓錯學習重點
- 不應有 Learning Focus 卻機械式強制輸出
- Learning Focus 超過 2 個主要重點
- Learning Focus 只是重複正文
- Learning Focus 引入正文沒有支持的新規則
- Learning Focus 將不確定資訊當成確定規則
- Learning Focus 從單一 context 過度泛化
- 忽略使用者明確 scope
- correction 中 Learning Focus 沒有對準真正錯誤
- technical context 被擴張成 domain tutorial

## AMBIGUOUS

只在真正存在以下情況時使用：

- 是否值得產生 Learning Focus 有合理教學判斷差異
- 多個學習點具有近似的最高價值
- context 本身不足以唯一決定 focus

若案例明確標示：

`YES`

或：

`NO`

則不應只因 evaluator 個人偏好而標記 AMBIGUOUS。

## TEST SPEC ERROR

只在：

- 測試案例被截斷
- requirements 自相矛盾
- 必要內容缺失

時使用。

測試規格問題不得以 AMBIGUOUS 取代。

---

# Evaluation Output

完成後輸出：

## 1. Summary

- Total
- PASS
- FAIL
- AMBIGUOUS
- TEST SPEC ERROR
- Pass rate

## 2. Case Results

使用：

| Case | Result | Focus Expected | Focus Produced | Summary |
| --- | --- | --- | --- | --- |

列出：

LF-001 至 LF-027。

## 3. Failures

每個 FAIL 必須指出：

- failed requirement
- actual behavior
- expected behavior
- likely responsible file
- root-cause category

Root-cause category：

- SKILL.md Learning Focus policy
- routing
- template
- correction integration
- grammar reference
- vocabulary reference
- technical-context reference
- learning-focus reasoning
- test specification

## 4. Cross-case Findings

檢查是否存在系統性問題，例如：

- 每次回答都輸出 Learning Focus
- 從不輸出 Learning Focus
- Learning Focus 經常超過 2 點
- Learning Focus 只是 summary
- Learning Focus 偏離使用者真正問題
- correction 中 focus 選錯錯誤
- technical terms 被當成主要學習點
- 不確定資訊被過度泛化
- 使用者 scope 被 Learning Focus policy 覆蓋

## 5. Recommended Changes

只有觀察到實際 FAIL 時才提出修改。

優先修改最小必要規則。

不要：

- 把 LF 測試句加入 templates 或 references
- 為單一 LF case 建立 hard-coded 特例
- 為提高 pass rate 而把 Learning Focus 改成固定 section

## 6. Final Judgment

只能選：

- `READY`
- `READY WITH MINOR ISSUES`
- `NEEDS REVISION`

---

# Test Integrity

Learning Focus cases 是 evaluation specification，不是教材。

不得把 LF 測試句直接加入：

- `SKILL.md`
- `templates/`
- `references/`

作為答案特例。

如果測試發現真正的通用缺口：

1. 確認 failure。
2. 找出 root cause。
3. 修改最小必要 policy / template / reference。
4. 重跑 Learning Focus suite。
5. 重跑 Correction suite。
6. 重跑 Regression suite。
7. 重跑 Generalization suite。
8. 重跑 Adversarial suite。
9. 確認 v1.1 / v1.2 沒有破壞 v1.0 的既有能力。

Learning Focus 應學會：

> 哪個規則值得留下。

而不是：

> 每次回答都多寫一段。
