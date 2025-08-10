import React from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button'; // Assuming Button component is available
import { Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  className?: string;
  onSearch?: () => void;
  onNotifications?: () => void;
  onSettings?: () => void;
}

/**
 * A responsive header component for navigation and actions.
 * @param {string} className - Additional CSS classes for styling.
 * @param {() => void} onSearch - Handler for the search button.
 * @param {() => void} onNotifications - Handler for the notifications button.
 * @param {() => void} onSettings - Handler for the settings button.
 */
const Header = ({ className, onSearch, onNotifications, onSettings }: HeaderProps) => {
  return (
    <header className={cn(
      "flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200",
      className
    )}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onSearch} aria-label="Search">
          <Search size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onNotifications} aria-label="Notifications">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSettings} aria-label="Settings">
          <Settings size={20} />
        </Button>
      </div>
    </header>
  );
};

export { Header };
