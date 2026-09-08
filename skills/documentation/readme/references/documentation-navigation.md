# 文件導覽與多語治理

README 不是連結清單。依讀者任務建立二至四條閱讀路徑，每條路徑以目標開始並按實際依賴排序。

```text
第一次部署：Installation → Configuration → Deployment → Validation
平台維運：Architecture → Observability → Runbook → Rollback
應用整合：Integration → Examples → Security boundaries
貢獻開發：Development setup → Test → Contribution guide
```

多語文件需指定主語言與檔名慣例，例如 `*.zh-Hant.md`、`*.en.md`。每次文件異動要同步更新翻譯，或清楚標記待同步；README 的語言入口與各語言連結應對稱。以文件角色決定連結：README 連到入口文件，入口文件連到任務文件，避免所有頁面互相重複全文。
