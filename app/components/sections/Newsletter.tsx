import React from 'react';
import { cn } from '@app/lib/utils';
// Assuming the NewsletterForm component is in a sibling directory 'forms'
import { NewsletterForm } from '../forms/NewsletterForm';

interface NewsletterProps {
  className?: string;
}

/**
 * A section component for the newsletter subscription form.
 * This component acts as a container for the NewsletterForm component.
 * @param {string} className - Additional CSS classes for styling.
 */
const Newsletter = ({ className }: NewsletterProps) => {
  return (
    <div className={cn("bg-slate-800 text-white p-12 rounded-2xl", className)}>
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Stay Up to Date</h2>
        <p className="text-xl font-light mb-8">
          Get the latest deals, new arrivals, and special offers directly in your inbox.
        </p>
        <NewsletterForm className="w-full max-w-md mx-auto" />
      </div>
    </div>
  );
};

export { Newsletter };
