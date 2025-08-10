import React from 'react';
import { cn } from '@app/lib/utils';
import { Car, Fuel, Gauge, Calendar, Zap, Shield } from 'lucide-react';

interface CarSpecificationsProps {
  specifications: {
    mileage: string;
    year: string;
    type: string;
    fuel: string;
    transmission: string;
    drivetrain: string;
    engine: string;
  };
  className?: string;
}

/**
 * A component to display a car's technical specifications.
 * @param {object} specifications - An object containing the car's specifications.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarSpecifications = ({ specifications, className }: CarSpecificationsProps) => {
  const specs = [
    { label: 'Mileage', value: `${specifications.mileage} km`, icon: Gauge },
    { label: 'Year', value: specifications.year, icon: Calendar },
    { label: 'Type', value: specifications.type, icon: Car },
    { label: 'Fuel', value: specifications.fuel, icon: Fuel },
    { label: 'Transmission', value: specifications.transmission, icon: Zap },
    { label: 'Drivetrain', value: specifications.drivetrain, icon: Shield },
    { label: 'Engine', value: specifications.engine, icon: Zap },
  ];

  return (
    <div className={cn("", className)}>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Specifications</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-700">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center space-x-2">
            <spec.icon size={20} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-500">{spec.label}</span>
              <span className="text-base">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CarSpecifications };
