# meeting-transcriber

Kiro skill：將會議錄音（音訊/視訊）透過 whisper.cpp 轉錄為文字，生成結構化會議紀要，可選生成工作日報。

## 功能

- 轉錄音訊(.m4a/.mp3/.wav/.flac)與視訊(.mp4/.mkv/.webm)檔案
- 生成結構化會議紀要（Markdown 格式）
- 可選生成精簡工作日報
- 繁體中文最佳化（使用 whisper-large-v3-turbo 模型）

## 前置需求

- macOS（建議 Apple Silicon，效能較佳）
- [Kiro IDE](https://kiro.dev)
- ffmpeg
- whisper-cpp

## 安裝

1. 複製 skill 檔案到 Kiro skills 目錄：

```bash
cp -r . ~/.kiro/skills/meeting-transcriber
```

2. 安裝依賴：

```bash
brew install ffmpeg whisper-cpp
```

3. 下載模型（首次使用時也會自動下載）：

```bash
whisper-cpp-download-model large-v3-turbo
```

## 使用方式

在 Kiro 對話中提供錄音檔案並要求生成會議紀要：

```
對 meeting.m4a 做會議紀要
```

同時生成工作日報：

```
對 meeting.m4a 做會議紀要，同時生成工作日報
```

## 專案結構

```
├── SKILL.md                        # Skill 定義與執行步驟
├── references/
│   └── output-format.md            # 輸出格式範本
├── scripts/
│   └── transcribe.sh               # 音訊轉錄腳本（whisper.cpp）
└── README.md
```

## 運作流程

1. **音訊提取** — 用 ffmpeg 將輸入檔案轉為 16kHz 單聲道 WAV
2. **轉錄** — 用 whisper.cpp（whisper-large-v3-turbo）進行語音辨識
3. **會議紀要生成** — Kiro agent 分析轉錄文字並產出結構化紀要
4. **工作日報**（可選） — 精簡摘要，聚焦專案狀態、關鍵問題與待辦事項

## 與原版差異

| 項目 | 原版 (sample-for-kiro-meeting-minutes-skill) | 本版 |
|------|----------------------------------------------|------|
| 轉錄引擎 | mlx-whisper (Python) | whisper.cpp (CLI) |
| 依賴管理 | Python venv + pip | brew install |
| 腳本語言 | Python | Bash |
| 平台限制 | macOS Apple Silicon only | macOS（Intel/Apple Silicon 皆可） |
| 語言 | 簡體中文 | 繁體中文 |

## 授權

MIT-0
