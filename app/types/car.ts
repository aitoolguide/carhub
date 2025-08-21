// src/types/car.ts
import { ICar, ICar as IDB_Car } from '../database/models/Car';
import { Document } from 'mongoose';

type PureCar = Omit<IDB_Car & Document, keyof Document>; // strips mongoose props



/**
 * The simplified Car type used for displaying car cards on the homepage or listings.
 */
export interface CarCardProps {
    car: ICar;
    onClick: (car: ICar) => void;

}
export interface CarDetailProps {
    car: ICar;
    onBackClick: () => void;
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
