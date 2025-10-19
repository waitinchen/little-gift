# 小禮子一键部署脚本 (PowerShell)
Write-Host "🎁 小禮子部署脚本启动..." -ForegroundColor Green

# 检查是否安装了必要的工具
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI 已安装" -ForegroundColor Green
} catch {
    Write-Host "❌ 请先安装 Railway CLI: npm install -g @railway/cli" -ForegroundColor Red
    exit 1
}

try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI 已安装" -ForegroundColor Green
} catch {
    Write-Host "❌ 请先安装 Vercel CLI: npm install -g vercel" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 环境检查通过" -ForegroundColor Green

# Railway 部署
Write-Host "🚂 开始部署 Railway 后端..." -ForegroundColor Yellow
Set-Location backend

# 登录 Railway
Write-Host "请使用您的 Railway Token 登录: dab40b9c-5e3d-43ab-abff-922f5441eb98" -ForegroundColor Cyan
railway login

# 初始化项目
railway init

# 添加数据库
Write-Host "📊 添加 PostgreSQL 数据库..." -ForegroundColor Yellow
railway add postgresql

# 生成安全密钥
$JWT_SECRET = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
$COOKIE_SECRET = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# 设置环境变量
Write-Host "🔧 配置环境变量..." -ForegroundColor Yellow
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set COOKIE_SECRET="$COOKIE_SECRET"
railway variables set MEDUSA_BACKEND_URL="https://your-app.railway.app"
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"

# 部署
Write-Host "🚀 部署到 Railway..." -ForegroundColor Yellow
railway up

Write-Host "✅ Railway 部署完成" -ForegroundColor Green

# 回到根目录
Set-Location ..

# Vercel 部署
Write-Host "🌐 开始部署 Vercel 前端..." -ForegroundColor Yellow
Set-Location frontend

# 登录 Vercel
vercel login

# 部署
Write-Host "🚀 部署到 Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Vercel 部署完成: https://little-gift-five.vercel.app" -ForegroundColor Green

# 更新 CORS
Write-Host "🔧 更新 CORS 配置..." -ForegroundColor Yellow
Set-Location ../backend
railway variables set MEDUSA_STORE_CORS="https://little-gift-five.vercel.app"

Write-Host "🎉 部署完成！" -ForegroundColor Green
Write-Host "📱 前端: https://little-gift-five.vercel.app" -ForegroundColor Cyan
Write-Host "🔧 后端: 请查看 Railway Dashboard 获取 URL" -ForegroundColor Cyan
Write-Host "📊 健康检查: {后端URL}/health" -ForegroundColor Cyan
