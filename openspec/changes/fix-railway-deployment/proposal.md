# 變更提案：修復 Railway 部署問題

## 變更原因
Railway 部署失敗，錯誤信息顯示 "Error creating build plan with Railpack"。問題是 Railway 無法識別多目錄項目結構。

## 問題分析
- Railway 期望單一應用目錄
- 當前項目有 `backend/` 和 `frontend/` 兩個目錄
- Railpack 無法正確分析項目結構

## 變更內容

### 1. 創建 Railway 專用配置文件
- 在 `backend/` 目錄添加 `railway.json`
- 添加 `nixpacks.toml` 配置文件
- 明確指定構建和啟動命令

### 2. 更新部署文檔
- 創建詳細的 Railway 部署指南
- 說明如何設置 Root Directory
- 提供環境變量配置說明

### 3. 優化項目結構
- 確保後端可以獨立部署
- 分離前後端部署流程
- 提供清晰的部署步驟

## 預期效果
- 成功部署後端到 Railway
- 解決 Railpack 構建問題
- 建立穩定的部署流程

## 實施優先級
**緊急** - 需要立即解決部署問題

## 相關規格
- 需要更新部署和基礎設施規格
- 確保環境變量配置正確
