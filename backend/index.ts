import { Medusa } from "@medusajs/medusa";
import config from "./medusa-config";

const medusa = new Medusa(config);

// 启动服务器
medusa.start().then(() => {
  console.log("🎁 小禮子后端服务已启动");
  console.log(`📍 服务地址: http://localhost:${config.projectConfig.port}`);
  console.log("🔗 Store API: /store/*");
  console.log("🔗 Admin API: /admin/*");
}).catch((error) => {
  console.error("❌ 服务启动失败:", error);
  process.exit(1);
});

// 优雅关闭
process.on("SIGTERM", () => {
  console.log("🛑 收到 SIGTERM 信号，正在关闭服务...");
  medusa.stop().then(() => {
    console.log("✅ 服务已安全关闭");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🛑 收到 SIGINT 信号，正在关闭服务...");
  medusa.stop().then(() => {
    console.log("✅ 服务已安全关闭");
    process.exit(0);
  });
});
