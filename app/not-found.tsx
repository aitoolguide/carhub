import Link from 'next/link';
import React from 'react';
import { Ban } from 'lucide-react';

/**
 * The 404 Not Found page component.
 * This component is displayed when a user navigates to a non-existent URL.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <Ban size={64} className="text-gray-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link href="/">
          <button className="px-6 py-3 rounded-md text-white bg-teal-500 hover:bg-teal-600 transition-colors">
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
