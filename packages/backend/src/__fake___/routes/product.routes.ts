import { Router } from "express";
import { productService } from "../service/product.service.js";


export const createProductRouter = () => {
  const router = Router();

  router.get("/products", async (_req, res) => {
    const result = await productService.getMany();
    res.status(result.ok ? 200 : 500).json(result);
  });

  router.post("/products/:id", async (req, res) => {
    const result = await productService.update({
      id: req.params.id,
      data: req.body
    });
    res.status(result.ok ? 200 : 500).json(result);
  });

  return router;
}
