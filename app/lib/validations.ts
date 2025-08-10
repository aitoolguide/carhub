// src/lib/validations.ts
import { z } from 'zod';

// Schema for user sign-in validation
export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Schema for adding/editing a car
export const carFormSchema = z.object({
  make: z.string().min(2, { message: 'Make is required' }),
  model: z.string().min(2, { message: 'Model is required' }),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z.string().min(10, { message: 'Description is too short' }),
  images: z.array(z.string().url()).nonempty({ message: 'At least one image is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  isFeatured: z.boolean().default(false),
});
