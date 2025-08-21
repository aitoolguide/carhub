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

// // src/app/api/cars/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// import { ICar } from '@app/database/models/Car';
// import { dbConnect } from '@app/lib/mongodb';
// import { featuredCars,mockCars } from '@app/data/cars';
// import { Car } from '@app/database/models/Car';
// export const dynamic = 'force-dynamic';
// export const GET = async (req: NextRequest, res: NextResponse): Promise<Response> => {


//     // Connect to database
//     await dbConnect();
// try {
//   // Method 1: Using insertMany (Recommended - Much faster for bulk operations)
//   const carsToInsert = mockCars.map((c) => ({
//     make: c.make,
//     model: c.model,
//     year: c.year,
//     price: c.price,
//     image: c.image,
//     isFeatured: c.isFeatured || false,
//     isSold: c.isSold || false,
//     imageUrl: c.imageUrl,
//     thumbnailUrls: c.thumbnailUrls || [],
//     imageAlt: c.imageAlt || '',
//     dealerName: c.dealerName || '',
//     dealerPhone: c.dealerPhone || '',
//     mileage: c.mileage || 0,
//     isGoodDeal: c.isGoodDeal || false,
//     isNew: c.isNew || false,
//     drivetrain: c.drivetrain || '',
//     transmission: c.transmission || '',
//     type: c.type || '',
//     title: c.title || '',
//     originalPrice: c.originalPrice || 0,
//     location: c.location || '',
//     condition: c.condition || 'Used',
//     bodyType: c.bodyType || '',
//     fuelType: c.fuelType || '',
//     cylinders: c.cylinders || 0,
//     doors: c.doors || 0,
//     seats: c.seats || 0,
//     features: c.features || [],
//     rating: c.rating || 0,
//     reviews: c.reviews || 0,
//     isSponsored: c.isSponsored || false,
//     whatsappNumber: c.whatsappNumber || '',
//     carModel: c.carModel || '',
//     carMake: c.carMake || '',
//     images: c.images || [],
//     createdAt: new Date(),
//   }));

//   // Insert all cars at once (much faster)
//   const insertResult = await Car.insertMany(carsToInsert, {
//     ordered: false, // Continue inserting even if some documents fail
//   });

//   console.log(`✅ Successfully inserted ${insertResult.length} cars`);
  
//   return NextResponse.json({
//     success: true,
//     message: `Successfully inserted ${insertResult.length} cars`,
//     insertedCount: insertResult.length
//   });

// } catch (error: any) {
//   console.error('❌ Insert failed:', error);
  
//   // Handle specific MongoDB errors
//   if (error.writeErrors) {
//     const successful = featuredCars.length - error.writeErrors.length;
//     console.log(`✅ Partial success: ${successful} cars inserted`);
//     console.log(`❌ Failed: ${error.writeErrors.length} cars`);
    
//     return NextResponse.json({
//       success: false,
//       message: 'Partial insertion completed',
//       successful,
//       failed: error.writeErrors.length,
//       errors: error.writeErrors.map((err: any) => ({
//         index: err.index,
//         error: err.errmsg
//       }))
//     }, { status: 207 }); // 207 = Multi-Status
//   }
  
//   return NextResponse.json({
//     success: false,
//     error: 'Failed to insert cars',
//     details: error.message
//   }, { status: 500 });
// }


// }
