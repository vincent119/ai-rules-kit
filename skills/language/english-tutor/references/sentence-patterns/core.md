# 常用句型判讀

本文件提供 English Tutor 辨識、抽象與比較可重用英文句型時的共同原則。

句型公式是學習工具，不是完整 parse tree。抽象句型前，必須先確認實際句子的句法關係；不要因兩個表達表面形式相似，就假設它們具有完全相同的句法行為。

## 1. 句型抽象原則

只有當結構具有可遷移性時，才抽象成句型公式。

例如：

`keep multiple instances running`

可以抽象為：

`keep + O + V-ing`

其中：

- `keep` → V
- `multiple instances` → NP / O
- `running` → V-ing form / OC

句型公式描述的是目前分析中最重要的結構關係，不代表公式中的每個位置都是詞類名稱。

例如：

`O`

是句子功能；

`NP`

是句法形式；

`V-ing`

是形式。

三者不可視為同一分析層級。

## 2. keep + O + V-ing

`keep + O + V-ing`

常表示：

> 讓 O 持續進行某個動作，或維持在某種動作／狀態中。

例如：

`keep multiple instances running`

分析為：

- `keep` → V
- `multiple instances` → NP / O
- `running` → V-ing form / OC

`running` 不是第二個主要限定動詞，而是在此結構中描述 O 所處的動作／狀態。

因此可記為：

`keep + O + V-ing`
→ 讓 O 持續……

但不要把所有 `V + O + V-ing` 表面結構都直接分析成完全相同的句型；仍應依主要動詞的 valency 與實際句法關係判斷。

## 3. without + V-ing

`without + V-ing construction`

通常表示：

> 在沒有做某件事的情況下

例如：

`without taking the application down`

可以先分析為：

`without + [taking the application down]`

其中：

- `without` → preposition
- `taking the application down` → V-ing construction，作 `without` 的 complement
- `the application` → NP / O，為 `take` 的受詞
- `down` → particle，與 `take` 形成 `take ... down`

在 Software / Operations 語境：

`take the application down`

通常表示：

> 使應用程式停止服務／停機

不要因為 `taking` 是 `V-ing` 形式，就只標示為 gerund 而停止分析；應同時說明它在目前結構中的功能。

## 4. send + O + as + NP

例如：

`Send it as a POST request.`

可抽象為：

`send + O + as + NP`

其中：

- `send` → V
- `it` → O
- `as a POST request` → `as + NP`

在本 Skill 的預設分析中：

`as a POST request`

可視為 PP，語意上說明 O 被傳送時的形式或角色。

因此：

`it`

仍然是被傳送的內容。

不要僅因 `as + NP` 語意上描述 O，就直接把它標為 OC。

是否在特定文法理論中進一步分析為 complement，應依動詞、句法測試與採用的分析框架判定。

## 5. send + IO + DO

例如：

`Send me the file.`

可以分析為：

`send + IO + DO`

其中：

- `me` → IO：接收者
- `the file` → DO：被傳送的內容

因此：

`Send it a POST request.`

若採：

`send + IO + DO`

分析，

則：

- `it` → IO：接收者
- `a POST request` → DO：被傳送的內容

這與：

`Send it as a POST request.`

不同。

後者是：

`send + O + as + NP`

其中 `it` 是被傳送的內容。

比較兩者時應從句法角色推導語意，不要只依中文翻譯或自然度判斷。

## 6. leave + O + with + NP

例如：

`sending a big search query over HTTP left me with two bad choices`

局部結構：

`leave + O + with + NP`

其中：

- `left` → V
- `me` → O
- `with two bad choices` → PP

整體常表示：

> 使 O 處於某種結果、處境，或使 O 剩下某些選項／事物。

因此：

`left me with two bad choices`

自然理解為：

> 讓我只剩下兩個不好的選擇。

`with + NP` 的實際句法地位應依採用的分析框架判定；不要僅因它描述結果就直接標成 OC。

## 7. get + adjective

當 `get` 作 linking verb 時：

`get + adjective`

通常表示：

> 變得……

例如：

`gets expensive`

可以分析為：

- `gets` → linking V
- `expensive` → AdjP / C

核心結構：

`SVC`

例如：

`Getting security wrong there gets expensive fast.`

其中：

- `Getting security wrong there` → S
- `gets` → linking V
- `expensive` → AdjP / C
- `fast` → Adv

`fast` 說明變化發生的速度，不屬於核心 `SVC`。

不要只看到 `get + adjective` 就機械式判斷所有 `get` 都是 linking verb；應依實際用法判斷。

## 8. V + O + as + X 類型

`use + O + as + X`

`treat + O + as + X`

`see + O + as + X`

`describe + O + as + X`

`classify + O + as + X`

在語意上常具有某種共同關係：

> 對 O 做某種處理，並以 X 說明 O 的用途、角色、身分、分類、形式或狀態。

但這只是有助學習的語意概括。

不要因為表面都可以寫成：

`V + O + as + X`

就宣稱所有動詞具有完全相同的：

- valency
- complement structure
- attachment
- syntactic behavior

應先分析各動詞本身的句法需求，再比較共同的語意關係。

## 9. 句型比較原則

比較兩個句型時，依序確認：

1. 兩者是否都符合英文句法。
2. 主要動詞的 valency 是否相同。
3. O、IO、DO、C、OC 等句子功能是否改變。
4. NP、PP、AdjP、Clause 等句法形式是否改變。
5. attachment 是否改變。
6. 句法差異如何造成語意差異。
7. 是否可以在目前語境互換。

不要把：

> 文法成立但意思不同

誤判為：

> 其中一句文法錯誤。

## 10. 句型判讀限制

- 句型公式是分析摘要，不是完整句法樹。
- `S / V / O / C / OC / IO / DO` 是句子功能。
- `NP / VP / PP / AdjP / AdvP / Clause` 是句法形式。
- `V-ing`、`to + V` 等首先是形式，不直接決定句子功能。
- `as + NP` 在本 Skill 中可預設以 PP 分析，但存在其他合理分析時應指出採用的分析方式。
- 不要因某成分在語意上描述 O，就直接標成 OC。
- 不要因表面公式相同，就假設不同動詞具有完全相同的句法行為。
- 先確認動詞 valency，再建立句型公式。
- 先判斷句法是否合法，再比較自然度與語意。
- 若某個結構只在單一句子成立、缺乏可遷移性，不必強行抽象成句型。
