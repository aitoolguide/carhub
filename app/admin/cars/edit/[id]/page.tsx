'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@app/components/ui';
import CarForm from '../../components/CarForm';

// Mock data for a single car to be edited
const mockCarToEdit = {
  id: '130521',
  title: '2022 BMW 4 Series Convertible',
  price: 58500,
  year: '2022',
  location: 'Toronto, ON',
  imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW',
};

/**
 * The page for editing an existing car listing.
 * It fetches the car's data based on the dynamic ID and populates the form.
 */
const EditCarPage = () => {
  const params = useParams();
  const carId = params.id;
  
  // In a real app, you would fetch the car data from an API using the carId.
  // We'll use mock data for now.
  const carData = mockCarToEdit;

  const handleSave = (updatedData: any) => {
    // In a real app, you would update the car data in the database.
    console.log(`Updating car with ID ${carId}:`, updatedData);
    alert('Car updated successfully!');
  };

  if (!carData) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg border">
        <p className="text-center text-gray-500">Car not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/cars" className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold mb-6">
        <ChevronLeft size={20} />
        Back to Car Management
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Edit Car: {carData.title}
      </h1>
      <Card className="p-6">
        <CarForm onSubmit={handleSave} initialData={carData} />
      </Card>
    </div>
  );
};

export default EditCarPage;
