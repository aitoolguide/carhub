import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

/**
 * The checkout success page component.
 * Displays a confirmation message after a successful purchase.
 */
const CheckoutSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-50">
      <div className="bg-white p-10 rounded-xl shadow-lg border">
        <CheckCircle size={80} className="text-green-500 mx-auto" />
        <h1 className="text-4xl font-extrabold text-gray-900 mt-6">
          Thank You!
        </h1>
        <p className="text-xl text-gray-700 mt-2">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-500 mt-4">
          A confirmation email with your order details has been sent.
        </p>
        <Link href="/">
          <button className="mt-8 px-6 py-3 rounded-xl text-white bg-teal-500 hover:bg-teal-600 transition-colors font-semibold">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
