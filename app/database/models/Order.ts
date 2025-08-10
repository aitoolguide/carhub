// src/database/models/Order.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Order document
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  stripeSessionId: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for the Order
const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    stripeSessionId: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Define the Mongoose model
const Order = (mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)) as Model<IOrder>;

export default Order;
