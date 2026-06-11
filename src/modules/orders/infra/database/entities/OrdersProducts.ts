import { Product } from "@modules/products/infra/database/entities/Products";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn()
  id :number;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @Column()
  order_id: string;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @Column('int')
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
