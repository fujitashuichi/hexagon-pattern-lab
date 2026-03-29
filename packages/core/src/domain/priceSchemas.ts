import { z } from "zod";

// ============================================================
// REQ-PRICE-001 — MonetaryAmount Constraint
// 金額は負数を許容せず、ISO 4217 通貨コードとペアで管理する
// ============================================================

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



// ============================================================
// REQ-STOCK-001 — Inventory Integrity Constraint
// Available = Physical - Allocated が負になる状態遷移を禁止する
// ============================================================

export const InventoryStateSchema = z
  .object({
    physical:  z.number().int().nonnegative("physical 在庫は 0 以上の整数です"),
    allocated: z.number().int().nonnegative("allocated 在庫は 0 以上の整数です"),
  })
  .refine(
    ({ physical, allocated }) => physical - allocated >= 0,
    {
      message: "available 在庫（physical - allocated）が負になる状態遷移は禁止されています",
      path: ["allocated"],
    }
  );

export type InventoryState = z.infer<typeof InventoryStateSchema>;

// ============================================================
// API-STOCK-ALLOC — Allocate Stock
// PATCH /api/v1/inventory/allocate
// SKU パターン: 大文字英数字とハイフン、8〜12 文字
// ============================================================

export const AllocateStockRequestSchema = z.object({
  sku: z
    .string()
    .regex(
      /^[A-Z0-9-]{8,12}$/,
      "SKU は大文字英数字とハイフンで構成された 8〜12 文字の文字列です"
    ),
  quantity: z
    .number()
    .int("quantity は整数である必要があります")
    .min(1, "quantity は 1 以上である必要があります"),
});

export type AllocateStockRequest = z.infer<typeof AllocateStockRequestSchema>;
