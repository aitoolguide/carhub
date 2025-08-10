import React, { ReactNode } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

import { ChevronLeft } from 'lucide-react';
import { CarGallery } from './CarGallery';
import { CarFeatures } from './CarFeatures';
import { CarSpecifications } from './CarSpecifications';

interface CarDetailsProps {
  car: {
    id: string;
    title: string;
    price: string;
    location: string;
    imageUrl: string;
    features: string[];
    description: string;
    specifications: {
      mileage: string;
      year: string;
      type: string;
      fuel: string;
      transmission: string;
      drivetrain: string;
      engine: string;
    };
  };
  onBack: () => void;
  className?: string;
}

/**
 * A detailed view of a single car, including an image gallery, features, and specifications.
 * @param {object} car - The car data object.
 * @param {() => void} onBack - Callback function to go back to the car list.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarDetails = ({ car, onBack, className }: CarDetailsProps) => {
  return (
    <div className={cn("p-4 md:p-8", className)}>
      <Button onClick={onBack} variant="outline" className="mb-6">
        <ChevronLeft size={20} className="mr-2" />
        Back to Listings
      </Button>

      <Card className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <CarGallery imageUrl={car.imageUrl} title={car.title} />
            <h2 className="text-3xl font-bold text-slate-900 mt-6">{car.title}</h2>
            <p className="text-4xl font-extrabold text-primary mt-2">${car.price}</p>
            <p className="text-slate-500 mt-2">{car.location}</p>
          </div>

          <div className="flex flex-col space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Description</h3>
              <p className="text-slate-600 leading-relaxed">{car.description}</p>
            </div>

            <CarFeatures features={car.features} />
            <CarSpecifications specifications={car.specifications} />

            <div className="border-t border-slate-200 pt-6">
              <Button className="w-full">Contact Dealer</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { CarDetails };
