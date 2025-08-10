// src/database/migrations/initial.ts

import { seedCategories } from '../seeders/categories';
import { seedUsers } from '../seeders/users';
import { seedCars } from '../seeders/cars';
import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

async function runMigration() {
  try {
    await dbConnect();
    console.log('Running initial migration...');

    // First, seed the categories
    await seedCategories();
    // Then, seed the users
    await seedUsers();
    // Finally, seed the cars (which depend on categories)
    await seedCars();

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}

if (require.main === module) {
  runMigration();
}
