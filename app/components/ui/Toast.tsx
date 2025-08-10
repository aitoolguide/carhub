"use client";
import React, { useEffect, ReactNode } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const toastVariants = cva(
  'fixed bottom-4 right-4 z-50 px-6 py-3 rounded-full shadow-lg text-white flex items-center',
  {
    variants: {
      type: {
        success: 'bg-green-500',
        error: 'bg-red-500',
      },
    },
    defaultVariants: {
      type: 'success',
    },
  }
);

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: ReactNode;
  onClose: () => void;
}

/**
 * A transient toast notification that appears and disappears.
 * @param {ReactNode} message - The message content.
 * @param {string} type - The variant of the toast (success, error).
 * @param {() => void} onClose - Handler for closing the toast.
 */
const Toast = ({ message, type, onClose }: ToastProps) => {
  const Icon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertTriangle size={20} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Toast disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(toastVariants({ type }))}>
      <Icon />
      <span className="ml-2 font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

export { Toast };
