import { Port } from "@app/core"
import { createProtocolError, type ProtocolError } from "@app/core/src/domain/index.js"


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


export const productAdaptor: Port.Product.IProductPort = {
  async create(dto) {
    try {
      const id = crypto.randomUUID();

      return {
        ok: true,
        data: { id, ...dto },
      }
    } catch (err) {
      return errorHandler(err);
    }
  },

  async update({ id, data }) {
    try {
      const updated = { id, ...data };

      return {
        ok: true,
        data: updated
      }
    } catch (err) {
      return errorHandler(err);
    }
  },

  async delete(id) {
    try {
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
      return {
        ok: true,
        data: [
          {
            id: crypto.randomUUID(),
            priority: "P0",
            status: "approved"
          }
        ],
      }
    } catch (err) {
      return errorHandler(err);
    }
  },
}
