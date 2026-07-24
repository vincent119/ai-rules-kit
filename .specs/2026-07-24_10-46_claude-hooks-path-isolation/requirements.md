# 需求文件：Claude Hooks 路徑隔離與打包修正

## 背景

目前 hooks 安裝支援正在加入 `cli/install.js`，目標是讓 Kiro 與 Claude Code 都能安裝 `update-readme` hook。

現況中 Claude Code 的設定會寫入 `.claude/settings.json`，但 hook script 會被複製到 `.kiro/hooks/update-readme/script/update-readme.js`，使 Claude Code 的安裝結果依賴 Kiro 目錄。這會造成安裝語意不清、文件不一致，以及使用者清除 `.kiro/` 後 Claude hook 失效。

同時，`package.json` 的 `files` 尚未包含 `hooks/`，即使功能完成，npm package 也不會包含 hook 範本。

## 目標

1. Claude Code hooks 安裝後只依賴 `.claude/` 目錄。
2. Kiro hooks 安裝後維持使用 `.kiro/` 目錄。
3. hook source template 可以共用，但安裝目的路徑必須依 IDE 分離。
4. npm package 必須包含 `hooks/` 目錄。
5. README 與 CLI dry-run 輸出需反映實際安裝路徑。

## 非目標

1. 不重構整個 CLI 架構。
2. 不新增新的 hook 種類。
3. 不變更既有 rules 與 skills 的安裝目的地。
4. 不處理版本發布、tag、npm publish。

## 使用者故事

### US-001：Claude Code 使用者只安裝 Claude hooks

作為 Claude Code 使用者，我執行：

```bash
node cli/install.js --claude --hooks
```

我期望專案只新增或更新 Claude Code 相關路徑，避免產生 `.kiro/` 依賴。

#### 驗收條件

- `.claude/settings.json` 會被建立或合併。
- hook script 會安裝到 `.claude/hooks/update-readme/script/update-readme.js`。
- `.claude/settings.json` 內的 command 指向 `.claude/hooks/update-readme/script/update-readme.js`。
- 執行 `--dry-run` 時輸出顯示 `.claude/hooks/...` 路徑。

### US-002：Kiro 使用者安裝 Kiro hooks

作為 Kiro 使用者，我執行：

```bash
node cli/install.js --kiro --hooks
```

我期望 hook 檔案安裝到 Kiro 既有路徑。

#### 驗收條件

- `.kiro/hooks/update-readme.kiro.hook` 會被建立。
- `.kiro/hooks/update-readme/script/update-readme.js` 會被建立。
- `.kiro/agents/update-readme.json` 會被建立。
- Kiro hook command 繼續指向 `.kiro/hooks/update-readme/script/update-readme.js`。

### US-003：套件使用者透過 npm 安裝

作為套件使用者，我透過 npm 取得 `@vincent119/ai-rules-kit` 後，執行 hooks 安裝應可找到 hook 範本。

#### 驗收條件

- `package.json` 的 `files` 包含 `hooks/`。
- npm 打包時會包含 `hooks/update-readme/` 內的 JSON、Kiro hook 與 script。

### US-004：README hook 自動更新腳本能找到專案根目錄

作為維護者，我希望 `update-readme.js` 不因安裝到 `.claude/hooks/...` 或 `.kiro/hooks/...` 而找錯專案根目錄。

#### 驗收條件

- script 以 hook 執行時的工作目錄作為專案根目錄。
- README 路徑解析為 `<project-root>/README.md`。
- skills 路徑解析為 `<project-root>/skills`。

## 驗證需求

至少執行以下 dry-run：

```bash
node cli/install.js --kiro --hooks --dry-run
node cli/install.js --claude --hooks --dry-run
node cli/install.js --copilot --hooks --dry-run
node cli/install.js --kiro --all --dry-run
```

若修改參數解析，需額外驗證：

```bash
node cli/install.js --kiro --skills --dry-run
node cli/install.js --kiro --skills go-ddd,go-grpc --dry-run
```
