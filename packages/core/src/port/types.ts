import type z from "zod";
import { ProductSchema } from "../domain/modules/product.js"
import type { ProtocolError } from "../domain/types/errors/protocol.types.js";

export type ApiResult<T> =
  | { ok: false, error: ProtocolError }
  | { ok: true, data: T }


export const ProductWithoutIdSchema = ProductSchema.omit({
  id: true
});
export type ProductWithoutId = z.infer<typeof ProductWithoutIdSchema>;
