import React, { useState } from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface CarFiltersProps {
  onFilterChange: (filters: any) => void;
  className?: string;
}

/**
 * A component with various inputs for filtering car listings.
 * @param {(filters: object) => void} onFilterChange - Callback function when filters are applied.
 * @param {string} className - Additional CSS classes for styling.
 */
const CarFilters = ({ onFilterChange, className }: CarFiltersProps) => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    priceMin: '',
    priceMax: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-2xl font-bold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
          <Input type="text" name="make" value={filters.make} onChange={handleInputChange} placeholder="e.g., Mercedes-Benz" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
          <Input type="text" name="model" value={filters.model} onChange={handleInputChange} placeholder="e.g., C-Class" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
          <Input type="text" name="year" value={filters.year} onChange={handleInputChange} placeholder="e.g., 2023" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Min Price</label>
          <Input type="number" name="priceMin" value={filters.priceMin} onChange={handleInputChange} placeholder="Min Price" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Max Price</label>
          <Input type="number" name="priceMax" value={filters.priceMax} onChange={handleInputChange} placeholder="Max Price" />
        </div>
      </div>
      <Button onClick={handleApplyFilters} className="mt-6 w-full">Apply Filters</Button>
    </Card>
  );
};

export { CarFilters };
