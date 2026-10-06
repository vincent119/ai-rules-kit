# 核心文法判讀

本文件提供 English Tutor 進行基礎句法與文法分析時的共同判讀原則。

目的不是建立完整語言學理論，而是提供一致、可解釋且適合英文學習的分析框架。

## 1. 分析層級

分析英文時，先區分以下三個層級。

### 詞類（Part of Speech）

描述單字本身在目前語境中的詞類，例如：

- noun
- verb
- adjective
- adverb
- preposition
- conjunction
- determiner
- pronoun

詞類必須依實際用法判斷。

同一個字可能具有不同詞類。

例如：

`fast`

可以是 adjective，也可以是 adverb。

### 句法形式（Syntactic Form）

描述一組文字由什麼結構組成，例如：

- `NP`：Noun Phrase
- `VP`：Verb Phrase
- `PP`：Prepositional Phrase
- `AdjP`：Adjective Phrase
- `AdvP`：Adverb Phrase
- `Clause`：子句

### 句子功能（Grammatical Function）

描述某個成分在句子中扮演什麼角色，例如：

- `S`：Subject
- `V`：Verb
- `O`：Object
- `C`：Subject Complement
- `OC`：Object Complement
- `IO`：Indirect Object
- `DO`：Direct Object

同一個成分可以同時具有句法形式與句子功能。

例如：

`multiple instances`

可以分析為：

- 句法形式：`NP`
- 句子功能：`O`

可簡寫為：

`multiple instances = NP / O`

不要把詞類、句法形式與句子功能當成同一層級的標籤。

## 2. 基本判讀順序

分析完整句子時，優先依下列順序：

1. 找主要子句。
2. 找主要限定動詞（finite verb）。
3. 找主要動詞的主詞。
4. 判斷動詞的 valency：是否需要受詞、補語或其他必要成分。
5. 建立核心句型。
6. 再分析修飾語、介系詞片語、從屬子句與其他附加成分。

常見核心句型包括：

- `SV`
- `SVC`
- `SVO`
- `SVOO`
- `SVOC`

不要先看到名詞、形容詞或 `V-ing` 就直接套用 `S / O / C / OC`。

## 3. 動詞與補語

動詞決定後方可以或需要出現哪些成分。

例如：

`be`

`become`

`seem`

`get`

在特定用法中可以作 linking verb，後方通常接 subject complement。

例如：

`The system became unstable.`

可以分析為：

`S + V + C`

其中：

- `The system` → S
- `became` → linking V
- `unstable` → C

但同一個動詞可能具有不同用法。

因此不要只看到 `get`、`become` 等字，就機械式判定後方一定是 C；應依實際句子結構判斷。

## 4. 受詞與受詞補語

某些動詞可以形成：

`V + O + OC`

例如：

`keep multiple instances running`

可分析為：

- `keep` → V
- `multiple instances` → O
- `running` → OC

其中 `running` 描述 `multiple instances` 所處的動作／狀態。

另一個常見結構：

`make + O + OC`

例如：

`The change made the system unstable.`

其中：

- `the system` → O
- `unstable` → OC

是否為 OC 應依動詞結構與成分關係判斷，不要因為某個成分「描述受詞」就一律標成 OC。

## 5. V-ing

`V-ing` 首先是一種形式，不代表固定的文法功能。

它可能出現在不同結構中，例如：

`Getting security wrong is costly.`

其中：

`Getting security wrong`

整體作 S。

為避免不同文法框架對 gerund / participle 分類方式造成不必要衝突，本 Skill 可優先稱為：

`V-ing 結構作 S`

必要時再補充傳統文法可能稱為 gerund / gerund phrase。

另一例：

`keep instances running`

其中：

`running`

在此結構中描述 `instances` 的狀態／動作，句子功能可分析為 OC。

因此：

不要只因兩個成分都具有 `V-ing` 形式，就給予相同的文法功能標籤。

## 6. To-infinitive

`to + V` 同樣不能只依表面形式決定功能。

例如它可能：

- 作主詞相關成分
- 作受詞相關成分
- 作補語
- 修飾名詞
- 表達目的

分析時應確認它：

- 與哪個動詞或名詞形成關係
- 在句中完成什麼功能
- 是否為動詞所要求的 complement

不要看到 `to + V` 就只標示「不定詞」而停止分析。

## 7. 介系詞片語

介系詞通常帶有 complement，例如：

- noun phrase
- pronoun
- `V-ing` construction

例如：

`without taking the application down`

可以先分析為：

`without + V-ing construction`

其中：

`without`

引入後方的 `taking the application down`。

整體在語意上表示：

> 在沒有做該動作的情況下

分析介系詞片語時應回答兩件事：

1. 它由什麼組成？
2. 它附著在哪個成分，並在句中表達什麼關係？

不要因為 PP 提供必要資訊，就直接把它標成 `C` 或 `OC`。

## 8. 修飾語

修飾語可能由不同句法形式實現，例如：

- adjective
- adverb
- PP
- relative clause
- participial construction

分析時應確認：

- 修飾對象
- 修飾範圍
- 位置
- 移動位置後是否改變意思

例如：

`gets expensive fast`

其中：

`fast`

是 adverb，說明「變得昂貴」這個變化發生的速度。

核心句型仍可分析為：

`SVC`

`fast` 是額外的副詞成分。

## 9. 子句

分析複雜句時，先區分主要子句與從屬子句。

常見從屬結構包括：

- noun clause
- relative clause
- adverbial clause

不要把整個複雜句直接硬套進單一 `SVO` 公式。

先建立主要子句骨架，再分析附屬結構與其功能。

## 10. 判讀原則

- 先分析結構，再決定標籤。
- 先找主要動詞，再建立 `S / V / O / C`。
- 詞類、句法形式與句子功能必須分開。
- `V-ing`、`to + V`、`as + NP` 等表面形式不能直接決定句子功能。
- 介系詞片語應先確認其附著對象。
- linking verb、transitive verb、intransitive verb 應依實際用法判斷。
- 不要依中文翻譯反推英文句法。
- 文法正確、自然、常見與意思相同是不同判斷維度。
- 存在多種合理分析時，採用前後一致且適合學習者的分析方式；必要時指出其他合理分析。
- 分析深度以解決使用者目前問題為準，不建立不必要的完整 parse tree。
