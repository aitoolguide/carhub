// src/app/api/cars/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { dbConnect } from '@app/lib/mongodb';
import { Car, ICar } from '@app/database/models/Car';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get searchParams from the request URL
    const { searchParams } = new URL(req.url);

    // --- Pagination Parameters ---
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // --- Filter Parameters ---
    const query: any = {};

    // Single value filters
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    const minMileage = searchParams.get('minMileage');
    const maxMileage = searchParams.get('maxMileage');
    const keyword = searchParams.get('keyword');
    const photos = searchParams.get('photos');
    const isFeatured = searchParams.get('isFeatured');

    // Array filters - use getAll() to get all values for array parameters
    const conditions = searchParams.getAll('condition[]');
    const makes = searchParams.getAll('make[]');
    const models = searchParams.getAll('model[]');
    const bodyTypes = searchParams.getAll('bodyType[]');
    const exteriorColors = searchParams.getAll('exteriorColor[]');
    const interiorColors = searchParams.getAll('interiorColor[]');
    const drivetrains = searchParams.getAll('drivetrain[]');
    const fuelTypes = searchParams.getAll('fuelType[]');
    const cylinders = searchParams.getAll('cylinders[]');
    const transmissions = searchParams.getAll('transmission[]');
    const seats = searchParams.getAll('seats[]');
    const doors = searchParams.getAll('doors[]');
    const features = searchParams.getAll('features[]');
    const sellers = searchParams.getAll('seller[]');

    // Apply array filters using $in operator
    if (conditions.length > 0) {
      query.condition = { $in: conditions };
    }
    if (makes.length > 0) {
      query.make = { $in: makes.map((m: string) => new RegExp(m, 'i')) };
    }
    if (models.length > 0) {
      // Use carModel field (which has alias 'model')
      query.carModel = { $in: models.map((m: string) => new RegExp(m, 'i')) };
    }
    if (bodyTypes.length > 0) {
      query.bodyType = { $in: bodyTypes };
    }
    if (exteriorColors.length > 0) {
      // Note: exteriorColor field doesn't exist in schema, you might need to add it
      query.exteriorColor = { $in: exteriorColors };
    }
    if (interiorColors.length > 0) {
      // Note: interiorColor field doesn't exist in schema, you might need to add it
      query.interiorColor = { $in: interiorColors };
    }
    if (drivetrains.length > 0) {
      query.drivetrain = { $in: drivetrains };
    }
    if (fuelTypes.length > 0) {
      query.fuelType = { $in: fuelTypes };
    }
    if (cylinders.length > 0) {
      // Convert string values to numbers for cylinders
      query.cylinders = { $in: cylinders.map((c: string) => {
        const num = parseInt(c.replace(/\D/g, ''), 10);
        return isNaN(num) ? c : num;
      }) };
    }
    if (transmissions.length > 0) {
      query.transmission = { $in: transmissions };
    }
    if (seats.length > 0) {
      // Convert string values to numbers for seats
      query.seats = { $in: seats.map((s: string) => {
        const num = parseInt(s.replace(/\D/g, ''), 10);
        return isNaN(num) ? s : num;
      }) };
    }
    if (doors.length > 0) {
      // Convert string values to numbers for doors
      query.doors = { $in: doors.map((d: string) => {
        const num = parseInt(d.replace(/\D/g, ''), 10);
        return isNaN(num) ? d : num;
      }) };
    }
    if (features.length > 0) {
      // Use $all to ensure all specified features are present
      query.features = { $in: features };
    }
    if (sellers.length > 0) {
      // Note: seller field doesn't exist in schema, you might want to use dealerName
      query.dealerName = { $in: sellers.map((s: string) => new RegExp(s, 'i')) };
    }

    // Handle featured filter
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    // Handle price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseInt(minPrice, 10);
      }
      if (maxPrice) {
        query.price.$lte = parseInt(maxPrice, 10);
      }
    }

    // Handle year range
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) {
        query.year.$gte = parseInt(minYear, 10);
      }
      if (maxYear) {
        query.year.$lte = parseInt(maxYear, 10);
      }
    }

    // Handle mileage range
    if (minMileage || maxMileage) {
      query.mileage = {};
      if (minMileage) {
        query.mileage.$gte = parseInt(minMileage, 10);
      }
      if (maxMileage) {
        query.mileage.$lte = parseInt(maxMileage, 10);
      }
    }

    // Handle keyword search
    if (keyword) {
      query.$or = [
        { make: { $regex: new RegExp(keyword, 'i') } },
        { carModel: { $regex: new RegExp(keyword, 'i') } },
        { title: { $regex: new RegExp(keyword, 'i') } },
        { description: { $regex: new RegExp(keyword, 'i') } },
        { bodyType: { $regex: new RegExp(keyword, 'i') } }
      ];
    }

    // Handle photos filter
    if (photos === 'true') {
      query.$or = [
        { images: { $exists: true, $not: { $size: 0 } } },
        { image: { $exists: true, $ne: '' } }
      ];
    }

    // Always exclude sold cars unless specifically requested
    query.isSold = { $ne: true };

    // Get total count for pagination
    const totalCount = await Car.countDocuments(query);

    // Fetch cars from the database with filters and pagination
    const cars = await Car.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ isSponsored: -1, isFeatured: -1, createdAt: -1 })
      .lean();

    const carData: ICar[] = cars.map((car) => {
      // Handle Map or plain object for specifications
      const specifications =
        car.specifications instanceof Map
          ? Object.fromEntries(car.specifications)
          : { ...car.specifications };

      return {
        ...car,
        _id: car._id.toString(),
        category: car.category?.toString() ?? '',
        specifications,
        // Map carModel to model for frontend compatibility
        model: car.carModel || car.model,
      };
    });

    return NextResponse.json({
      cars: carData,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalCount / limit),
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    return NextResponse.json({ message: 'Failed to fetch cars' }, { status: 500 });
  }
};
