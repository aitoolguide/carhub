import React from 'react';
import { cn } from '@app/lib/utils';
import { Car, Truck, Bike } from 'lucide-react';
import { Card } from '../ui/Card';

interface Category {
  name: string;
  icon: React.ElementType;
}

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
  className?: string;
}

/**
 * A section to display various car categories with icons.
 * @param {(category: string) => void} onCategorySelect - Handler for when a category card is clicked.
 * @param {string} className - Additional CSS classes for styling.
 */
const Categories = ({ onCategorySelect, className }: CategoriesProps) => {
  const categories: Category[] = [
    { name: "Sedan", icon: Car },
    // { name: "SUV", icon: SUV },
    { name: "Truck", icon: Truck },
    // { name: "Convertible", icon: Convertable },
    { name: "Motorcycle", icon: Bike },
  ];

  return (
    <div className={cn("p-8", className)}>
      <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name} className="flex flex-col items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => onCategorySelect(category.name)}>
              <div className="bg-teal-500 rounded-full p-4 text-white">
                <Icon size={48} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { Categories };
