import z from "zod";

export const ProductSchema = z.object({
  id: z.uuid(),
  priority: z.enum(["P0", "P1", "P2"]),
  status: z.enum(["draft", "reviewed", "approved"])
});
export type ProductType = z.infer<typeof ProductSchema>;


export class Product {
  constructor(
    public readonly id: ProductType["id"],
    public readonly priority: ProductType["priority"],
    public readonly status: ProductType["status"],
  ) {}
}
