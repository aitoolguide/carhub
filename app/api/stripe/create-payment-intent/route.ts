// src/app/api/stripe/create-payment-intent/route.ts
// This route creates a Stripe checkout session.

import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@app/lib/stripe';
import Car from '@app/database/models/Car';
import dbConnect from '@app/lib/mongodb';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { carId } = await request.json();

    if (!carId) {
      return NextResponse.json({ message: 'Car ID is required' }, { status: 400 });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${car.make} ${car.model} (${car.year})`,
          },
          unit_amount: car.price * 100, // Amount in cents
        },
        quantity: 1,
      },
    ];

    const session = await createCheckoutSession(
      lineItems,
      `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      `${request.headers.get('origin')}/cancel`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return NextResponse.json({ message: 'Failed to create checkout session' }, { status: 500 });
  }
}

