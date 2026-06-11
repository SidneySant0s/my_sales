import { productsRepositories } from "@modules/products/infra/database/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Products";

interface IShowProduct{
  id: string;
}


export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise<Product>{
    const product = await productsRepositories.findById(id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    return product;
  }
}
