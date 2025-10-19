#!/bin/bash

# 小禮子一键部署脚本
echo "🎁 小禮子部署脚本启动..."

# 检查是否安装了必要的工具
command -v railway >/dev/null 2>&1 || { echo "❌ 请先安装 Railway CLI: npm install -g @railway/cli"; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "❌ 请先安装 Vercel CLI: npm install -g vercel"; exit 1; }

echo "✅ 环境检查通过"

# Railway 部署
echo "🚂 开始部署 Railway 后端..."
cd backend

# 登录 Railway (需要手动输入 token)
echo "请使用您的 Railway Token 登录: dab40b9c-5e3d-43ab-abff-922f5441eb98"
railway login

# 初始化项目
railway init

# 添加数据库
echo "📊 添加 PostgreSQL 数据库..."
railway add postgresql

# 生成安全密钥
JWT_SECRET=$(openssl rand -base64 32)
COOKIE_SECRET=$(openssl rand -base64 32)

# 设置环境变量
echo "🔧 配置环境变量..."
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set COOKIE_SECRET="$COOKIE_SECRET"
railway variables set MEDUSA_BACKEND_URL="https://your-app.railway.app"
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"

# 部署
echo "🚀 部署到 Railway..."
railway up

# 获取部署 URL
RAILWAY_URL=$(railway status --json | jq -r '.deployments[0].url')
echo "✅ Railway 部署完成: $RAILWAY_URL"

# 回到根目录
cd ..

# Vercel 部署
echo "🌐 开始部署 Vercel 前端..."
cd frontend

# 登录 Vercel
vercel login

# 部署
echo "🚀 部署到 Vercel..."
vercel --prod

echo "✅ Vercel 部署完成: https://little-gift-five.vercel.app"

# 更新 CORS
echo "🔧 更新 CORS 配置..."
cd ../backend
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"

echo "🎉 部署完成！"
echo "📱 前端: https://little-gift-five.vercel.app"
echo "🔧 后端: $RAILWAY_URL"
echo "📊 健康检查: $RAILWAY_URL/health"
