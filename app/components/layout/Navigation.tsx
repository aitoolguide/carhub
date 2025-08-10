import React from 'react';
import { cn } from '@app/lib/utils';
import { Home, User, Settings } from 'lucide-react';
import { Button } from '../ui/Button'; // Assuming Button component is available

interface NavigationProps {
  className?: string;
  items: { label: string; href: string; icon: React.ElementType }[];
}

/**
 * A general-purpose navigation component.
 * @param {string} className - Additional CSS classes for styling.
 * @param {object[]} items - An array of navigation items.
 */
const Navigation = ({ className, items }: NavigationProps) => {
  return (
    <nav className={cn("p-2", className)}>
      <ul className="flex items-center space-x-2">
        {items.map((item) => (
          <li key={item.label}>
            <Button asChild variant="ghost">
              <a href={item.href} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                <item.icon size={16} />
                <span>{item.label}</span>
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navigation };
