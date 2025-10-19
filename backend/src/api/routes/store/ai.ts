import { Router } from "express";
import AIRecommendService from "../../services/ai/recommend";

export default (app: Router) => {
  const route = Router();
  app.use("/store/ai", route);

  const aiService = new AIRecommendService();

  // POST /store/ai/recommend - AI 礼物推荐
  route.post("/recommend", async (req, res) => {
    const { target, budget, occasion } = req.body;

    if (!target || !budget) {
      return res.status(400).json({ 
        error: "Missing required fields: target, budget" 
      });
    }

    try {
      const recommendations = await aiService.recommendGifts({
        target,
        budget: parseInt(budget),
        occasion
      });

      res.json({ recommendations });
    } catch (error) {
      res.status(500).json({ 
        error: "AI recommendation failed",
        details: error.message 
      });
    }
  });

  // POST /store/ai/generate-card - AI 卡片生成
  route.post("/generate-card", async (req, res) => {
    const { target, occasion, customMessage } = req.body;

    if (!target) {
      return res.status(400).json({ 
        error: "Missing required field: target" 
      });
    }

    try {
      const card = await aiService.generateCard({
        target,
        occasion,
        customMessage
      });

      res.json(card);
    } catch (error) {
      res.status(500).json({ 
        error: "Card generation failed",
        details: error.message 
      });
    }
  });

  return app;
};
