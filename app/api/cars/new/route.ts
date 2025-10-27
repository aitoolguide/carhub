// app/api/cars/new/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@app/lib/mongodb';
import { Car } from '@app/database/models/Car';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getServerSession } from "next-auth";
import { authOptions } from '@app/lib/auth';
import { Types } from 'mongoose';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const formData = await req.formData();
        console.log('Received form data for new car ad.', formData);
        // Extract text fields
        const carData: any = {
            title: formData.get('title'),
            description: formData.get('description'),
            make: formData.get('make'),
            carModel: formData.get('model'),
            year: parseInt(formData.get('year') as string),
            condition: formData.get('condition'),
            price: parseFloat(formData.get('price') as string),
            bodyType: formData.get('bodyType'),
            mileage: parseInt(formData.get('mileage') as string),
            fuelType: formData.get('fuelType'),
            transmission: formData.get('transmission'),
            drivetrain: formData.get('drivetrain') || undefined,
            cylinders: formData.get('cylinders') ? parseInt(formData.get('cylinders') as string) : undefined,
            engineSize: formData.get('engineSize') || undefined,
            exteriorColor: formData.get('exteriorColor'),
            interiorColor: formData.get('interiorColor') || undefined,
            doors: parseInt(formData.get('doors') as string),
            seats: parseInt(formData.get('seats') as string),
            vin: formData.get('vin') || undefined,
            location: formData.get('location'),
            isFeatured: formData.get('isFeatured') === 'true',
            isSponsored: formData.get('isSponsored') === 'true',
            isSold: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            dealerPhone: formData.get('dealerPhone') || undefined,
            // NEW ATTRIBUTES
            hybrid: formData.get('hybrid') === 'true' ? true : formData.get('hybrid') === 'false' ? false : undefined,
            horsepower: formData.get('horsepower') ? parseInt(formData.get('horsepower') as string) : undefined,
            sellerType: formData.get('sellerType') || undefined,
            warranty: formData.get('warranty') || undefined,
            steeringSide: formData.get('steeringSide') || undefined
        };
        console.log('Parsed car data:', carData);
        // Parse features array
        const featuresStr = formData.get('features') as string;
        if (featuresStr) {
            try {
                carData.features = JSON.parse(featuresStr);
            } catch (e) {
                carData.features = [];
            }
        }

        // Add contact information to specifications
        carData.specifications = {
            contactName: formData.get('contactName'),
            contactPhone: formData.get('contactPhone'),
            contactEmail: formData.get('contactEmail'),
            engineSize: carData.engineSize
        };

        // Handle image uploads
        const images = formData.getAll('images') as File[];
        const uploadedImagePaths: string[] = [];

        if (images && images.length > 0) {
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'cars');
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }

            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                if (image && image.size > 0) {
                    const timestamp = Date.now();
                    const randomStr = Math.random().toString(36).substring(7);
                    const extension = image.name.split('.').pop();
                    const filename = `${timestamp}-${randomStr}.${extension}`;
                    const bytes = await image.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const filepath = join(uploadDir, filename);
                    await writeFile(filepath, buffer);
                    uploadedImagePaths.push(`/uploads/cars/${filename}`);
                }
            }
        }

        if (uploadedImagePaths.length > 0) {
            carData.images = uploadedImagePaths;
            carData.image = uploadedImagePaths[0];
        }

        const uid = session.user.id;
        if (!uid) {
            return NextResponse.json(
                { message: 'User id missing in session' },
                { status: 401 }
            );
        }
        carData.createdAt = new Date();
        carData.postedBy = new Types.ObjectId(uid);
        const newCar = await Car.create(carData);
        const carResponse = {
            ...newCar.toObject(),
            _id: newCar._id.toString(),
            category: newCar.category?.toString(),
            model: newCar.carModel || newCar.model,
        };

        return NextResponse.json(carResponse, { status: 201 });

    } catch (error) {
        console.error('Failed to create car:', error);
        return NextResponse.json(
            {
                message: 'Failed to create car ad',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
