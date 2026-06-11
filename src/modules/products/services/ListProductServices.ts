import { productsRepositories } from "@modules/products/infra/database/repositories/ProductsRepositories";
import { Product } from "../infra/database/entities/Products";
import RedisCache from "@shared/cache/RedisCache";


export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT_LIST',
    );

    if(!products) {
      products = await productsRepositories.find();

      await redisCache.save('api-mysales-PRODUCT_LIST', JSON.stringify(products));
    }
     return products;
  }
}
