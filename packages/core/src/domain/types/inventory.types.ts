import z from "zod";

export const InventoryStateSchema = z.object({
  physical:  z.number().int().nonnegative("physical 在庫は 0 以上の整数です"),
  allocated: z.number().int().nonnegative("allocated 在庫は 0 以上の整数です"),
});
export type InventoryState = z.infer<typeof InventoryStateSchema>;
