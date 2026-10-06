# English Tutor Adversarial Cases

本文件用來驗證 `english-tutor` 面對容易誘發錯誤分析的英文結構時，是否仍能維持一致的 routing、句法分析與語意判讀。

Adversarial evaluation 與其他測試目的不同：

- Regression：確認已知能力沒有退化。
- Generalization：確認規則能遷移到新材料。
- Adversarial：刻意使用表面相似但句法功能不同的材料，測試 Skill 是否會被形式誤導。

## 測試原則

1. 優先使用 minimal contrasts。
2. 相同表面形式應放入不同句法環境測試。
3. 不要求回答逐字一致。
4. 必須區分詞類、句法形式、句子功能與語意功能。
5. 不可因中文翻譯相近而合併不同句法結構。
6. 不可因表面形式相同而固定套用同一文法標籤。
7. `Must not` 任一條被違反即不得判定 PASS。
8. 存在真正合理的多種 grammar framework 時才使用 AMBIGUOUS。
9. 不應為了讓測試通過而把 adversarial 例句加入 references。

每個案例只能評為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`

---

# V-ing Contrast

## ADV-001 — Progressive V-ing

### Input

分析：

`The service is running.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The service` = NP / S
- `is running` = progressive verb construction
- `is` 與 `running` 共同構成主要 verb phrase
- `running` 是 V-ing form

### Must explain

此處的 `running` 是 progressive construction 的一部分。

### Must not

- 將 `running` 標成 gerund
- 將 `running` 標成 OC
- 將句子分析為 `keep + O + V-ing`
- 只看到 V-ing 就套用固定文法功能

---

## ADV-002 — V-ing as Object Complement

### Input

分析：

`Keep the service running.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `keep` = V
- `the service` = NP / O
- `running` = V-ing form / OC
- pattern = `keep + O + V-ing`

### Must explain

`running`

描述 O 持續進行的動作／狀態。

### Must not

- 將 `running` 分析成 progressive construction
- 將 `running` 標成 gerund
- 將 `running` 標成 C
- 將 `the service` 標成 S

---

## ADV-003 — V-ing Construction as Subject

### Input

分析：

`Running the service requires elevated privileges.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `Running the service` 整體作 S
- `requires` = finite V
- `elevated privileges` = NP / O
- `the service` 是 `Running` 內部的受詞
- `Running` 是 V-ing form

### Must explain

同樣是 `running`，但此處與 ADV-001、ADV-002 的 grammatical function 不同。

### Must not

- 將 `Running` 當主句 finite V
- 將 `the service` 當主句 S
- 將 `Running` 標成 OC
- 因為看到 V-ing 就停止於單一 `gerund` 標籤而不分析句中功能

---

# C vs OC Contrast

## ADV-004 — Subject Complement

### Input

分析：

`The service became unavailable.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

核心：

`SVC`

其中：

- `The service` = NP / S
- `became` = linking V
- `unavailable` = AdjP / C

### Must explain

`unavailable`

描述主詞 `The service` 的狀態。

### Must not

- 將 `unavailable` 標成 OC
- 將 `The service` 標成 O
- 將 `became` 當 transitive verb 分析

---

## ADV-005 — Object Complement

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

描述 O `the service` 在此結構中的結果狀態。

### Must not

- 將 `unavailable` 標成 C
- 使用 `make + O + C`
- 將 `the service` 標成 S
- 因 ADV-004 使用 C 就把相同 adjective 在本句也標成 C

---

# send Structure Contrast

## ADV-006 — Double Object

### Input

分析：

`Send the user the token.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

pattern：

`send + IO + DO`

其中：

- `the user` = NP / IO
- `the token` = NP / DO

### Must explain

IO 是接收者；DO 是被傳送的內容。

### Must not

- 將 `the user` 標成 DO
- 將 `the token` 標成 IO
- 將此句分析為 `send + O + as + NP`

---

## ADV-007 — Object + to PP

### Input

分析：

`Send the token to the user.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `send` = V
- `the token` = NP / O
- `to the user` = PP
- 語意上 `the user` 是 recipient

### Must explain

應區分：

- `the token` 的 grammatical function：O
- `to the user` 的 syntactic form：PP
- `the user` 的 semantic role：recipient

### Must not

- 因為 `the user` 是語意上的 recipient 就直接將整個 `to the user` 標成 IO
- 將 PP 與 IO 當成同一分析層級
- 將 `the token` 標成 DO 並聲稱本句是 double-object construction

---

## ADV-008 — Object + as PP

### Input

分析：

`Send the token as JSON.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `send` = V
- `the token` = NP / O
- `as JSON` = `as + NP`
- 本 Skill 預設可將 `as JSON` 分析為 PP
- 語意上說明 token 被傳送時的形式／角色

### Must explain

這與 ADV-006 的 `send + IO + DO` 不同。

### Must not

- 將 `the token` 標成 IO
- 將 `JSON` 標成 DO
- 將 `as JSON` 一律標成 OC
- 因表面都有 `send` 就套相同 argument structure

---

# fast Contrast

## ADV-009 — fast as Subject Complement

### Input

分析：

`The server is fast.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The server` = NP / S
- `is` = linking V
- `fast` = adjective / C
- 核心結構 = SVC

### Must explain

此處 `fast` 描述主詞的性質。

### Must not

- 將 `fast` 標成 adverb
- 因 reference 中有 `gets expensive fast` 就固定把 `fast` 當副詞
- 將 `fast` 標成 OC

---

## ADV-010 — fast as Adverb

### Input

分析：

`The server responds fast.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The server` = NP / S
- `responds` = V
- `fast` = adverb

### Must explain

`fast`

說明 `responds` 的速度。

### Must not

- 將 `fast` 標成 C
- 將 `fast` 標成 adjective
- 宣稱必須改成不存在的一般形式 `fastly`

---

## ADV-011 — Progressive + fast

### Input

分析：

`The server is responding fast.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The server` = NP / S
- `is responding` = progressive verb construction
- `fast` = adverb
- `fast` 說明 responding 的速度

### Must not

- 將 `responding` 標成 gerund
- 將 `fast` 標成 C
- 將 `fast` 因靠近 `responding` 而誤判為 adjective
- 將整句錯判為 SVC

---

# get Contrast

## ADV-012 — Linking get

### Input

分析：

`The connection got unstable.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The connection` = NP / S
- `got` = linking V
- `unstable` = AdjP / C
- 核心結構 = SVC

### Must explain

此處：

`get + adjective`

表示狀態變化：

> 變得不穩定

### Must not

- 將 `got` 解釋為「取得」
- 將 `unstable` 標成 O
- 宣稱所有 `get` 都是 linking verb

---

## ADV-013 — Transitive get

### Input

分析：

`The client got a response.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

- `The client` = NP / S
- `got` = V
- `a response` = NP / O
- 核心結構 = SVO

### Must explain

此處 `get` 不是 linking verb。

依語境可理解為：

> 收到／取得 response

### Must not

- 因 ADV-012 使用 linking `get` 就將本句分析為 SVC
- 將 `a response` 標成 C
- 宣稱 `get + NP` 與 `get + adjective` 是同一結構

---

## ADV-014 — get + O + to-infinitive

### Input

分析：

`We got the service to start.`

### Expected intent

`sentence` 或 `pattern`

若分析完整句：

`sentence`

若使用者重點在 `get` 結構：

`pattern`

兩者皆可接受。

### Must identify

- `We` = S
- `got` = V
- `the service` = O
- `to start` = infinitival construction
- `the service` 是 `start` 的 understood subject

### Must explain

整體具有：

> 使／設法讓 service 啟動

的語意。

### Must not

- 將 `got` 分析成 linking verb
- 將 `the service` 標成 IO
- 將 `to start` 只標成 infinitive 而不說明其結構關係
- 因 `get + adjective` reference 而錯套 SVC

---

# as Contrast

## ADV-015 — as + NP

### Input

分析：

`The system treats the value as a string.`

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `the value` = NP / O
- `as a string` = `as + NP`
- 可說明它在語意上表示 value 被視為／處理為 string
- 不應僅依「描述 O」就機械式標成 OC

### Must not

- 因 `as` 出現就假設所有 as 結構相同
- 將 `as a string` 未經分析直接標成 OC
- 將 `a string` 標成 DO

---

## ADV-016 — as if

### Input

`It looks as if the service has stopped.`

這裡的 `as if` 怎麼分析？

### Expected intent

`phrase`

### Expected template

`templates/phrase-analysis.md`

### Must identify

- `as if` 應作整體分析
- 它引入後方 clause
- 不能套用 `as + NP`

### Must explain

此處大致表示：

> 看起來好像……

### Must not

- 將 `as if` 分析為 `as + NP`
- 將 `if` 當作名詞
- 因 reference 中常見 `as + NP` 就強迫套用相同模式

---

## ADV-017 — as soon as

### Input

`Restart the worker as soon as the job finishes.`

這裡的 `as soon as` 是什麼？

### Expected intent

`phrase`

### Expected template

`templates/phrase-analysis.md`

### Must identify

- `as soon as` 應作整體時間表達
- 它引入 `the job finishes`
- 表示某事件一發生，另一事件隨即發生

### Must not

- 套用 `as + NP`
- 將兩個 `as` 分開逐字翻譯後拼湊
- 因為句子涉及 worker/job 就展開 background-job architecture

---

# PP / Semantic Role Contrast

## ADV-018 — Recipient Is Not Automatically IO

### Input

比較：

`Send the user the report.`

與：

`Send the report to the user.`

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

第一句：

`send + IO + DO`

- `the user` = IO
- `the report` = DO

第二句：

- `the report` = O
- `to the user` = PP
- `the user` 在語意上仍是 recipient

### Must explain

相同 semantic role 不代表相同 grammatical function 或 syntactic form。

### Must not

- 因兩句中的 user 都是 recipient，就把兩者都標成 IO
- 將 PP 與 IO 當成同一分析層級
- 只回答「兩句意思一樣」而忽略結構差異

---

# Naturalness vs Grammar

## ADV-019 — Grammaticality Is Not Naturalness

### Input

比較：

`Send the service a request.`

與：

`Send it a request.`

哪一句比較自然？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

- 兩句都可能符合 `send + IO + DO`
- 第一個 recipient `the service` 指涉清楚
- 第二句是否自然高度依賴 `it` 的 referent 與 context
- grammatical validity 與 contextual naturalness 必須分開

### Must explain

不能只因第二句可以建立合法 double-object structure，就宣稱它在所有語境都自然。

也不能只因缺少 context，就宣稱它一定文法錯誤。

### Must not

- 把 grammatical 與 natural 視為同一判斷
- 無條件宣稱第二句錯誤
- 無條件宣稱兩句完全等價且同樣自然

---

# Routing Adversarial

## ADV-020 — English Sentence That Looks Like a Grammar Example

### Input

`Why does the process keep crashing?`

### Expected routing

若沒有其他英文學習訊號：

不應觸發 `english-tutor`。

這可能是實際 troubleshooting 問題。

### Must identify

句中雖然存在：

`keep + V-ing`

但使用者沒有要求英文分析。

### Must not

- 因看到 `keep crashing` 就自動進入 pattern analysis
- 因整句是英文就自動觸發 English Tutor
- 忽略使用者可能真正想問 process crash 原因

---

## ADV-021 — Explicit English-learning Intent Overrides Technical Surface

### Input

`Why does the process keep crashing? 我不是問故障原因，我想知道 keep crashing 的英文結構。`

### Expected intent

`phrase` 或 `pattern`

若重點是局部意思：

`phrase`

若重點是可重用規則：

`pattern`

### Must identify

- 使用者明確排除 troubleshooting intent
- 使用者明確要求英文結構分析
- `keep + V-ing` 是目前學習重點
- `crashing` 是 V-ing form

### Must explain

`keep crashing`

表示：

> 持續／反覆發生 crash

### Must not

- 回答 process troubleshooting
- 因技術內容而忽略明確英文學習意圖
- 將 `crashing` 自動標成 gerund
- 錯套 `keep + O + V-ing`

---

# Adversarial Cross-case Requirements

評估 ADV-001 至 ADV-021 時，除了各案例條件外，還必須做以下跨案例檢查。

## V-ing

必須能區分：

| Case | 結構 | `V-ing` 功能 |
| --- | --- | --- |
| ADV-001 | `The service is running.` | progressive construction 的一部分 |
| ADV-002 | `Keep the service running.` | V-ing form / OC |
| ADV-003 | `Running the service requires elevated privileges.` | V-ing construction 整體作 S |
| ADV-011 | `The server is responding fast.` | progressive construction 的一部分 |
| ADV-021 | `keep crashing` | `keep + V-ing`，不得錯套 `keep + O + V-ing` |

不得因表面都有 `V-ing` 就給予相同 grammatical function。

不得把所有 `V-ing` 一律標成 gerund、participle 或 OC。

## C vs OC

必須能區分：

`The service became unavailable.`

其中：

`unavailable = AdjP / C`

與：

`The update made the service unavailable.`

其中：

`unavailable = AdjP / OC`

判斷依據是它描述：

- S → C
- O → OC

不能只因兩句都出現相同 adjective 就給予相同功能標籤。

## O / IO / DO / PP

必須能區分：

`Send the user the token.`

→ `the user = NP / IO`
→ `the token = NP / DO`

`Send the token to the user.`

→ `the token = NP / O`
→ `to the user = PP`
→ `the user` 語意上是 recipient

`Send the token as JSON.`

→ `the token = NP / O`
→ `as JSON = PP`（本 Skill 預設分析）
→ 語意上說明傳送形式

不得因 semantic role 相同，就宣稱 grammatical function 相同。

## fast

必須能區分：

`The server is fast.`

→ `fast = adjective / C`

`The server responds fast.`

→ `fast = adverb`

`The server is responding fast.`

→ `is responding = progressive construction`
→ `fast = adverb`

不得因單字形式完全相同，就固定判定詞性或句子功能。

## get

必須能區分：

`The connection got unstable.`

→ linking `get`
→ `unstable = AdjP / C`

`The client got a response.`

→ transitive `get`
→ `a response = NP / O`

`We got the service to start.`

→ `the service = O`
→ `to start = infinitival construction`

不得因主要動詞都是 `get` 就假設相同 valency 或核心句型。

## as

必須能區分：

`as + NP`

`as if + Clause`

`as soon as + Clause`

不得因表面都有 `as` 就套用：

`V + O + as + NP`

也不得將所有 `as` 結構視為相同詞法或句法關係。

## Syntactic Form vs Grammatical Function vs Semantic Role

整套 adversarial evaluation 必須持續區分：

### Syntactic Form

- NP
- VP
- PP
- AdjP
- AdvP
- Clause

### Grammatical Function

- S
- V
- O
- C
- OC
- IO
- DO

### Semantic Role / Function

例如：

- recipient
- result
- state
- form
- manner
- purpose
- time

同一成分可以同時具有不同分析維度。

例如：

`to the user`

可以是：

- syntactic form：PP
- semantic role：recipient-related

但不能因此直接把 PP 標成 IO。

## Grammar vs Naturalness

必須維持以下判斷彼此獨立：

- grammatical
- natural
- common
- contextually appropriate
- semantically equivalent
- interchangeable

尤其 ADV-019 不得因：

`Send it a request.`

可以形成合法 double-object structure，

就推論：

> 在所有 context 都自然。

反過來，也不得因 context 不足或自然度較低，就推論：

> 句法一定錯誤。

## Routing

ADV-020 與 ADV-021 必須證明：

`English text`

不等於：

`English-learning intent`

而：

`technical content`

也不會阻止明確的 English-learning intent。

因此：

`Why does the process keep crashing?`

在沒有英文學習訊號時，不應因存在 `keep + V-ing` 就自動觸發 English Tutor。

但：

`我不是問故障原因，我想知道 keep crashing 的英文結構。`

必須優先服從明確的英文學習意圖。

---

# Adversarial Pass Criteria

一次 adversarial evaluation 應確認：

- [ ] ADV-001 至 ADV-021 全部完成評估
- [ ] V-ing 不因表面形式被固定分類
- [ ] progressive construction、V-ing 作 S、V-ing / OC 能正確區分
- [ ] C 與 OC 能依描述 S 或 O 正確區分
- [ ] O / IO / DO 沒有混用
- [ ] PP 不因 semantic role 而被錯標為 IO、C 或 OC
- [ ] NP / PP / AdjP 等 syntactic form 沒有與 grammatical function 混為同一層級
- [ ] `fast` 能依句法環境判斷 adjective / adverb
- [ ] `get` 能依實際 valency 判斷 linking / transitive / other construction
- [ ] `as + NP`、`as if`、`as soon as` 沒有因表面 `as` 被錯誤合併
- [ ] grammatical validity 與 naturalness 分開判斷
- [ ] semantic role 與 grammatical function 分開判斷
- [ ] 技術語境只提供理解英文所需的最小背景
- [ ] technical vocabulary 不造成不必要的 architecture 教學
- [ ] 沒有英文學習意圖時，不因輸入為英文而誤觸 English Tutor
- [ ] 有明確英文學習意圖時，不因 technical surface 而忽略 English Tutor
- [ ] 簡單局部問題沒有被過度展開成完整 sentence analysis
- [ ] 不因 evaluator 採用不同但合理的 grammar framework 就錯判 FAIL

---

# Evaluation Rules

每個案例只能標記為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`

## PASS

符合所有：

- Expected intent / routing
- Expected template（若有指定）
- Must identify
- Must explain

且沒有違反任何：

- Must not

回答不需要逐字符合測試文字。

只要 grammar、meaning、routing 與 reasoning 等價即可。

## FAIL

符合以下任一條件即為 FAIL：

- routing 明確錯誤
- 核心 grammatical function 判斷錯誤
- syntactic form 與 grammatical function 混淆
- semantic role 被錯當 grammatical function
- 違反 Must not
- 技術 context 造成錯誤詞義
- 將 grammatical / natural / common / interchangeable 混為一談
- 因表面形式相同而錯套其他案例的分析

## AMBIGUOUS

只在以下情況使用：

- 存在多種合理 grammar framework
- 測試本身允許多種 routing
- context 本身不足以唯一判定
- 兩種分析都有合理語言學依據

不得因以下原因標記 AMBIGUOUS：

- evaluator 沒有完整讀取案例
- 回答措辭與 expected wording 不同
- optional template section 未輸出
- evaluator 不確定但其實測試條件已明確
- 測試檔案被截斷或讀取不完整

若測試檔案本身不完整，應回報：

`TEST SPEC ERROR`

而不是：

`AMBIGUOUS`

---

# Evaluation Output

完成測試後輸出：

## 1. Summary

- Total cases
- PASS
- FAIL
- AMBIGUOUS
- TEST SPEC ERROR
- Pass rate

## 2. Case Results

使用：

| Case | Result | Routing | Summary |
| --- | --- | --- | --- |

列出 ADV-001 至 ADV-021。

## 3. Failed Cases

每個 FAIL 必須指出：

- failed requirement
- actual analysis
- expected analysis
- likely responsible file
- failure category

Failure category 使用：

- routing
- template
- grammar reference
- pattern reference
- vocabulary reference
- technical-context reference
- grammar reasoning
- test specification

## 4. Ambiguous Cases

每個 AMBIGUOUS 必須說明：

- 哪兩種以上分析合理
- 採用哪些 grammar assumptions
- 是否需要修改 Skill
- 或只是合理 framework difference

不得因 AMBIGUOUS 自動修改 Skill。

## 5. Cross-case Findings

特別檢查是否存在系統性錯誤，例如：

- 所有 V-ing 都被當成 gerund
- adjective 一律被當成 C
- 描述 O 的成分一律被當成 OC
- recipient 一律被當成 IO
- PP 一律被當成 complement
- `get` 一律被當成 linking verb
- `as` 一律被分析為 `as + NP`
- technical sentence 一律觸發 English Tutor
- technical context 導致過度領域展開

如果多個 FAIL 來自同一規則，只應提出一個 root-cause finding。

## 6. Recommended Changes

只有在實際觀察到 FAIL 時才提出修改。

依嚴重程度排序：

- Critical
- High
- Medium
- Low

優先修改最小必要規則。

不要：

- 為單一 adversarial example 建立特例
- 把 adversarial 測試句直接加入 references
- 因一個 failure 大幅重寫整個 Skill
- 在 evaluation 階段直接修改檔案

## 7. Final Judgment

只能選擇：

### READY

條件：

- 沒有實質 grammar / routing FAIL
- AMBIGUOUS 僅來自合理 framework difference
- 沒有系統性錯誤

### READY WITH MINOR ISSUES

條件：

- 沒有核心 architecture 問題
- 僅存在局部、低風險且可明確修正的問題

### NEEDS REVISION

條件：

- routing 有系統性錯誤
- grammar model 在多個案例不一致
- form / function / semantic role 持續混淆
- regression/generalization 已通過的能力在 adversarial cases 中明顯崩潰

---

# Test Integrity

Adversarial cases 不應被加入：

- `SKILL.md`
- `templates/`
- `references/`

作為直接答案或特例。

若 adversarial case 發現真正的通用規則缺口：

1. 找出 root cause。
2. 修改最小必要 reference 或 routing rule。
3. 重新執行相關 adversarial cases。
4. 重新執行 regression suite。
5. 重新執行 generalization suite。
6. 確認修正沒有造成既有能力退化。

測試資料本身不是教材。

Skill 應學會規則，而不是記住測試答案。
