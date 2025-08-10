import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * A loading component for the individual car details page.
 * Displays a spinner while the car data is being fetched.
 */
const CarDetailsLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 size={48} className="animate-spin text-teal-500" />
        <p className="mt-4 text-lg text-gray-600">Loading car details...</p>
      </div>
    </div>
  );
};

export default CarDetailsLoading;
