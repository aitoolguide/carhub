import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../types/car';
import { mockCars } from '@app/data/cars';

interface CarState {
    cars: ICar[];
    loading: boolean;
    error: string | null;
}

const initialState: CarState = {
    cars: [],
    loading: false,
    error: null,
};

// Async thunk to fetch cars
export const fetchCars = createAsyncThunk(
    'cars/fetchCars',
    async () => {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/cars');
        // if (!response.ok) throw new Error('Failed to fetch cars');
        // const data = await response.json();

        // Mock data for demonstration
        

        return mockCars;
    }
);

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action: PayloadAction<ICar[]>) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            });
    },
});

export default carSlice.reducer;