import { Port } from "@app/core"
import { createProtocolError, type ProtocolError } from "@app/core/src/domain/index.js"
import { db } from "../database/database.js"


const errorHandler = (err: unknown): {
  ok: false,
  error: ProtocolError
} => {
  if (err instanceof Error) {
    return {
      ok: false,
      error: createProtocolError.unknown(err),
    }
  }
  return {
    ok: false,
    error: createProtocolError.unknown(err)
  }
}


export const productAdaptor: Port.ProductPort.IProductPort = {
  async create(dto) {
    try {
      const id = crypto.randomUUID();

      const result = await db.product.save({ id, ...dto });
      return {
        ok: true,
        data: result,
      }
    } catch (err) {
      return errorHandler(err);
    }
  },

  async update({ id, data }) {
    try {
      const result = await db.product.update(id, data);
      return {
        ok: true,
        data: result
      }
    } catch (err) {
      return errorHandler(err);
    }
  },

  async delete(id) {
    try {
      await db.product.deleteMany([ id ]);
      console.log("product deleted: id =", id);
      return {
        ok: true,
        data: undefined,
      }
    } catch (err) {
      return errorHandler(err)
    }
  },

  async getMany() {
    try {
      const result = await db.product.findAll();
      return {
        ok: true,
        data: result,
      }
    } catch (err) {
      return errorHandler(err);
    }
  },
}
