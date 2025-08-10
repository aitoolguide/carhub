import React from 'react';
import { cn } from '@app/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface CarFeaturesProps {
  features: string[];
  className?: string;
}

/**
 * A component to display a list of a car's key features.
 * @param {string[]} features - An array of feature strings.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarFeatures = ({ features, className }: CarFeaturesProps) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Features</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle2 size={16} className="mr-2 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CarFeatures };
