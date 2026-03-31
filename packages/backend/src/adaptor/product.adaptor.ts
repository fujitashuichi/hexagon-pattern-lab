import { Domain } from "@app/core"
import { Port } from "@app/core"


const dummy: Domain.Product = {
  id: crypto.randomUUID(),
  priority: "P0",
  status: "reviewed"
}


export const productAdaptor: Port.Product.IProductPort = {
  async create(dto) {
    if (!dto) {
      return {
        ok: false,
        error: new Error("")
      }
    }

    return {
      ok: true,
      data: dummy
    }
  },

  async update({ id, data }) {
    if (!id || !data) {
      return {
        ok: false,
        error: new Error("")
      }
    }

    return {
      ok: true,
      data: { id, ...data }
    }
  },

  async delete(id) {
    if (!id) {
      return {
        ok: false,
        error: new Error("")
      }
    }

    return {
      ok: true,
      data: undefined
    }
  },

  async getMany() {
    return {
      ok: true,
      data: [ dummy ]
    };
  },
}
