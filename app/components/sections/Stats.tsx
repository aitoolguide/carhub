import React from 'react';
import { cn } from '@app/lib/utils';
import { Users, Car, Heart, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface StatsProps {
  className?: string;
}

/**
 * A section to display key dealership statistics.
 * @param {string} className - Additional CSS classes for styling.
 */
const Stats = ({ className }: StatsProps) => {
  const stats: Stat[] = [
    { icon: Car, value: "1500+", label: "Cars Sold" },
    { icon: Users, value: "2000+", label: "Happy Customers" },
    { icon: Heart, value: "10+", label: "Years of Experience" },
    { icon: DollarSign, value: "50+", label: "Financing Partners" }
  ];

  return (
    <div className={cn("p-8", className)}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 flex flex-col items-center">
              <Icon size={48} className="text-teal-500 mb-4" />
              <div className="text-4xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-lg text-gray-600 mt-2">{stat.label}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { Stats };
