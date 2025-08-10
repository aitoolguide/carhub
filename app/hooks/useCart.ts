// src/hooks/useCart.ts
import { useContext } from 'react';
import { useCartContext } from '../contexts/CartContext';

// This is a placeholder for the CartContext, which will be created in a later step.
// For now, it's just a simple React Context.
export const useCart = () => {
  const context = useCartContext();
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
