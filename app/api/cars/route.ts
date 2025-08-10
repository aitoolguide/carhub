// src/app/api/cars/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@app/lib/mongodb';
import Car from '@app/database/models/Car';
import { ICar } from '@app/types/car';

export async function GET() {
  await dbConnect();

  try {
    const cars = await Car.find({}).populate('category').lean();

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
      };
    });

    return NextResponse.json(carData);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    return NextResponse.json({ message: 'Failed to fetch cars' }, { status: 500 });
  }
}
