'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './components/CheckoutForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';


// Mock data for a car being purchased
const mockCar = {
  id: '130521',
  title: '2022 BMW 4 Series Convertible',
  price: 58500,
  imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW+4+Series',
  fees: 500, // Mock processing fee
  taxRate: 0.13, // Mock tax rate (e.g., 13% for Ontario)
};

/**
 * The main checkout page component.
 * It manages the state for the checkout process and renders the form and summary components.
 */
const CheckoutPage = () => {
  const router = useRouter();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would process the order here.
    // This is a mock function that simulates a successful payment.
    console.log('Processing checkout with:', { customerInfo, paymentInfo });

    // Redirect to a success page after a short delay
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1000);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Secure Checkout
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleCheckoutSubmit} className="w-full lg:w-2/3">
          <div className="flex flex-col gap-8">
            <CheckoutForm
              customerInfo={customerInfo}
              onCustomerInfoChange={setCustomerInfo}
            />
            <PaymentForm
              paymentInfo={paymentInfo}
              onPaymentInfoChange={setPaymentInfo}
            />
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-xl text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors"
            >
              Complete Purchase
            </button>
          </div>
        </form>
        <div className="w-full lg:w-1/3">
          <OrderSummary car={mockCar} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
