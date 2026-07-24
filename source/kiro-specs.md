# Kiro Specs 規範

## Spec 資料夾命名規則

建立 spec 資料夾時，使用以下格式：

```
.kiro/specs/{YYYY-MM-DD_HH-mm_feature-name}/
```

### 格式規則

- 時間戳：`YYYY-MM-DD_HH-mm`，時區為 `Asia/Taipei`（UTC+8）
- Feature 名稱：kebab-case

### 取得時間戳

```bash
TZ=Asia/Taipei date +"%Y-%m-%d_%H-%M"
```

### 範例

```
.kiro/specs/2025-11-11_15-45_user-authentication/
.kiro/specs/2025-11-12_09-30_payment-integration/
```
