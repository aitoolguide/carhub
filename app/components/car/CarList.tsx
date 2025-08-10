import React from 'react';
import { cn } from '@app/lib/utils';
import { Car, Fuel, Gauge, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CarListProps {
  cars: any[]; // Use a more specific type if available
  onCarSelect: (car: any) => void;
  className?: string;
}

/**
 * A responsive list display for a list of cars with more details.
 * @param {object[]} cars - An array of car objects.
 * @param {(car: object) => void} onCarSelect - Callback function when a car card is clicked.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarList = ({ cars, onCarSelect, className }: CarListProps) => {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      {cars.map((car) => (
        <Card key={car._id} className="flex flex-col sm:flex-row p-4 gap-4 items-center">
          <img src={car.imageUrl} alt={car.title} className="w-full sm:w-64 h-48 object-cover rounded-xl flex-shrink-0" />
          <div className="flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">{car.title}</h3>
            <p className="text-lg font-semibold text-primary mt-1">${car.price}</p>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <MapPin size={14} className="mr-1" /> {car.location}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                <Gauge size={12} className="inline mr-1" /> {car.mileage} km
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                <Car size={12} className="inline mr-1" /> {car.type}
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                <Fuel size={12} className="inline mr-1" /> {car.fuel}
              </Badge>
            </div>
          </div>
          <Button onClick={() => onCarSelect(car)} className="flex-shrink-0">View Details</Button>
        </Card>
      ))}
    </div>
  );
};

export { CarList };
