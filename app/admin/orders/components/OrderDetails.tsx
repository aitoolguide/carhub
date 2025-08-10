import React from 'react';
import { User, Car, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { Badge } from '@app/components/ui'; // Adjust the import path to where your Badge component is defined
import { Card } from '@app/components/ui';

interface OrderDetailsProps {
  order: {
    id: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    car: {
      title: string;
      price: number;
      imageUrl: string;
    };
    payment: {
      subtotal: number;
      fees: number;
      tax: number;
      total: number;
      method: string;
    };
    status: string;
    date: string;
  };
}

/**
 * A component to display the detailed information of a single order.
 */
const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Order Status and Date */}
      <Card className="p-6 lg:col-span-1 flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold text-gray-900">Order Information</h3>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            {order.status}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{order.date}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500">Order ID: {order.id}</p>
      </Card>

      {/* Customer Information */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User size={20} /> Customer Information
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
          <div>
            <dt className="font-semibold">Name:</dt>
            <dd>{order.customer.name}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email:</dt>
            <dd>{order.customer.email}</dd>
          </div>
          <div>
            <dt className="font-semibold">Phone:</dt>
            <dd>{order.customer.phone}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold">Address:</dt>
            <dd>{order.customer.address}</dd>
          </div>
        </dl>
      </Card>

      {/* Car Information */}
      <Card className="p-6 lg:col-span-3">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Car size={20} /> Car Details
        </h3>
        <div className="flex items-center gap-6">
          <img
            src={order.car.imageUrl}
            alt={order.car.title}
            className="w-32 h-24 object-cover rounded-md flex-shrink-0"
          />
          <div>
            <h4 className="text-lg font-bold">{order.car.title}</h4>
            <p className="text-gray-600">
              Price: <span className="font-semibold">${order.car.price.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Payment Summary */}
      <Card className="p-6 lg:col-span-3">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={20} /> Payment Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Subtotal:</span>
            <span>${order.payment.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Fees:</span>
            <span>${order.payment.fees.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Tax:</span>
            <span>${order.payment.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <span>{order.payment.method}</span>
          </div>
          <div className="md:col-span-2 flex justify-between items-center pt-2 font-bold text-lg">
            <span>Total:</span>
            <span>${order.payment.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;
