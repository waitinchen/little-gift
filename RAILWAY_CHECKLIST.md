# Railway 部署檢查清單

## ✅ 已完成的修復
- [x] 創建 `backend/railway.json` 配置文件
- [x] 創建 `backend/nixpacks.toml` 構建配置
- [x] 更新部署文檔
- [x] 提交代碼到 GitHub

## 🔧 需要在 Railway 中執行的步驟

### 1. 項目設置
- [ ] 進入 Railway 項目設置
- [ ] 找到 "Settings" → "Deploy"
- [ ] 設置 **Root Directory** 為 `backend`
- [ ] 保存設置

### 2. 環境變量配置
在 Railway 項目中添加以下環境變量：

```bash
# 數據庫 (Railway 會自動提供)
DATABASE_URL=postgresql://...

# 安全配置
JWT_SECRET=little-gift-super-secret-jwt-key-2024
COOKIE_SECRET=little-gift-super-secret-cookie-key-2024

# 服務配置
PORT=9000
HOST=0.0.0.0

# CORS 配置
MEDUSA_STORE_CORS=https://little-gift-five.vercel.app
MEDUSA_ADMIN_CORS=https://little-gift-five.vercel.app
```

### 3. 數據庫設置
- [ ] 確保 PostgreSQL 服務已添加
- [ ] 複製數據庫連接字符串到 `DATABASE_URL`
- [ ] 運行數據庫遷移（如果需要）

### 4. 觸發部署
- [ ] Railway 應該自動檢測到新配置
- [ ] 如果沒有，手動觸發重新部署
- [ ] 等待構建完成

## 🔍 故障排除

### 如果仍然失敗：
1. **檢查構建日誌**
   - 在 Railway 中查看 "Build Logs"
   - 確認是否還有其他錯誤

2. **常見問題**
   - Root Directory 設置錯誤
   - 環境變量缺失
   - 依賴安裝失敗
   - TypeScript 編譯錯誤

3. **解決方案**
   - 確認 Root Directory 為 `backend`
   - 檢查所有環境變量
   - 查看 package.json 依賴
   - 檢查 tsconfig.json 配置

## 📞 需要協助時
如果遇到問題，請提供：
1. Railway 構建日誌截圖
2. 錯誤信息詳細內容
3. 環境變量配置狀態
