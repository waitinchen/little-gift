# Railway 部署指南

## 問題解決
Railway 無法識別多目錄項目結構，需要單獨部署後端。

## 部署步驟

### 1. 創建新的 Railway 項目
1. 登入 [Railway](https://railway.app)
2. 點擊 "New Project"
3. 選擇 "Deploy from GitHub repo"
4. 選擇 `waitinchen/little-gift` 倉庫

### 2. 配置部署設置
1. 在 Railway 項目設置中：
   - **Root Directory**: 設置為 `backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`

### 3. 設置環境變量
在 Railway 項目中添加以下環境變量：

```bash
# 數據庫
DATABASE_URL=postgresql://username:password@host:port/database

# 安全配置
JWT_SECRET=your-super-secret-jwt-key-here
COOKIE_SECRET=your-super-secret-cookie-key-here

# 服務配置
PORT=9000
HOST=0.0.0.0

# CORS 配置
MEDUSA_STORE_CORS=https://little-gift-five.vercel.app
MEDUSA_ADMIN_CORS=https://little-gift-five.vercel.app

# Redis (可選)
REDIS_URL=redis://username:password@host:port
```

### 4. 數據庫設置
1. 在 Railway 中添加 PostgreSQL 服務
2. 複製數據庫連接字符串到 `DATABASE_URL`
3. 運行數據庫遷移：
   ```bash
   npm run migrate
   ```

### 5. 部署後端
1. 推送代碼到 GitHub
2. Railway 會自動觸發部署
3. 等待構建完成

### 6. 更新前端配置
更新前端環境變量：
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.railway.app
```

## 故障排除

### 如果部署失敗：
1. 檢查 Railway 構建日誌
2. 確認所有依賴都已安裝
3. 檢查環境變量是否正確設置
4. 確認數據庫連接正常

### 常見問題：
- **Railpack 錯誤**: 確保 Root Directory 設置為 `backend`
- **構建失敗**: 檢查 TypeScript 編譯錯誤
- **啟動失敗**: 檢查環境變量和數據庫連接

## 監控和維護
- 使用 Railway 儀表板監控應用狀態
- 查看日誌排查問題
- 定期備份數據庫
