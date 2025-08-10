import React from 'react';
import { cn } from '@app/lib/utils';
import { CarCard } from './CarCard';

interface SimilarCarsProps {
  cars: any[]; // Use a more specific type if available
  onCarSelect: (car: any) => void;
  className?: string;
}

/**
 * A component to display a list of similar cars.
 * @param {object[]} cars - An array of similar car objects.
 * @param {(car: object) => void} onCarSelect - Callback function when a car is selected.
 * @param {string} className - Additional CSS classes for styling.
 */
const SimilarCars = ({ cars, onCarSelect, className }: SimilarCarsProps) => {
  if (cars.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("p-4 md:p-8", className)}>
      <h2 className="text-3xl font-bold mb-6">Similar Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} onClick={() => onCarSelect(car)} />
        ))}
      </div>
    </div>
  );
};

export { SimilarCars };
