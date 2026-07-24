# 設計文件：Claude Hooks 路徑隔離與打包修正

## 設計原則

1. 原始 hook template 可共用，安裝結果依 IDE 分離。
2. Claude Code 不依賴 `.kiro/`，Kiro 不依賴 `.claude/`。
3. CLI dry-run 必須等同實際寫入路徑。
4. 文件描述必須和 CLI 實際行為一致。

## 目標目錄結構

### Claude Code

```text
.claude/
├── settings.json
└── hooks/
    └── update-readme/
        └── script/
            └── update-readme.js
```

### Kiro

```text
.kiro/
├── agents/
│   └── update-readme.json
└── hooks/
    ├── update-readme.kiro.hook
    └── update-readme/
        └── script/
            └── update-readme.js
```

## CLI 設計

### IDE 設定

`IDE_CONFIG.claude.project.hooks` 應保留為 `.claude`，用於 `.claude/settings.json`。

Claude script 安裝路徑由 `installHooks()` 依 IDE 組合：

```text
<cwd>/.claude/hooks/<hookName>/script
```

Kiro script 安裝路徑維持：

```text
<cwd>/.kiro/hooks/<hookName>/script
```

### installHooks 行為

`installHooks(opts, hooksSourceDir, cwd)` 依 IDE 執行：

| IDE | template 檔案 | 目的地 |
|-----|---------------|--------|
| Kiro | `*.kiro.hook` | `.kiro/hooks/` |
| Kiro | `*.json`，但排除 `*.claude.json` | `.kiro/agents/` |
| Kiro | `script/` | `.kiro/hooks/<hookName>/script/` |
| Claude Code | `*.claude.json` | merge 到 `.claude/settings.json` |
| Claude Code | `script/` | `.claude/hooks/<hookName>/script/` |

### Claude hook JSON

`hooks/update-readme/update-readme.claude.json` 的 command 應改為：

```json
"node \"$PWD/.claude/hooks/update-readme/script/update-readme.js\""
```

### update-readme.js 根目錄解析

目前 script 若使用 `path.resolve(__dirname, '..')`，安裝後會把 hook 目錄當成根目錄。應改為使用執行工作目錄：

```js
const ROOT = process.cwd();
```

原因是 hook command 以 `$PWD` 指向專案根目錄，且 CLI 安裝路徑也是專案相對路徑。

## package.json 設計

`files` 需加入：

```json
"hooks/"
```

確保 npm package 包含 hook templates 與 script。

## README 更新

README 需要明確描述：

- Claude Code hooks 由 `.claude/settings.json` 設定。
- Claude Code hook script 位於 `.claude/hooks/<name>/script/`。
- Kiro hooks 位於 `.kiro/hooks/` 與 `.kiro/agents/`。
- hook template source 位於 repo 的 `hooks/`。

## 風險與處理

### 風險：既有使用者已安裝舊路徑

舊版 Claude hook 可能已指向 `.kiro/hooks/...`。

處理方式：

- 本次只修正新安裝與合併設定。
- 不主動刪除舊 `.kiro/` 檔案，避免破壞使用者資料。
- README 可提醒重新執行 `--claude --hooks` 更新設定。

### 風險：settings.json 合併重複 hooks

目前 `deepMerge()` 對陣列使用直接串接，重複執行可能產生重複 hook。

處理方式：

- 本規格不強制解決。
- 若本次修改範圍允許，可補上陣列去重；否則列為後續改善。

### 風險：`--skills` 旗標與參數共用名稱

目前 `--skills` 同時代表安裝項目與指定 skill 名稱，解析容易混淆。

處理方式：

- 本規格主要範圍是 hooks 路徑隔離。
- 若實作時碰到 parser 必須調整，需維持既有 `--skills go-ddd,go-grpc` 用法。
