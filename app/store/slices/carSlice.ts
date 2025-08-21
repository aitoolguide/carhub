import { ICar } from '@app/database/models/Car';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface CarState {
    cars: ICar[];
    car: ICar | null; // Assuming you want to keep a single car state
    loading: boolean;
    error: string | null;
    // Add pagination fields to your state interface
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

// Updated initial state
const initialState: CarState = {
    cars: [],
    car: null, // Assuming you want to keep a single car state
    loading: false,
    error: null,
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
};

// Async thunk to fetch a single car by its ID
export const fetchCarById = createAsyncThunk(
    'cars/fetchCarById',
    async (id: string) => {
        const response = await fetch(`/api/cars/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch car with ID: ${id}`);
        }
        const data: ICar = await response.json();
        return data;
    }
);
export interface CarFilters {
    // Array filters
    condition?: string[];
    make?: string[];
    model?: string[];
    bodyType?: string[];
    exteriorColor?: string[];
    interiorColor?: string[];
    drivetrain?: string[];
    fuelType?: string[];
    cylinders?: string[];
    transmission?: string[];
    seats?: string[];
    doors?: string[];
    features?: string[];
    isFeatured?: boolean;
    seller?: string[];

    // Range filters - matching your page's string/number types
    minPrice?: number;
    maxPrice?: number;
    minYear?: string | number;
    maxYear?: string | number;
    minMileage?: number;
    maxMileage?: number;

    // Single value filters
    keyword?: string;
    photos?: boolean;
}

export interface FetchCarsParams {
    page: number;
    limit: number;
    filters: CarFilters;
}

export interface FetchCarsResponse {
    cars: ICar[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export const fetchCars = createAsyncThunk<
    FetchCarsResponse,
    FetchCarsParams,
    { rejectValue: string }
>(
    'cars/fetchCars',
    async (params: FetchCarsParams = { filters: {}, limit: 10, page: 1 }, { rejectWithValue }) => {
        try {
            const { page, limit, filters } = params;
            const queryParams = new URLSearchParams();

            // Add pagination parameters
            queryParams.append('page', page.toString());
            queryParams.append('limit', limit.toString());

            // Helper function to append array parameters
            const appendArrayParam = (key: string, values: string[] | undefined) => {
                if (values && values.length > 0) {
                    values.forEach(value => {
                        if (value.trim()) {
                            queryParams.append(`${key}[]`, value.trim());
                        }
                    });
                }
            };

            // Helper function to append single parameters
            const appendSingleParam = (key: string, value: string | number | boolean | undefined) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value.toString());
                }
            };

            // Append array filters
            appendArrayParam('condition', filters.condition);
            appendArrayParam('make', filters.make);
            appendArrayParam('model', filters.model);
            appendArrayParam('bodyType', filters.bodyType);
            appendArrayParam('exteriorColor', filters.exteriorColor);
            appendArrayParam('interiorColor', filters.interiorColor);
            appendArrayParam('drivetrain', filters.drivetrain);
            appendArrayParam('fuelType', filters.fuelType);
            appendArrayParam('cylinders', filters.cylinders);
            appendArrayParam('transmission', filters.transmission);
            appendArrayParam('seats', filters.seats);
            appendArrayParam('doors', filters.doors);
            appendArrayParam('features', filters.features);
            appendArrayParam('seller', filters.seller);

            // Append range filters with proper type handling
            appendSingleParam('minPrice', filters.minPrice);
            appendSingleParam('maxPrice', filters.maxPrice);

            // Handle year filters that might be strings or numbers
            if (filters.minYear && filters.minYear !== '') {
                const minYear = typeof filters.minYear === 'string' ? parseInt(filters.minYear) : filters.minYear;
                if (!isNaN(minYear)) {
                    queryParams.append('minYear', minYear.toString());
                }
            }
            if (filters.maxYear && filters.maxYear !== '') {
                const maxYear = typeof filters.maxYear === 'string' ? parseInt(filters.maxYear) : filters.maxYear;
                if (!isNaN(maxYear)) {
                    queryParams.append('maxYear', maxYear.toString());
                }
            }

            appendSingleParam('minMileage', filters.minMileage);
            appendSingleParam('maxMileage', filters.maxMileage);

            // Append single value filters
            appendSingleParam('keyword', filters.keyword);
            if (filters.photos === true) {
                queryParams.append('photos', 'true');
            }

            const response = await fetch(`/api/cars?${queryParams.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data: FetchCarsResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch cars:', error);
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to fetch cars with filters'
            );
        }
    }
);

// Helper function to build filter object from URL search params (useful for initial page load)
export const buildFiltersFromSearchParams = (searchParams: URLSearchParams): CarFilters => {
    const filters: CarFilters = {};

    // Array filters
    const arrayFilters = [
        'condition', 'make', 'model', 'bodyType', 'exteriorColor', 'interiorColor',
        'drivetrain', 'fuelType', 'cylinders', 'transmission', 'seats', 'doors',
        'features', 'seller'
    ];

    arrayFilters.forEach(filter => {
        const values = searchParams.getAll(`${filter}[]`);
        if (values.length > 0) {
            (filters as any)[filter] = values;
        }
    });

    // Range filters
    const rangeFilters = [
        'minPrice', 'maxPrice', 'minYear', 'maxYear', 'minMileage', 'maxMileage'
    ];

    rangeFilters.forEach(filter => {
        const value = searchParams.get(filter);
        if (value && !isNaN(parseInt(value))) {
            (filters as any)[filter] = parseInt(value);
        }
    });

    // Single value filters
    const keyword = searchParams.get('keyword');
    if (keyword) {
        filters.keyword = keyword;
    }

    const photos = searchParams.get('photos');
    if (photos === 'true') {
        filters.photos = true;
    }

    return filters;
};

// Helper function to clear empty filters
export const cleanFilters = (filters: CarFilters): CarFilters => {
    const cleaned: CarFilters = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const nonEmptyValues = value.filter(v => v && v.trim());
            if (nonEmptyValues.length > 0) {
                (cleaned as any)[key] = nonEmptyValues;
            }
        } else if (value !== undefined && value !== null && value !== '') {
            (cleaned as any)[key] = value;
        }
    });

    return cleaned;
};
// Async thunk to fetch all cars from the API
// export const fetchCars = createAsyncThunk(
//     'cars/fetchCars',
//     async (
//         params: FetchCarsParams = { filters: {}, limit: 10, page: 1 }
//     ) => {
//         const { page, limit, filters } = params;
//         const queryParams = new URLSearchParams();
//         queryParams.append('page', page.toString());
//         queryParams.append('limit', limit.toString());

//         // Append filters to the query string
//         Object.entries(filters).forEach(([key, value]) => {
//             if (Array.isArray(value)) {
//                 value.forEach(item => queryParams.append(`${key}[]`, item));
//             } else if (value) {
//                 queryParams.append(key, value.toString());
//             }
//         });

//         const response = await fetch(`/api/cars?${queryParams.toString()}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch cars with filters');
//         }
//         const data: ICar[] = await response.json();
//         return data;
//     }
// );

// Async thunk to create a new car
export const createCar = createAsyncThunk(
    'cars/createCar',
    async (newCar: Partial<ICar>) => {
        const response = await fetch('/api/cars/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCar),
        });
        if (!response.ok) {
            throw new Error('Failed to create car');
        }
        const data: ICar = await response.json();
        return data;
    }
);

// Async thunk to update an existing car
export const updateCar = createAsyncThunk(
    'cars/updateCar',
    async (updatedCar: ICar) => {
        const response = await fetch(`/api/cars/${updatedCar._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        });
        if (!response.ok) {
            throw new Error('Failed to update car');
        }
        const data: ICar = await response.json();
        return data;
    }
);

// Async thunk to delete a car
export const deleteCar = createAsyncThunk(
    'cars/deleteCar',
    async (carId: string) => {
        const response = await fetch(`/api/car/${carId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete car');
        }
        return carId; // Return the ID of the deleted car
    }
);

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchCarById lifecycle
            .addCase(fetchCarById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarById.fulfilled, (state, action: PayloadAction<ICar>) => {
                state.loading = false;
                state.car = action.payload;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch car';
            })
            // Handle fetchCars lifecycle
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action: PayloadAction<FetchCarsResponse>) => {
                state.loading = false;
                state.error = null;

                // Handle both old and new response formats for backward compatibility
                if (action.payload.cars) {
                    // New response format with pagination
                    state.cars = action.payload.cars;
                    state.totalCount = action.payload.totalCount;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.currentPage;
                    state.hasNextPage = action.payload.hasNextPage;
                    state.hasPrevPage = action.payload.hasPrevPage;
                } else {
                    // Old response format (direct array)
                    state.cars = Array.isArray(action.payload) ? action.payload : [];
                    state.totalCount = state.cars.length;
                    state.totalPages = 1;
                    state.currentPage = 1;
                    state.hasNextPage = false;
                    state.hasPrevPage = false;
                }
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            })
            // Handle createCar lifecycle
            .addCase(createCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCar.fulfilled, (state, action: PayloadAction<ICar>) => {
                state.loading = false;
                state.cars.push(action.payload);
            })
            .addCase(createCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create car';
            })
            // Handle updateCar lifecycle
            .addCase(updateCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCar.fulfilled, (state, action: PayloadAction<ICar>) => {
                state.loading = false;
                const index = state.cars.findIndex(car => car._id === action.payload._id);
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update car';
            })
            // Handle deleteCar lifecycle
            .addCase(deleteCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCar.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.cars = state.cars.filter(car => car._id !== action.payload);
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete car';
            });
    },
});

export default carSlice.reducer;
