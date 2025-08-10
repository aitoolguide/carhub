'use client';

import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Input, Select } from '@app/components/ui';

interface SearchFiltersProps {
  filters: {
    type: string;
    minPrice: string;
    maxPrice: string;
  };
  onFilterChange: (newFilters: any) => void;
}

/**
 * A component for filtering search results.
 * It provides options for car type and price range.
 */
const SearchFilters = ({ filters, onFilterChange }: SearchFiltersProps) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <SlidersHorizontal size={20} />
        Filters
      </h3>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="car-type" className="block text-sm font-medium text-gray-700 mb-1">
            Car Type
          </label>
          <div className="relative">
            <Select
              id="car-type"
              value={filters.type}
              onChange={handleTypeChange}
              className="pr-10"
              options={[
                { value: '', label: 'All Types' },
                { value: 'sedan', label: 'Sedan' },
                { value: 'suv', label: 'SUV' },
                { value: 'convertible', label: 'Convertible' },
              ]}
            />
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              className="w-1/2 rounded-xl"
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              className="w-1/2 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
