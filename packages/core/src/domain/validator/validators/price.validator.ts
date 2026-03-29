import { type DiscountedPriceRequest, DiscountedPriceRequestSchema, type DiscountedPriceResponse, DiscountedPriceResponseSchema, type MonetaryAmount, MonetaryAmountSchema } from "../types/price.types.js"
import type { ValidateResult } from "./types.js";


export const validateMonetaryAmount = ({
  amount, currency
}: MonetaryAmount
): ValidateResult<MonetaryAmount> => {
  const parsed = MonetaryAmountSchema.safeParse({
    amount, currency
  });

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


type ValidateDiscountedPriceRequestData =
  DiscountedPriceRequest
  & { discountedPrice: number }

export const validateDiscountedPriceRequest = ({
  basePrice,
  discountAmount
}: DiscountedPriceRequest
): ValidateResult<ValidateDiscountedPriceRequestData> => {
  const parsed = DiscountedPriceRequestSchema.safeParse(
    { basePrice, discountAmount }
  );

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error
    }
  }

  const { basePrice: base, discountAmount: discount } = parsed.data;
  const discountedPrice = base - discount;

  if (discountedPrice < base * 0.5) {
    return {
      ok: false,
      error: new Error("割引後の価格が元の価格の 50% を下回るため、この割引は適用できません")
    }
  }

  return {
    ok: true,
    data: {
      ...parsed.data,
      discountedPrice
    }
  }
}


export const validateDiscountedPriceResponse = ({
  finalPrice
}: DiscountedPriceResponse
): ValidateResult<DiscountedPriceResponse> => {
  const parsed = DiscountedPriceResponseSchema.safeParse(
    { finalPrice }
  );
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
