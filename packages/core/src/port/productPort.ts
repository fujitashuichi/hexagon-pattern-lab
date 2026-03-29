import type { UserService } from "../application/service/user.service.js";
import type { Product } from "../domain/modules/product.js";


export interface IProductPort {
  save(product: Product): UserService["save"];
}
