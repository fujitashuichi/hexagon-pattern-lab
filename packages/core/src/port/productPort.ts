import type { Product } from "../domain/modules/product.js";
import type { ApiResult } from "./types.js";


export interface IProductPort {
  save(product: Product): Promise<ApiResult<Product>>;
}
