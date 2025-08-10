// src/database/models/Car.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

// Base interface for Car fields (no Mongoose Document here)
export interface ICar {
  _id: string;
  make: string;
  model: string; // ✅ No naming conflict now
  year: number;
  price: number;
  image: string;
  isFeatured?: boolean;
  isSold?: boolean;
  imageUrl?: string;
  thumbnailUrls?: string[];
  imageAlt?: string;
  dealerName?: string;
  dealerPhone?: string;
  mileage?: number;
  isGoodDeal?: boolean;
  isNew?: boolean;
  drivetrain?: string;
  transmission?: string;
  type?: string;
  title?: string;
  originalPrice?: number;
  location?: string;
  condition?: string;
  bodyType?: string;
  fuelType?: string;
  cylinders?: number;
  doors?: number;
  seats?: number;
  features?: string[];
  rating?: number;
  reviews?: number;
  isSponsored?: boolean;
  whatsappNumber?: string;
  carModel?: string;
  carMake?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  category?: string;
  specifications?: { [key: string]: string } | Map<string, string>;
  description?: string;
  isNewCar?: boolean; // Alias for isNew
}

// Mongoose document type
export type ICarDocument = ICar & Document;

const CarSchema = new Schema<ICarDocument>(
  {
    make: { type: String, required: true },
    carModel: { type: String, required: true, alias: 'model' }, // ⬅ stored as carModel, accessed as model
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    imageUrl: { type: String },
    thumbnailUrls: { type: [String] },
    imageAlt: { type: String },
    dealerName: { type: String },
    dealerPhone: { type: String },
    mileage: { type: Number },
    isGoodDeal: { type: Boolean, default: false },
    isNewCar: { type: Boolean, default: false, alias: 'isNew' },
    drivetrain: { type: String },
    transmission: { type: String },
    type: { type: String },
    title: { type: String },
    originalPrice: { type: Number },
    location: { type: String },
    condition: { type: String },
    bodyType: { type: String },
    fuelType: { type: String },
    cylinders: { type: Number },
    doors: { type: Number },
    seats: { type: Number },
    features: { type: [String] },
    rating: { type: Number },
    reviews: { type: Number },
    isSponsored: { type: Boolean, default: false },
    whatsappNumber: { type: String },
    carMake: { type: String },
    images: { type: [String] },
    category: { type: String },
    specifications: { type: Map, of: String },
    description: { type: String },
  },
  { timestamps: true }
);


// Prevent recompilation in dev
const Car: Model<ICarDocument> =
  mongoose.models.Car || mongoose.model<ICarDocument>('Car', CarSchema);

export default Car;
