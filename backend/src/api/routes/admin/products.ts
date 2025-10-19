import { Router } from "express";
import { authenticate, requireRole } from "../../middleware/auth";
import { UserRole } from "../../modules/user/entities/user";

export default (app: Router) => {
  const route = Router();
  app.use("/admin/products", route);

  // 所有路由都需要管理员权限
  route.use(authenticate);
  route.use(requireRole([UserRole.ADMIN]));

  // GET /admin/products - 获取商品列表
  route.get("/", async (req, res) => {
    try {
      // 这里应该从数据库获取商品列表
      const products = [
        {
          id: 1,
          name: "手工香薰禮盒",
          price: 299,
          category: "禮品",
          status: "active",
          stock: 100,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "創意小夜燈",
          price: 199,
          category: "家居",
          status: "active",
          stock: 50,
          created_at: new Date().toISOString()
        }
      ];

      res.json({
        success: true,
        products,
        total: products.length
      });
    } catch (error) {
      console.error("獲取商品列表錯誤:", error);
      res.status(500).json({ 
        error: "獲取商品列表失敗",
        code: "GET_PRODUCTS_FAILED"
      });
    }
  });

  // POST /admin/products - 創建商品
  route.post("/", async (req, res) => {
    const { name, price, category, description, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ 
        error: "商品名稱和價格為必填項",
        code: "MISSING_REQUIRED_FIELDS"
      });
    }

    try {
      // 这里应该保存到数据库
      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        category: category || "禮品",
        description: description || "",
        stock: parseInt(stock) || 0,
        status: "active",
        created_at: new Date().toISOString()
      };

      res.status(201).json({
        success: true,
        message: "商品創建成功",
        product: newProduct
      });
    } catch (error) {
      console.error("創建商品錯誤:", error);
      res.status(500).json({ 
        error: "創建商品失敗",
        code: "CREATE_PRODUCT_FAILED"
      });
    }
  });

  // PUT /admin/products/:id - 更新商品
  route.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      // 这里应该更新数据库中的商品
      res.json({
        success: true,
        message: "商品更新成功",
        product: { id: parseInt(id), ...updateData }
      });
    } catch (error) {
      console.error("更新商品錯誤:", error);
      res.status(500).json({ 
        error: "更新商品失敗",
        code: "UPDATE_PRODUCT_FAILED"
      });
    }
  });

  // DELETE /admin/products/:id - 删除商品
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // 这里应该从数据库删除商品
      res.json({
        success: true,
        message: "商品刪除成功"
      });
    } catch (error) {
      console.error("刪除商品錯誤:", error);
      res.status(500).json({ 
        error: "刪除商品失敗",
        code: "DELETE_PRODUCT_FAILED"
      });
    }
  });

  return app;
};
