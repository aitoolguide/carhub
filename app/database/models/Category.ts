// src/database/models/Category.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Category document
export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for the Category
const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// Define the Mongoose model
const Category = (mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)) as Model<ICategory>;

export default Category;
