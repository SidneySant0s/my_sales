import { Product } from "@modules/products/database/entities/Products";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn()
  id :number;

  @ManyToOne(() => Order, order => order.orders_products)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @Column('prince')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
