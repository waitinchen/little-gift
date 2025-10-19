import { MedusaConfig } from "@medusajs/medusa";

const config: MedusaConfig = {
  projectConfig: {
    // 数据库配置
    database_url: process.env.DATABASE_URL || "postgresql://localhost:5432/medusa_db",
    
    // 安全配置
    jwt_secret: process.env.JWT_SECRET || "your-jwt-secret",
    cookie_secret: process.env.COOKIE_SECRET || "your-cookie-secret",
    
    // 服务器配置
    port: parseInt(process.env.PORT || "9000"),
    host: process.env.HOST || "0.0.0.0",
    
    // CORS 配置
    store_cors: process.env.MEDUSA_STORE_CORS || "http://localhost:3000",
    admin_cors: process.env.MEDUSA_ADMIN_CORS || "http://localhost:7001",
    
    // Redis 配置（可选）
    redis_url: process.env.REDIS_URL,
    
    // 文件存储配置
    file_service: "local",
  },
  
  // 模块配置
  modules: [
    // 这里可以添加自定义模块
  ],
  
  // 插件配置
  plugins: [
    // 可以添加 Medusa 插件
  ],
  
  // 功能标志
  featureFlags: {
    // 启用/禁用特定功能
    enable_v2: true,
  },
};

export default config;
