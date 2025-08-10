// src/database/seeders/cars.ts

import dbConnect from './../../lib/mongodb';
import mongoose from 'mongoose';
import Car from '../models/Car';
import Category from '../models/Category';
import { ICar } from '../models/Car';

export async function seedCars() {
  await dbConnect();
  
  // Find a category to associate cars with
  const sedanCategory:any = await Category.findOne({ name: 'Sedan' });
  const suvCategory:any = await Category.findOne({ name: 'SUV' });

  if (!sedanCategory || !suvCategory) {
    console.error('Cannot seed cars, categories not found. Please run category seeder first.');
    return;
  }

  const cars: Partial<ICar>[] = [
    {
      make: 'Toyota',
      carModel: 'Corolla',
      year: 2022,
      price: 25000,
      description: 'A reliable and fuel-efficient sedan, perfect for city driving.',
      images: [
        'https://placehold.co/800x600/E5E7EB/4B5563?text=Toyota+Corolla',
        'https://placehold.co/800x600/D1D5DB/4B5563?text=Corolla+Interior'
      ],
      category: sedanCategory._id,
      specifications: new Map([['Engine', '1.8L'], ['Transmission', 'Automatic']]),
      features: ['Backup Camera', 'Bluetooth', 'Keyless Entry'],
      isFeatured: true,
    },
    {
      make: 'Honda',
      carModel: 'CR-V',
      year: 2023,
      price: 32000,
      description: 'A spacious and versatile SUV with advanced safety features.',
      images: [
        'https://placehold.co/800x600/E5E7EB/4B5563?text=Honda+CR-V',
        'https://placehold.co/800x600/D1D5DB/4B5563?text=CR-V+Interior'
      ],
      category: suvCategory._id,
      specifications: new Map([['Engine', '1.5L Turbo'], ['Transmission', 'CVT']]),
      features: ['Adaptive Cruise Control', 'Lane Keeping Assist', 'Sunroof'],
      isFeatured: false,
    },
  ];

  try {
    await Car.deleteMany({});
    await Car.insertMany(cars);
    console.log('Cars seeded successfully!');
  } catch (error) {
    console.error('Error seeding cars:', error);
  } finally {
    await mongoose.connection.close();
  }
}

if (require.main === module) {
  seedCars();
}
