# README 反模式

以下反模式用於 Create、Improve 與 Audit。每一項都要以專案事實與 [evidence checklist](evidence-checklist.md) 驗證；找不到來源時標示待確認，不以推測修正。

## 1. 空白入口

### 表現

沒有 README，或只有專案名稱、一句模糊描述。

### 影響

讀者無法判斷 project 是否適用，也沒有開始使用的入口。

### 修正

至少提供價值說明、最短可驗證的 quick start，以及適用時的 license 連結；再逐步補齊其他段落。

## 2. README 當文件站

### 表現

README 包含完整 API reference、教學、架構決策、所有歷史版本與內部模組細節。

### 影響

安裝與最小使用方式被埋沒，文件漂移的維護成本變高。

### 修正

保留定位、採用與常見使用路徑；將深入內容連到 `docs/`、API reference、ADR、`CONTRIBUTING.md` 或 `CHANGELOG.md`。

## 3. 文件漂移

### 表現

README 的命令、旗標、API、設定、版本、相容性或功能已經與實作不一致。

### 影響

讀者依文件操作會失敗，並失去對 project 的信任。

### 修正

抽取每項技術宣稱，從 manifest、parser、公開 export、schema、release 與 CI 找權威證據。重大 API 或行為變更的 PR 應同時審查 README。

## 4. Badge 牆與首屏錯置

### 表現

過多 badges、作者介紹、贊助或社群連結擠在專案價值與 quick start 前面。

### 影響

讀者看不到 project 做什麼，也無法快速開始。

### 修正

只保留三至六個可行動 badge；先放名稱、價值與主要示範，作者與贊助資訊移到末尾或專門頁面。

## 5. 掃讀障礙與術語門檻

### 表現

長段落沒有 heading、清單或 code block；開場直接堆疊未展開的縮寫與專業術語。

### 影響

新讀者無法定位資訊，或還未理解問題便被術語排除。

### 修正

以 heading、短段落、清單、表格與有語言標示的 code block 建立層次。先用平實語言說明，再補精確術語；首次出現的縮寫要展開。

## 6. 無法複製的範例

### 表現

範例缺少 import、變數、前置條件、必要設定、版本範圍或預期輸出。

### 影響

讀者無法判斷失敗源於 setup、範例或 project，採用信心下降。

### 修正

驗證每個範例可執行，補足必要上下文與成功訊號。若依賴特定 major version、peer dependency 或工具版本，寫明已驗證或必要的相容範圍；不要一律固定 dependency 版本。

## 7. 安裝後只能祈禱

### 表現

只提供 package manager 指令，未說明 runtime、OS、系統相依、必要服務或驗證方式。

### 影響

安裝失敗時讀者只能猜測環境差異，最容易在採用第一步放棄。

### 修正

由 manifest、CI、release 或部署設定列出必要條件、平台差異與驗證命令。已知且常見的失敗模式才加入 troubleshooting。

## 8. 公開 README 的模板殘留

### 表現

公開 README 留下 `TODO`、`Coming soon`、`Project Name Here`、未替換 placeholder 或空的 FAQ／roadmap／benchmark 段落。

### 影響

內容看似完整卻沒有資訊，讀者不確定功能未完成還是文件未維護。

### 修正

刪除不適用或尚未有足夠內容的段落，將文件工作追蹤在 issue，而非公開 README。此規則不適用於 skill 的 output template：其 `[待確認]` 是生成前的安全佔位符，產出 README 前必須替換或刪除。

## 9. 視覺內容漂移

### 表現

截圖、GIF、影片或終端輸出已與目前 UI、指令或功能不一致。

### 影響

讀者對安裝結果與 project 維護狀態產生疑慮。

### 修正

在重大 release 檢查視覺素材；若無法維護，移除素材並以已驗證的文字或 code example 取代。必要時在檔名或附近標示適用版本。

## 10. API dump 與搜尋命中誤判

### 表現

README 傾倒所有 method signature，或把原始碼任意字串搜尋結果視為公開契約。

### 影響

讀者找不到常用任務的入口，也可能依賴未公開或已移除的內部實作。

### 修正

README 只放最常用的公開 API 與使用導向範例；完整 reference 連至專門文件。確認 public definition 與 entrypoint，不以任意搜尋命中作為依據。

## 11. 空泛或隱瞞的採用資訊

### 表現

使用「極快」、「企業級」等無證據形容詞，或有已知限制、非目標、成熟度、平台邊界卻完全不揭露。

### 影響

讀者可能在不適合的情境採用 project，後續成本與失望更高。

### 修正

以可驗證能力、量測資料或明確限制取代行銷語。當有權威證據且會影響採用時，說明 non-goals、已知限制、experimental／stable／maintenance 狀態與不適用情境；不要虛構成熟度或替代方案。

## 12. 複製治理文件

### 表現

將完整 LICENSE、CONTRIBUTING 或 CHANGELOG 複製到 README。

### 影響

同一內容有多個維護點，容易互相漂移並遮蔽核心資訊。

### 修正

以一句摘要與連結導向權威檔案。只有讀者需要立即理解的最新 release highlights 或最短貢獻入口可留在 README。

## Audit 使用方式

報告每個發現時，寫出反模式名稱、README 的觀察內容、原始碼或設定證據、讀者影響與最小修正。優先修正文件漂移、無法執行的範例與安裝資訊，再處理版面與措辭。
