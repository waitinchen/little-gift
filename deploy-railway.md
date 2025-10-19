# Railway 部署指南

## 快速部署步骤

### 1. 登录 Railway
```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录 Railway
railway login
# 使用您的 Railway Token: dab40b9c-5e3d-43ab-abff-922f5441eb98
```

### 2. 创建项目
```bash
# 在项目根目录执行
cd backend
railway init

# 连接 GitHub 仓库
railway connect
```

### 3. 添加数据库
```bash
# 添加 PostgreSQL 数据库
railway add postgresql
```

### 4. 配置环境变量
```bash
# 设置环境变量
railway variables set JWT_SECRET="$(openssl rand -base64 32)"
railway variables set COOKIE_SECRET="$(openssl rand -base64 32)"
railway variables set MEDUSA_BACKEND_URL="https://your-app.railway.app"
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"
```

### 5. 部署
```bash
# 部署到 Railway
railway up
```

## 环境变量清单

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | 自动生成 | PostgreSQL 连接字符串 |
| `JWT_SECRET` | 随机生成 | JWT 签名密钥 |
| `COOKIE_SECRET` | 随机生成 | Cookie 签名密钥 |
| `MEDUSA_BACKEND_URL` | 您的域名 | 后端 API 地址 |
| `MEDUSA_STORE_CORS` | Vercel 域名 | 前端域名 |
| `OPENAI_API_KEY` | 可选 | OpenAI API 密钥 |

## 获取部署 URL

部署完成后，Railway 会提供类似这样的 URL：
```
https://little-gift-production-xxxx.up.railway.app
```

请记录此 URL，稍后需要在 Vercel 中配置。
