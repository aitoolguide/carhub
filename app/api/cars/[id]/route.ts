import { Car } from '@app/database/models/Car';
import { dbConnect } from '@app/lib/mongodb';
import { NextResponse } from 'next/server';


interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  await dbConnect();

  try {
    const { id } = await params; // Await the promise to get the id
    const car = await Car.findById(id).populate('category').lean();

    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    const specs =
      car.specifications instanceof Map
        ? Object.fromEntries(car.specifications)
        : { ...car.specifications };

    const carData = {
      ...car,
      _id: car._id.toString(),
      category: car.category?.toString(),
      specifications: specs,
    };

    return NextResponse.json(carData);
  } catch (error) {
    console.error(`Failed to fetch car:`, error);
    return NextResponse.json({ message: 'Failed to fetch car' }, { status: 500 });
  }
}
