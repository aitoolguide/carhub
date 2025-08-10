import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../types/car';

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
        const mockCars: ICar[] = [
            {
                _id: '1',
                make: 'Tesla',
                carModel: 'Model S',
                year: 2023,
                price: 80000,
                description: 'A fast and luxurious electric sedan.',
                images: [
                    'https://placehold.co/600x400/E2E8F0/374151?text=Tesla+Model+S'
                ],
                category: 'electric',
                specifications: new Map([
                    ['Battery', '100 kWh'],
                    ['Range', '396 miles'],
                    ['Top Speed', '200 mph'],
                    ['0-60 mph', '1.99 seconds']
                ]),
                features: ['Autopilot', 'Full Self-Driving'],
                isFeatured: true,
                isSold: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '2',
                make: 'Ford',
                carModel: 'Mustang',
                year: 2022,
                price: 45000,
                description:
                    'An iconic American muscle car with a powerful engine.',
                images: [
                    'https://placehold.co/600x400/E2E8F0/374151?text=Ford+Mustang'
                ],
                category: 'sports-car',
                specifications: new Map([
                    ['Engine', '5.0L V8'],
                    ['Horsepower', '450 hp'],
                    ['Top Speed', '155 mph'],
                    ['0-60 mph', '4.2 seconds']
                ]),
                features: ['Limited-slip differential', 'Track Apps'],
                isFeatured: false,
                isSold: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '3',
                make: 'Toyota',
                carModel: 'Corolla Hybrid',
                year: 2024,
                price: 25000,
                description: 'A reliable and fuel-efficient hybrid sedan.',
                images: [
                    'https://placehold.co/600x400/E2E8F0/374151?text=Toyota+Corolla+Hybrid'
                ],
                category: 'hybrid',
                specifications: new Map([
                    ['Engine', '1.8L Hybrid'],
                    ['Horsepower', '121 hp'],
                    ['Fuel Economy', '52 mpg'],
                    ['Range', '600 miles']
                ]),
                features: ['Adaptive Cruise Control', 'Lane Keep Assist'],
                isFeatured: false,
                isSold: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

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