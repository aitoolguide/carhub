// src/types/order.ts

import { IOrder as IDB_Order } from '../database/models/Order';

/**
 * The full Order type, extending the database model with a string ID for frontend use.
 */
export interface IOrder extends IDB_Order {
  _id: string;
}

/**
 * The simplified order data used for display in the admin panel.
 */
export interface OrderItem {
  id: string;
  carName: string;
  customerName: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}
