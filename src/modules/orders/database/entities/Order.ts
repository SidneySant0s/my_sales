import { Customer } from "@modules/customers/database/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrdersProducts } from "./OrdersProducts";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer )
    @JoinColumn({name: 'customer_id'})
  customer: Customer

  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {cascade: true,})
  orders_products:OrdersProducts[];

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  update_at: Date;
}
