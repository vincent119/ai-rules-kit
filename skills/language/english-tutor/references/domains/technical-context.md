# 技術語境判讀

本文件提供 English Tutor 處理 Software Engineering、DevOps、SRE、Cloud、Networking、Security、HTTP/API、Database 等技術素材時的語境判讀原則。

Technical English 是英文出現的一種 context，不是本 Skill 的主要範圍。目標是正確理解英文，而不是將每個技術句子展開成完整技術教學。

## 1. 保留領域語意

技術英文應優先保留術語在目前領域中的實際意思。

同一個一般英文單字在不同技術語境可能具有不同指涉，例如：

- `application`
- `instance`
- `request`
- `response`
- `token`
- `service`
- `resource`
- `deployment`
- `release`
- `node`

必須根據：

- 原句
- 前後文
- 技術領域
- 搭配
- 操作關係

判斷目前意思。

不要因為某個字具有一般英文義，就忽略它在技術語境中的慣用意思。

## 2. 最小技術背景

只補充理解英文所需要的最小技術背景。

例如：

`POST request`

可以簡要說明為：

> 使用 HTTP `POST` method 傳送的 request／HTTP POST 請求。

若目前問題只是分析：

`Send it as a POST request.`

則不需要進一步展開：

- HTTP method semantics
- REST design
- idempotency
- caching
- RFC 歷史

除非使用者另外詢問這些技術概念。

英文教學仍是主要任務。

## 3. 技術語境中的整體義

技術表達可能不能逐字翻譯。

例如：

`take the application down`

在 Software / Operations 語境通常表示：

> 讓應用程式停止服務／使應用程式停機

而不是：

> 把應用程式拿下來

又例如：

`roll out a new version`

通常表示：

> 部署／推出新版本

`roll back a release`

通常表示：

> 回滾版本／發布

分析時優先保留實際技術語意，再視需要解釋其一般英文來源。

## 4. 技術名詞的指涉

同一個技術詞可能依系統不同而指不同東西。

例如：

`instance`

可能指：

- application instance
- service instance
- VM instance
- database instance
- 某個物件／類別的 instance

因此：

`keep multiple instances running`

不應在缺乏上下文時武斷翻譯成：

> 保持多台 VM 運行

較安全的翻譯是：

> 讓多個實例持續運行

若上下文明確指出 Kubernetes、VM 或 application replicas，再進一步具體化。

## 5. 技術動詞與一般英文

一般英文動詞在技術語境可能形成穩定的專業用法，例如：

- `deploy`
- `release`
- `roll out`
- `roll back`
- `scale`
- `restart`
- `terminate`
- `fail`
- `recover`
- `serve`
- `handle`
- `bind`
- `resolve`

分析時先判斷它是否具有領域慣用義。

例如：

`the server handles the request`

中的：

`handle`

通常表示：

> 處理 request

而不是一般英文中的「用手拿」。

## 6. 名詞與動詞的技術轉換

技術英文經常讓一般單字具有特定 noun / verb 用法。

例如：

`request`

可以是 noun：

`Send a request.`

也可能在特定語境作 verb：

`The client requests the resource.`

`release`

可以是 noun：

`a new release`

也可以是 verb：

`release a new version`

應依目前句法位置與技術語境共同判斷，不要只依領域詞彙表決定詞性。

## 7. 專有名稱與一般概念

遇到：

- Kubernetes
- Docker
- AWS
- HTTP
- REST
- PostgreSQL
- Redis
- Linux
- Git

等專有技術名稱時，保留原名稱。

不要為了中文化而創造不常用或不精確的譯名。

但一般概念可依實際學習需要提供自然中文，例如：

`deployment`

→ 部署

`request`

→ 請求

`rollback`

→ 回滾

若中文技術社群常保留英文，也可以：

> 中文解釋 + 原英文術語

並列呈現。

## 8. 不確定語境

若上下文不足以唯一判定技術指涉，應明確標示假設。

例如：

> 假設此處的 `instance` 指應用程式或服務的執行實例。

不要自行補出原句沒有提供的：

- infrastructure
- architecture
- cloud provider
- programming language
- protocol
- product

如果不同假設會改變英文解讀，簡要列出主要可能性。

## 9. 技術正確性與英文分析

技術背景只在會影響英文解讀時介入。

例如：

`Deployment`

在 Kubernetes 語境可能是特定 resource kind。

因此：

`A Deployment gives Kubernetes a way to...`

中的：

`Deployment`

不應只當作一般名詞「部署」理解。

但 English Tutor 的主要分析仍應集中於：

- `give + IO + DO`
- infinitive structure
- `keep + O + V-ing`
- vocabulary
- sentence structure

例如：

`A Deployment gives Kubernetes a way to...`

其中：

- `A Deployment` → S
- `gives` → V
- `Kubernetes` → IO
- `a way` → DO

核心結構可分析為：

`S + V + IO + DO`

也就是：

`SVOO`

不要因為出現 Kubernetes 就把回答變成 Kubernetes architecture 教學。

## 10. 技術語境判讀限制

- Technical English 是 context，不是本 Skill 的主要範圍。
- 先確認英文學習意圖，再使用本 reference。
- 保留領域術語的實際意思。
- 不要依一般字典義覆蓋已明確的技術義。
- 不要因為某個字常見於技術領域，就假設目前一定使用技術義。
- 不確定指涉時明確標示假設。
- 不要自行補充原文沒有提供的架構或技術條件。
- 技術背景只補充到足以理解英文為止。
- 技術概念本身若成為主要問題，應停止 English Tutor 式展開並直接回答該領域問題。
- 翻譯技術術語時，以準確、自然且符合該領域慣例為優先。
