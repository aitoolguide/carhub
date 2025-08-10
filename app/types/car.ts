// src/types/car.ts
import { ICar as IDB_Car } from '../database/models/Car';
import { Document } from 'mongoose';

type PureCar = Omit<IDB_Car & Document, keyof Document>; // strips mongoose props

export interface ICar extends Omit<PureCar, 'category' | 'specifications'> {
  _id: string;
  category: string;
  specifications: { [key: string]: string } | Map<string, string>;
}

/**
 * The simplified Car type used for displaying car cards on the homepage or listings.
 */
export interface CarCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  isFeatured?: boolean;
}

/**
 * Type for car filter options.
 */
export interface CarFilters {
  make?: string;
  model?: string;
  year?: number;
  minPrice?: number;
  maxPrice?: number;
}
