import { type Product } from "../../domain/modules/product.js";
import { validateProduct } from "../../domain/validators/index.js";
import type { ApiResult } from "./types.js";

export class UserService {
  constructor() {}

  save = (dto: Product): ApiResult<Product> => {
    const validated = validateProduct(dto);
    return validated;
  }
}
