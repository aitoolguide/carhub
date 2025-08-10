import React from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Car, Gauge, Calendar, MapPin } from 'lucide-react';
import { ICar } from '@app/types/car';

interface FeaturedCarsProps {
  cars: ICar[];
  className?: string;
  onCarClick: (carId: string) => void;
}

/**
 * A section to display a grid of featured cars.
 * @param {CarData[]} cars - An array of car data objects to display.
 * @param {string} className - Additional CSS classes for styling.
 * @param {(carId: string) => void} onCarClick - Handler for when a car card is clicked.
 */
const FeaturedCars = ({ cars, className, onCarClick }: FeaturedCarsProps) => {
  return (
    <div className={cn("p-8", className)}>
      <h2 className="text-3xl font-bold text-center mb-10">Featured Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <Card key={car._id} className="cursor-pointer hover:shadow-2xl transition-shadow duration-300" onClick={() => onCarClick(car._id)}>
            <img src={car.imageUrl} alt={car.title} className="w-full h-56 object-cover rounded-t-2xl" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{car.title}</h3>
              <p className="text-2xl font-extrabold text-teal-600">${car.price}</p>
              <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-500">
                <Badge className="bg-gray-100 text-gray-700">
                  <Gauge size={14} className="inline mr-1" /> {car.mileage}
                </Badge>
                <Badge className="bg-gray-100 text-gray-700">
                  <Calendar size={14} className="inline mr-1" /> {car.year}
                </Badge>
                <Badge className="bg-gray-100 text-gray-700">
                  <MapPin size={14} className="inline mr-1" /> {car.location}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { FeaturedCars };
