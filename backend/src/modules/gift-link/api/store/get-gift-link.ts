import { Router } from "express";

export default (app: Router) => {
  const route = Router();
  app.use("/store/gift-links", route);

  // GET /store/gift-links/:orderId - 获取礼物链接
  route.get("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const giftLinkService = req.scope.resolve("giftLinkService");
    
    const gift = await giftLinkService.findByOrder(orderId);
    if (!gift) {
      return res.status(404).json({ message: "Gift link not found" });
    }
    
    res.json({ 
      token: gift.token, 
      status: gift.status,
      created_at: gift.created_at
    });
  });

  return app;
};
