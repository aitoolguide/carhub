// src/database/seeders/categories.ts

import dbConnect from './../../lib/mongodb';
import Category from '../models/Category';
import { ICategory } from '../models/Category';
import mongoose from 'mongoose';

export async function seedCategories() {
  await dbConnect();

  const categories: Partial<ICategory>[] = [
    {
      name: 'Sedan',
      slug: 'sedan',
    },
    {
      name: 'SUV',
      slug: 'suv',
    },
    {
      name: 'Truck',
      slug: 'truck',
    },
    {
      name: 'Sports Car',
      slug: 'sports-car',
    },
  ];

  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await mongoose.connection.close();
  }
}

if (require.main === module) {
  seedCategories();
}
