'use client';

import React, { useState } from 'react';

import { Car, User, DollarSign } from 'lucide-react';
import { Card } from '@app/components/ui';
import OrderTable from './components/OrderTable';

// Mock data for car dealership orders
const mockOrders = [
  {
    id: 'ORD-12345',
    customer: { name: 'John Doe', email: 'john.doe@example.com' },
    car: { title: '2022 BMW 4 Series Convertible', price: 58500 },
    status: 'Pending',
    date: '2023-10-27',
  },
  {
    id: 'ORD-12346',
    customer: { name: 'Jane Smith', email: 'jane.smith@example.com' },
    car: { title: '2023 Mercedes-Benz C-Class', price: 64980 },
    status: 'Completed',
    date: '2023-10-26',
  },
  {
    id: 'ORD-12347',
    customer: { name: 'Peter Jones', email: 'peter.jones@example.com' },
    car: { title: '2020 Ford Mustang GT', price: 45000 },
    status: 'Cancelled',
    date: '2023-10-25',
  },
];

/**
 * The main order management page for the admin panel.
 * It displays an overview of all customer orders.
 */
const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders);

  // Function to determine badge style based on order status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default'; // A green or primary color
      case 'Pending':
        return 'outline'; // A neutral color
      case 'Cancelled':
        return 'destructive'; // A red color
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Management</h1>
      <Card className="p-6">
        <OrderTable orders={orders} />
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
