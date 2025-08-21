// src/contexts/CartContext.tsx
'use client';

import { ICar } from '@app/database/models/Car';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface CartItem extends ICar {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addItem: (car: ICar, quantity: number) => void;
  removeItem: (carId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (car: ICar, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === car._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === car._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...car, quantity }];
    });
  };

  const removeItem = (carId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== carId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
