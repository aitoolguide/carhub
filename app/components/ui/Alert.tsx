import React, { ReactNode } from 'react';
import { X, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'p-4 rounded-xl shadow-md text-white flex items-start justify-between',
  {
    variants: {
      type: {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  message: ReactNode;
  onClose?: () => void;
}

/**
 * A styled alert component to display messages.
 * @param {string} title - The main title of the alert.
 * @param {ReactNode} message - The message content.
 * @param {string} type - The variant of the alert (success, error, warning, info).
 * @param {() => void} onClose - Optional handler for closing the alert.
 */
const Alert = ({ title, message, type, onClose, className, ...props }: AlertProps) => {
  const Icon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} />;
      case 'error':
        return <AlertTriangle size={24} />;
      case 'warning':
        return <AlertCircle size={24} />;
      case 'info':
      default:
        return <AlertCircle size={24} />;
    }
  };

  return (
    <div className={cn(alertVariants({ type, className }))} {...props}>
      <div className="flex items-center">
        <Icon />
        <div className="ml-4">
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export { Alert };
