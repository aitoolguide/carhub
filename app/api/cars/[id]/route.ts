// src/app/api/cars/[id]/route.ts
// This route handles fetching a single car by its ID.

import { NextResponse } from 'next/server';
import dbConnect from '@app/lib/mongodb';
import Car from '@app/database/models/Car';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    try {
        const carId = params.id;
        const car = await Car.findById(carId).populate('category').lean();

        if (!car) {
            return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        }

        // Map Mongoose document to the ICar type
        const specs =
            car.specifications instanceof Map
                ? Object.fromEntries(car.specifications)
                : { ...car.specifications };

        const carData = {
            ...car,
            _id: car._id.toString(),
            category: car.category.toString(),
            specifications: specs,
        };

        return NextResponse.json(carData);
    } catch (error) {
        console.error(`Failed to fetch car with ID ${params.id}:`, error);
        return NextResponse.json({ message: 'Failed to fetch car' }, { status: 500 });
    }
}