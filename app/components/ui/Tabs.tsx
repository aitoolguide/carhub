// src/components/ui/Tabs.tsx
'use client';
import React, { useState, ReactNode } from 'react';
import { cn } from '@app/lib/utils';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tabs = ({ tabs, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex space-x-2 border-b-2 border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              activeTab === index
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export { Tabs };
