// src/lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Stripe secret key and publishable key are not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion:'2025-07-30.basil',
});

/**
 * Creates a Stripe checkout session.
 * @param lineItems The items to be purchased.
 * @param successUrl The URL to redirect to after successful payment.
 * @param cancelUrl The URL to redirect to after cancelled payment.
 * @returns The Stripe checkout session object.
 */
export async function createCheckoutSession(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], successUrl: string, cancelUrl: string) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}
