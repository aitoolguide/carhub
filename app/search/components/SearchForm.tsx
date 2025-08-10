import React, { useState } from 'react';

import { Search } from 'lucide-react';
import { Button, Input } from '@app/components/ui';

interface SearchFormProps {
  searchTerm: string;
  onSearchSubmit: (term: string) => void;
}

/**
 * A component for the search input and button.
 * It allows users to type in a search query and submit it.
 */
const SearchForm = ({ searchTerm, onSearchSubmit }: SearchFormProps) => {
  const [inputTerm, setInputTerm] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(inputTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <Input
        type="text"
        placeholder="Search for a car (e.g., 'BMW')"
        value={inputTerm}
        onChange={(e) => setInputTerm(e.target.value)}
        className="flex-grow rounded-xl"
      />
      <Button type="submit" className="flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-600 rounded-xl">
        <Search size={20} />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
