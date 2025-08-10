import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { cn } from '@app/lib/utils';
import { X } from 'lucide-react';

// Define the shape of a toast message.
interface ToastType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// Define the shape of the toast context.
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}

// Create the context.
const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * A toast component for displaying a single notification.
 * @param {ToastType} toast - The toast object containing message, type, etc.
 * @param {() => void} onDismiss - Callback function to dismiss the toast.
 */
const Toast = ({ toast, onDismiss }: { toast: ToastType; onDismiss: () => void }) => {
  const baseClasses = "flex items-center justify-between p-4 rounded-md shadow-lg";
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-gray-900',
  };

  return (
    <div className={cn(baseClasses, typeClasses[toast.type], "animate-in slide-in-from-top-10")}>
      <span>{toast.message}</span>
      <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

/**
 * A provider component that manages and displays toast notifications.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 */
const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = useCallback((message: string, type: ToastType['type'] = 'info', duration: number = 3000) => {
    const newToast: ToastType = {
      id: crypto.randomUUID(),
      message,
      type,
      duration,
    };

    setToasts(prevToasts => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(t => t.id !== newToast.id));
    }, duration);
  }, []);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * A custom hook to use the ToastContext.
 * @returns {ToastContextType} The toast context object.
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
