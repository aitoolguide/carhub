import React from 'react';
import { cn } from '@app/lib/utils';
import { Home, User, BarChart2, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#dashboard' },
  { icon: User, label: 'Users', href: '#users' },
  { icon: BarChart2, label: 'Analytics', href: '#analytics' },
  { icon: Settings, label: 'Settings', href: '#settings' },
];

/**
 * A responsive sidebar navigation component.
 * @param {string} className - Additional CSS classes for styling.
 */
const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn(
      "bg-gray-800 text-white flex flex-col h-full shadow-lg p-4",
      className
    )}>
      <div className="flex items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white">My App</h2>
      </div>
      <nav className="flex-grow mt-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-gray-700 pt-4">
        <a
          href="#logout"
          className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export { Sidebar };
