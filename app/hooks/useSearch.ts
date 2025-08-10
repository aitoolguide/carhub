// src/hooks/useSearch.ts
import { useState } from 'react';
import { useDebounce } from './useDebounce';

/**
 * A custom hook to manage a search input with debouncing.
 * @param delay The debounce delay in milliseconds.
 * @returns An object containing the search term, the debounced search term, and a setter for the search term.
 */
export const useSearch = (delay: number = 500) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, delay);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
  };
};
