import { UserService } from "../services/user";
import { User } from "../entities/user";

export default async (container: any) => {
  // 注册用户服务
  container.register("userService", new UserService(container));
  
  // 注册用户实体
  container.register("userEntity", User);
  
  console.log("✅ 用户模块已加载");
};
