import { expect } from "vitest";
import type { ProductService } from "../../application/service/product.service.js";
import type { ProductWithoutId } from "../../port/types.js";

export const productPortOps = {
  createProject: async (service: ProductService) => {
    const dto: ProductWithoutId = {
      priority: "P1",
      status: "draft"
    };

    const result = await service.create(dto);

    expect(result).toStrictEqual({
      ok: true,
      data: expect.objectContaining({
        id: expect.stringContaining(""),
        ...dto
      })
    });

    if (!result.ok) throw Error("productPortOps.createは異常系では使えません");

    return { createdProduct: result.data }
  }
};