'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { Button } from './components/ui';

/**
 * A global error component for Next.js.
 * This component will be displayed when an error occurs during rendering.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="mt-2 text-gray-600">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-6">
        <Button
          onClick={() => reset()}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
