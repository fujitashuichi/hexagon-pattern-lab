import type { Product } from "../domain/modules/product.js";


export interface IProductPort {
  save(product: Product): Promise<Product>;
  findById(id: Product["id"]): Promise<Product | null>;
}
