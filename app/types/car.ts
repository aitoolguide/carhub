// src/types/car.ts
import { ICar as IDB_Car } from '../database/models/Car';
import { Document } from 'mongoose';

type PureCar = Omit<IDB_Car & Document, keyof Document>; // strips mongoose props

export interface ICar extends Omit<PureCar, 'category' | 'specifications'> {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    isFeatured?: boolean;
    isSold?: boolean;
    imageUrl?: string; // Optional URL for the main image
    thumbnailUrls?: string[]; // Optional URLs for thumbnail images
    imageAlt?: string; // Optional alt text for the main image
    dealerName?: string; // Optional dealer name
    dealerPhone?: string; // Optional dealer phone number
    mileage?: number; // Optional mileage
    isGoodDeal?: boolean; // Optional flag for good deal
    isNew?: boolean; // Optional flag for new car
    drivetrain?: string; // Optional drivetrain type
    transmission?: string; // Optional transmission type
    type?: string; // Optional type for promo cards
    title?: string; // Optional title for promo cards
    originalPrice?: number; // Optional original price for promo cards
    location?: string; // Optional location for promo cards
    condition?: string; // Optional condition for promo cards
    bodyType?: string; // Optional body type for promo cards
    fuelType?: string; // Optional fuel type for promo cards
    cylinders?: number; // Optional number of cylinders for promo cards
    doors?: number; // Optional number of doors for promo cards
    seats?: number; // Optional number of seats for promo cards
    features?: string[]; // Optional features for promo cards
    rating?: number; // Optional rating for promo cards
    reviews?: number; // Optional number of reviews for promo cards
    isSponsored?: boolean; // Optional flag for sponsored promo cards
    whatsappNumber?: string; // Optional WhatsApp number for promo cards
    carModel?: string; // Optional car model for promo cards
    carMake?: string; // Optional car make for promo cards
    images?: string[]; // Optional array of image URLs for promo cards
    createdAt?: Date; // Optional creation date for promo cards
    updatedAt?: Date; // Optional update date for promo cards
    category?: string; // Optional category ID for promo cards
    specifications?: { [key: string]: string } | Map<string, string>; // Optional specifications for promo cards
    description?: string; // Optional description for promo cards
}

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
