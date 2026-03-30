import type { Product } from "../../domain/modules/product.js";
import { validateProduct } from "../../domain/validators/index.js";
import type { IProductPort } from "../../port/productPort.js";
import type { ApiResult } from "../../port/types.js";


export class ProductService {
  constructor(private readonly productPort: IProductPort) {}

  async save(dto: Product): Promise<ApiResult<Product>> {
    const validated = validateProduct(dto);
    if (!validated.ok) return validated;

    const saved = await this.productPort.save(validated.data);
    return saved;
  }
}
