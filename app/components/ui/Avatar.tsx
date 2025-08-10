// src/components/ui/Avatar.tsx
import React from 'react';
import { cn } from '@app/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('h-10 w-10 rounded-full object-cover', className)}
    />
  );
};

export { Avatar };
