import z from "zod";
import { createProtocolError } from "../domain/lib/errorContext.js";
import type { Product } from "../domain/modules/product.js";
import type { IProductPort } from "../port/productPort.js";
import { mockDb } from "./db.mock.js";
import { zodErrorMock } from "./error.mock.js";

const db = mockDb;

export const productAdaptorMock: IProductPort = {
  create: async (dto) => {
    const data = db.create(dto);
    return {
      ok: true,
      data
    };
  },

  update: async (dto) => {
    if (!db.getAll().find(item => item.id === dto.id)) {
      return {
        ok: false,
        error: createProtocolError.zod(zodErrorMock)
      }
    };

    db.update({ id: dto.id, data: dto.data });
    return {
      ok: true,
      data: { id: dto.id, ...dto.data }
    }
  },

  getMany: async () => {
    const data = db.getAll();
    return {
      ok: true,
      data
    }
  },

  delete: async (id: Product["id"]) => {
    db.delete(id)
    return {
      ok: true,
      data: undefined
    }
  }
};
