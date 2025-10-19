# Vercel 部署指南

## 快速部署步骤

### 1. 导入项目
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择 `waitinchen/little-gift`

### 2. 配置项目
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (默认)
- **Output Directory**: `.next` (默认)

### 3. 环境变量配置
在 Vercel 项目设置中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend.railway.app` | 后端 API 地址 |

### 4. 部署
点击 "Deploy" 开始部署

## 项目信息
- **项目名称**: little-gift-five
- **域名**: little-gift-five.vercel.app
- **项目 ID**: prj_s8BHLVmJjcMVGLyS53P4dvJQFTg6

## 更新 CORS 配置

前端部署完成后，需要回到 Railway 更新 CORS 配置：

```bash
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"
```

## 测试部署

部署完成后，测试以下端点：

1. **后端健康检查**: `https://your-backend.railway.app/health`
2. **前端首页**: `https://little-gift-five.vercel.app`
3. **API 调用**: 在前端测试 AI 推荐功能
