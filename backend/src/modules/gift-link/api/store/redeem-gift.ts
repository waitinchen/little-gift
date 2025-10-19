import { Router } from "express";

export default (app: Router) => {
  const route = Router();
  app.use("/store/gift-links", route);

  // POST /store/gift-links/:token/redeem - 收礼者填写地址
  route.post("/:token/redeem", async (req, res) => {
    const { token } = req.params;
    const payload = req.body;
    
    const giftLinkService = req.scope.resolve("giftLinkService");
    
    try {
      const gl = await giftLinkService.redeem({ token, ...payload });
      
      // TODO: 在这里可触发通知（之后接 LINE Messaging）
      // TODO: 也可在此把订单 shipping address 更新/触发 fulfillment
      
      res.json({ 
        ok: true, 
        token: gl.token, 
        status: gl.status,
        message: "礼物正在准备中 ❤️"
      });
    } catch (error) {
      res.status(400).json({ 
        ok: false, 
        message: error.message || "Failed to redeem gift" 
      });
    }
  });

  return app;
};
