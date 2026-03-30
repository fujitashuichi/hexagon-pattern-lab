import { beforeEach, describe, expect, it } from "vitest"
import { ProductService } from "../application/service/product.service.js";
import { dbAdaptorMock, mockDb } from "../__mock__/db.mock.js";
import type { ApiResult } from "../port/types.js";
import type { Product } from "../domain/modules/product.js";

describe("productPortのDB接続をテスト", () => {
  const db = mockDb;
  const dbAdaptor = dbAdaptorMock;

  beforeEach(() => {
    db.length === 0;
  });


  it("portはsave機能を提供する", async () => {
    const service = new ProductService(dbAdaptor);

    const dto: Product = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      priority: "P1",
      status: "draft"
    };
    const requiredResult: ApiResult<Product> = {
      ok: true,
      data: dto
    };

    await expect(service.save(dto))
      .resolves
      .toStrictEqual(requiredResult);
  });


  it("saveメソッドの失敗はハンドリングできる", async () => {
    const service = new ProductService(dbAdaptor);

    const dto: Product = {
      id: "invalid id",
      priority: "P1",
      status: "draft"
    };

    await expect(service.save(dto))
      .resolves
      .toEqual(expect.objectContaining({
        ok: false,
        error: expect.any(Error)
      }));
  });
})
