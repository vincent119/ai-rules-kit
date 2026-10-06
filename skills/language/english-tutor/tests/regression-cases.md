# English Tutor Regression Cases

本文件定義 `english-tutor` 的核心 regression cases。

目的不是規定回答必須逐字一致，而是驗證：

- intent routing 是否正確
- template 是否選擇正確
- 核心文法分析是否正確
- 句法形式與句子功能是否分離
- context 是否正確影響詞義
- comparison 是否能解釋真正的結構差異
- 未來修改 Skill、templates 或 references 後，既有能力是否退化

## 驗證原則

每個案例包含：

- `Input`：使用者可能實際輸入的內容
- `Expected intent`：主要 routing
- `Expected template`：主要使用的 template
- `Must identify`：回答必須辨識的核心內容
- `Must explain`：需要解釋的關係
- `Must not`：不可出現的錯誤分析
- `Expected references`：需要時應使用的 reference

不要求回答逐字相同。

判定重點是：

1. routing 正確
2. grammar model 一致
3. 核心結論正確
4. 沒有觸犯 `Must not`
5. 回答深度符合問題，不機械式展開所有 template 區段

---

## REG-001 — 單字：fast

### Input

在：

`Getting security wrong there gets expensive fast.`

這個 `fast` 怎麼解釋？

### Expected intent

`word`

### Expected template

`templates/word-analysis.md`

### Must identify

- `fast` 在此處是 adverb
- `fast` 說明變化發生的速度
- 它與 `gets expensive` 形成語意關係
- 句尾位置自然

### Must explain

`gets expensive fast`

可理解為：

`[gets expensive] [fast]`

語意接近：

`quickly becomes expensive`

### Must not

- 將 `fast` 標成 C
- 將 `fast` 標成 adjective
- 宣稱副詞一定需要 `-ly`
- 建議不存在的 `fastly`
- 為回答單字問題而展開完整句子的所有文法

### Expected references

- `references/vocabulary/usage.md`
- 必要時 `references/grammar/core.md`

---

## REG-002 — 片語：without taking the application down

### Input

`without taking the application down`

怎麼解釋？

### Expected intent

`phrase`

### Expected template

`templates/phrase-analysis.md`

### Must identify

- `without + V-ing construction`
- `without` 是 preposition
- `taking the application down` 是 `without` 引入的 V-ing construction
- `the application` = NP / O
- `take ... down` 應作整體理解

### Must explain

在 Software / Operations 語境：

`take the application down`

通常表示：

> 讓應用程式停止服務／停機

整體：

`without taking the application down`

表示：

> 在不讓應用程式停機的情況下

### Must not

- 將 `take ... down` 逐字翻譯成「拿下來」
- 只看到 `taking` 就停止於「這是 gerund」的分析
- 把片語問題機械式展開成完整 sentence analysis

### Expected references

- `references/grammar/core.md`
- `references/vocabulary/usage.md`
- `references/domains/technical-context.md`

---

## REG-003 — 句型：without + V-ing

### Input

`without + V-ing` 是什麼結構？

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `without` 是 preposition
- 後方可以接 V-ing construction
- 這是一個可以遷移到其他句子的結構

### Must explain

基本語意：

> 在不做……的情況下

例如：

`without restarting the server`

`without changing the configuration`

### Must not

- 把問題 route 成完整句分析
- 宣稱所有 V-ing 都具有相同文法功能
- 為簡單句型問題輸出不必要的完整文法百科

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`

---

## REG-004 — 句型：keep + O + V-ing

### Input

`keep multiple instances running`

請分析。

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `keep + O + V-ing`
- `keep` = V
- `multiple instances` = NP / O
- `running` = V-ing form / OC

### Must explain

`running`

描述：

`multiple instances`

持續進行的動作／狀態。

可記為：

`keep + O + V-ing`
→ 讓 O 持續……

### Must not

- 將 `multiple instances` 標成 S
- 將 `running` 標成主要 finite verb
- 只因 `running` 是 V-ing 就直接標成 gerund
- 將 NP 與 O 當成同一分析層級

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`

---

## REG-005 — 完整句：gets expensive fast

### Input

分析：

`Getting security wrong there gets expensive fast.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

核心骨架：

`SVC`

並辨識：

- `Getting security wrong there` = S
- `gets` = linking V
- `expensive` = AdjP / C
- `fast` = Adv

### Must explain

`fast`

是額外的副詞成分，說明「變得昂貴」這個變化發生的速度，不屬於核心 `SVC`。

`Getting security wrong there`

整體作 S。

### Must not

- 將 `fast` 標成 C
- 將 `expensive` 標成 O
- 將 `gets` 在此處解釋為「取得」
- 因 `Getting` 是 V-ing 就直接決定整個結構只能有單一 gerund 分析
- 對每一個單字做不必要的完整字典分析

### Expected references

- `references/grammar/core.md`
- `references/vocabulary/usage.md`

---

## REG-006 — 片語／句型：leave + O + with + NP

### Input

`left me with two bad choices`

是什麼意思？為什麼這樣用？

### Expected intent

`phrase`

主要分析若進一步詢問通用結構，可轉：

`pattern`

### Expected template

主要：

`templates/phrase-analysis.md`

需要抽象句型時：

`templates/pattern-analysis.md`

### Must identify

- `left` = V
- `me` = O
- `with two bad choices` = PP
- 可抽象為 `leave + O + with + NP`

### Must explain

在目前語境：

`left me with two bad choices`

表示：

> 讓我只剩下兩個不好的選擇

### Must not

- 把 `leave` 只翻譯成「離開」
- 因 `with two bad choices` 描述結果就直接標成 OC
- 把 PP 與 OC 當成同一分析層級

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`

---

## REG-007 — 句型：send + O + as + NP

### Input

`Send it as a POST request.`

這個 `as` 怎麼解釋？

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

- `send + O + as + NP`
- `send` = V
- `it` = O
- `as a POST request` = `as + NP`
- 本 Skill 預設可將 `as a POST request` 分析為 PP
- 語意上說明 O 被傳送時的形式／角色

### Must explain

`it`

是被傳送的內容。

`as a POST request`

不是接收者。

### Must not

- 將 `it` 分析成 IO
- 將 `as a POST request` 一律標成 OC
- 將 `POST request` 說成「HTTP request method」

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`
- `references/domains/technical-context.md`

---

## REG-008 — 句型：send + IO + DO

### Input

`Send it a POST request.`

這句怎麼分析？

### Expected intent

`pattern`

### Expected template

`templates/pattern-analysis.md`

### Must identify

若採合法的雙受詞結構：

`send + IO + DO`

則：

- `it` = IO
- `a POST request` = DO

### Must explain

此分析下：

`it`

是接收者，

而：

`a POST request`

才是被傳送的內容。

自然度必須依 `it` 的實際 referent 與上下文判斷。

### Must not

- 無條件宣稱這句一定文法錯誤
- 把 `it` 當成被傳送內容，同時又使用 `send + IO + DO`
- 把「文法成立」與「目前語境自然」混為一談

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`
- `references/vocabulary/usage.md`

---

## REG-009 — 比較：send it as vs send it a

### Input

比較：

`Send it as a POST request.`

與：

`Send it a POST request.`

### Expected intent

`comparison`

### Expected template

`templates/comparison.md`

### Must identify

第一句：

`send + O + as + NP`

- `it` = O
- `as a POST request` = PP（本 Skill 預設分析）
- 語意上說明 O 的傳送形式／角色

第二句：

`send + IO + DO`

- `it` = IO
- `a POST request` = DO

### Must explain

真正差異是：

> `it` 的 grammatical function 改變，因此整句語意改變。

不是單純：

> 第一個對、第二個錯。

### Must not

- 直接宣稱第二句一定不符合英文文法
- 將 `as a POST request` 一律標成 OC
- 混淆 NP / PP 與 O / IO / DO
- 只比較中文翻譯而不分析結構

### Expected references

- `references/grammar/core.md`
- `references/sentence-patterns/core.md`
- `references/vocabulary/usage.md`

---

## REG-010 — 完整句：Deployment gives Kubernetes a way

### Input

分析：

`A Deployment gives Kubernetes a way to manage application updates gradually.`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

主要骨架：

`SVOO`

其中：

- `A Deployment` = NP / S
- `gives` = V
- `Kubernetes` = NP / IO
- `a way to manage application updates gradually` = NP / DO

並辨識：

`to manage application updates gradually`

與 `a way` 形成關係。

### Must explain

在 Kubernetes context：

`Deployment`

可能指 Kubernetes resource kind，不只是一般英文的「部署」。

但主要任務仍是分析英文句子，不應展開成 Kubernetes architecture 教學。

### Must not

- 使用 `give + O + N` 取代已統一的 `give + IO + DO`
- 將 `Kubernetes` 標成 DO
- 將 `a way` 標成 IO
- 因出現 Kubernetes 就偏離英文教學

### Expected references

- `references/grammar/core.md`
- `references/domains/technical-context.md`

---

## REG-011 — Routing：技術問題不應觸發 English Tutor

### Input

`How does Kubernetes rolling update work?`

### Expected intent

不應觸發 `english-tutor`

### Must identify

使用者主要意圖是詢問 Kubernetes 技術概念，而不是學英文。

### Must not

- 自動分析 `How does ... work?` 的文法
- 因為內容是英文就啟動 English Tutor
- 把 Kubernetes 問題改成英文課

---

## REG-012 — Routing：技術句子的英文分析應觸發

### Input

`How does Kubernetes rolling update work? 這句英文怎麼分析？`

### Expected intent

`sentence`

### Expected template

`templates/sentence-analysis.md`

### Must identify

使用者已明確提出英文學習意圖。

應分析英文結構，而不是只回答 Kubernetes rolling update 技術概念。

### Must not

- 因為內容涉及 Kubernetes 而忽略英文分析要求
- 展開不必要的 Kubernetes architecture 教學

### Expected references

- `references/grammar/core.md`
- 必要時 `references/domains/technical-context.md`

---

# Regression Pass Criteria

一次 regression review 至少確認：

- [ ] 12 個案例 routing 符合預期
- [ ] `word / phrase / pattern / sentence / comparison` 邊界一致
- [ ] `S / V / O / C / OC / IO / DO` notation 一致
- [ ] `NP / VP / PP / AdjP / AdvP / Clause` 與句子功能沒有混淆
- [ ] `V-ing` 沒有因表面形式被固定判成 gerund
- [ ] `as + NP` 沒有被機械式判成 OC
- [ ] `C` 與 `OC` 沒有混用
- [ ] `IO` 與 `DO` 沒有混用
- [ ] grammatical / natural / common / semantic equivalence 有分開
- [ ] Technical English 只作 context，不主導 routing
- [ ] 簡單問題沒有機械式輸出完整模板
- [ ] 沒有因中文翻譯反推錯誤英文句法

若任一案例失敗：

1. 記錄實際錯誤。
2. 判斷問題來自 `SKILL.md` routing、template 或 reference。
3. 修改最小必要規則。
4. 重新執行相關案例。
5. 確認修正沒有破壞其他 regression cases。
