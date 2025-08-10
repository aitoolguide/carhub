import React, { ReactNode, useState } from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ChevronDown } from 'lucide-react';
interface FilterSectionProps {
    title: string;
    children: ReactNode;
    open: boolean;
    onToggle: () => void;
}

const CarFilters = ({
    title,
    children,
    open,
    onToggle
}: FilterSectionProps) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center py-4 px-4 text-slate-700 hover:bg-slate-50 transition-colors"
        >
            <span className="font-semibold">{title}</span>
            <ChevronDown
                size={18}
                className={cn('transition-transform', open && 'rotate-180')}
            />
        </button>
        {open && <div className="p-4">{children}</div>}
    </div>
);
export { CarFilters };
