'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Settings } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * A reusable component for navigation links in the sidebar.
 * It highlights the active link based on the current path.
 */
const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-colors hover:bg-teal-600 ${isActive ? 'bg-teal-600' : ''}`}>
      {children}
    </Link>
  );
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * The main layout for the admin panel, including a sidebar and main content area.
 */
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white shadow-xl flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <NavLink href="/admin">
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/admin/cars">
                <Car size={20} />
                <span>Car Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/admin/settings">
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
