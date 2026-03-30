import type { Product } from "../domain/modules/product.js";
import type { IProductPort } from "../port/productPort.js";


export const mockDb: Product[] = [];

export const dbAdaptorMock: IProductPort = {
  save: async (dto) => {
    mockDb.push(dto);
    return {
      ok: true,
      data: dto
    };
  }
};
