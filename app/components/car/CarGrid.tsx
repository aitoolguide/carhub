import React from 'react';
import { cn } from '@app/lib/utils';
import { CarCard } from './CarCard'; // Assuming CarCard component is available

interface CarGridProps {
  cars: any[]; // Use a more specific type if available
  onCarSelect: (car: any) => void;
  className?: string;
}

/**
 * A responsive grid display for a list of cars.
 * @param {object[]} cars - An array of car objects.
 * @param {(car: object) => void} onCarSelect - Callback function when a car card is clicked.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarGrid = ({ cars, onCarSelect, className }: CarGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {cars.map((car) => (
        <CarCard key={car._id} car={car} onClick={() => onCarSelect(car)} />
      ))}
    </div>
  );
};

export { CarGrid };
