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
  title: string;
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
    make: { 
      type: String, 
      required: true,
      trim: true,
      index: true // Add index for filtering
    },
    carModel: { 
      type: String, 
      required: true, 
      alias: 'model',
      trim: true
    },
    year: { 
      type: Number, 
      required: true,
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear() + 2, 'Year cannot be more than 2 years in the future'],
      index: true
    },
    price: { 
      type: Number, 
      required: true,
      min: [0, 'Price cannot be negative'],
      index: true // Add index for price filtering
    },
    image: { 
      type: String, 
      required: true,
      trim: true
    },
    isFeatured: { 
      type: Boolean, 
      default: false,
      index: true // Add index for featured cars
    },
    isSold: { 
      type: Boolean, 
      default: false,
      index: true // Add index for sold status
    },
    imageUrl: { 
      type: String,
      trim: true
    },
    thumbnailUrls: { 
      type: [String],
      default: []
    },
    imageAlt: { 
      type: String,
      trim: true
    },
    dealerName: { 
      type: String,
      trim: true
    },
    dealerPhone: { 
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          // Basic phone validation (optional)
          return !v || /^[\+]?[\d\s\-\(\)]{10,}$/.test(v);
        },
        message: 'Please enter a valid phone number'
      }
    },
    mileage: { 
      type: Number,
      min: [0, 'Mileage cannot be negative'],
      default: 0
    },
    isGoodDeal: { 
      type: Boolean, 
      default: false,
      index: true
    },
    isNewCar: { 
      type: Boolean, 
      default: false, 
      alias: 'isNew',
      index: true
    },
    drivetrain: { 
      type: String,
      trim: true,
      enum: {
        values: ['Front Wheel Drive', 'Rear Wheel Drive', 'All Wheel Drive', '4WD', 'AWD', 'FWD', 'RWD', ''],
        message: 'Invalid drivetrain type'
      }
    },
    transmission: { 
      type: String,
      trim: true,
      enum: {
        values: ['Automatic', 'Manual', 'CVT', 'Semi-Automatic', ''],
        message: 'Invalid transmission type'
      }
    },
    type: { 
      type: String,
      trim: true,
      default: 'car'
    },
    title: { 
      type: String,
      trim: true,
      index: 'text' // Text index for search functionality
    },
    originalPrice: { 
      type: Number,
      min: [0, 'Original price cannot be negative']
    },
    location: { 
      type: String,
      trim: true,
      index: true // Add index for location filtering
    },
    condition: { 
      type: String,
      trim: true,
      enum: {
        values: ['New', 'Used', 'Certified Pre-Owned', 'Fair', 'Good', 'Excellent', ''],
        message: 'Invalid condition'
      },
      default: 'Used'
    },
    bodyType: { 
      type: String,
      trim: true,
      index: true, // Add index for body type filtering
      enum: {
        values: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van', 'Crossover', ''],
        message: 'Invalid body type'
      }
    },
    fuelType: { 
      type: String,
      trim: true,
      enum: {
        values: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Natural Gas', ''],
        message: 'Invalid fuel type'
      }
    },
    cylinders: { 
      type: Number,
      min: [0, 'Cylinders cannot be negative'],
      max: [16, 'Too many cylinders']
    },
    doors: { 
      type: Number,
      min: [2, 'Must have at least 2 doors'],
      max: [6, 'Too many doors']
    },
    seats: { 
      type: Number,
      min: [1, 'Must have at least 1 seat'],
      max: [12, 'Too many seats']
    },
    features: { 
      type: [String],
      default: []
    },
    rating: { 
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
      index: true
    },
    reviews: { 
      type: Number,
      min: [0, 'Reviews cannot be negative'],
      default: 0
    },
    isSponsored: { 
      type: Boolean, 
      default: false,
      index: true // Add index for sponsored cars
    },
    whatsappNumber: { 
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          // WhatsApp number validation (optional)
          return !v || /^[\+]?[\d\s\-\(\)]{10,}$/.test(v);
        },
        message: 'Please enter a valid WhatsApp number'
      }
    },
    carMake: { 
      type: String,
      trim: true
    },
    images: { 
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length <= 20; // Limit number of images
        },
        message: 'Too many images (max 20)'
      }
    },
    category: { 
      type: String,
      trim: true,
      index: true
    },
    specifications: { 
      type: Map, 
      of: String,
      default: new Map()
    },
    description: { 
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
  },
  { 
    timestamps: true,
    // Add virtuals and methods
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add virtual fields
CarSchema.virtual('fullTitle').get(function() {
  return `${this.year} ${this.make} ${this.carModel}`;
});

CarSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

CarSchema.virtual('isOnSale').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

CarSchema.virtual('ageInYears').get(function() {
  return new Date().getFullYear() - this.year;
});

// Add instance methods
CarSchema.methods.toSummary = function() {
  return {
    _id: this._id,
    title: this.fullTitle,
    price: this.price,
    year: this.year,
    make: this.make,
    model: this.carModel,
    bodyType: this.bodyType,
    location: this.location,
    isFeatured: this.isFeatured,
    isSponsored: this.isSponsored,
    imageUrl: this.imageUrl || this.image,
    rating: this.rating
  };
};

// Add static methods
CarSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isSold: false })
    .sort({ isSponsored: -1, createdAt: -1 });
};

CarSchema.statics.findByPriceRange = function(min: number, max: number) {
  return this.find({ 
    price: { $gte: min, $lte: max },
    isSold: false 
  }).sort({ price: 1 });
};

CarSchema.statics.searchCars = function(searchTerm: string) {
  return this.find({
    $text: { $search: searchTerm },
    isSold: false
  }).select({ score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } });
};

// Pre-save middleware
CarSchema.pre('save', function(next) {
  // Ensure title is set if not provided
  if (!this.title) {
    this.title = `${this.year} ${this.make} ${this.carModel}`;
  }

  // Set carMake if not provided
  if (!this.carMake) {
    this.carMake = this.make;
  }

  // Ensure imageUrl is set if not provided but image exists
  if (!this.imageUrl && this.image) {
    this.imageUrl = this.image;
  }

  next();
});



// Prevent recompilation in dev
export const Car: Model<ICarDocument> = mongoose.models.Car || mongoose.model<ICarDocument>('Car', CarSchema);

// // Add compound indexes for better query performance
// CarSchema.index({ make: 1, bodyType: 1, price: 1 });
// CarSchema.index({ location: 1, price: 1 });
// CarSchema.index({ year: -1, mileage: 1 });
// CarSchema.index({ isFeatured: -1, isSponsored: -1, rating: -1 });
// // Add compound indexes for better query performance
// CarSchema.index({ make: 1, bodyType: 1 }); // Compound index for common filters
// CarSchema.index({ price: 1, year: -1 }); // Compound index for price and year
// CarSchema.index({ location: 1, bodyType: 1 }); // Compound index for location and body type
// CarSchema.index({ isFeatured: -1, isSponsored: -1, createdAt: -1 }); // For featured/sponsored cars
// CarSchema.index({ '$**': 'text' }); // Text search across all text fields
// CarSchema.index({ make: 1, bodyType: 1, price: 1 });
// CarSchema.index({ location: 1, price: 1 });
// CarSchema.index({ year: -1, mileage: 1 });
// CarSchema.index({ isFeatured: -1, isSponsored: -1, rating: -1 });
