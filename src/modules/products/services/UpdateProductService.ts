import { productsRepositories } from "@modules/products/infra/database/repositories/ProductsRepositories";
import { Product } from "../infra/database/entities/Products";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  async execute({id, name, price, quantity}: IUpdateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await productsRepositories.findById(id) //verifica se o produto existe

    if (!product) {
       throw new AppError('Product not found', 404)
    }

    const productExists = await productsRepositories.findByName(name); //verificar se o nome do produto existe ou não

    if(productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    //Atualizações feitas
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepositories.save(product);

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    return product;
  }
}
