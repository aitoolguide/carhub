import React from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card'; // Assuming Card component is available
import { Badge } from '../ui/Badge'; // Assuming Badge component is available
import { Button } from '../ui/Button'; // Assuming Button component is available
import { Car, Fuel, Gauge, MapPin } from 'lucide-react';

interface CarCardProps {
  car: {
    id: string;
    title: string;
    price: string;
    location: string;
    mileage: string;
    type: string;
    fuel: string;
    imageUrl: string;
  };
  onClick?: () => void;
  className?: string;
}

/**
 * A reusable card component to display a single car with key details.
 * @param {object} car - The car data to display.
 * @param {() => void} onClick - The function to call when the card is clicked.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarCard = ({ car, onClick, className }: CarCardProps) => {
  return (
    <Card className={cn("cursor-pointer h-full flex flex-col", className)} onClick={onClick}>
      <img src={car.imageUrl} alt={car.title} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-slate-900">{car.title}</h2>
        <p className="text-lg font-semibold text-primary mt-2">${car.price}</p>
        <div className="flex items-center text-slate-500 text-sm mt-1">
          <MapPin size={14} className="mr-1" /> {car.location}
        </div>
        <div className="flex flex-wrap gap-2 mt-4 flex-grow">
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
        <div className="mt-4">
          <Button className="w-full">View Details</Button>
        </div>
      </div>
    </Card>
  );
};

export { CarCard };
