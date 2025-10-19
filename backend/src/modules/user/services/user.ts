import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, Repository } from "typeorm";
import { User, UserRole } from "../entities/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type CreateUserInput = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: UserRole;
};

type LoginInput = {
  email: string;
  password: string;
};

type UpdateUserInput = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  metadata?: Record<string, any>;
};

export default class UserService extends TransactionBaseService {
  private manager_: EntityManager;
  private userRepo_: Repository<User>;

  constructor(container: any) {
    // @ts-ignore
    super(container);
    this.manager_ = container.manager;
    this.userRepo_ = container.manager.getRepository(User);
  }

  async create(input: CreateUserInput): Promise<User> {
    const { email, password, ...otherData } = input;
    
    // 检查邮箱是否已存在
    const existingUser = await this.userRepo_.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("用户邮箱已存在");
    }

    // 加密密码
    const password_hash = await bcrypt.hash(password, 10);

    // 创建用户
    const user = this.userRepo_.create({
      email,
      password_hash,
      role: UserRole.CUSTOMER,
      ...otherData
    });

    return await this.userRepo_.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo_.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepo_.findOne({ where: { id } });
  }

  async login(input: LoginInput): Promise<{ user: User; token: string }> {
    const { email, password } = input;

    // 查找用户
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error("用户不存在");
    }

    if (!user.is_active) {
      throw new Error("用户账户已被禁用");
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error("密码错误");
    }

    // 更新最后登录时间
    user.last_login_at = new Date();
    await this.userRepo_.save(user);

    // 生成 JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || "your-jwt-secret",
      { expiresIn: "7d" }
    );

    return { user, token };
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("用户不存在");
    }

    Object.assign(user, input);
    return await this.userRepo_.save(user);
  }

  async changePassword(id: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("用户不存在");
    }

    // 验证旧密码
    const isValidOldPassword = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isValidOldPassword) {
      throw new Error("旧密码错误");
    }

    // 更新密码
    user.password_hash = await bcrypt.hash(newPassword, 10);
    await this.userRepo_.save(user);
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-jwt-secret") as any;
      return await this.findById(decoded.userId);
    } catch (error) {
      return null;
    }
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return await this.userRepo_.find({ where: { role, is_active: true } });
  }
}
