import { Product } from "@modules/products/database/entities/Products";
import { AppDataSource } from "@shared/typeorm/data-source";

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    async findByName(name: string):Promise<Product | null> {
      return this.findOneBy({ name });
    },
  }
);
