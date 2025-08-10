// src/store/slices/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../types/car';

interface CartState {
  cartItems: ICar[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICar>) {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;