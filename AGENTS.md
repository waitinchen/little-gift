# AI 助手工作指南

## 項目概述
小禮子是一個針對台灣上班族送禮場景的 AI 選禮平台，基於 Medusa.js 電商框架開發。

## 技術架構
- **前端**: Next.js 14 + React 18 + Tailwind CSS
- **後端**: Medusa.js v1.20+ + TypeScript
- **數據庫**: PostgreSQL
- **部署**: Vercel (前端) + Railway (後端)

## 開發規範

### 1. 語言和本地化
- 所有用戶界面使用繁體字
- 針對台灣市場的用語習慣
- 貨幣使用新台幣 (NT$)

### 2. 用戶角色系統
- **Customer**: 普通客戶（送禮者）
- **Recipient**: 收禮者
- **Admin**: 系統管理員
- **Guest**: 訪客

### 3. 送禮場景優化
- 送禮對象：同事、主管、客戶、朋友、家人等
- 預算範圍：$500 以下到 $10,000 以上
- 送禮場合：生日、升職、離職、感謝、道歉等

## OpenSpec 工作流程

### 創建變更提案
當需要添加新功能時，請：
1. 創建 `openspec/changes/feature-name/` 目錄
2. 編寫 `proposal.md` 說明變更原因和內容
3. 創建 `tasks.md` 列出實施任務
4. 在 `specs/` 子目錄中定義規格變更

### 實施變更
1. 按照 `tasks.md` 中的任務清單逐步實施
2. 確保代碼符合項目規範
3. 更新相關文檔

### 歸檔變更
完成實施後，將變更歸檔到 `openspec/archive/`

## 代碼風格
- 使用 TypeScript 嚴格模式
- 遵循 ESLint 和 Prettier 配置
- 組件使用函數式寫法
- API 使用 RESTful 設計

## 測試要求
- 所有新功能都需要測試
- 使用 Chrome DevTools 進行 UI 測試
- API 需要單元測試

## 部署流程
1. 代碼提交到 GitHub
2. 自動觸發 Vercel 前端部署
3. 手動部署後端到 Railway
4. 更新環境變量配置
