import React from 'react';
import { cn } from '@app/lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * A shared component for displaying a breadcrumb navigation path.
 *
 * @param {BreadcrumbItem[]} items - An array of breadcrumb items with a label and href.
 * @param {string} className - Additional CSS classes for styling the container.
 */
const BreadcrumbNav = ({ items, className }: BreadcrumbNavProps) => {
  return (
    <nav aria-label="breadcrumb" className={cn("flex", className)}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
            )}
            {index === items.length - 1 ? (
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { BreadcrumbNav };
