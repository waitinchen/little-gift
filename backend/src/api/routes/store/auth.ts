import { Router } from "express";
import { authenticate, optionalAuth } from "../../middleware/auth";

export default (app: Router) => {
  const route = Router();
  app.use("/store/auth", route);

  // POST /store/auth/register - 用户注册
  route.post("/register", async (req, res) => {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: "邮箱和密码为必填项",
        code: "MISSING_REQUIRED_FIELDS"
      });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "邮箱格式不正确",
        code: "INVALID_EMAIL_FORMAT"
      });
    }

    // 验证密码强度
    if (password.length < 6) {
      return res.status(400).json({ 
        error: "密码长度至少6位",
        code: "WEAK_PASSWORD"
      });
    }

    try {
      const userService = req.scope.resolve("userService");
      const user = await userService.create({
        email,
        password,
        first_name,
        last_name,
        phone
      });

      // 生成 token
      const { token } = await userService.login({ email, password });

      res.status(201).json({
        success: true,
        message: "注册成功",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          created_at: user.created_at
        },
        token
      });
    } catch (error) {
      console.error("注册错误:", error);
      res.status(400).json({ 
        error: error.message || "注册失败",
        code: "REGISTRATION_FAILED"
      });
    }
  });

  // POST /store/auth/login - 用户登录
  route.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: "邮箱和密码为必填项",
        code: "MISSING_CREDENTIALS"
      });
    }

    try {
      const userService = req.scope.resolve("userService");
      const { user, token } = await userService.login({ email, password });

      res.json({
        success: true,
        message: "登录成功",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          last_login_at: user.last_login_at
        },
        token
      });
    } catch (error) {
      console.error("登录错误:", error);
      res.status(401).json({ 
        error: error.message || "登录失败",
        code: "LOGIN_FAILED"
      });
    }
  });

  // GET /store/auth/me - 获取当前用户信息
  route.get("/me", authenticate, async (req, res) => {
    try {
      const userService = req.scope.resolve("userService");
      const user = await userService.findById(req.user!.id);

      if (!user) {
        return res.status(404).json({ 
          error: "用户不存在",
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
          avatar_url: user.avatar_url,
          metadata: user.metadata,
          last_login_at: user.last_login_at,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error("获取用户信息错误:", error);
      res.status(500).json({ 
        error: "获取用户信息失败",
        code: "GET_USER_FAILED"
      });
    }
  });

  // PUT /store/auth/profile - 更新用户资料
  route.put("/profile", authenticate, async (req, res) => {
    const { first_name, last_name, phone, avatar_url } = req.body;

    try {
      const userService = req.scope.resolve("userService");
      const user = await userService.update(req.user!.id, {
        first_name,
        last_name,
        phone,
        avatar_url
      });

      res.json({
        success: true,
        message: "资料更新成功",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          role: user.role,
          avatar_url: user.avatar_url,
          updated_at: user.updated_at
        }
      });
    } catch (error) {
      console.error("更新用户资料错误:", error);
      res.status(400).json({ 
        error: error.message || "更新资料失败",
        code: "UPDATE_PROFILE_FAILED"
      });
    }
  });

  // POST /store/auth/change-password - 修改密码
  route.post("/change-password", authenticate, async (req, res) => {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({ 
        error: "旧密码和新密码为必填项",
        code: "MISSING_PASSWORDS"
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ 
        error: "新密码长度至少6位",
        code: "WEAK_PASSWORD"
      });
    }

    try {
      const userService = req.scope.resolve("userService");
      await userService.changePassword(req.user!.id, old_password, new_password);

      res.json({
        success: true,
        message: "密码修改成功"
      });
    } catch (error) {
      console.error("修改密码错误:", error);
      res.status(400).json({ 
        error: error.message || "修改密码失败",
        code: "CHANGE_PASSWORD_FAILED"
      });
    }
  });

  // POST /store/auth/logout - 用户登出（客户端处理）
  route.post("/logout", authenticate, (req, res) => {
    res.json({
      success: true,
      message: "登出成功"
    });
  });

  return app;
};
