import React from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';

interface CarGalleryProps {
  imageUrl: string;
  title: string;
  className?: string;
}

/**
 * A component to display the main image of a car.
 * @param {string} imageUrl - The URL of the car's image.
 * @param {string} title - The title of the car for alt text.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarGallery = ({ imageUrl, title, className }: CarGalleryProps) => {
  return (
    <div className={cn("w-full rounded-2xl overflow-hidden shadow-lg", className)}>
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
    </div>
  );
};

export { CarGallery };
