---
name: meeting-transcriber
description: 會議錄音轉會議紀要。將視訊(mp4/mkv/webm)或音訊(m4a/mp3/wav/flac)檔案透過 whisper.cpp 轉錄為文字，生成結構化會議紀要。支援生成工作日報。當使用者提到會議錄音、會議紀要、轉錄、transcribe meeting 時啟動。
---

## 輸入

使用者提供以下資訊：

- 檔案路徑：視訊(.mp4/.mkv/.webm)或音訊(.m4a/.mp3/.wav/.flac)檔案的絕對路徑
- 是否生成日報：可選，額外生成工作日報（只保留關鍵需求/問題/討論點）
- 輸出目錄：可選，指定輸出目錄，預設與來源檔案同目錄

## 執行步驟

### 第一步：環境檢查

1. 確認檔案存在，識別檔案類型（視訊/音訊）
2. 確認 ffmpeg 已安裝（`which ffmpeg`）
3. 確認 whisper-cpp 已安裝（`which whisper-cpp`）
   - 如果未安裝，提示使用者執行：`brew install whisper-cpp`
4. 確認模型已下載：檢查 `~/.local/share/whisper-cpp/ggml-large-v3-turbo.bin`
   - 如果不存在，執行：`whisper-cpp-download-model large-v3-turbo`

### 第二步：提取音訊

用 ffmpeg 將來源檔案轉為 WAV（如果已經是 WAV 則跳過）：

```bash
ffmpeg -i "<來源檔案>" -vn -acodec pcm_s16le -ar 16000 -ac 1 "<輸出目錄>/audio.wav" -y
```

注意：如果同目錄已有 audio.wav，用 `audio_<時間戳>.wav` 避免覆蓋。

### 第三步：轉錄

使用 scripts/transcribe.sh 執行轉錄：

```bash
bash ~/.kiro/skills/meeting-transcriber/scripts/transcribe.sh "<音訊檔案路徑>" "<輸出目錄>"
```

這一步耗時較長（約 1-2 分鐘/10 分鐘音訊），請告知使用者需要等待。

### 第四步：讀取轉錄結果

1. 讀取 `<輸出目錄>/transcript_segments.txt`，注意檔案可能很大，分批讀取
2. **識別並過濾 whisper 幻覺**：靜默段落中反覆出現的固定短語（如重複的廣告詞、欄目名）是 whisper 的已知問題，應忽略
3. **修正常見語音辨識錯誤**：技術術語、人名、產品名等需要根據上下文修正

### 第五步：生成會議紀要

基於轉錄內容，生成結構化的會議紀要 markdown 檔案，儲存為 `<輸出目錄>/會議紀要_<主題>.md`。

紀要格式參見 references/output-format.md。

要求：
- 用繁體中文撰寫
- 去除口語化表達，提煉核心資訊
- 保留具體的數字、時間節點、產品名稱
- 區分「已確認結論」和「待確認/待跟進」事項
- 如有明確的 action item，必須列出負責方

### 第六步（可選）：生成工作日報

如果使用者要求生成日報，基於會議紀要再生成一份精簡的工作日報 `<輸出目錄>/工作日報_<日期>.md`。

日報要求：
- 去掉所有產品介紹內容，只保留工作視角
- 聚焦：專案現狀、需求、關注點、提出的問題、討論結論
- 包含：專案架構思路、技術選型傾向、決策路徑
- 待跟進事項按優先級排列

日報格式參見 references/output-format.md。

## 注意事項

- 如果同一目錄下有多個錄音檔案需要合併生成日報，使用者會明確指定
- 輸出檔名中不要用空格，用底線
