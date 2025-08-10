import React from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';

interface CallToActionProps {
  className?: string;
  onExploreClick: () => void;
}

/**
 * A prominent call-to-action section to encourage users to browse inventory.
 * @param {string} className - Additional CSS classes for styling.
 * @param {() => void} onExploreClick - Handler for the call-to-action button click.
 */
const CallToAction = ({ className, onExploreClick }: CallToActionProps) => {
  return (
    <div className={cn("bg-teal-500 text-white p-12 text-center rounded-2xl", className)}>
      <h2 className="text-4xl font-bold mb-4">Ready to Find Your Next Car?</h2>
      <p className="text-xl font-light mb-8">
        Browse our extensive inventory and find the perfect vehicle that fits your lifestyle.
      </p>
      <Button onClick={onExploreClick} className="bg-white text-teal-500 hover:bg-gray-100 font-bold py-3 px-8 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
        Start Browsing
      </Button>
    </div>
  );
};

export { CallToAction };
