import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { Home, User, BarChart2, Settings } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#dashboard' },
  { icon: User, label: 'Users', href: '#users' },
  { icon: BarChart2, label: 'Analytics', href: '#analytics' },
  { icon: Settings, label: 'Settings', href: '#settings' },
];

/**
 * A full-page admin dashboard layout with a sidebar, header, and footer.
 * @param {ReactNode} children - The main content of the layout.
 */
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <Header />
        
        {/* Mobile menu, hidden on desktop */}
        <div className="md:hidden p-4">
          <MobileMenu navItems={navItems} />
        </div>

        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export { AdminLayout };
