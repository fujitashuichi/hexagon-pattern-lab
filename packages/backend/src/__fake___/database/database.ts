import type { Domain } from "@app/core";
import type { ProductWithoutId } from "@app/core/src/port/types.js";
import { readFile, writeFile } from "fs/promises";
import path from "node:path";



class ProductDbQuery {
  private readonly dbPath = path.resolve(import.meta.dirname!, "./data.json");

  async save(data: Domain.Product): Promise<Domain.Product> {
    const products = await this.findAll();
    products.push(data);

    await writeFile(this.dbPath, JSON.stringify(products, null, 2));

    return data;
  }

  async update(id: Domain.Product["id"], data: ProductWithoutId): Promise<Domain.Product> {
    const products = await this.findAll();
    const updated = products.map(item => item.id === id ? { id, ...data } : item);

    await writeFile(this.dbPath, JSON.stringify(updated, null, 2));

    return { id, ...data };
  }

  async deleteMany(id_list: Domain.Product["id"][]): Promise<void> {
    const products = await this.findAll();
    const remain = products.filter(product => !id_list.includes(product.id))

    await writeFile(this.dbPath, JSON.stringify(remain, null, 2));
  }

  async findAll(): Promise<Domain.Product[]> {
    try {
      const data = await readFile(this.dbPath, "utf-8");
      return JSON.parse(data);
    } catch (err: unknown) {
      return [];
    }
  }
}



export const db = {
  product: new ProductDbQuery()
}
