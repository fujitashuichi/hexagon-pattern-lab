import z from "zod";


// 通過コード: MonetaryAmount内で使用
/** ISO 4217 currency code (例: "JPY", "USD", "EUR") */
export const CurrencyCodeSchema = z
  .string()
  .length(3)
  .regex(/^[A-Z]{3}$/, "ISO 4217 形式の通貨コード（3文字大文字英字）を指定してください");

export const MonetaryAmountSchema = z.object({
  amount: z
    .number()
    .nonnegative("金額に負数は使用できません"),
  currency: CurrencyCodeSchema,
});
export type MonetaryAmount = z.infer<typeof MonetaryAmountSchema>;


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
