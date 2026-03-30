import type { Product } from "../domain/modules/product.js";
import type { ProductWithoutId } from "../port/types.js";


class MockDb {
  private data: Product[] = [];

  getAll() { return this.data; }

  findById(id: Product["id"]) {
    return this.data.find(item => item.id === id);
  }

  create(dto: ProductWithoutId) {
    const data = { id: crypto.randomUUID(), ...dto };
    this.data.push(data);
    return data;
  }

  update(dto: { id: Product["id"], data: ProductWithoutId }) {
    this.data = this.data.map(
      item => item.id === dto.id ? { id: dto.id, ...dto.data } : item
    );
  }

  delete(id: Product["id"]) {
    this.data = this.data.filter(
      item => item.id !== id
    )
  }


  reset() { this.data = [] }
}


export const mockDb = new MockDb();
