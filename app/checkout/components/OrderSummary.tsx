import React from 'react';

interface OrderSummaryProps {
  car: {
    id: string;
    title: string;
    price: number;
    fees: number;
    taxRate: number;
    imageUrl: string;
  };
}

/**
 * A component to display a summary of the order with a breakdown of costs.
 */
const OrderSummary = ({ car }: OrderSummaryProps) => {
  const subtotal = car.price;
  const fees = car.fees;
  const tax = (subtotal + fees) * car.taxRate;
  const total = subtotal + fees + tax;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
      <div className="flex items-center gap-4 border-b pb-4 mb-4">
        <img src={car.imageUrl} alt={car.title} className="w-24 h-16 object-cover rounded-md" />
        <p className="font-semibold text-gray-800">{car.title}</p>
      </div>
      <div className="text-gray-700">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Processing Fees:</span>
          <span>${fees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-4 border-b pb-4">
          <span>Taxes:</span>
          <span>${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
