# 任務文件：Claude Hooks 路徑隔離與打包修正

## 實作任務

- [x] 修改 Claude hook template command
  - 將 `hooks/update-readme/update-readme.claude.json` 的 command 改為 `.claude/hooks/update-readme/script/update-readme.js`。

- [x] 修改 `installHooks()` 的 Claude script 安裝路徑
  - Kiro script 維持 `.kiro/hooks/<hookName>/script/`。
  - Claude script 改為 `.claude/hooks/<hookName>/script/`。
  - 更新相關註解，避免仍寫 `.kiro/hooks`。

- [x] 修正 `update-readme.js` 的專案根目錄解析
  - 將 `ROOT` 改為 `process.cwd()`。
  - 確認 `README.md` 與 `skills/` 都從專案根目錄解析。

- [x] 修改 `package.json`
  - 在 `files` 加入 `hooks/`。

- [x] 更新 README Hooks 區段
  - 補充 Claude script 路徑為 `.claude/hooks/<name>/script/`。
  - 保留 Kiro script 路徑為 `.kiro/hooks/<name>/script/`。
  - 修正目前只提到 `$PWD/.kiro/hooks/...` 的描述。

## 驗證任務

- [x] 執行 Claude hooks dry-run

```bash
node cli/install.js --claude --hooks --dry-run
```

預期輸出包含：

```text
.claude/hooks/update-readme/script
.claude/settings.json
```

- [x] 執行 Kiro hooks dry-run

```bash
node cli/install.js --kiro --hooks --dry-run
```

預期輸出包含：

```text
.kiro/hooks/update-readme/script
.kiro/hooks/update-readme.kiro.hook
.kiro/agents/update-readme.json
```

- [x] 執行不支援 hooks 的 IDE dry-run

```bash
node cli/install.js --copilot --hooks --dry-run
```

預期結果：

```text
警告：GitHub Copilot (VS Code) 不支援 Hooks，跳過
```

- [x] 執行 all dry-run

```bash
node cli/install.js --kiro --all --dry-run
```

預期同時包含 rules、skills、hooks。

- [x] 檢查 npm package files

```bash
npm pack --dry-run
```

預期輸出包含：

```text
hooks/update-readme/update-readme.claude.json
hooks/update-readme/update-readme.kiro.hook
hooks/update-readme/update-readme.json
hooks/update-readme/script/update-readme.js
```

## 後續改善

- [ ] 評估 `deepMerge()` 對 hooks 陣列去重，避免重複執行安裝時累積相同 hook。
- [x] 評估拆分 `--skills` 安裝旗標與指定 skill 名稱參數，降低 CLI 解析歧義。
- [ ] 增加 CLI 自動化測試，覆蓋 hooks 路徑、dry-run、unsupported IDE、global hooks 跳過等情境。
