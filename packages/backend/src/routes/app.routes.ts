import { Router } from "express";

const createAppRouter = () => {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json("Server running...");
  });

  router.use(createAppRouter());

  return router;
}
