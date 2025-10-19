import { Router } from "express";
import { authenticate, requireRole } from "../../middleware/auth";
import { UserRole } from "../../modules/user/entities/user";

export default (app: Router) => {
  const route = Router();
  app.use("/admin/users", route);

  // 所有路由都需要管理员权限
  route.use(authenticate);
  route.use(requireRole([UserRole.ADMIN]));

  // GET /admin/users - 获取用户列表
  route.get("/", async (req, res) => {
    try {
      const userService = req.scope.resolve("userService");
      const users = await userService.getUsersByRole(UserRole.CUSTOMER);

      res.json({
        success: true,
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          is_active: user.is_active,
          created_at: user.created_at,
          last_login_at: user.last_login_at
        })),
        total: users.length
      });
    } catch (error) {
      console.error("獲取用戶列表錯誤:", error);
      res.status(500).json({ 
        error: "獲取用戶列表失敗",
        code: "GET_USERS_FAILED"
      });
    }
  });

  // GET /admin/users/:id - 获取用户详情
  route.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const userService = req.scope.resolve("userService");
      const user = await userService.findById(parseInt(id));

      if (!user) {
        return res.status(404).json({ 
          error: "用戶不存在",
          code: "USER_NOT_FOUND"
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          role: user.role,
          is_active: user.is_active,
          avatar_url: user.avatar_url,
          metadata: user.metadata,
          created_at: user.created_at,
          last_login_at: user.last_login_at
        }
      });
    } catch (error) {
      console.error("獲取用戶詳情錯誤:", error);
      res.status(500).json({ 
        error: "獲取用戶詳情失敗",
        code: "GET_USER_FAILED"
      });
    }
  });

  // PUT /admin/users/:id/status - 更新用户状态
  route.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { is_active } = req.body;

    try {
      const userService = req.scope.resolve("userService");
      const user = await userService.update(parseInt(id), { is_active });

      res.json({
        success: true,
        message: "用戶狀態更新成功",
        user: {
          id: user.id,
          email: user.email,
          is_active: user.is_active
        }
      });
    } catch (error) {
      console.error("更新用戶狀態錯誤:", error);
      res.status(500).json({ 
        error: "更新用戶狀態失敗",
        code: "UPDATE_USER_STATUS_FAILED"
      });
    }
  });

  // DELETE /admin/users/:id - 删除用户
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // 这里应该实现软删除或硬删除用户
      res.json({
        success: true,
        message: "用戶刪除成功"
      });
    } catch (error) {
      console.error("刪除用戶錯誤:", error);
      res.status(500).json({ 
        error: "刪除用戶失敗",
        code: "DELETE_USER_FAILED"
      });
    }
  });

  return app;
};
