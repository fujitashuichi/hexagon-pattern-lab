import z from "zod";

export const ProductSchema = z.object({
  id: z.uuid(),
  priority: z.enum(["P0", "P1", "P2"]),
  status: z.enum(["draft", "reviewed", "approved"])
});
export type Product = z.infer<typeof ProductSchema>;
