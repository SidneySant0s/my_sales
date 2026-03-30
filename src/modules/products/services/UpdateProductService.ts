import { productsRepositories } from "@modules/products/repositories/ProductsRepositories";
import { Product } from "../database/entities/Products";
import AppError from "@shared/errors/AppError";

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  async execute({id, name, price, quantity}: IUpdateProduct): Promise<Product> {
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

    return product;
  }
}
