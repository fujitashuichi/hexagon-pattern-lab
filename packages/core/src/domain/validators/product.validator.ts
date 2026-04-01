import { ProductWithoutIdSchema, type ProductWithoutId } from "../../port/types.js";
import { createProtocolError } from "../lib/errorContext.js";
import { ProductSchema, type Product } from "../modules/product.js";
import type { ValidateResult } from "./types.js";


export const validateProduct = (
  data: Product
): ValidateResult<Product> => {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: createProtocolError.zod(parsed.error)
    }
  }

  return {
    ok: true,
    data: parsed.data
  }
}

export const validateProductWithoutId = (
  data: ProductWithoutId
): ValidateResult<ProductWithoutId> => {
  const parsed = ProductWithoutIdSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: createProtocolError.zod(parsed.error)
    }
  }

  return {
    ok: true,
    data: parsed.data
  }
}
