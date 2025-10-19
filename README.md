# 🎁 小禮子 (Little Gift) - MVP v0.1

> 让送礼变成一件简单、有温度的事

## 💫 项目简介

小禮子是一个 **AI 选礼 + 情境祝词生成 + 双方分流流程**的创新平台。

### 核心功能

- ✨ **AI 送礼助理**：根据“对象 × 预算 × 场合”推荐3-5项礼物
- 💌 **AI 语气卡片**：4种语气模板（送女生/男生/长辈/同事）
- 🎁 **送礼流程**：选礼 → 预览卡片 → 模拟付款 → 生成唯一链接
- 📬 **收礼流程**：打开链接 → 查看 AI 卡片 → 填写地址 → 确认收下
- 🔗 **礼物链接系统**：唯一 URL（含 Token 验证）
- 📊 **后台管理**：订单查询、收件状态追踪
- 🔌 **LINE 整合接口**：预留 v0.2 扩充用（LINE Login/Pay）

---

## 🛠️ 技术栈

### 后端
- **框架**: Medusa.js v1.20+
- **数据库**: PostgreSQL
- **部署**: Railway
- **语言**: TypeScript

### 前端
- **框架**: Next.js 14 + React 18
- **样式**: Tailwind CSS
- **部署**: Vercel
- **UI 风格**: 参考 LINE 设计语言

---

## 📁 项目结构

```
little-gift/
├── backend/           # Medusa 后端
│   ├── src/
│   │   ├── modules/gift-link/  # GiftLink 模块
│   │   │   ├── migrations/
│   │   │   ├── entities/
│   │   │   ├── services/
│   │   │   ├── subscribers/
│   │   │   ├── api/
│   │   │   └── loaders/
│   │   ├── services/ai/        # AI 服务
│   │   └── api/routes/         # API 路由
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/         # Next.js 前端
│   ├── pages/
│   │   ├── index.tsx        # 首页
│   │   ├── select.tsx       # 选礼页
│   │   ├── card.tsx         # 卡片预览
│   │   ├── pay.tsx          # 付款页
│   │   ├── success.tsx      # 成功页
│   │   └── gift/[token].tsx # 收礼页
│   ├── lib/api.ts
│   ├── styles/
│   └── package.json
└── docs/             # 文档
    ├── 小禮子-UI设计规范.md
    └── design-tokens.json
```

---

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- PostgreSQL （Railway 将自动提供）

### 1️⃣ 后端本地开发

```bash
cd backend

# 安装依赖
npm install

# 复制环境变量模板
cp .env.template .env

# 编辑 .env 文件，填入数据库连接等配置

# 运行迁移
npm run migrate

# 启动开发服务器
npm run dev
```

后端将在 `http://localhost:9000` 运行

### 2️⃣ 前端本地开发

```bash
cd frontend

# 安装依赖
npm install

# 复制环境变量
cp .env.local.example .env.local

# 启动开发服务器
npm run dev
```

前端将在 `http://localhost:3000` 运行

---

## 🌐 生产部署

详细部署指南请参考：**[📘 部署手册.md](./docs/部署手册.md)**

### 快速概览

**后端（Railway）**
1. 在 Railway 创建 PostgreSQL 数据库
2. 创建新服务，连接 GitHub 仓库
3. 配置环境变量
4. 设置 Start Command: `npm run migrate && npm run start`

**前端（Vercel）**
1. 在 Vercel 创建新项目
2. 连接 GitHub 仓库 `frontend` 目录
3. 配置环境变量 `NEXT_PUBLIC_API_BASE_URL`
4. 部署

---

## 🧩 测试清单

部署后，请执行以下测试：

- [ ] API 活性：`GET /health` → `{ ok: true }`
- [ ] AI 推荐：在首页输入条件，查看推荐结果
- [ ] 卡片生成：查看 AI 生成的祝福语
- [ ] Mock 付款：完成模拟付款流程
- [ ] 礼物链接：生成并复制链接
- [ ] 收礼流程：打开链接，填写地址，提交成功
- [ ] CORS 配置：确认前端可正常调用后端 API

---

## 🛣️ 路线图

### v0.1 (MVP) - 当前版本
- [x] AI 礼物推荐
- [x] AI 卡片生成
- [x] 双方分流流程
- [x] Mock 付款
- [x] RWD 响应式设计

### v0.2 (计划中)
- [ ] LINE Login 集成
- [ ] LINE Pay 支付
- [ ] LINE Messaging 通知
- [ ] 礼物分享到 LINE
- [ ] 订单状态追踪

### v1.0 (未来)
- [ ] 商品库管理后台
- [ ] 多种支付方式
- [ ] 用户系统
- [ ] 物流追踪
- [ ] 社交分享裂变

---

## 📝 开发文档

- [🎨 UI 设计规范](./docs/小禮子-UI设计规范.md)
- [📘 部署手册](./docs/部署手册.md)
- [📦 PRD 产品需求文档](用户提供)

---

## ❗ 注意事项

### 安全性
- 生产环境请使用强密码（`JWT_SECRET`, `COOKIE_SECRET`）
- 收件人信息需要加密存储（v0.2 将实现）
- Token 建议加签名验证

### 性能优化
- 使用 Redis 缓存 AI 推荐结果
- 图片使用 CDN 加速
- 数据库定期备份

### 成本控制
- Railway: 免费额度 500 小时/月
- Vercel: 免费额度 100GB 流量/月
- 建议使用自有 LLM API Key

---

## 👥 作者

**MiniMax Agent**

---

## 📝 许可证

MIT License

---

## 💖 品牌语气

> “有时候，一句小语就能让一天变甜。”

温柔 × 灵感 × 幽默
