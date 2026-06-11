import { AppDataSource } from "@shared/typeorm/data-source";
import { Order } from "../entities/Order";
import { Customer } from "@modules/customers/database/entities/Customer";

interface ICreateorder{
  customer: Customer,
  products: ICreateOrderProduct[]
}

export interface ICreateOrderProduct {
  product_id: string;
  price: number | undefined;
  quantity: number;
}


export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: {id},
      relations: ['order_products', 'customer'],
    });

    return order;
  },

  async createOrder({customer, products}: ICreateorder): Promise<Order> {
  const orderProducts = products.map(p => ({
    product_id: p.product_id,
    quantity: p.quantity,
    price: p.price ?? 0, // garante número
  }));

  const order = this.create({
    customer,
    order_products: orderProducts,
  });

    await this.save(order);

    return order;
  }
});


