'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@app/components/ui';
import OrderDetails from '../components/OrderDetails';


// Mock data for a single order's details
const mockOrder = {
  id: 'ORD-12345',
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Fake St, Toronto, ON M1A 1A1',
  },
  car: {
    title: '2022 BMW 4 Series Convertible',
    price: 58500,
    imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW+4+Series',
  },
  payment: {
    subtotal: 58500,
    fees: 500,
    tax: 7670,
    total: 66670,
    method: 'Credit Card',
  },
  status: 'Pending',
  date: '2023-10-27',
};

/**
 * The page to view detailed information for a specific order.
 * It uses a dynamic route parameter for the order ID.
 */
const AdminOrderDetailsPage = () => {
  const params = useParams();
  const orderId = params.id;
  
  // In a real application, you'd fetch the order details from an API using orderId.
  // We'll use mock data for now.
  const orderData = mockOrder;

  if (!orderData) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg border">
        <p className="text-center text-gray-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/orders" className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold mb-6">
        <ChevronLeft size={20} />
        Back to All Orders
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Order Details: {orderData.id}
      </h1>
      <Card className="p-6">
        <OrderDetails order={orderData} />
      </Card>
    </div>
  );
};

export default AdminOrderDetailsPage;
