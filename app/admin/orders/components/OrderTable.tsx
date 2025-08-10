'use client';

import React from 'react';
import Link from 'next/link';

import { Eye } from 'lucide-react';
import { Badge, Button } from '@app/components/ui';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  car: {
    title: string;
    price: number;
  };
  status: string;
  date: string;
}

interface OrderTableProps {
  orders: Order[];
}

/**
 * A table component to display a list of orders with their details and status.
 */
const OrderTable = ({ orders }: OrderTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.id}</div>
                <div className="text-xs text-gray-500">{order.date}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.customer.name}</div>
                <div className="text-xs text-gray-500">{order.customer.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.car.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/admin/orders/${order.id}`}>
                  <Button variant="ghost" size="icon" className="text-teal-500 hover:text-teal-700">
                    <Eye size={20} />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
