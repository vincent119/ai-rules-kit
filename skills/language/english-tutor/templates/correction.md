# 英文修正版型

適用於使用者要求檢查、修正或改善自己寫的英文，例如：

- 這句英文對嗎？
- 幫我改文法。
- 這樣寫自然嗎？
- 母語者會這樣說嗎？
- Grammar check.
- 幫我改得自然一點。
- 這句有沒有更好的寫法？

Correction 的目的不是把所有句子改寫成另一種風格，而是先判斷原句是否真的存在問題，再做最小且有理由的修改。

依問題複雜度選用必要區段，不必逐項輸出。

## 1. 先判定原句狀態

先判斷原句屬於哪一種情況：

### A. 正確且自然

文法成立，且在目前語境自然。

此時應明確告知：

> 原句可以，不需要修改。

可以提供替代表達，但必須標示為：

- alternative
- stylistic variation
- register variation

不得把偏好性的改寫包裝成必要修正。

### B. 文法正確，但不夠自然

句法成立，但搭配、語序、詞彙、語氣或 register 在目前語境不自然或較少見。

此時應區分：

> Grammar：可接受
> Naturalness：建議調整

不要把 naturalness 問題誤稱為 grammar error。

### C. 文法或結構有問題

原句存在實際 grammar / syntax 問題。

此時提供：

1. 原句
2. 建議修正
3. 錯誤位置
4. 為什麼
5. 可遷移規則

### D. 意思不清楚或語境不足

若存在多種合理解讀，而且不同解讀會產生不同修正，不要自行猜測唯一原意。

應：

- 指出歧義
- 說明目前採用的假設
- 必要時提供不同意思下的修正版

只有當缺少的資訊會實質改變修正結果時，才需要要求更多 context。

## 2. 原句

保留使用者原始英文。

例如：

`How to deploy the update without interrupt users?`

不要在展示原句時先偷偷修正。

## 3. 建議修正

優先提供最小必要修改。

例如：

`How do you deploy the update without interrupting users?`

若原句有多種合理修法，先提供最符合原意且改動最小的一種。

不要為了讓句子「看起來更高級」而：

- 改變原意
- 增加不必要詞彙
- 改變 technical terminology
- 改變語氣
- 改變正式程度
- 重寫整句

除非使用者明確要求 rewrite、polish 或特定風格。

## 4. 修改對照

當修改超過一處，或使用者需要理解差異時，列出修改點。

例如：

| 原文 | 修正 | 原因 |
| --- | --- | --- |
| `How to deploy` | `How do you deploy` | 完整直接問句需要助動詞與主詞 |
| `without interrupt` | `without interrupting` | `without` 後表達動作時使用 V-ing construction |

簡單錯誤不需要強制使用表格。

## 5. 問題分類

只列出實際存在的問題。

可使用以下分類：

### Grammar

例如：

- subject-verb agreement
- tense
- article
- preposition
- word order
- clause structure
- verb complementation
- infinitive / V-ing
- S / O / C / OC / IO / DO 關係

### Naturalness

文法成立，但實際英文通常有更自然的表達方式。

### Word Choice

單字意思與目前語境不符，或存在更準確的詞。

### Collocation

單字個別意思可能合理，但搭配不自然。

例如：

`do a decision`

應優先考慮：

`make a decision`

### Register

表達本身成立，但正式度、口語程度、專業程度或語氣與目前情境不符。

### Meaning

修改會造成意思改變，或原句本身存在 semantic ambiguity。

不要為了填滿分類而機械式輸出所有分類。

## 6. 為什麼這樣改

修正後應解釋真正造成問題的規則，而不是只提供答案。

例如：

`without interrupt`

→ `without interrupting`

原因不是：

> interrupting 聽起來比較自然。

而是應指出：

`without`

是 preposition。

當後面表達一個動作時，可使用：

`without + V-ing construction`

因此：

`without interrupting`

符合目前結構。

解釋應優先回答：

- 哪個成分出了問題
- 問題屬於哪一層
- 為什麼修正版成立
- 原版若保留會造成什麼問題

## 7. 保留原意

Correction 的第一原則之一是：

> 修正文法與自然度，不應無故改變使用者原本想表達的意思。

尤其在技術英文中，不要任意替換：

- application
- service
- instance
- request
- response
- deployment
- release
- rollback
- token
- resource
- node
- Pod
- API
- HTTP method

除非原詞本身確實造成語意錯誤。

例如：

`POST request`

不要為了改寫風格而替換成另一種 HTTP method。

若原句中的 technical referent 不明確，保留原詞並標示假設，不自行補出 architecture。

## 8. 正確但可替換的表達

若原句本身正確，不要硬改。

例如：

`The cache refreshes fast.`

若目前語境自然，可以直接說：

> 原句文法成立。

若提供：

`The cache refreshes quickly.`

應標示為：

> 可替代表達

而不是：

> 正確答案

不得因：

`quickly`

具有典型 `-ly` 副詞形式，就宣稱：

`fast`

作副詞是錯誤。

## 9. 文法與自然度分離

Correction 必須區分：

- grammatical
- natural
- common
- contextually appropriate
- formal / informal
- stylistic preference

例如某句可能：

> 文法正確，但較不自然。

也可能：

> 文法正確且自然，只是存在另一種更正式的寫法。

不要把：

> 我比較偏好另一種寫法

寫成：

> 原句錯誤。

## 10. 修改幅度

預設採用：

> Minimal Correction

只修改真正有問題的部分。

如果使用者明確要求：

- rewrite
- polish
- professional English
- concise
- formal
- conversational
- native-like
- technical documentation style

才允許提高改寫幅度。

必要時可以區分：

### Minimal correction

只修錯誤。

### Natural version

在不改變原意下提高自然度。

### Polished version

只有使用者要求 polish / rewrite 時提供。

不要預設同時輸出三個版本。

## 11. 技術英文修正

技術英文 correction 必須同時維持：

- grammar correctness
- semantic correctness
- domain terminology
- operation relationship

例如：

`How do you release the new version without taking the application down?`

分析 correction 時可以說明：

`take the application down`

在 Software / Operations 語境表示：

> 讓 application 停機／停止服務

但不需要展開：

- Kubernetes rollout strategy
- blue-green deployment
- canary deployment
- load balancer architecture

除非使用者同時詢問技術內容。

## 12. 可遷移規則

當錯誤背後存在可重用規則時，簡短指出。

例如：

`without + V-ing`

→ 在不做……的情況下

或：

`make + O + OC`

→ 使 O 變成／處於某狀態

只保留與目前錯誤直接相關的規則。

不要把 correction 回答變成完整 grammar chapter。

## 13. Learning Focus

當 correction 中存在值得使用者記住、且可以遷移到其他英文的核心規則時，可以在最後提供：

**這題記住：**

後面只保留 1～2 個最高價值的學習點。

例如：

> **這題記住：**
> `without` 後面要表達「做某事」時，可使用 `without + V-ing`。

Learning Focus 應：

- 對準使用者真正犯的錯
- 可以遷移到其他句子
- 簡短
- 不重複整段 explanation
- 最多 1～2 個重點

如果原句只是簡單拼字錯誤、專有名稱修正，或沒有值得泛化的規則，可以省略。

## Correction 判讀順序

進行 correction 時，依序確認：

1. 使用者原本想表達什麼。
2. 原句 grammar 是否成立。
3. 若 grammar 成立，naturalness 是否有問題。
4. word choice 是否符合語境。
5. collocation 是否自然。
6. register 是否符合使用情境。
7. technical meaning 是否被正確保留。
8. 是否真的需要修改。
9. 若需要，找出最小修正。
10. 是否存在值得保留的 Learning Focus。

這個順序的目的，是避免一開始看到不同寫法就直接 rewrite。

## Correction 限制

- 不要為了執行 correction 而假設原句一定有錯。
- 原句正確且自然時，明確說不需要修改。
- 不要把 stylistic preference 當 grammar rule。
- 不要把少見但合法的表達直接判定為錯誤。
- 不要把 grammatical 與 natural 混為同一判斷。
- 不要因中文翻譯相同就認為英文可以互換。
- 不要因 dictionary synonyms 就認為兩個字可以直接互換。
- 不要看到 `-ly` 就假設它一定比 flat adverb 更正確。
- 不要看到 `V-ing` 就固定判定為 gerund。
- 不要看到 adjective 就固定判定為 C；應確認它描述 S 還是 O。
- 不要把 NP / PP / AdjP 等句法形式與 O / C / OC 等句子功能混為同一層級。
- 不要因 semantic role 相同就認為 grammatical function 相同。
- 不要為了自然度而破壞 technical meaning。
- 不要自行補充使用者沒有提供的 architecture、product、protocol 或 infrastructure。
- 不要在使用者只要求 grammar correction 時進行大幅 rewrite。
- 不要一次提供大量 alternatives。
- 不要為了展示能力而修正沒有問題的內容。

## 與其他版型的關係

Correction 是主要 intent 時，以本版型為主。

若 correction 中需要解釋單一詞彙，可依：

`word-analysis.md`

的原則補充，但不要重新輸出完整單字分析模板。

若錯誤涉及片語，可依：

`phrase-analysis.md`

補充。

若錯誤涉及可重用句型，可依：

`pattern-analysis.md`

補充。

若必須理解完整句子骨架才能解釋錯誤，可依：

`sentence-analysis.md`

補充。

若使用者要求比較原句與另一種寫法，可依：

`comparison.md`

補充。

不要因 correction 同時涉及其他分析層級，就機械式串接多份完整模板。

Correction 應始終以：

> 找出問題 → 最小修正 → 解釋原因 → 提取必要學習規則

為主要流程。
