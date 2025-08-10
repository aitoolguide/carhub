'use client';

import { Card } from '@app/components/ui';
import React, { useState } from 'react';
import CarActions from './components/CarActions';
import CarTable from './components/CarTable';

// Mock data for car listings
const mockCars = [
  { id: '130520', title: '2023 Mercedes-Benz C-Class', price: 64980, year: '2023', location: 'Concord, ON', imageUrl: 'https://placehold.co/400x300/22d3ee/ffffff?text=Mercedes' },
  { id: '130521', title: '2022 BMW 4 Series Convertible', price: 58500, year: '2022', location: 'Toronto, ON', imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW' },
  { id: '130522', title: '2021 Audi A5 Convertible', price: 52000, year: '2021', location: 'Mississauga, ON', imageUrl: 'https://placehold.co/400x300/a3e635/ffffff?text=Audi' },
  { id: '130523', title: '2020 Ford Mustang GT', price: 45000, year: '2020', location: 'Brampton, ON', imageUrl: 'https://placehold.co/400x300/fbbf24/ffffff?text=Mustang' },
];

/**
 * The main page for managing car listings in the admin panel.
 * It displays a table of cars and provides actions to add, edit, or delete them.
 */
const AdminCarsPage = () => {
  const [cars, setCars] = useState(mockCars);

  const handleDelete = (carId: string) => {
    setCars(cars.filter(car => car.id !== carId));
    // In a real app, you would make an API call to delete the car from the database.
    console.log(`Deleting car with ID: ${carId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Car Management</h1>
      <Card className="p-6">
        <CarActions />
        <CarTable cars={cars} onDelete={handleDelete} />
      </Card>
    </div>
  );
};

export default AdminCarsPage;
