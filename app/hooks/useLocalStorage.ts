// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

/**
 * A custom hook to synchronize state with local storage.
 * @param key The key to use in local storage.
 * @param initialValue The initial value for the state.
 * @returns An array containing the current value and a setter function.
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
};
