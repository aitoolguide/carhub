// src/app/api/stripe/webhook/route.ts
// This route handles Stripe webhook events.

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import Order from '@app/database/models/Order';
import { stripe } from '@app/lib/stripe';
import { dbConnect } from '@app/lib/mongodb';

export async function POST(request: Request) {
  await dbConnect();
  
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  if (!signature) {
    return NextResponse.json({ message: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ message: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Update order status in your database
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: 'paid', orderStatus: 'confirmed' }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
