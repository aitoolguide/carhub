'use client';

import React from 'react';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@app/components/ui';
import { ICar } from '@app/types/car';


interface CarTableProps {
  cars: ICar[];
  onDelete: (carId: string) => void;
}

/**
 * A table component to display car listings in the admin panel.
 * It includes options to edit and delete each car.
 */
const CarTable = ({ cars, onDelete }: CarTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cars.map((car) => (
            <tr key={car._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover" src={car.imageUrl} alt={car.title} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{car.title}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${car.price.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{car.year}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/cars/edit/${car._id}`}>
                    <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700">
                      <Edit size={20} />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => onDelete(car._id)}>
                    <Trash2 size={20} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
