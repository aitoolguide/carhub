// src/contexts/SearchContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchContextType {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const value = {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
