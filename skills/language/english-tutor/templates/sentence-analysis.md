# 句子分析版型

適用於使用者要求分析完整句子、句子成分、主要子句，或需要理解多個結構如何共同形成整句語意時。

依句子複雜度選用必要區段。完整句分析應先建立「整句骨架」，再深入真正影響理解的局部結構；不要把每個單字都展開成獨立文法課。

## 1. 核心意思

先提供自然、符合語境的繁體中文翻譯。

必要時補充：

- 字面意思與自然翻譯的差異
- 語氣、時態或上下文造成的語意差異
- 專業領域中的特定意思

例如：

> Getting security wrong there gets expensive fast.

自然翻譯：

> 在那種情況下，如果安全性做錯了，代價很快就會變得非常高。

不要只逐字翻譯；優先保留原句真正表達的語意。

## 2. 整句骨架

先找出主要子句與主要動詞，再判斷核心句型。

常用核心句型：

- `SV`
- `SVC`
- `SVO`
- `SVOO`
- `SVOC`

例如：

`Getting security wrong there / gets / expensive / fast.`

核心骨架：

`S + V + C + Adv`

| 成分 | 內容 | 文法角色 |
| --- | --- | --- |
| S | Getting security wrong there | Subject |
| V | gets | Verb / Linking Verb |
| C | expensive | Subject Complement |
| Adv | fast | Adverb |

其中：

`Getting security wrong there` → S
`gets` → V
`expensive` → C
`fast` → Adv

因此核心句型仍可視為：

`SVC`

`fast` 是額外的副詞成分，不屬於核心 `SVC`。

若句子包含從屬子句、關係子句、並列結構或插入成分，先分離主要子句與附屬結構，不要直接把整句硬套進單一 `S/V/O/C` 公式。

## 3. 句子成分

當成分關係有助於理解時，使用表格分析。

| 成分 | 內容 | 文法角色 | 功能 |
| --- | --- | --- | --- |
| S | ... | Subject | 主詞 |
| V | ... | Verb | 主要動詞 |
| O | ... | Object | 受詞 |
| C | ... | Complement | 主詞補語 |
| OC | ... | Object Complement | 受詞補語 |
| IO | ... | Indirect Object | 間接受詞 |
| DO | ... | Direct Object | 直接受詞 |

核心句子成分使用一致標記：

`S / V / O / C / OC / IO / DO`

其他成分依實際句法形式標示，例如：

- `NP`：Noun Phrase
- `VP`：Verb Phrase
- `PP`：Prepositional Phrase
- `AdjP`：Adjective Phrase
- `AdvP`：Adverb Phrase
- `Clause`：子句
- `Adv`：副詞功能

必須區分：

**句子成分**

`S / V / O / C / OC / IO / DO`

與：

**句法形式**

`NP / VP / PP / AdjP / AdvP / Clause`

兩者不是同一層級。

例如：

`multiple instances`

可以同時描述為：

- 句法形式：`NP`
- 句子成分：`O`

不要把所有修飾語、介系詞片語或副詞都硬標成 `C` 或 `OC`。

## 4. 子句與片語層級

句子較複雜時，分析主要子句與重要片語／子句的包含關係。

優先分析真正影響理解的結構，例如：

- gerund phrase
- infinitive phrase
- participial phrase
- noun clause
- relative clause
- adverbial clause
- prepositional phrase
- coordination

例如：

> Getting security wrong there gets expensive fast.

可以先拆成：

`[Getting security wrong there] / gets / expensive / fast`

其中：

`Getting security wrong there`

整體是一個 `V-ing` 結構，在句中作主詞。

再往內分析：

`Getting [security] [wrong] there`

其中：

- `getting` → 動詞核心
- `security` → getting 的受詞
- `wrong` → 描述 security 的狀態
- `there` → 語境／位置相關副詞

不要為了形式完整而建立過度細碎的 parse tree。

分析深度應以「能不能幫助使用者理解句子」為判斷標準。

## 5. 關鍵結構

只挑出理解這句話真正需要掌握的文法或用法。

可能包括：

- gerund / infinitive
- participle
- linking verb
- tense / aspect
- active / passive voice
- preposition
- phrasal verb
- collocation
- adjective / adverb
- word order
- omitted / implied elements

例如：

> Getting security wrong there gets expensive fast.

值得深入的是：

### `get + adjective`

`get + adjective`

表示：

> 變得……

因此：

`gets expensive`

表示：

> 變得昂貴／代價變高。

### `fast`

此處 `fast` 是副詞。

它不是：

> 昂貴的 fast

而是說明：

> 「變得昂貴」這件事發生得有多快。

因此：

`gets expensive fast`

≈

`quickly becomes expensive`

若某個局部結構本身具有可重用的句型規則，例如：

`keep + O + V-ing`

只需先簡要指出。

只有當：

- 使用者特別追問該句型
- 該句型是理解整句的關鍵

才依 `pattern-analysis.md` 深入展開。

## 6. 為什麼這樣用

將句法結構與語意連起來，解釋作者為什麼選擇這種寫法。

優先回答：

- 某成分為什麼放在這個位置
- 某字在這裡為什麼是名詞、動詞、形容詞或副詞
- 某片語修飾哪個成分
- 某補語描述主詞還是受詞
- 某介系詞片語附著在哪裡
- 改成另一種常見結構後，意思或語氣如何改變

例如：

`gets expensive fast`

之所以自然，是因為：

`get + adjective`

先形成：

`get expensive`
→ 變得昂貴

再由副詞：

`fast`

說明這個變化發生的速度。

因此：

`get expensive fast`

可以理解成：

`[get expensive] [fast]`

而不是：

`get [expensive fast]`

分析時必須區分：

**句法形式**

與：

**語意功能**

不要僅依中文翻譯決定英文文法標籤。

## 7. 易混淆處與自然用法

只有在存在實際學習風險時加入。

比較時優先指出：

1. 文法是否都成立
2. 句型是否不同
3. 成分角色是否改變
4. 語意是否改變
5. 語氣是否不同
6. 哪一種在目前語境較自然

例如：

`Send it as a POST request.`

與：

`Send it a POST request.`

不能只回答：

> 第一個對，第二個錯。

應先分析：

`send + O + as + N`

與：

`send + IO + DO`

第一句中的：

`it`

是被傳送的內容。

第二句若句法成立：

`it`

會被理解成接收者／間接受詞。

因此兩句真正的問題是：

> 結構不同，所以 `it` 的文法角色與整句意思都改變了。

不要因為兩句意思不同，就把其中一句直接判定為文法錯誤。

## 8. 一句話記憶

只對較複雜、容易混淆或具有可泛化規則的句子提供。

用一句繁體中文壓縮最值得記住的結構或語意規則。

例如：

> `get + adjective + fast`：某個狀態「很快變得……」，`fast` 說明變化發生的速度。

如果原句沒有值得泛化的規則，可以省略本節。

## 分析限制

- 先找主要子句與主要動詞，再判斷 `S / V / O / C`；不要看到名詞或形容詞就先套標籤。
- `S / V / O / C / OC / IO / DO` 描述句子成分；`NP / VP / PP / AdjP / AdvP / Clause` 描述句法形式。兩者不可混為同一層級。
- 同一段文字可以同時具有「句法形式」與「句子功能」。例如 `multiple instances` 可以是 `NP`，同時在句中擔任 `O`。
- `V-ing` 只是形式，可能是 gerund、participle、progressive construction 的一部分，或依不同文法框架有不同分析；必須依句中功能判斷。
- `to + V` 的表面形式不足以決定它在句中的功能，必須分析它與主要動詞及其他成分的關係。
- Linking verb 後的形容詞通常分析為 subject complement；副詞可能修飾動詞、形容詞、其他副詞或整個命題，應依實際功能判定。
- 介系詞片語應先確認其組成與附著對象，再說明語意功能；不要一律當作補語。
- 不要把語意上的「角色、用途、身分、形式」直接等同於句法上的 `C` 或 `OC`。
- 不要因為兩個句子意思不同，就把其中一個判定為文法錯誤；先判斷句法是否合法，再比較語意。
- 存在多種合理句法分析時，明確指出採用的分析方式；不要把有爭議的分析寫成唯一答案。
- 若使用者只問局部單字、片語或句型，不要強制展開完整句子模板，應改用對應的最小版型。
- 句子分析的目的不是建立完整語言學 parse tree，而是用足夠精確的文法分析幫助使用者理解並遷移英文用法。
