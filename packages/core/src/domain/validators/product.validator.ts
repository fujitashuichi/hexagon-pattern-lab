import { ProductSchema, type Product } from "../modules/product.js";
import type { ValidateResult } from "./types.js";


export const validateProduct = (
  data: Product
): ValidateResult<Product> => {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error
    }
  }

  return {
    ok: true,
    data: parsed.data
  }
}
