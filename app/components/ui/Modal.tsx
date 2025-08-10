// src/components/ui/Modal.tsx
import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, title, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className={cn('relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl', className)}>
        <div className="flex items-center justify-between border-b pb-3">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
