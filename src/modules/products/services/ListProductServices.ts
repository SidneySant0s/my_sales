import { productsRepositories } from "@modules/repositories/ProductsRepositories";
import { Product } from "../database/entities/Products";


export default class ListProductService {
  async execute(): Promise<Product[]> {
     const products = await productsRepositories.find();
     return products;
  }
}
