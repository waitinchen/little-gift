import { Request, Response, NextFunction } from "express";
import { UserRole } from "../modules/user/entities/user";

// 扩展 Request 类型以包含用户信息
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: UserRole;
      };
    }
  }
}

// 认证中间件
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ 
        error: "未提供认证令牌",
        code: "MISSING_TOKEN"
      });
    }

    // 这里需要从容器中获取 UserService
    // 在实际的 Medusa 应用中，这通常通过依赖注入完成
    const userService = req.scope?.resolve("userService");
    if (!userService) {
      return res.status(500).json({ 
        error: "用户服务不可用",
        code: "SERVICE_UNAVAILABLE"
      });
    }

    const user = await userService.verifyToken(token);
    if (!user) {
      return res.status(401).json({ 
        error: "无效的认证令牌",
        code: "INVALID_TOKEN"
      });
    }

    if (!user.is_active) {
      return res.status(401).json({ 
        error: "用户账户已被禁用",
        code: "ACCOUNT_DISABLED"
      });
    }

    // 将用户信息添加到请求对象
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error("认证中间件错误:", error);
    return res.status(500).json({ 
      error: "认证过程中发生错误",
      code: "AUTH_ERROR"
    });
  }
};

// 角色检查中间件
export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "需要认证",
        code: "AUTHENTICATION_REQUIRED"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "权限不足",
        code: "INSUFFICIENT_PERMISSIONS",
        required_roles: roles,
        user_role: req.user.role
      });
    }

    next();
  };
};

// 可选认证中间件（不强制要求登录）
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (token) {
      const userService = req.scope?.resolve("userService");
      if (userService) {
        const user = await userService.verifyToken(token);
        if (user && user.is_active) {
          req.user = {
            id: user.id,
            email: user.email,
            role: user.role
          };
        }
      }
    }

    next();
  } catch (error) {
    // 可选认证失败不影响请求继续
    next();
  }
};
