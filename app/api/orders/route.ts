// src/app/api/orders/route.ts
// This route handles the creation of new orders.

import { NextResponse } from 'next/server';

import Order from '@app/database/models/Order';
import { IOrder } from '@app/types/order';
import { dbConnect } from '@app/lib/mongodb';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    
    // In a real application, you would perform validation and user authentication here.
    // For this example, we'll assume the body has the necessary data.

    const newOrder = new Order({
      user: body.user,
      car: body.car,
      stripeSessionId: body.stripeSessionId,
      shippingAddress: body.shippingAddress,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    await newOrder.save();
    
    return NextResponse.json({ message: 'Order created successfully', order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}
