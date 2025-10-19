import { Router } from "express";
import { authenticate, requireRole } from "../../middleware/auth";
import { UserRole } from "../../modules/user/entities/user";

export default (app: Router) => {
  const route = Router();
  app.use("/admin/orders", route);

  // 所有路由都需要管理员权限
  route.use(authenticate);
  route.use(requireRole([UserRole.ADMIN]));

  // GET /admin/orders - 获取订单列表
  route.get("/", async (req, res) => {
    try {
      // 这里应该从数据库获取订单列表
      const orders = [
        {
          id: "order_001",
          customer_name: "張小明",
          customer_email: "zhang@example.com",
          total_amount: 299,
          status: "pending",
          gift_link: "abc123def456",
          created_at: new Date().toISOString()
        },
        {
          id: "order_002",
          customer_name: "李美華",
          customer_email: "li@example.com",
          total_amount: 199,
          status: "completed",
          gift_link: "xyz789uvw012",
          created_at: new Date().toISOString()
        }
      ];

      res.json({
        success: true,
        orders,
        total: orders.length
      });
    } catch (error) {
      console.error("獲取訂單列表錯誤:", error);
      res.status(500).json({ 
        error: "獲取訂單列表失敗",
        code: "GET_ORDERS_FAILED"
      });
    }
  });

  // GET /admin/orders/:id - 获取订单详情
  route.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // 这里应该从数据库获取订单详情
      const order = {
        id,
        customer_name: "張小明",
        customer_email: "zhang@example.com",
        customer_phone: "0912-345-678",
        total_amount: 299,
        status: "pending",
        gift_link: "abc123def456",
        gift_link_status: "waiting",
        recipient_name: null,
        recipient_address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      res.json({
        success: true,
        order
      });
    } catch (error) {
      console.error("獲取訂單詳情錯誤:", error);
      res.status(500).json({ 
        error: "獲取訂單詳情失敗",
        code: "GET_ORDER_FAILED"
      });
    }
  });

  // PUT /admin/orders/:id/status - 更新订单状态
  route.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        error: "訂單狀態為必填項",
        code: "MISSING_STATUS"
      });
    }

    try {
      // 这里应该更新数据库中的订单状态
      res.json({
        success: true,
        message: "訂單狀態更新成功",
        order: { id, status }
      });
    } catch (error) {
      console.error("更新訂單狀態錯誤:", error);
      res.status(500).json({ 
        error: "更新訂單狀態失敗",
        code: "UPDATE_ORDER_STATUS_FAILED"
      });
    }
  });

  return app;
};
