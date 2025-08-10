'use client';

import React, { useState } from 'react';
import SearchFilters from './components/SearchFilters';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';


// Mock data for car listings.
const mockCars = [
  { id: '1', title: '2023 Mercedes-Benz C-Class', price: 64980, location: 'Concord, ON', year: 2023, type: 'Sedan', category: 'sedan', imageUrl: 'https://placehold.co/400x300/22d3ee/ffffff?text=Mercedes' },
  { id: '2', title: '2022 BMW 4 Series Convertible', price: 58500, location: 'Toronto, ON', year: 2022, type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW' },
  { id: '3', title: '2021 Audi A5 Convertible', price: 52000, location: 'Mississauga, ON', year: 2021, type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/a3e635/ffffff?text=Audi' },
  { id: '4', title: '2020 Ford Mustang GT', price: 45000, location: 'Brampton, ON', year: 2020, type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/fbbf24/ffffff?text=Mustang' },
  { id: '5', title: '2023 Honda Civic', price: 28000, location: 'Toronto, ON', year: 2023, type: 'Sedan', category: 'sedan', imageUrl: 'https://placehold.co/400x300/fb923c/ffffff?text=Honda' },
  { id: '6', title: '2022 Toyota RAV4', price: 35000, location: 'Vaughan, ON', year: 2022, type: 'SUV', category: 'suv', imageUrl: 'https://placehold.co/400x300/818cf8/ffffff?text=RAV4' },
  { id: '7', title: '2021 Jeep Wrangler', price: 42000, location: 'Oakville, ON', year: 2021, type: 'SUV', category: 'suv', imageUrl: 'https://placehold.co/400x300/c084fc/ffffff?text=Jeep' },
];

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
    const matchesSearchTerm = car.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || car.type.toLowerCase() === filters.type.toLowerCase();
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
