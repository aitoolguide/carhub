import React from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface CarComparisonProps {
  carA: any;
  carB: any;
  featuresToCompare: string[];
}

/**
 * A component to compare two cars side-by-side.
 * @param {object} carA - The first car object.
 * @param {object} carB - The second car object.
 * @param {string[]} featuresToCompare - An array of feature keys to compare.
 */
const CarComparison = ({ carA, carB, featuresToCompare }: CarComparisonProps) => {
  if (!carA || !carB) {
    return <div className="text-center p-8 text-slate-500">Select two cars to compare.</div>;
  }

  const getFeatureValue = (car: any, feature: string) => {
    // This is a simple implementation. A real-world scenario would require a more robust mapping.
    if (car.features && car.features.includes(feature)) {
      return <CheckCircle2 className="text-green-500" />;
    } else if (car.specifications && car.specifications[feature]) {
      return car.specifications[feature];
    }
    return <XCircle className="text-red-500" />;
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Car Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <img src={carA.imageUrl} alt={carA.title} className="w-full h-64 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-bold">{carA.title}</h3>
          <p className="text-lg font-semibold text-primary">${carA.price}</p>
          <ul className="mt-4 space-y-2">
            {featuresToCompare.map((feature) => (
              <li key={feature} className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">{feature}</span>
                <span>{getFeatureValue(carA, feature)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <img src={carB.imageUrl} alt={carB.title} className="w-full h-64 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-bold">{carB.title}</h3>
          <p className="text-lg font-semibold text-primary">${carB.price}</p>
          <ul className="mt-4 space-y-2">
            {featuresToCompare.map((feature) => (
              <li key={feature} className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">{feature}</span>
                <span>{getFeatureValue(carB, feature)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export { CarComparison };
