import React from 'react';
import { cn } from '@app/lib/utils';

interface FooterProps {
  className?: string;
}

/**
 * A simple footer component.
 * @param {string} className - Additional CSS classes for styling.
 */
const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "p-4 text-center text-sm text-gray-500 border-t border-gray-200",
      className
    )}>
      &copy; {currentYear} My App. All rights reserved.
    </footer>
  );
};

export { Footer };
