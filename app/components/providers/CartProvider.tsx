import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of a cart item.
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the cart context state and functions.
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Create the context with a default value.
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * A provider component that manages the state of a shopping cart.
 * It makes the cart state and functions available to all children.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 */
const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate derived values for convenience.
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // The value provided by the context.
  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * A custom hook to use the CartContext.
 * @returns {CartContextType} The cart context object.
 */
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
