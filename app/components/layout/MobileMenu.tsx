import React, { useState } from 'react';
import { Menu, X, Home, User, BarChart2 } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button'; // Assuming Button component is available

interface MobileMenuProps {
  navItems: { label: string; href: string; icon: React.ElementType }[];
}

/**
 * A mobile-friendly navigation menu that can be toggled open and closed.
 * @param {object[]} navItems - An array of navigation items.
 */
const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 shadow-lg flex flex-col">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close Menu">
              <X size={24} />
            </Button>
          </div>
          <nav className="flex-grow mt-8">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="flex items-center space-x-4 p-4 rounded-lg text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export { MobileMenu };
