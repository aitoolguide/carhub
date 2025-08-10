'use client';

import { Button, Input } from '@app/components/ui';
import React, { useState, useEffect } from 'react';

interface CarFormData {
  title: string;
  price: number;
  year: string;
  location: string;
  imageUrl: string;
}

interface CarFormProps {
  initialData?: CarFormData;
  onSubmit: (data: CarFormData) => void;
}

/**
 * A form component for adding or editing a car listing.
 * It can be pre-populated with initial data for editing.
 */
const CarForm = ({ initialData, onSubmit }: CarFormProps) => {
  const [formData, setFormData] = useState<CarFormData>(
    initialData || {
      title: '',
      price: 0,
      year: '',
      location: '',
      imageUrl: '',
    }
  );

  // Update form data if initialData prop changes (e.g., when navigating to edit page)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Car Title
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <Input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <Input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <Input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-teal-500 text-white hover:bg-teal-600">
        {initialData ? 'Update Car' : 'Add Car'}
      </Button>
    </form>
  );
};

export default CarForm;
