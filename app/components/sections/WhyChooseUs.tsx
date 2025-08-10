import React from 'react';
import { cn } from '@app/lib/utils';
import { ShieldCheck, Handshake, Car, Award } from 'lucide-react';
import { Card } from '../ui/Card';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  className?: string;
}

/**
 * A section highlighting the key reasons to choose the dealership.
 * @param {string} className - Additional CSS classes for styling.
 */
const WhyChooseUs = ({ className }: WhyChooseUsProps) => {
  const features: Feature[] = [
    {
      icon: ShieldCheck,
      title: "Certified & Inspected",
      description: "Every vehicle undergoes a rigorous multi-point inspection to ensure quality and safety."
    },
    {
      icon: Handshake,
      title: "Hassle-Free Financing",
      description: "Our finance experts work with you to find the best loan options for your budget."
    },
    {
      icon: Car,
      title: "Wide Selection",
      description: "From luxury sedans to powerful trucks, we have a diverse inventory to meet every need."
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Our dedicated team provides top-notch service before, during, and after your purchase."
    }
  ];

  return (
    <div className={cn("p-8 bg-gray-50", className)}>
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 text-center">
              <div className="bg-teal-500 rounded-full p-4 inline-block text-white mb-4">
                <Icon size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { WhyChooseUs };
