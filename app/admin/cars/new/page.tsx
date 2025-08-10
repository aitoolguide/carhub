'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@app/components/ui';
import CarForm from '../components/CarForm';

/**
 * The page for adding a new car listing.
 * It uses the CarForm component.
 */
const AddNewCarPage = () => {
  const handleSave = (carData: any) => {
    // In a real app, you would save the new car data to the database.
    console.log('Saving new car:', carData);
    alert('New car added successfully!');
  };

  return (
    <div>
      <Link href="/admin/cars" className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold mb-6">
        <ChevronLeft size={20} />
        Back to Car Management
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Car</h1>
      <Card className="p-6">
        <CarForm onSubmit={handleSave} />
      </Card>
    </div>
  );
};

export default AddNewCarPage;
