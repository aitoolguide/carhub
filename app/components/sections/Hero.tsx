import React from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';

interface HeroProps {
  className?: string;
  onExploreClick: () => void;
}

/**
 * A hero section component for a car dealership homepage.
 * It features a large title, a subtitle, and a call-to-action button.
 * @param {string} className - Additional CSS classes for styling.
 * @param {() => void} onExploreClick - Handler for the call-to-action button click.
 */
const Hero = ({ className, onExploreClick }: HeroProps) => {
  return (
    <div className={cn("relative h-[600px] bg-cover bg-center rounded-2xl flex items-center p-8 text-white shadow-xl", className)} style={{ backgroundImage: "url('https://placehold.co/1200x600/1e293b/ffffff?text=Luxury+Car+Showroom')" }}>
      <div className="absolute inset-0 bg-gray-900 opacity-60 rounded-2xl"></div>
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Find Your Dream Car
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light">
          Explore our hand-picked selection of high-quality new and pre-owned vehicles.
        </p>
        <Button onClick={onExploreClick} className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
          Explore Inventory
        </Button>
      </div>
    </div>
  );
};

export { Hero };
