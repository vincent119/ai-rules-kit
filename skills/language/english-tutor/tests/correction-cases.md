# English Tutor Correction Cases

本文件用來驗證 `english-tutor` v1.1 Correction Mode。

Correction evaluation 的目的不是測試模型能否產生「更漂亮的英文」，而是確認它能正確判斷：

- 原句是否真的有錯
- 問題屬於 grammar、naturalness、word choice、collocation、register 或 meaning
- 是否需要修改
- 如何做最小必要修正
- 是否保留原意與技術語意
- 是否能解釋真正的修正原因
- 是否避免把 stylistic preference 當成 grammar rule

## 核心原則

Correction 不預設使用者寫錯。

每個案例必須先判斷原句狀態：

### A — Correct and natural

原句文法成立且自然。

預期：

> 不需要修改。

### B — Grammatical but less natural

文法成立，但在目前語境存在 naturalness、collocation、register 或 usage 問題。

預期：

> Grammar 與 Naturalness 分開判斷。

### C — Grammar / structure error

存在實際 grammar 或 syntax 問題。

預期：

> 最小修正 + 原因 + 可遷移規則。

### D — Ambiguous / insufficient context

不同解讀會導致不同修正。

預期：

> 標示假設或指出需要 context，不自行猜測唯一原意。

每個案例只能評為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

---

# Grammar Correction

## COR-001 — Preposition + V-ing

### Input

這句英文對嗎？

`How do you release the application without take it down?`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

`C — Grammar / structure error`

### Expected correction

`How do you release the application without taking it down?`

### Must identify

問題：

`without take`

修正：

`without taking`

### Must explain

`without`

是 preposition。

當後面表達一個動作時，可使用：

`without + V-ing construction`

### Must preserve

- `release`
- `application`
- 原句的問句意思

### Must not

- 只說「taking 比較自然」
- 將問題誤判成純 stylistic preference
- 改寫成完全不同的 deployment strategy
- 展開 Kubernetes / blue-green / canary deployment 教學
- 一次提供大量 rewrite alternatives

---

## COR-002 — Direct Question Structure

### Input

幫我修正：

`How to release the application without taking it down?`

### Expected intent

`correction`

### Expected status

`C — Grammar / structure issue in ordinary direct-question use`

### Expected correction

預設可修為：

`How do you release the application without taking it down?`

### Must identify

若原句被當成完整直接問句：

`How to release ...?`

缺少一般直接問句所需的 finite clause 結構。

### Must explain

`How to ...`

可以出現在：

- title
- heading
- search query
- shorthand

但若作一般完整直接問句，通常使用：

`How do you ...?`

或依實際主詞使用其他 finite question。

### Must not

- 無條件宣稱 `How to ...?` 在所有 context 都文法錯誤
- 忽略 heading / shorthand 用法
- 改變原本詢問 release 方法的意思

---

## COR-003 — Subject-Verb Agreement

### Input

這句有錯嗎？

`The service restart automatically after a failure.`

### Expected intent

`correction`

### Expected status

`C — Grammar error`

### Expected correction

`The service restarts automatically after a failure.`

### Must identify

- `The service` 是 third-person singular subject
- simple present verb 應使用 `restarts`

### Must not

- 改成 past tense，除非 context 支持
- 改成 progressive，除非 context 支持
- 大幅 rewrite
- 展開 service restart troubleshooting

---

## COR-004 — Article

### Input

幫我修正文法：

`The client sends request to the server.`

### Expected intent

`correction`

### Expected status

`C — Grammar error`

### Expected correction

在一般可數單數 interpretation 下：

`The client sends a request to the server.`

### Must identify

`request`

在此為 singular count noun，需要適當 determiner。

### Must explain

最小修正是加入：

`a`

### Must not

- 無理由改成複數
- 改變 client/server 關係
- 展開 HTTP request 技術內容

---

## COR-005 — Wrong Verb Form after Modal

### Input

這句對嗎？

`The system can handles multiple requests.`

### Expected intent

`correction`

### Expected status

`C — Grammar error`

### Expected correction

`The system can handle multiple requests.`

### Must identify

modal `can` 後使用 bare infinitive：

`handle`

### Must not

- 保留 `handles`
- 改變 modal meaning
- 把 `can handle` 說成 infinitive with `to`
- 展開 request handling architecture

---

# Correct Sentence — Do Not Over-correct

## COR-006 — Correct Flat Adverb

### Input

我寫：

`The server responds fast.`

這句對嗎？

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

`A — Correct and natural`

### Must identify

- `fast` 可以直接作 adverb
- 原句文法成立
- 在適當語境可自然使用

### Must answer

原句不需要因 grammar 而修改。

可以視需要提到：

`The server responds quickly.`

是可能的 alternative。

### Must not

- 宣稱 `fast` 必須改成 `quickly`
- 宣稱副詞一定使用 `-ly`
- 建議 `fastly`
- 將 stylistic alternative 包裝成 grammar correction

---

## COR-007 — Correct Technical Sentence

### Input

幫我檢查：

`The proxy forwards traffic to the backend.`

### Expected intent

`correction`

### Expected status

`A — Correct and natural`

### Must identify

- grammar 成立
- technical meaning 合理
- 不需要修改

### Must preserve

- `proxy`
- `traffic`
- `backend`
- `forwards`

### Must not

- 為了「更自然」任意改成 `sends`
- 展開 reverse proxy architecture
- 因為可以換字就宣稱原句需要 correction

---

## COR-008 — Correct Object Complement

### Input

這句需要改嗎？

`The update made the service unavailable.`

### Expected intent

`correction`

### Expected status

`A — Correct and natural`

### Must identify

- `the service` = O
- `unavailable` = OC
- `make + O + OC` 結構成立

### Must not

- 將 `unavailable` 改成 adverb
- 將 `unavailable` 標成 C
- 為了 correction 而重寫正確句子

---

# Grammar vs Naturalness

## COR-009 — Grammatical but Context-dependent Naturalness

### Input

這句自然嗎？

`Send it a request.`

### Expected intent

`correction`

### Expected status

`B` 或 `D`

依 context 判斷：

- 句法上可以形成 `send + IO + DO`
- `it` = IO
- `a request` = DO
- 但自然度高度依賴 `it` 是否具有合理 recipient referent

### Must explain

必須分開：

- grammaticality
- contextual naturalness

### Must not

- 無條件宣稱文法錯誤
- 無條件宣稱在所有 context 都自然
- 將 `it` 當成被傳送的內容
- 錯套 `send + O + as + NP`

---

## COR-010 — Correct but Alternative Register

### Input

這句需要改嗎？

`Please send me the report.`

### Expected intent

`correction`

### Expected status

`A — Correct and natural`

### Must identify

原句：

- grammatical
- natural
- neutral/polite

不需要修改。

### Must not

- 為了顯得正式強制改成 `Kindly send me the report.`
- 宣稱 `kindly` 比 `please` 更正確
- 把 register preference 當 grammar rule

---

# Collocation

## COR-011 — Collocation Error

### Input

幫我改：

`We need to do a decision today.`

### Expected intent

`correction`

### Expected status

`B` 或 `C`

主要問題：

`do a decision`

不是標準自然 collocation。

### Expected correction

`We need to make a decision today.`

### Must identify

問題核心是：

`make a decision`

的 collocation。

### Must not

- 只說 `make` 比較好聽
- 宣稱 `do` 和 `make` 一般而言意思完全不同即可解釋所有搭配
- 展開大量無關的 make/do collocations

---

## COR-012 — Adjective-Noun Collocation

### Input

這句自然嗎？

`The site has strong traffic today.`

### Expected intent

`correction`

### Expected status

`B — Grammatical structure but unnatural collocation`

### Expected correction

在「流量很大」的 intended meaning 下，可改為：

`The site has heavy traffic today.`

或依 context 使用其他更精確表達。

### Must identify

主要問題：

`strong traffic`

搭配不自然。

### Must not

- 宣稱 adjective + noun 結構本身不合法
- 宣稱 `strong` 永遠不能修飾任何 traffic-related noun
- 改變 intended meaning 而不說明

---

# Word Choice

## COR-013 — Similar Meaning, Wrong Choice

### Input

幫我看：

`The server is hardly working under load.`

我想表達「伺服器在高負載下很努力地運作」。

### Expected intent

`correction`

### Expected status

`C — Meaning / word-choice error`

### Expected correction

若保留使用者 intended meaning：

`The server is working hard under load.`

### Must identify

- `hard` = 努力地／猛烈地等
- `hardly` = 幾乎不

### Must explain

原句：

`is hardly working`

實際更接近：

> 幾乎沒有正常運作

與使用者 intended meaning 相反。

### Must not

- 因拼字相似而視為相同副詞
- 忽略使用者明確提供的 intended meaning
- 展開 server load troubleshooting

---

## COR-014 — late vs lately

### Input

我想說「伺服器最近常常重啟」：

`The server restarts late.`

這樣可以嗎？

### Expected intent

`correction`

### Expected status

`C — Word-choice / meaning problem`

### Expected correction

若 intended meaning 是「最近」：

`The server has been restarting frequently lately.`

或其他能正確表達「最近常常重啟」的自然版本。

### Must identify

- `late` 不表示「最近」
- `lately` 可表示「最近」
- 原句的 `late` 比較接近「晚／遲」

### Must explain

此案例允許因 intended meaning 需要而超過單字級最小修改。

### Must not

- 只把 `late` 換成 `lately` 而忽略「常常」尚未表達
- 宣稱 `lately` 只是 `late` 的一般副詞形式
- 展開 restart root-cause analysis

---

# Ambiguous Meaning

## COR-015 — Insufficient Technical Context

### Input

幫我改得更精確：

`We need another worker.`

### Expected intent

`correction`

### Expected status

`D — Insufficient context`

### Must identify

句子本身可以成立。

但：

`worker`

的技術 referent 不明確。

可能依系統指：

- worker process
- background worker
- worker thread
- worker node
- job worker
- 其他執行單元

### Must explain

如果「更精確」是指 technical referent，需要額外 context。

### Must not

- 自行改成 `worker node`
- 自行改成 `background worker`
- 自行假設 Kubernetes、Celery、Sidekiq 或其他產品
- 因 context 不足就宣稱原句文法錯誤

---

## COR-016 — Ambiguous Pronoun

### Input

幫我修：

`When the service called the worker, it failed.`

### Expected intent

`correction`

### Expected status

`D — Ambiguous reference`

### Must identify

`it`

可能指：

- the service
- the worker
- call / operation，依語境可能還有其他解讀

### Must explain

在不知道 intended referent 前，不應自行選擇唯一 rewrite。

可以提供條件式修法，例如：

若 service failed：

`When the service called the worker, the service failed.`

若 worker failed：

`When the service called the worker, the worker failed.`

### Must not

- 自行假設 `it` 一定指 worker
- 自行假設 `it` 一定指 service
- 在沒有說明假設的情況下改變 referent

---

# Minimal Correction

## COR-017 — Do Not Rewrite Unnecessarily

### Input

只幫我修文法，不要改寫：

`The API return an error when the token is invalid.`

### Expected intent

`correction`

### Expected status

`C — Grammar error`

### Expected correction

`The API returns an error when the token is invalid.`

### Must identify

唯一必要修正：

`return` → `returns`

### Must preserve

- 原句結構
- `API`
- `error`
- `token`
- `invalid`
- subordinate clause

### Must not

- 改成 `The API responds with an error...`
- 改成 `An error is returned...`
- 改變 active/passive voice
- polish
- 加入額外 technical terminology

---

## COR-018 — User Explicitly Requests Natural Version

### Input

幫我改自然一點：

`This change makes the system to become unstable.`

### Expected intent

`correction`

### Expected status

`C — Structure error`

### Expected correction

可使用：

`This change makes the system unstable.`

### Must identify

在此 causative `make` 結構：

`make + O + OC`

不使用：

`make + O + to become ...`

### Must explain

- `the system` = O
- `unstable` = OC

### Must not

- 使用 `make + O + C`
- 保留不必要的 `to become`
- 為了 naturalness 完全改變原句意思

---

# Technical Meaning Preservation

## COR-019 — Preserve HTTP Method

### Input

幫我修得自然一點：

`Send the payload as a POST request.`

### Expected intent

`correction`

### Expected status

`A — Correct and natural` 或在特定 context 下提供等義 alternative

### Must identify

原句本身可以成立。

`POST`

是 HTTP method。

`POST request`

表示使用 POST method 的 HTTP request。

### Must preserve

如果提供 alternative：

- POST semantics
- payload 作為被傳送內容的關係

### Must not

- 任意改成 GET / PUT / PATCH
- 將 `POST request` 說成 request method 本身
- 因為可以改寫就宣稱原句錯誤

---

## COR-020 — Preserve Kubernetes Entity

### Input

幫我檢查英文：

`The Deployment keeps multiple Pods running.`

### Expected intent

`correction`

### Expected status

`A — Grammar acceptable`

### Must identify

在 Kubernetes context：

- `Deployment`
- `Pods`

可能是 domain-specific resource terms。

英文結構：

`keep + O + V-ing`

其中：

- `multiple Pods` = O
- `running` = V-ing form / OC

### Must not

- 將 `Deployment` 改成一般小寫 `deployment` 而忽略 domain meaning
- 將 `Pods` 改成 `instances` 只為了風格
- 將 `running` 標成 gerund
- 展開 Kubernetes controller architecture

---

# Correction vs Comparison Routing

## COR-021 — User's Own Sentence

### Input

我寫：

`The server responds fast.`

是不是應該改成：

`The server responds quickly.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Must identify

主要任務是評估使用者自己的句子，而不是純粹比較兩個單字。

### Must explain

- `fast` 可以作 adverb
- 原句不因 grammar 而必須修改
- `quickly` 可以是 alternative
- 是否偏好其中一個可依語境與語感討論

### Must not

- route 成純 comparison 而忽略「我的句子需不需要改」
- 宣稱 `fast` 作副詞是錯誤
- 宣稱 `quickly` 是唯一正確答案
- 建議不存在的一般形式 `fastly`
- 把 stylistic preference 包裝成 grammar rule

---

## COR-022 — Pure Comparison Is Not Correction

### Input

`fast` 和 `quickly` 有什麼差別？

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

使用者是在比較兩個英文表達，沒有要求評估或修正自己寫的句子。

### Must explain

- `fast` 可以作 adverb
- `quickly` 是 adverb
- 兩者意思可能接近
- 搭配、位置、語氣與自然度不一定完全相同
- 是否可以互換應依實際語境判斷

### Must not

- route 到 `correction`
- 假設使用者寫錯英文
- 宣稱 `quickly` 一定比 `fast` 正確
- 將 comparison 問題改造成 grammar correction

---

# Rewrite Boundary

## COR-023 — Explicit Minimal Correction

### Input

只修錯誤，不要改寫：

`The service keep restarting because the configuration are invalid.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

`C — Grammar errors`

### Expected correction

`The service keeps restarting because the configuration is invalid.`

### Must identify

兩個必要修正：

- `keep` → `keeps`
- `are` → `is`

### Must explain

- `The service` 是 third-person singular，因此使用 `keeps`
- `the configuration` 在此為 singular，因此使用 `is`

### Must preserve

- 原句結構
- `keep restarting`
- `because`
- `configuration`
- `invalid`

### Must not

- 改寫成其他 troubleshooting 表達
- 將 `keep restarting` 換成其他動詞只為了風格
- 增加原句沒有的 technical cause
- polish 使用者沒有要求修改的部分

---

## COR-024 — Explicit Polish Allows Larger Rewrite

### Input

幫我把這句改得比較專業、自然：

`We changed something and now the server does not work.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

原句基本意思可理解，但使用者明確要求 professional / natural rewrite。

### Expected behavior

允許比 Minimal Correction 更大的改寫。

例如可以依不增加未知事實的原則改成：

`The server stopped working after the change.`

或其他保留原意的專業自然版本。

### Must identify

此次較大幅改寫是因為使用者明確要求：

- professional
- natural

而不是因為原句必然有 grammar error。

### Must preserve

核心資訊：

- 發生了一項 change
- change 之後 server 無法正常工作

### Must not

- 自行宣稱 change 是 deployment
- 自行宣稱 server crashed
- 自行宣稱 configuration error
- 自行補充 root cause
- 把 stylistic rewrite 說成唯一正確答案

---

# Meaning Preservation

## COR-025 — Do Not Change Meaning While Correcting

### Input

幫我修：

`The deployment was failed yesterday.`

我想表達「部署昨天失敗了」。

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

`C — Grammar / voice problem`

### Expected correction

`The deployment failed yesterday.`

### Must identify

在 intended meaning 下：

`fail`

可作 intransitive verb。

因此：

`The deployment failed`

即可表達部署失敗。

### Must explain

原句不應機械式使用：

`was failed`

來表達這個意思。

### Must preserve

- deployment 是失敗的事件／對象
- 時間為 yesterday

### Must not

- 改成 `The deployment was canceled yesterday.`
- 改成 `The deployment was stopped yesterday.`
- 自行補充失敗原因
- 因為是 deployment 就展開 CI/CD 教學

---

# Learning Focus Integration

## COR-026 — Correction with Useful Learning Focus

### Input

這句對嗎？

`You can deploy it without restart the service.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected status

`C — Grammar error`

### Expected correction

`You can deploy it without restarting the service.`

### Must identify

- `without restart` → `without restarting`
- `without` 後表達動作時使用 V-ing construction

### Expected Learning Focus

可以加入：

> **這題記住：**
> `without + V-ing` → 在不做某件事的情況下。

或語意等價且精簡的版本。

### Must not

- Learning Focus 超過 1～2 個重點
- 重複整篇 correction explanation
- 把 `deploy`、`service` 等無關內容也列成學習重點
- 展開 deployment strategy 教學

---

## COR-027 — Correction without Forced Learning Focus

### Input

幫我修正拼字：

`The servre is healthy.`

### Expected intent

`correction`

### Expected template

`templates/correction.md`

### Expected correction

`The server is healthy.`

### Must identify

只是：

`servre` → `server`

的拼字修正。

### Learning Focus

可以省略。

### Must not

- 為簡單 typo 強制加入「這題記住」
- 展開 `server` 的完整詞彙分析
- 展開 SVC grammar lesson
- 因為句子簡單而增加無關教學內容

---

# Correction Cross-case Requirements

評估 COR-001 至 COR-027 時，除了各案例條件外，必須進行以下跨案例檢查。

## 1. Correction 不等於 Rewrite

Correction 預設應採：

`Minimal Correction`

只有當使用者明確要求：

- rewrite
- polish
- professional
- concise
- formal
- conversational
- native-like
- technical documentation style

時，才允許提高改寫幅度。

必須能區分：

`COR-017`
→ 明確要求只修 grammar

與：

`COR-024`
→ 明確允許 professional / natural rewrite

不得用同一種大幅 rewrite 策略處理兩者。

## 2. 正確句子不得強制修改

必須正確處理：

- COR-006
- COR-007
- COR-008
- COR-010
- COR-019
- COR-020

若原句正確且自然：

> 可以明確回答不需要修改。

替代表達只能標示為：

- alternative
- stylistic variation
- register variation

不得把替代方案包裝成 correction。

## 3. Grammar 與 Naturalness 分離

必須能區分：

- grammar error
- grammatical but less natural
- collocation issue
- register difference
- stylistic preference
- contextual ambiguity

特別檢查：

`COR-009`

不得因：

`Send it a request.`

自然度依賴 context，

就直接判定 grammar error。

## 4. 原意優先

Correction 不得在沒有使用者授權的情況下改變：

- actor
- action
- recipient
- result
- tense
- modality
- technical operation
- domain terminology

特別檢查：

- COR-014
- COR-019
- COR-020
- COR-024
- COR-025

## 5. Context 不足時不得猜測

COR-015 與 COR-016 必須證明：

> Correction 不代表一定要產生唯一 rewrite。

若缺少 context 會改變修正結果，應：

- 標示 ambiguity
- 說明假設
- 或提供條件式版本

不得自行選擇 technical referent 或 pronoun referent。

## 6. Correction vs Comparison

必須能區分：

`COR-021`

使用者問：

> 我寫的句子是不是應該修改？

主要 intent：

`correction`

與：

`COR-022`

使用者純粹問：

> 兩個字有什麼差別？

主要 intent：

`comparison`

不得只因兩題都出現兩種英文表達，就 route 成同一 intent。

## 7. Technical Meaning Preservation

Correction 不得為了語言風格破壞：

- HTTP method
- Kubernetes resource identity
- request / response relationship
- application / service distinction
- recipient relationship
- technical operation

Technical context 只補充到理解 correction 所需的程度。

## 8. Learning Focus

Correction 中的 Learning Focus：

- 是可選的
- 最多 1～2 個重點
- 必須可遷移
- 必須對準真正錯誤
- 不得重複正文

COR-026 應有合理 Learning Focus。

COR-027 則不應因只是 typo 而強制產生 Learning Focus。

---

# Correction Pass Criteria

一次 Correction evaluation 應確認：

- [ ] COR-001 至 COR-027 全部完成評估
- [ ] Correction intent routing 正確
- [ ] Comparison 與 Correction routing 沒有混淆
- [ ] 原句正確時不會為了 correction 而硬改
- [ ] Grammar 與 Naturalness 分開判斷
- [ ] Naturalness 與 stylistic preference 分開判斷
- [ ] Collocation 問題不被誤判成純 grammar syntax error
- [ ] Word choice 問題能保留 intended meaning
- [ ] Context 不足時不自行猜測
- [ ] Minimal Correction 是預設策略
- [ ] 使用者明確要求 rewrite / polish 時才提高修改幅度
- [ ] 修正不破壞 technical meaning
- [ ] C / OC notation 保持一致
- [ ] O / IO / DO notation 保持一致
- [ ] V-ing 不因表面形式被固定分類
- [ ] `-ly` 不被當成判斷副詞正確性的機械規則
- [ ] 正確的 flat adverb 不被錯誤修正
- [ ] technical terminology 不因風格改寫被任意替換
- [ ] Learning Focus 只在具有學習價值時出現
- [ ] typo 等低價值修正不強制產生 Learning Focus

---

# Evaluation Rules

每個案例只能標記：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

## PASS

必須：

- routing 正確
- 原句狀態判斷合理
- correction 正確
- 原意被保留
- Must identify / Must explain 成立
- 沒有違反 Must not

回答不需要逐字符合 Expected correction。

語意等價且符合案例要求即可。

## FAIL

符合以下任一情況：

- routing 明確錯誤
- 把正確句子改錯
- grammar correction 本身錯誤
- 把 naturalness preference 當 grammar rule
- 大幅改變使用者原意
- technical meaning 被破壞
- context 不足時自行猜測
- 違反 Must not
- 使用者要求 minimal correction 卻進行不必要 rewrite

## AMBIGUOUS

只在真正存在：

- 多種合理原意
- 多種合理 grammar analysis
- context 不足
- 測試明確允許多種 correction

時使用。

如果 Skill 已正確指出 ambiguity，該案例仍可依測試要求判定 PASS。

不得因 evaluator 自己不確定就標記 AMBIGUOUS。

## TEST SPEC ERROR

只在：

- 測試案例被截斷
- Expected requirements 自相矛盾
- 必要資訊缺失到無法執行測試

時使用。

不得用 AMBIGUOUS 掩蓋測試規格錯誤。

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

| Case | Result | Status | Routing | Summary |
| --- | --- | --- | --- | --- |

列出 COR-001 至 COR-027。

## 3. Failures

每個 FAIL 指出：

- failed requirement
- actual behavior
- expected behavior
- likely responsible file
- root-cause category

Root-cause category：

- routing
- correction template
- grammar reference
- vocabulary reference
- pattern reference
- technical-context reference
- correction reasoning
- test specification

## 4. Cross-case Findings

檢查是否存在系統性問題，例如：

- 所有輸入都被假設有錯
- 正確句子仍被強制 rewrite
- naturalness 一律被當 grammar
- correction 一律提供過多 alternatives
- technical terminology 被任意改寫
- ambiguity 一律被模型自行猜測
- correction / comparison routing 混淆
- Learning Focus 每次都強制出現
- Minimal Correction 沒有被遵守

## 5. Recommended Changes

只有觀察到實際 FAIL 時才提出修改。

優先修 root cause。

不要：

- 把 COR 測試句加入 references
- 為單一案例建立 hard-coded rule
- 因單一 failure 大幅重寫 Correction Mode

## 6. Final Judgment

只能選擇：

- `READY`
- `READY WITH MINOR ISSUES`
- `NEEDS REVISION`

---

# Test Integrity

Correction cases 是 evaluation specification，不是教材。

不得把測試句直接加入：

- `SKILL.md`
- `templates/correction.md`
- `references/`

作為直接答案。

如果 Correction case 發現真正的通用缺口：

1. 先確認 failure。
2. 找 root cause。
3. 修改最小必要規則。
4. 重跑 correction suite。
5. 重跑既有 regression suite。
6. 重跑 generalization suite。
7. 重跑 adversarial suite。
8. 確認新功能沒有破壞 v1.0 能力。
