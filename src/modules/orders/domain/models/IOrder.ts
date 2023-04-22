import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export interface IOrder {
  id: string;
  order: number;
  customer: ICustomer;
  order_products: string; //*
  create_at: Date;
  update_at: Date;
}
