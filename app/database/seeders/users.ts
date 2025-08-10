// src/database/seeders/users.ts

import dbConnect from '../../lib/mongodb';
import User from '../models/User';
import { IUser } from '../models/User';
import mongoose from 'mongoose';

export async function seedUsers() {
  await dbConnect();

  const users: Partial<IUser>[] = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword', // Password will be hashed by the pre-save hook
      role: 'admin',
    },
    {
      name: 'Test User',
      email: 'user@example.com',
      password: 'userpassword',
      role: 'user',
    },
  ];

  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.connection.close();
  }
}

if (require.main === module) {
  seedUsers();
}
