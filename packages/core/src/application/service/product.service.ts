import { validateProduct, validateProductWithoutId } from "../../domain/internal/validators/product.validator.js";
import type { Product } from "../../domain/modules/product.js";
import type { IProductPort } from "../../port/productPort.js";
import type { ApiResult, ProductWithoutId } from "../../port/types.js";


export class ProductService {
  constructor(private readonly productPort: IProductPort) {}

  async create(dto: ProductWithoutId): Promise<ApiResult<Product>> {
    const validated = validateProductWithoutId(dto);
    if (!validated.ok) return validated;

    const saved = await this.productPort.create(validated.data);
    return saved;
  }

  async update(dto: {
    id: Product["id"], data: ProductWithoutId
  }): Promise<ApiResult<Product>> {
    const validated = validateProduct({ id: dto.id, ...dto.data });
    if (!validated.ok) return validated;

    const updated = await this.productPort.update(dto);
    return updated;
  }

  async delete(id: Product["id"]): Promise<ApiResult<undefined>> {
    return await this.productPort.delete(id)
  }

  async getMany(): Promise<ApiResult<Product[]>> {
    return await this.productPort.getMany();
  }
}
