// src/database/models/Car.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Car document
export interface ICar extends Document {
  make: string;
  carModel: string; // renamed
  year: number;
  price: number;
  description: string;
  images: string[];
  category: mongoose.Types.ObjectId;
  specifications: Map<string, string>;
  features: string[];
  isFeatured: boolean;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema: Schema = new Schema(
  {
    make: { type: String, required: true },
    carModel: { type: String, required: true }, // renamed
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    specifications: { type: Map, of: String },
    features: { type: [String] },
    isFeatured: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


// Define the Mongoose model
const Car = (mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema)) as Model<ICar>;

export default Car;
