import { Router } from "express";

export default (app: Router) => {
  const route = Router();
  app.use("/health", route);

  route.get("/", (req, res) => {
    res.json({ 
      ok: true, 
      service: "little-gift-backend",
      timestamp: Date.now() 
    });
  });

  return app;
};
