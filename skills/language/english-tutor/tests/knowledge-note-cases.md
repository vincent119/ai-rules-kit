# English Tutor Knowledge Note Cases

本文件用來驗證 `english-tutor` v1.3 Knowledge Note。

Knowledge Note 的目的不是把聊天回答原樣存成 Markdown，而是將已確認的英文知識重新組織成：

- 可獨立閱讀
- 可快速查找
- 可長期維護
- 可交叉比較
- 可複習
- 可遷移

的知識文件。

Knowledge Note 是明確的輸出 intent。

它不是：

- 一般分析回答的固定附加內容
- Learning Focus 的放大版
- 第二套 grammar model
- 自動 Knowledge Base 管理器

## 核心驗證範圍

本測試主要驗證：

1. Knowledge Note routing
2. Note type classification
3. Knowledge identity
4. Section selection
5. Grammar-model consistency
6. Information density
7. Source-example preservation
8. Technical-context boundaries
9. Learning Focus integration
10. Correction integration
11. Knowledge Base create / update / merge boundaries
12. File naming guidance

每個案例只能評為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

---

# Routing

## KN-001 — Explicit Knowledge Note Intent

### Input

把剛才學的：

`leave + O + with + NP`

整理成英文知識庫筆記。

### Expected intent

`knowledge-note`

### Expected note type

`pattern`

### Expected template

`templates/knowledge-note.md`

### Must identify

使用者不是單純要求：

- pattern analysis
- phrase explanation
- Learning Focus

而是明確要求建立可長期保存的知識文件。

### Must produce

以 Pattern Note 為主要結構。

### Must not

- 只輸出一般 `pattern-analysis.md` 聊天回答
- route 成 correction
- 把 Knowledge Note 當成 Learning Focus
- 在沒有要求寫檔時宣稱已建立實體檔案

---

## KN-002 — Ordinary Analysis Must Not Become Knowledge Note

### Input

`leave me with two choices`

怎麼分析？

### Expected intent

`phrase` 或 `pattern`

### Knowledge Note expected

`NO`

### Must identify

使用者沒有要求：

- 筆記
- Markdown
- Knowledge Base
- 文件整理

### Must not

- 自動產生完整 Knowledge Note
- 自動加入 frontmatter
- 自動提供檔名
- 因為某個結構值得保存就自行改成 knowledge-note intent

---

## KN-003 — Follow-up Converts Analysis to Knowledge Note

### Context

前一輪已完成：

`without + V-ing`

的句型分析。

### Input

把剛才的內容整理成 Markdown 筆記。

### Expected intent

`knowledge-note`

### Expected note type

`pattern`

### Must identify

新的主要 intent 已從：

`pattern`

轉成：

`knowledge-note`

### Must preserve

前一輪已確認的核心分析：

`without + V-ing`

### Must not

- 重新回答成一般聊天分析
- 假裝已寫入檔案
- 因為是 follow-up 就忽略新的輸出 intent

---

# Note Type Classification

## KN-004 — Word Note

### Input

幫我建立 `fast` 的英文學習筆記，重點放在 adjective / adverb 用法。

### Expected intent

`knowledge-note`

### Expected note type

`word`

### Must include as appropriate

- 核心意思
- 詞性
- adjective / adverb distinction
- 代表例句
- 必要的 usage / position 說明

### Must not

- 使用 Pattern Note 的 12 節完整架構
- 把 `fast` 強行抽象成 sentence pattern
- 建立完整 flat-adverb 百科
- 列出所有 dictionary senses

---

## KN-005 — Phrase Note

### Input

把 `take the service down` 整理成片語筆記。

### Expected intent

`knowledge-note`

### Expected note type

`phrase`

### Must identify

- `take ... down` 應作整體理解
- technical context 影響其意思
- 主要知識主體是 multi-word expression

### Must not

- 把它錯誤分類成 Word Note
- 因為可以看到 `take + O + down` 就一定升級成大型 Pattern Note
- 展開 service shutdown architecture
- 逐字翻譯後拼湊整體義

---

## KN-006 — Pattern Note

### Input

整理：

`keep + O + V-ing`

成句型知識筆記。

### Expected intent

`knowledge-note`

### Expected note type

`pattern`

### Must identify

- `keep + O + V-ing` 是可重用 structure
- `O` 是 grammatical function
- `V-ing` 是 form
- 實際例句中 V-ing 可依結構分析其 function

### Must not

- 把 O 與 NP 當成同一分析層級
- 宣稱所有 V-ing 都是 gerund
- 只產生一般 phrase note

---

## KN-007 — Grammar Note

### Input

幫我整理一篇：

`C vs OC`

的文法筆記。

### Expected intent

`knowledge-note`

### Expected note type

`grammar`

### Must prioritize

- 核心概念
- 判斷方法
- minimal contrast
- 常見誤判
- decision rule

### Must explain

核心 distinction：

- 描述 S → C
- 描述 O → OC

### Must not

- 只列兩個定義
- 寫成兩篇獨立百科
- 把 adjective 固定判定成 C 或 OC
- 混淆 AdjP 與 C / OC

---

## KN-008 — Comparison Note

### Input

幫我整理：

`hard` vs `hardly`

成比較筆記。

### Expected intent

`knowledge-note`

### Expected note type

`comparison`

### Must prioritize

- 核心差異
- 詞性／usage
- minimal pair
- 是否可互換
- 常見誤解

### Must not

- 分別寫成兩篇完整 Word Note 再拼起來
- 宣稱 `hardly` 只是 `hard` 的一般 `-ly` 版本
- 用大量無關 synonyms 增加篇幅

---

# Knowledge Identity

## KN-009 — Abstract Pattern Identity

### Input

把：

`keep multiple instances running`

整理成句型筆記。

### Expected intent

`knowledge-note`

### Expected note type

`pattern`

### Expected knowledge identity

`keep + O + V-ing`

### Expected title

優先類似：

`# keep + O + V-ing`

### Must preserve

原始例句可以保留：

`keep multiple instances running`

但不應把它當作唯一 knowledge identity。

### Must not

- 將 H1 寫成整個完整例句並忽略抽象結構
- 建立 `multiple instances` 專屬 grammar rule
- 將 `running` 固定標成 gerund

---

## KN-010 — Do Not Over-abstract a Phrase

### Input

把：

`by the way`

整理成筆記。

### Expected note type

`phrase`

### Expected knowledge identity

`by the way`

### Must not

- 強行抽象成 `by + NP`
- 建立不存在的可重用 grammar formula
- 因為包含 preposition 就分類成 Grammar Note

---

## KN-011 — Similar Surface Does Not Guarantee Same Identity

### Input

我有：

`leave + O + with + NP`

現在又學到：

`leave + O + OC`

這兩個放同一篇嗎？

### Expected intent

`knowledge-note` / knowledge-organization reasoning

### Must identify

兩者：

- 共享主要動詞 `leave`
- 但後方結構不同
- grammatical relation 不同

### Expected behavior

可以：

- 放在同一個較高層 `leave` 主題中分成兩個明確 pattern
- 或維持兩篇互相關聯的 Pattern Notes

取決於使用者 Knowledge Base 的粒度。

### Must not

- 因為都是 `leave` 就宣稱完全相同
- 強制 merge 成單一 pattern
- 未檢查 Knowledge Base 就宣稱應刪除其中一篇

---

# Section Selection

## KN-012 — Simple Word Note Must Stay Small

### Input

幫我整理 `lately` 的簡短筆記。

### Expected note type

`word`

### Must respect

使用者明確要求：

`簡短`

### Expected sections

只需要少量高價值 sections，例如：

- 核心意思
- 詞性
- 與 `late` 的關鍵差異
- 代表例句

### Must not

- 輸出 10～12 個 sections
- 建立大型 grammar chapter
- 加入大量 synonyms
- 因 Knowledge Note template 很完整就全部填滿

---

## KN-013 — Complex Pattern May Use Richer Structure

### Input

建立：

`leave + O + with + NP`

的完整句型筆記，要包含原句、易混淆結構和常見搭配。

### Expected note type

`pattern`

### Expected behavior

可以使用較完整的 Pattern Note 結構，例如：

- 核心意思
- 句型結構
- 原始例句
- 例句拆解
- 為什麼這樣用
- 常見用法
- 易混淆結構
- 常見搭配
- 相近表達
- 記憶公式
- 一句話記憶

### Must not

- 因「完整」就加入與主題無關的 grammar encyclopedia
- 重複相同翻譯於多個 sections
- 每節只換標題但內容實際相同

---

## KN-014 — No Empty Sections

### Input

整理 `by the way` 成一份簡潔 Phrase Note。

### Expected behavior

只輸出有實際內容的 sections。

### Must not

產生：

- `## 常見錯誤` 後寫「無」
- `## 相近句型` 後寫「無」
- `## 技術英文延伸` 後寫「不適用」
- 空表格
- placeholder sections

---

# Grammar-model Consistency

## KN-015 — Form vs Function in Knowledge Note

### Input

建立：

`keep the connection alive`

的句型筆記。

### Expected note type

`pattern`

### Must identify

- `keep` = V
- `the connection` = NP / O
- `alive` = AdjP / OC
- pattern 可抽象為 `keep + O + OC`

### Must distinguish

- NP / AdjP = syntactic form
- O / OC = grammatical function

### Must not

- 將 `alive` 標成 C
- 把 AdjP 與 OC 當成同一類標籤
- 因已有 `keep + O + V-ing` 就錯套該 pattern

---

## KN-016 — PP Must Not Become OC

### Input

建立：

`leave + O + with + NP`

的 Pattern Note。

### Must identify

`with + NP`

在目前 Skill 預設分析中是：

`PP`

語意上可描述 O 最後具有或面臨的結果。

### Must not

- 僅因 PP 描述 O 的結果就直接標成 OC
- 將 PP 與 OC 當成同一分析層級
- 為了筆記簡化而破壞既有 grammar model

---

# Source and Example Integrity

## KN-017 — Preserve Original Example

### Input

我的原句是：

`Sending a large request over HTTP left me with only two options.`

請用這句建立 `leave + O + with + NP` 筆記。

### Expected note type

`pattern`

### Must preserve

將使用者提供的句子作為：

`原始例句`

時，文字應保持原樣。

### May add

額外補充例句，但必須與原始例句區分。

### Must not

- 偷偷把 `large` 改成 `big`
- 把 `only two options` 改成其他內容後仍稱為原始例句
- 將新增例句冒充使用者來源

---

## KN-018 — Correction Source Becomes Rule, Not Error Identity

### Context

使用者曾寫：

`without restart the service`

並已修正為：

`without restarting the service`

### Input

把這個整理成知識筆記。

### Expected note type

`pattern`

### Expected knowledge identity

`without + V-ing`

### Must prioritize

正確可遷移規則。

### May include

原錯誤作為：

`常見錯誤`

例如：

`without restart` → 不符合目前 intended structure

### Must not

- 使用 `without restart the service` 作 H1
- 將錯誤形式當成 knowledge identity
- 建立以使用者錯誤為中心的文件，除非明確要求錯題筆記

---

# Technical Context

## KN-019 — Technical Example without Domain Expansion

### Input

把：

`Send the payload as a POST request.`

整理成英文句型筆記。

### Expected note type

`pattern`

### Must preserve

- `POST` 是 HTTP method
- `POST request` 是使用 POST method 的 HTTP request
- `payload` 是被傳送內容

### Must focus

英文結構：

`send + O + as + NP`

以及必要的：

`as + NP`

分析。

### Must not

- 展開 REST architecture
- 展開 HTTP method history
- 討論 GET / PUT / PATCH 除非比較需要
- 把 `POST request` 說成 request method 本身
- 讓技術內容壓過英文知識主題

---

## KN-020 — Ambiguous Technical Term

### Input

幫我建立 `worker` 的英文單字筆記。

目前只有這句：

`The worker is stuck.`

### Expected note type

`word`

### Must identify

technical referent 不足以唯一確定。

### Expected behavior

可以：

- 解釋一般核心概念
- 指出 technical context 中可能有多種 referent
- 明確標示需要更多 context

### Must not

- 將 H1 或核心定義固定成 `Kubernetes worker node`
- 自行假設 background worker
- 自行假設 framework / cloud provider
- 將不確定推測寫成知識庫事實

---

# Learning Focus Integration

## KN-021 — Do Not Append Duplicate Learning Focus

### Input

把 `without + V-ing` 整理成 Knowledge Note。

### Expected intent

`knowledge-note`

### Expected behavior

Knowledge Note 可以包含：

- 記憶公式
- 一句話記憶

但完成 Knowledge Note 後，不應再機械式附加：

`## Learning Focus`

或：

`這題記住`

來重複相同規則。

### Must not

產生：

`一句話記憶`
+
`Learning Focus`
+
`這題記住`

三層重複收斂。

---

# File and Knowledge Base Boundaries

## KN-022 — Content Request Is Not File Write

### Input

給我：

`keep + O + V-ing`

的 Knowledge Note 內文。

### Expected behavior

只產生 Knowledge Note 內容。

### Must not

- 宣稱已建立 `.md`
- 宣稱已寫入 Knowledge Base
- 宣稱已完成去重
- 自行選擇 filesystem path

---

## KN-023 — Existing Note Requires Inspection Before Merge

### Input

我已經有：

`keep O V-ing.md`

現在想把：

`keep the process running`

整理進去。

### Expected behavior

若要實際決定 update / merge，必須先取得既有 note 內容。

### Must identify

新的例句看起來可能屬於：

`keep + O + V-ing`

但不能只靠檔名宣稱內容完全重複。

### Must not

- 未讀檔案就宣稱「直接合併完成」
- 未讀檔案就宣稱「不需要新增內容」
- 只依檔名判斷既有 note 已涵蓋所有分析

---

## KN-024 — Naming

### Input

我要建立這句的句型筆記：

`The failure left us with no alternative.`

檔名建議？

### Expected note type

`pattern`

### Expected knowledge identity

`leave + O + with + NP`

### Expected filename

優先類似：

`leave O with NP.md`

### Must not

優先建議：

`The failure left us with no alternative.md`

除非使用者既有命名 convention 明確要求完整原句。

---

## KN-025 — Optional Modifier Must Not Become Part of Knowledge Identity

### Input

使用者從這個原句建立句型 Knowledge Note：

`Getting security wrong there gets expensive fast.`

文件分析已正確指出：

- `gets` = linking V
- `expensive` = AdjP / C
- `fast` = Adv
- `fast` 表示狀態改變的速度
- 移除 `fast` 後，`gets expensive` 仍是完整核心結構

請判斷主要 knowledge identity。

### Expected intent

`knowledge-note`

### Expected note type

`pattern`

### Expected knowledge identity

`get + Adj`

### Must identify

核心 pattern：

`get + Adj`

表示：

> 主詞進入或變成某種狀態。

在原句：

`gets expensive fast`

中：

- `gets expensive` = 核心結構
- `fast` = optional adverbial modifier
- `fast` 說明狀態改變發生的速度

### Must distinguish

核心句型：

`get + Adj`

與帶有額外 modifier 的實際 realization：

`get + Adj + fast`

後者可以作為原句或延伸用法說明，但不應取代主要 knowledge identity。

### Must explain

Knowledge identity 應優先保留：

- necessary constituents
- reusable grammatical relationship

而不是把原始例句中的 optional modifier 一併固化進 pattern。

移除 optional modifier 後，如果核心 grammatical relationship 仍成立，該 modifier 通常不應成為主要 pattern identity 的必要部分。

### Expected title

優先：

`# get + Adj`

而不是：

`# get + Adj + fast`

### May preserve

Knowledge Note 可以保留：

- 原始例句中的 `fast`
- `fast` 的副詞功能
- `fast` vs `quickly`
- `get + Adj + fast` 作為實際用法
- 其他句尾 `fast` 的例句

但這些屬於：

- 原句分析
- optional modification
- usage extension

而不是主要 knowledge identity。

### Must not

- 將主要 knowledge identity 設為 `get + Adj + fast`
- 因原始例句包含 `fast` 就把它視為 pattern 的必要 constituent
- 刪除 `fast` 的有價值分析
- 將 `fast` 標成 C
- 將 `fast` 視為 `get` 必選的 complement
- 因為 `fast` 可省略就認為它沒有學習價值

---

# Knowledge Note Cross-case Requirements

評估 KN-001 至 KN-024 時，除了各案例條件外，必須進行以下跨案例檢查。

## 1. Knowledge Note 是明確 intent

只有使用者要求：

- 整理成筆記
- 建立 Knowledge Note
- 建立知識庫文件
- 整理成 Markdown
- 建立單字／片語／句型／文法／比較筆記

時，才應進入 `knowledge-note` intent。

例如：

`leave me with two choices 怎麼分析？`

不是 Knowledge Note intent。

而：

`把 leave + O + with + NP 整理成句型筆記。`

才是 Knowledge Note intent。

不得因某個英文知識「值得保存」就自行建立 Knowledge Note。

---

## 2. Note Type 必須依知識主體判斷

必須能區分：

### Word Note

主要知識主體是 lexical item。

例如：

`fast`

### Phrase Note

主要知識主體是 multi-word expression。

例如：

`by the way`

### Pattern Note

主要知識主體是具有可重用 slots 的結構。

例如：

`keep + O + V-ing`

### Grammar Note

主要知識主體是 grammar concept 或 distinction。

例如：

`C vs OC`

### Comparison Note

主要知識主體是兩個以上表達的差異。

例如：

`hard vs hardly`

不得因所有內容都可以進行 grammar analysis，就全部分類成 Grammar Note。

---

## 3. Knowledge Identity 應穩定且可重用

Pattern Note 應優先抽象成可重用 knowledge identity。

例如：

`keep multiple instances running`

↓

`keep + O + V-ing`

又例如：

`The failure left us with no alternative.`

↓

`leave + O + with + NP`

但不要過度抽象。

例如：

`by the way`

本身就是穩定 phrase identity。

不應強行改成：

`by + NP`

Knowledge identity 必須來自實際可重用的 linguistic structure，而不是為了統一命名而製造公式。

---

## 4. Section Selection 必須依內容複雜度

Knowledge Note template 是：

> 可選 section 集合

不是：

> 固定表單。

簡單 Word Note 不應被迫具有：

- 句型結構
- 原始例句拆解
- 常見錯誤
- 相近句型
- 記憶公式
- 一句話記憶

等所有 sections。

複雜 Pattern Note 則可以使用較完整結構。

特別檢查：

- KN-012
- KN-013
- KN-014

不得出現：

- 空 section
- `無`
- `N/A`
- placeholder table
- 為了模板完整而重複內容

---

## 5. Knowledge Note 不得成為聊天回答 dump

Knowledge Note 應移除或降低：

- 對話式開場
- 「你這裡問得很好」之類的聊天語句
- 重複翻譯
- 重複 explanation
- 不必要 follow-up
- 大量即時回答式補充

文件應能脫離原對話獨立閱讀。

但不得因此移除理解主題所需的重要 context。

---

## 6. Grammar Model 必須與既有 Skill 一致

Knowledge Note 不建立第二套 grammar model。

必須持續區分：

### Part of speech

例如：

- noun
- verb
- adjective
- adverb
- preposition

### Syntactic form

- NP
- VP
- PP
- AdjP
- AdvP
- Clause

### Grammatical function

- S
- V
- O
- C
- OC
- IO
- DO

### Semantic function / role

例如：

- recipient
- state
- result
- form
- manner
- purpose
- time

不得為了筆記簡潔而混淆這些層級。

---

## 7. C 與 OC 必須維持一致

例如：

`The service became unavailable.`

其中：

`unavailable = AdjP / C`

而：

`The update made the service unavailable.`

其中：

`unavailable = AdjP / OC`

Knowledge Note 不得因：

`unavailable`

是相同 adjective，就給予相同 grammatical function。

---

## 8. PP 不得因語意而直接變成 OC

例如：

`leave + O + with + NP`

中的：

`with + NP`

在目前 Skill 採用的預設分析中是：

`PP`

它可以在語意上描述：

> O 最後具有或面臨的結果。

但：

> semantic result

不等於：

> OC

特別檢查 KN-016。

---

## 9. V-ing 必須依實際結構判讀

Knowledge Note 中不得看到：

`V-ing`

就固定標成：

- gerund
- participle
- OC
- progressive

應依實際句法環境判斷。

例如：

`keep multiple instances running`

中的：

`running`

可以分析為：

`V-ing form / OC`

但這不代表所有：

`running`

都具有相同 function。

---

## 10. 原始例句與補充例句必須分離

如果使用者提供：

`Sending a large request over HTTP left me with only two options.`

並要求將它作為筆記來源，

Knowledge Note 若標示：

`原始例句`

就必須保留原文。

新增的 teaching examples 可以另外加入，但應清楚屬於：

- 補充例句
- 常見例句
- minimal pair

不得把模型新增或改寫後的句子冒充來源原文。

特別檢查 KN-017。

---

## 11. Correction 應轉換成可遷移知識

若 Knowledge Note 來源是 Correction：

`without restart the service`

↓

`without restarting the service`

建立 Knowledge Note 時，主要 knowledge identity 應是：

`without + V-ing`

而不是：

`without restart the service`

原錯誤可以在有學習價值時放入：

`常見錯誤`

但不能讓錯誤形式主導文件 identity。

除非使用者明確要求：

> 個人錯題筆記。

---

## 12. Technical Context 必須保持最小

Technical English 可以決定詞義。

例如：

`POST`

在：

`POST request`

中是 HTTP method。

但 Knowledge Note 的主要目標如果是：

`send + O + as + NP`

就不應擴張成：

- HTTP specification
- REST design
- idempotency
- caching
- API architecture

同理：

`worker`

context 不足時，不得自行固定為：

- Kubernetes worker node
- background worker
- job worker

Technical context 應只補充到足以理解英文。

---

## 13. Learning Focus 不應與 Knowledge Note 重複

Knowledge Note 已經是結構化知識輸出。

因此主要 intent 為：

`knowledge-note`

時，不應在文件最後機械式再加入：

- Learning Focus
- 這題記住
- 第二份 summary

若需要記憶收斂，應整合到 Knowledge Note 自己的：

- 記憶公式
- 一句話記憶
- 判斷公式
- 核心差異

等 section。

特別檢查 KN-021。

---

## 14. Knowledge Note Content 不等於 File Write

如果使用者只要求：

> 給我 Knowledge Note 內文。

則只應產生內容。

不得聲稱：

- 已建立檔案
- 已寫入 Knowledge Base
- 已更新既有 note
- 已完成 merge
- 已完成去重

除非實際執行了對應檔案操作。

特別檢查 KN-022。

---

## 15. Merge / Update 必須先檢查既有內容

若使用者說：

> 我已經有 `keep O V-ing.md`，把新例句整理進去。

不能只根據檔名判斷：

> 這一定是同一份內容，可以直接 merge。

應先取得既有文件內容，再判斷：

- knowledge identity 是否相同
- 新內容是否已存在
- 應 update 還是 keep separate

特別檢查 KN-023。

---

## 16. 文件命名應反映 Knowledge Identity

Pattern Note 優先使用：

`leave O with NP.md`

而不是：

`The failure left us with no alternative.md`

Word Note 優先使用：

`fast.md`

Comparison Note 可使用：

`hard vs hardly.md`

但如果使用者 Knowledge Base 已有自己的 naming convention：

> 既有 convention 優先。

不得為了新模板大量重新命名既有文件。

## 17. Knowledge Identity 應區分必要成分與可選修飾語

建立 Pattern Note 的 knowledge identity 時，應優先保留：

- necessary constituents
- reusable grammatical relationship

原始例句中的 optional modifiers 不應因為出現在來源句中，就自動成為 pattern identity 的必要部分。

例如：

`get expensive fast`

應先判斷：

- `get + Adj` 是否已形成完整核心 pattern
- `fast` 是否只是額外 adverbial modifier

若移除 modifier 後：

- 核心句法仍完整
- 核心 grammatical relationship 不變

則該 modifier 通常不應進入主要 knowledge identity。

但 optional modifier 若具有學習價值，仍可保留於：

- 原始例句分析
- usage extension
- comparison
- common modification

不得因為它不是 identity 的必要部分，就把相關有價值內容全部刪除。

特別檢查 KN-025。

---

# Knowledge Note Pass Criteria

一次 Knowledge Note evaluation 應確認：

- [ ] KN-001 至 KN-024 全部完成評估
- [ ] Knowledge Note 只有在明確知識整理 intent 下觸發
- [ ] 一般 word / phrase / pattern / sentence 分析不會自動變成 Knowledge Note
- [ ] Word / Phrase / Pattern / Grammar / Comparison Note classification 合理
- [ ] Pattern Note 能抽象出穩定 knowledge identity
- [ ] Phrase Note 不被過度抽象成不存在的 pattern
- [ ] Section selection 依知識複雜度決定
- [ ] 簡單筆記不會機械式輸出完整大型模板
- [ ] 不產生空 section、placeholder 或 `N/A`
- [ ] Knowledge Note 可脫離聊天上下文獨立閱讀
- [ ] Grammar notation 與既有 Skill 一致
- [ ] NP / PP / AdjP 與 O / C / OC 等分析層級沒有混淆
- [ ] C / OC 沒有混用
- [ ] PP 不因 semantic result 被自動標成 OC
- [ ] V-ing 不因表面形式被固定分類
- [ ] 原始例句與補充例句清楚區分
- [ ] Correction 來源能轉換成可遷移 knowledge identity
- [ ] technical terminology 被正確保留
- [ ] technical context 不造成 domain over-expansion
- [ ] 不確定 technical referent 不被寫成確定知識
- [ ] Knowledge Note 不機械式再附加 Learning Focus
- [ ] Knowledge Note 內容輸出不被誤稱為已完成 file write
- [ ] 未讀取既有 Knowledge Base 時不宣稱已完成 merge / dedup
- [ ] filename 優先反映 knowledge identity
- [ ] 使用者既有 naming convention 優先於新模板偏好
- [ ] Pattern knowledge identity 能區分 necessary constituents 與 optional modifiers
- [ ] 原始例句中的 optional modifier 不會被機械式固化進 pattern identity
- [ ] optional modifier 有學習價值時仍能保留於筆記內容

---

# Evaluation Rules

每個案例只能標記為：

- `PASS`
- `FAIL`
- `AMBIGUOUS`
- `TEST SPEC ERROR`

## PASS

必須符合：

- intent routing 正確
- note type 合理
- knowledge identity 合理
- section selection 符合內容複雜度
- grammar analysis 正確
- Knowledge Note 能獨立閱讀
- 沒有違反 Must not

回答不需要逐字符合測試中的範例。

只要：

- 結構
- grammar
- knowledge organization
- semantic meaning

等價即可。

## FAIL

符合以下任一情況：

- 一般分析被錯誤 route 成 Knowledge Note
- Knowledge Note intent 沒有被辨識
- note type 明確錯誤
- knowledge identity 過度具體或錯誤抽象
- 簡單主題被機械式填滿大型模板
- 產生大量空 sections
- grammar model 與既有 Skill 不一致
- 原始例句被偷偷改寫
- technical context 被過度擴張
- 不確定 technical referent 被寫成確定事實
- Knowledge Note 後又重複輸出 Learning Focus
- 未執行 file operation 卻宣稱已寫入
- 未讀取既有 note 卻宣稱已完成 merge / dedup
- 違反 Must not

## AMBIGUOUS

只在真正存在以下情況時使用：

- Word / Phrase / Pattern classification 有合理邊界差異
- 一個主題合理地可以採兩種 Knowledge Base 粒度
- grammar framework 存在合理差異
- context 不足以唯一決定 technical referent
- 使用者既有 Knowledge Base convention 未知，而該 convention 會改變組織方式

若 Skill 能正確指出這種 ambiguity，案例仍可依測試條件判為 PASS。

不得因 evaluator 個人偏好而使用 AMBIGUOUS。

## TEST SPEC ERROR

只在：

- 測試案例被截斷
- requirements 自相矛盾
- 必要資訊缺失到無法執行測試

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

| Case | Result | Intent | Note Type | Summary |
| --- | --- | --- | --- | --- |

列出：

KN-001 至 KN-024。

## 3. Failures

每個 FAIL 必須指出：

- failed requirement
- actual behavior
- expected behavior
- likely responsible file
- root-cause category

Root-cause category：

- SKILL.md routing
- knowledge-note template
- note-type classification
- knowledge identity
- section selection
- grammar reference
- vocabulary reference
- pattern reference
- technical-context reference
- Knowledge Base boundary
- test specification

## 4. Cross-case Findings

檢查是否存在系統性問題，例如：

- 所有英文學習問題都被轉成 Knowledge Note
- Knowledge Note 永遠使用同一套 sections
- Word / Phrase / Pattern classification 持續混淆
- Pattern Note 沒有抽象 knowledge identity
- 所有 phrase 都被過度抽象
- 原始例句經常被改寫
- Knowledge Note grammar model 與聊天分析不一致
- technical examples 經常擴張成 domain tutorial
- Knowledge Note 經常重複 Learning Focus
- 沒有檔案操作卻宣稱已寫入
- 未讀既有文件就宣稱完成 merge

如果多個 FAIL 來自同一 root cause，只提出一個主要 architecture finding。

## 5. Recommended Changes

只有觀察到實際 FAIL 時才提出修改。

優先：

> 最小修改 root cause。

不要：

- 把 KN 測試句直接加入 `knowledge-note.md`
- 為單一案例建立 hard-coded rule
- 為提高 pass rate 增加更多固定 sections
- 因一個 classification failure 重寫整套 English Tutor

## 6. Final Judgment

只能選：

- `READY`
- `READY WITH MINOR ISSUES`
- `NEEDS REVISION`

---

# Regression Protection

Knowledge Note v1.3 不得破壞既有 v1.0～v1.2 行為。

完成 KN suite 後，必須重新驗證：

- Regression：12 cases
- Generalization：22 cases
- Adversarial：21 cases
- Correction：27 cases
- Learning Focus：27 cases

既有 baseline：

`109 / 109 PASS`

新增 Knowledge Note：

`24 cases`

若全部通過：

`133 / 133 PASS`

新增 `knowledge-note` intent 不得造成：

- word 問題錯 route
- phrase 問題錯 route
- pattern 問題錯 route
- sentence 問題錯 route
- comparison 問題錯 route
- correction 問題錯 route
- Learning Focus 變成 Knowledge Note
- Knowledge Note 自動出現在一般回答

---

# Test Integrity

Knowledge Note cases 是 evaluation specification，不是教材。

不得把 KN 測試的完整答案或完整例句直接複製進：

- `SKILL.md`
- `templates/knowledge-note.md`
- `references/`

來提高 pass rate。

允許共享：

- 通用 grammar rules
- note-type definitions
- knowledge identity principles
- section-selection principles
- file-operation boundaries

不允許：

> 看到測試答案後，把該完整答案寫進模板。

如果 Knowledge Note case 發現真正的通用缺口：

1. 確認 failure。
2. 找 root cause。
3. 修改最小必要規則。
4. 重跑 Knowledge Note suite。
5. 重跑 Correction suite。
6. 重跑 Learning Focus suite。
7. 重跑 Regression suite。
8. 重跑 Generalization suite。
9. 重跑 Adversarial suite。
10. 確認 v1.3 沒有破壞既有 109 個案例。

Knowledge Note 的品質目標是：

> 把已確認的英文知識整理得更穩定、更容易查閱。

而不是：

> 把聊天回答變得更長。
