import React from 'react';
import { Loader } from 'lucide-react';

/**
 * A global loading component for Next.js.
 * This component will be displayed automatically when a page is loading.
 */
const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader size={48} className="animate-spin text-teal-500" />
    </div>
  );
};

export default Loading;
