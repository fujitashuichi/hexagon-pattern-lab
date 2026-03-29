import { Product, ProductSchema, type ProductType } from "../modules/product.js";
import type { ValidateResult } from "./types.js";


export const productValidator = (
  data: ProductType
): ValidateResult<ProductType> => {
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
