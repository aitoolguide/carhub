// app/api/cars/my-ads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { dbConnect } from '@app/lib/mongodb';
import { Car } from '@app/database/models/Car';
import { authOptions } from '@app/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    await dbConnect();
    const userId= session.user.id;
    // Build query to find user's cars
    // Adjust the query field based on how you store user reference in Car model
    // Options: userId, createdBy, owner, or specifications.contactEmail
    const query: any = {
      // Option 1: If you have a userId field
      // userId: session.user.id,
      
      // Option 2: If you store email in specifications
      'postedBy': session.user.id,
      
      // Option 3: If you have a createdBy field
      // createdBy: session.user.id,
    };

    // Fetch cars sorted by creation date (newest first)
    const cars = await Car.find({postedBy:userId })
      .sort({ createdAt: -1 })
      .lean();
      console.log(`Fetched ${cars} ads for user ${session.user.email} (ID: ${userId})`);
    // Transform the data
    const carData = cars.map((car) => {
      const specifications =
        car.specifications instanceof Map
          ? Object.fromEntries(car.specifications)
          : { ...car.specifications };

      const status = (car as any)?.status ?? 'active';

      return {
        ...car,
        _id: car._id.toString(),
        category: car.category?.toString(),
        specifications,
        model: car.carModel || car.model,
        // Add status field if not in schema (you can add this to your schema)
        status,
      };
    });

    return NextResponse.json({
      success: true,
      cars: carData,
      total: carData.length,
    });
  } catch (error) {
    console.error('Failed to fetch user ads:', error);
    return NextResponse.json(
      { 
        message: 'Failed to fetch your ads',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}