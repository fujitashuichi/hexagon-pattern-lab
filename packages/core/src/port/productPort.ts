import type { Product } from "../domain/modules/product.js";
import type { ApiResult, ProductWithoutId } from "./types.js";


export interface IProductPort {
  create(dto: ProductWithoutId): Promise<ApiResult<Product>>;

  update(
    { id, data }: { id: Product["id"], data: ProductWithoutId }
  ): Promise<ApiResult<Product>>;

  delete(id: Product["id"]): Promise<ApiResult<undefined>>

  getMany(): Promise<ApiResult<Product[]>>;
}
