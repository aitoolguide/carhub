// src/hooks/useCars.ts
import { useState, useEffect } from 'react';
import { ICar } from '../types/car';
import { apiClient } from '../lib/api-client';

/**
 * A custom hook to fetch and manage a list of cars.
 * @returns An object containing the car data, loading state, and any errors.
 */
export const useCars = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const response = await apiClient<ICar[]>('/api/cars');
      
      if (response.success) {
        setCars(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  return { cars, loading, error };
};
