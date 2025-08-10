import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@app/lib/utils';

// Defines the props for the Loading component
interface LoadingProps {
  text?: string;
  className?: string;
}

/**
 * A simple loading spinner with optional text.
 * @param {string} text - The text to display next to the spinner.
 * @param {string} className - Additional CSS classes for styling.
 */
const Loading = ({ text, className }: LoadingProps) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Loader size={32} className="animate-spin text-primary mr-4" />
      {text && <span className="text-xl font-semibold text-gray-700">{text}</span>}
    </div>
  );
};

export { Loading };
