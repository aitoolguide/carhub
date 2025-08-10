// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../store/slices/carSlice';
import authReducer from '../store/slices/authSlice';
import cartReducer from '../store/slices/cartSlice';

// A single store configured with all slices
export const store = configureStore({
  reducer: {
    cars: carReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

