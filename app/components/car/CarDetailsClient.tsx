'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { cn } from '@app/lib/utils';

type AnyObject = { [k: string]: any };

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden', className)}>
    {children}
  </div>
);

const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-teal-600';
  const icon = type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />;
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={cn('fixed bottom-4 right-4 z-50 px-6 py-3 rounded-full shadow-lg text-white flex items-center', bgColor)}>
      {icon}
      <span className="ml-2 font-semibold">{message}</span>
    </div>
  );
};

// Image Gallery Component
function ImageGallery({ mainImageInitial, thumbnails, car }: { mainImageInitial: string | null; thumbnails: string[]; car: AnyObject }) {
  const [mainImage, setMainImage] = useState<string | null>(mainImageInitial);

  useEffect(() => {
    setMainImage(mainImageInitial);
  }, [mainImageInitial]);

  const onThumbnailClick = (url: string) => setMainImage(url);

  return (
    <Card className="p-0">
      {mainImage ? (
        <img src={mainImage} alt={car.imageAlt || car.title || 'Car image'} className="w-full rounded-t-2xl object-cover h-96 sm:h-[600px]" />
      ) : (
        <div className="w-full rounded-t-2xl object-cover h-96 sm:h-[600px] flex items-center justify-center bg-slate-100 text-slate-500">No Image</div>
      )}

      <div className="flex p-4 space-x-2 overflow-x-auto bg-slate-100 rounded-b-2xl">
        {thumbnails.map((url, index) => (
          <button
            key={url || `thumb-${index}`}
            onClick={() => onThumbnailClick(url)}
            className={cn(
              'w-24 h-16 object-cover rounded-md cursor-pointer overflow-hidden flex-none p-0 border-2',
              mainImage === url ? 'ring-2 ring-teal-500 border-transparent' : 'border-transparent'
            )}
            style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-label={`Show image ${index + 1}`}
          ></button>
        ))}
      </div>
    </Card>
  );
}

// Description Section Component
function DescriptionSection({ description }: { description: string }) {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  return (
    <>
      <div className={cn('text-slate-600 leading-relaxed text-sm', !showMoreDescription && 'line-clamp-3')}>
        <p>{description}</p>
      </div>
      <button
        onClick={() => setShowMoreDescription(!showMoreDescription)}
        className="mt-4 flex items-center font-semibold text-teal-600 hover:text-teal-700"
      >
        {showMoreDescription ? 'Read less' : 'Read more'}
        <ChevronDown size={16} className={cn('ml-1 transition-transform', showMoreDescription && 'rotate-180')} />
      </button>
    </>
  );
}

// Action Button Component
function ActionButton() {
  const [showToast, setShowToast] = useState(false);
  const handleAction = () => setShowToast(true);

  return (
    <>
      <button onClick={handleAction} className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300">
        No phone
      </button>
      {showToast && <Toast message="Action triggered – placeholder" onClose={() => setShowToast(false)} />}
    </>
  );
}

// Direct Message Button Component
function DirectMessageButton() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowToast(true)}
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md bg-blue-600 hover:bg-blue-700 text-white"
      >
        <MessageSquare size={18} className="mr-2" /> Direct Message
      </button>
      {showToast && <Toast message="Direct Message functionality coming soon!" onClose={() => setShowToast(false)} />}
    </>
  );
}

// Toast Container Component (for global toasts)
function ToastContainer() {
  return null; // Placeholder for any global toast management
}

// Export individual components
export { ImageGallery, DescriptionSection, ActionButton, DirectMessageButton, ToastContainer };

// Default export (main gallery component)
export default ImageGallery;