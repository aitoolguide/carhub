import React from 'react';
import { cn } from '@app/lib/utils';
import { CarCard } from './CarCard';

interface RecentlyViewedProps {
  cars: any[]; // Use a more specific type if available
  onCarSelect: (car: any) => void;
  className?: string;
}

/**
 * A component to display a list of recently viewed cars.
 * @param {object[]} cars - An array of recently viewed car objects.
 * @param {(car: object) => void} onCarSelect - Callback function when a car is selected.
 * @param {string} className - Additional CSS classes for styling.
 */
const RecentlyViewed = ({ cars, onCarSelect, className }: RecentlyViewedProps) => {
  if (cars.length === 0) {
    return null;
  }

  return (
    <div className={cn("p-4 md:p-8", className)}>
      <h2 className="text-3xl font-bold mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} onClick={() => onCarSelect(car)} />
        ))}
      </div>
    </div>
  );
};

export { RecentlyViewed };
