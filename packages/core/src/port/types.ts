import type z from "zod";
import { ProductSchema } from "../domain/modules/product.js"

export type ApiResult<T> =
  | { ok: false, error: Error }
  | { ok: true, data: T }


export const ProductWithoutIdSchema = ProductSchema.omit({
  id: true
});
export type ProductWithoutId = z.infer<typeof ProductWithoutIdSchema>;
