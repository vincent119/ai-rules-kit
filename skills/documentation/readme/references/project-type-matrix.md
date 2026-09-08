# 專案類型矩陣

先判斷專案主要使用方式，再選擇 README 區段；不把所有類型的內容疊在同一首頁。

| 專案類型 | 必備內容 | 深入文件連結 |
|---|---|---|
| Library／SDK | 安裝、最小 import、相容版本、基本範例 | API reference、進階範例、migration |
| CLI | 安裝、最小命令、輸入輸出、exit code、設定 | command reference、設定說明、故障排除 |
| Kubernetes controller | 用途、安全模型、權限、最小部署、驗證、failure policy | 架構、部署、設定、觀測、runbook |
| Service | 用途、部署、設定、health check、最小使用路徑 | 架構、操作手冊、觀測、SLO |
| Internal tool | 適用對象、存取方式、最短工作流程、支援管道 | 操作、政策、內部支援文件 |

若同時屬於多種類型，README 優先服務第一次採用者；將維運與架構細節導向技術文件。
