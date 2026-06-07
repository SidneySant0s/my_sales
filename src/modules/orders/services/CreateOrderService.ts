import { Product } from "@modules/products/database/entities/Products";
import { Order } from "../database/entities/Order";
import { customerRepository } from "@modules/customers/database/repositories/CustomerRpositories";
import AppError from "@shared/errors/AppError";
import { productsRepositories } from "@modules/products/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepository.findById(
      Number(customer_id),
    );

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }
    const productIds = products.map(product => ({ id: product.id }));
    const existsProducts = await productsRepositories.findAllByIds(productIds);


    if (!existsProducts.length) {
      throw new AppError("Could not find any customer with the given ids.");
    }
    console.log('Produtos recebidos:', products);
    console.log('Produtos encontrados no banco:', existsProducts);

    const existsproductsIds = products.map((products) => products.id);

    const checkInexistentProducts = products.filter(
      (products) => !existsproductsIds.includes(products.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0]?.id}`,
        404,
      );
    }

    const quantityAvailable = products.filter((product) => {
      const existingProduct = existsProducts.find(
        (productExisten) => productExisten.id === product.id,
      );
      return (
        existingProduct != null && existingProduct.quantity < product.quantity
      );
    });

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0]?.quantity} is insufficient for product ${quantityAvailable[0]?.id}`,
        400,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id ===  product.id)[0]?.price
    }))

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    })

    const {order_products} = order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0]!.quantity - product.quantity,
    }));

    await productsRepositories.save(updateProductQuantity);

    return order;
  }
}
