'use client';

import { Card } from '@app/components/ui';
import React, { useState } from 'react';
import CarActions from './components/CarActions';
import CarTable from './components/CarTable';
import { mockCars } from '@app/data/cars';

/**
 * The main page for managing car listings in the admin panel.
 * It displays a table of cars and provides actions to add, edit, or delete them.
 */
const AdminCarsPage = () => {
  const [cars, setCars] = useState(mockCars);

  const handleDelete = (carId: string) => {
    setCars(cars.filter(car => car._id !== carId));
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
