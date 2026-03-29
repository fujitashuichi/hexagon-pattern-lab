import z from "zod";


export type ValidateResult<T> =
  | { ok: false, error: Error }
  | { ok: true, data: T }


export const DiscountedPriceRequestSchema = z.object({
  basePrice: z
    .number()
    .nonnegative("basePrice は 0 以上である必要があります"),
  discountAmount: z
    .number()
    .nonnegative("discountAmount は 0 以上である必要があります"),
});
export type DiscountedPriceRequest = z.infer<typeof DiscountedPriceRequestSchema>;


export const DiscountedPriceResponseSchema = z.object({
  finalPrice: z
    .number()
    .nonnegative("finalPrice は 0 以上である必要があります"),
});
export type DiscountedPriceResponse = z.infer<typeof DiscountedPriceResponseSchema>;
