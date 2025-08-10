'use client';

import React, { useState } from 'react';
import SearchFilters from './components/SearchFilters';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { mockCars } from '@app/data/cars';

/**
 * The main search page component.
 * It manages the search state and renders the search form, filters, and results.
 */
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  // Filter the mock cars based on search term and filters
  const filteredCars = mockCars.filter((car) => {
    const matchesSearchTerm = car.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || car.type?.toLowerCase() === filters.type.toLowerCase();
    const matchesMinPrice = !filters.minPrice || car.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || car.price <= Number(filters.maxPrice);

    return matchesSearchTerm && matchesType && matchesMinPrice && matchesMaxPrice;
  });

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Find Your Dream Car
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4">
          <SearchForm searchTerm={searchTerm} onSearchSubmit={handleSearchSubmit} />
          <SearchResults cars={filteredCars} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
