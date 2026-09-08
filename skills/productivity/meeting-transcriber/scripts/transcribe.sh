#!/usr/bin/env bash
set -euo pipefail

# 會議錄音轉錄腳本 - 使用 whisper.cpp 進行語音辨識
# 用法: transcribe.sh <音訊檔案> <輸出目錄>

MODEL_PATH="${HOME}/.local/share/whisper-cpp/ggml-large-v3-turbo.bin"

function main() {
    local audio_file="$1"
    local output_dir="$2"

    if [[ -z "${audio_file:-}" || -z "${output_dir:-}" ]]; then
        echo "用法: transcribe.sh <音訊檔案> <輸出目錄>" >&2
        exit 1
    fi

    if [[ ! -f "${audio_file}" ]]; then
        echo "錯誤: 音訊檔案不存在: ${audio_file}" >&2
        exit 1
    fi

    if ! command -v whisper-cpp &> /dev/null; then
        echo "錯誤: whisper-cpp 未安裝，請執行: brew install whisper-cpp" >&2
        exit 1
    fi

    if [[ ! -f "${MODEL_PATH}" ]]; then
        echo "模型不存在，正在下載 large-v3-turbo..."
        whisper-cpp-download-model large-v3-turbo
    fi

    mkdir -p "${output_dir}"

    echo "正在轉錄: ${audio_file}"

    whisper-cpp \
        -m "${MODEL_PATH}" \
        -l zh \
        -f "${audio_file}" \
        -of "${output_dir}/transcript" \
        --output-txt \
        --output-srt

    # 將 .srt 轉為帶時間戳的分段格式
    if [[ -f "${output_dir}/transcript.srt" ]]; then
        awk '
        /^[0-9]+$/ {
            getline timestamp
            split(timestamp, a, " --> ")
            gsub(/,/, ".", a[1])
            gsub(/,/, ".", a[2])
            t1 = a[1]; t2 = a[2]
            text = ""
            while (getline line > 0 && line != "") {
                text = (text == "") ? line : text " " line
            }
            if (text != "") {
                printf "[%s - %s] %s\n", t1, t2, text
            }
        }' "${output_dir}/transcript.srt" > "${output_dir}/transcript_segments.txt"
    fi

    echo "轉錄完成!"
    echo "完整文字: ${output_dir}/transcript.txt"
    echo "分段文字: ${output_dir}/transcript_segments.txt"
}

main "$@"
