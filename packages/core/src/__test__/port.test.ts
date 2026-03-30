import { beforeEach, describe, expect, it } from "vitest"
import { ProductService } from "../application/service/product.service.js";
import { mockDb } from "../__mock__/db.mock.js";
import type { ProductWithoutId } from "../port/types.js";
import { productAdaptorMock } from "../__mock__/product.adaptor.mock.js";
import { productPortOps } from "./tools/port.tool.js";


describe("productPortのDB接続をテスト", () => {
  const db = mockDb;
  const productAdaptor = productAdaptorMock;
  const ops = productPortOps;

  beforeEach(() => {
    db.reset();
  });


  // create

  describe("productPort.create", () => {
    it("正常系が動作する", async () => {
      const service = new ProductService(productAdaptor);
      // opsはテスト実行を含む
      await ops.createProject(service);
    });

    it("adaptorの失敗はハンドリングできる", async () => {
      const service = new ProductService(productAdaptor);

      const dto = { priority: "invalidData", status: "draft" };
      await expect(service.create(dto as ProductWithoutId))
        .resolves
        .toStrictEqual({
          ok: false,
          error: expect.any(Error)
        });
    });
  });


  // update

  describe("productPort.update", () => {
    it("正常系が動作する", async () => {
      const service = new ProductService(productAdaptor);

      const { createdProduct: created } = await ops.createProject(service);

      const updateData: ProductWithoutId = { priority: "P0", status: "draft" };
      await expect(service.update({ id: created.id, data: updateData }))
        .resolves
        .toStrictEqual({
          ok: true,
          data: { ...created, ...updateData }
        });
    });

    it("adaptorの失敗はハンドリングできる", async () => {
      const service = new ProductService(productAdaptor);

      await ops.createProject(service);

      const updateData: ProductWithoutId = { priority: "P0", status: "draft" };
      await expect(service.update({ id: "6invalid-data-0000-96c3-ea8b186ef0f4", data: updateData }))
        .resolves
        .toStrictEqual({
          ok: false,
          error: expect.any(Error)
        });
    });
  });


  // delete

  describe("productPort.delete", () => {
    it("正常系が動作する", async () => {
      const service = new ProductService(productAdaptor);

      const { createdProduct: dto } = await ops.createProject(service);

      await expect(service.delete(dto.id)).resolves.toStrictEqual({
        ok: true,
        data: undefined
      });
    });
  });


  // getMany

  describe("productPort.getMany", () => {
    it("正常系が動作する", async () => {
      const service = new ProductService(productAdaptor);

      const { createdProduct } = await ops.createProject(service);

      await expect(service.getMany())
        .resolves
        .toStrictEqual({
          ok: true,
          data: [
            createdProduct
          ]
        });
    });
  });
})
