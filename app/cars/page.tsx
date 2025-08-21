
'use client';

import React, { useState, useEffect, ReactNode, MouseEventHandler, SelectHTMLAttributes, FC, useMemo } from 'react';
import {
    Search,
    SlidersHorizontal,
    List,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Circle,
    LucideLayoutGrid,
} from 'lucide-react';
import { cn } from '@app/lib/utils';
import { useRouter } from 'next/navigation';
import { CarList } from '@app/components/car/CarList';
import { CarGrid } from '@app/components/car/CarGrid';
import { CarDetails } from '@app/components/car/CarDetails';
import { Card } from '@app/components/ui';
import { CarFilters } from '@app/components/car/CarFilters';
import { CarCheckboxFilterGroup } from '@app/components/car/CarCheckboxFilterGroup';
import { AppDispatch, RootState } from '@app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, createCar, updateCar, deleteCar } from '@app/store/slices/carSlice';
import { ICar } from '@app/database/models/Car';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button = ({
    children,
    className,
    onClick,
    disabled = false,
    variant = 'primary'
}: ButtonProps) => {
    const baseStyles =
        'px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md flex items-center justify-center';
    const variants = {
        primary: 'bg-teal-600 text-white hover:bg-teal-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        outline: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
    className?: string;
}

const Select = ({ children, className = '', ...props }: SelectProps) => {
    const baseStyles =
        'block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md';
    return (
        <div className="relative">
            <select className={cn(baseStyles, className)} {...props}>
                {children}
            </select>
            <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
        </div>
    );
};




const getAvailableYears = (cars:ICar[]) => {
    const years = cars
        .map(car => car.year ?? null)
        .filter((y): y is number => y !== null);

    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return uniqueYears;
};




// Promo Card
const PromoCard = () => (
    <Card className="flex flex-col items-center justify-center bg-blue-500 text-white p-6 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-90"></div>
        <div className="relative z-10 text-center">
            <h3 className="text-2xl font-black leading-tight">Ford Employee Pricing</h3>
            <p className="mt-2 text-sm font-semibold">GET YOURS NOW!</p>
            <div className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full mt-4 inline-block">
                Call us to get your price NOW!
            </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 rounded-full blur-xl animate-pulse"></div>
    </Card>
);

interface ActiveFilters {
    condition: string[];
    make: string[];
    model: string[];
    bodyType: string[];
    drivetrain: string[];
    fuelType: string[];
    cylinders: string[];
    transmission: string[];
    seats: string[];
    doors: string[];
    features: string[];
    exteriorColor: string[];
    interiorColor: string[];
    seller: string[];
    keyword?: string;
    minYear?: string;
    maxYear?: string;
    minPrice: number;
    maxPrice: number;
    minMileage: number;
    maxMileage: number;
    photos?: boolean;
}


// Main App component
export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading, error } = useSelector((state: RootState) => state.cars);
    type FilterKey =
        | 'location' | 'condition' | 'makeModel' | 'year' | 'price'
        | 'bodyType' | 'exteriorColor' | 'interiorColor' | 'mileage'
        | 'drivetrain' | 'fuelType' | 'cylinders' | 'transmission'
        | 'seats' | 'doors' | 'features' | 'seller' | 'photos' | 'keyword';

    const [filterStates, setFilterStates] = useState<Record<FilterKey, boolean>>({
        location: true, condition: true, makeModel: true, year: true, price: true,
        bodyType: false, exteriorColor: false, interiorColor: false, mileage: false,
        drivetrain: false, fuelType: false, cylinders: false, transmission: false,
        seats: false, doors: false, features: false, seller: false, photos: false,
        keyword: false,
    });
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        condition: [], make: [], model: [], minYear: '', maxYear: '',
        minPrice: 0, maxPrice: 100000, bodyType: [], exteriorColor: [],
        interiorColor: [], minMileage: 0, maxMileage: 200000, drivetrain: [],
        fuelType: [], cylinders: [], transmission: [], seats: [], doors: [],
        features: [], seller: [], photos: false, keyword: '',
    });
    const [sortOrder, setSortOrder] = useState('default');
    const [displayCount, setDisplayCount] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState('grid'); // 'grid' or 'list'
    const [selectedCar, setSelectedCar] = useState(null);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const router = useRouter();
    const toggleCarFilters = (filter: FilterKey) => {
        setFilterStates(prev => ({ ...prev, [filter]: !prev[filter] }));
    };

    const handleCheckboxChange = (filterName: string, value: string) => {
        setActiveFilters(prev => {
            const currentValues = prev[filterName as keyof ActiveFilters] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [filterName]: newValues };
        });
    };

    const clearFilters = () => {
        setActiveFilters({
            condition: [], make: [], model: [], minYear: '', maxYear: '',
            minPrice: 0, maxPrice: 100000, bodyType: [], exteriorColor: [],
            interiorColor: [], minMileage: 0, maxMileage: 200000, drivetrain: [],
            fuelType: [], cylinders: [], transmission: [], seats: [], doors: [],
            features: [], seller: [], photos: false, keyword: '',
        });
    };

    const availableFilters = {
        condition: [{ label: 'Certified Pre-Owned', count: 1 }, { label: 'Used', count: 11 }, { label: 'New', count: 1 }],
        bodyType: [{ label: 'SUV', count: 7 }, { label: 'Hatchback', count: 1 }, { label: 'Truck', count: 2 }, { label: 'Sedan', count: 2 }],
        exteriorColor: [{ label: 'Black', count: 3 }, { label: 'White', count: 4 }, { label: 'Blue', count: 2 }, { label: 'Silver', count: 4 }, { label: 'Red', count: 1 }],
        interiorColor: [{ label: 'Black', count: 8 }, { label: 'Grey', count: 3 }, { label: 'Beige', count: 2 }],
        drivetrain: [{ label: 'All Wheel Drive', count: 6 }, { label: 'All-Wheel Drive', count: 2 }, { label: 'Front-Wheel Drive', count: 3 }, { label: 'Four-Wheel Drive', count: 2 }],
        fuelType: [{ label: 'Gasoline', count: 11 }],
        cylinders: [{ label: '4 Cylinders', count: 4 }, { label: '6 Cylinders', count: 3 }, { label: '8 Cylinders', count: 2 }],
        transmission: [{ label: 'Automatic', count: 9 }, { label: 'Manual', count: 1 }],
        doors: [{ label: '4 doors', count: 10 }],
        seats: [{ label: '4 seats', count: 1 }, { label: '5 seats', count: 9 }],
        features: [{ label: 'Bluetooth', count: 4 }, { label: 'Backup Camera', count: 3 }, { label: 'Heated Seats', count: 2 }, { label: 'Adaptive Cruise Control', count: 2 }],
        sellerType: [{ label: 'Dealer', count: 12 }],
    };

    // Filter cars based on active filters
    const filteredCars = cars.filter(car => {
        if (car.type === 'promo') return true; // Always show promo card

        // Condition filter
        if (activeFilters.condition.length > 0 && (!car.condition || !activeFilters.condition.includes(car.condition))) return false;

        // Make & Model filter
        if (activeFilters.make.length > 0 && !activeFilters.make.includes(car.make)) return false;
        if (activeFilters.model.length > 0 && !activeFilters.model.includes(car.model)) return false;

        // Year filter
        if (activeFilters.minYear && car.year < parseInt(activeFilters.minYear)) return false;
        if (activeFilters.maxYear && car.year > parseInt(activeFilters.maxYear)) return false;

        // Price filter
        if (car.price < activeFilters.minPrice || car.price > activeFilters.maxPrice) return false;

        // Body Type filter
        if (activeFilters.bodyType.length > 0 && (!car.bodyType || !activeFilters.bodyType.includes(car.bodyType))) return false;

        // Mileage filter
        if (
            typeof car.mileage !== 'number' ||
            car.mileage < activeFilters.minMileage ||
            car.mileage > activeFilters.maxMileage
        ) return false;

        // Drivetrain filter
        if (activeFilters.drivetrain.length > 0 && (!car.drivetrain || !activeFilters.drivetrain.includes(car.drivetrain))) return false;

        // Fuel Type filter
        if (activeFilters.fuelType.length > 0 && (!car.fuelType || !activeFilters.fuelType.includes(car.fuelType))) return false;

        // Cylinders filter
        if (activeFilters.cylinders.length > 0 && !activeFilters.cylinders.includes(`${car.cylinders} Cylinders`)) return false;

        // Transmission filter
        if (activeFilters.transmission.length > 0 && (!car.transmission || !activeFilters.transmission.includes(car.transmission))) return false;

        // Seats filter
        if (activeFilters.seats.length > 0 && !activeFilters.seats.includes(`${car.seats} seats`)) return false;

        // Doors filter
        if (activeFilters.doors.length > 0 && !activeFilters.doors.includes(`${car.doors} doors`)) return false;

        // Features filter
        if (
            activeFilters.features.length > 0 &&
            !activeFilters.features.every(feature => car.features?.includes(feature))
        ) return false;

        // Keyword search
        if (activeFilters.keyword) {
            const keyword = activeFilters.keyword.toLowerCase();
            const carDataString = JSON.stringify(car).toLowerCase();
            if (!carDataString.includes(keyword)) {
                return false;
            }
        }

        return true;
    });

    // Sort cars based on sort order
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (a.type === 'promo') return -1; // Keep promo cards at the top
        if (b.type === 'promo') return 1;

        switch (sortOrder) {
            case 'lowest_price':
                return a.price - b.price;
            case 'highest_price':
                return b.price - a.price;
            case 'lowest_mileage':
                return (a.mileage ?? 0) - (b.mileage ?? 0);
            case 'highest_mileage':
                return (b.mileage ?? 0) - (a.mileage ?? 0);
            case 'newest_year':
                return b.year - a.year;
            case 'oldest_year':
                return a.year - b.year;
            default:
                return 0;
        }
    });

    const totalResults = sortedCars.filter(car => car.type !== 'promo').length;
    const totalPages = Math.ceil(totalResults / displayCount);
    const paginatedCars = sortedCars.slice((currentPage - 1) * displayCount, currentPage * displayCount);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Reset page when filters or sort order changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters, sortOrder, displayCount]);
    
    // Option 2: Even more efficient - using useMemo for serialization
const serializedActiveFilters = useMemo(() => JSON.stringify(activeFilters), [activeFilters]);
const serializedFilterStates = useMemo(() => JSON.stringify(filterStates), [filterStates]);

useEffect(() => {
    const filters = activeFilters; // Use activeFilters directly

    dispatch(fetchCars({ filters, limit: displayCount, page: currentPage })).then(() => {
        setAvailableYears(getAvailableYears(cars));
    });
}, [
    dispatch, 
    displayCount, 
    currentPage,
    serializedActiveFilters,
    serializedFilterStates,
]);
    // Main render logic
    if (selectedCar) {
        return <CarDetails car={selectedCar} onBackClick={() => setSelectedCar(null)} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 antialiased font-sans text-slate-800">
            {/* <script src="https://cdn.tailwindcss.com"></script> */}
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Sidebar - Filters */}
                <div className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold flex items-center">
                            <SlidersHorizontal size={20} className="mr-2" />
                            Filters
                        </h2>
                        <Button variant="outline" onClick={clearFilters} className="text-xs">Clear</Button>
                    </div>
                    <div className="h-[calc(100vh-64px)] overflow-y-auto">
                        <CarFilters title="Location" open={filterStates.location} onToggle={() => toggleCarFilters('location')}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="City or postal code"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Circle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <Select>
                                    <option>Any</option>
                                    <option>10 km</option>
                                    <option>25 km</option>
                                    <option>50 km</option>
                                </Select>
                            </div>
                        </CarFilters>
                        <CarFilters title="Condition" open={filterStates.condition} onToggle={() => toggleCarFilters('condition')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.condition}
                                selectedItems={activeFilters.condition}
                                onToggle={(label) => handleCheckboxChange('condition', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Make & Model" open={filterStates.makeModel} onToggle={() => toggleCarFilters('makeModel')}>
                            <div className="space-y-4">
                                <Select value={activeFilters.make[0] || ''} onChange={(e) => setActiveFilters(prev => ({ ...prev, make: e.target.value ? [e.target.value] : [] }))}>
                                    <option value="">Select Makes</option>
                                    {['Ford', 'Honda', 'Mitsubishi', 'Mercedes-Benz', 'BMW', 'Subaru', 'GMC'].map(make => <option key={make} value={make}>{make}</option>)}
                                </Select>
                                <Select value={activeFilters.model[0] || ''} onChange={(e) => setActiveFilters(prev => ({ ...prev, model: e.target.value ? [e.target.value] : [] }))}>
                                    <option value="">Select Models</option>
                                    {['Escape', 'CR-V', 'Civic Type R', 'Eclipse Cross', 'RVR', 'CLA-Class', '5 Series', 'Forester', 'F-150', 'GLC-Class', 'GLE-Class', 'Sierra 1500'].map(model => <option key={model} value={model}>{model}</option>)}
                                </Select>
                            </div>
                        </CarFilters>
                        <CarFilters title="Year" open={filterStates.year} onToggle={() => toggleCarFilters('year')}>
                            <div className="flex space-x-2">
                                <Select
                                    className="flex-1"
                                    value={activeFilters.minYear}
                                    onChange={(e) => setActiveFilters(prev => ({ ...prev, minYear: e.target.value }))}
                                >
                                    <option value="">Min Year</option>
                                    {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                                </Select>
                                <span>to</span>
                                <Select
                                    className="flex-1"
                                    value={activeFilters.maxYear}
                                    onChange={(e) => setActiveFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                                >
                                    <option value="">Max Year</option>
                                    {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                                </Select>
                            </div>
                        </CarFilters>
                        <CarFilters title="Price ($)" open={filterStates.price} onToggle={() => toggleCarFilters('price')}>
                            <p className="text-sm font-semibold">${activeFilters.minPrice.toLocaleString('en-US')} - ${activeFilters.maxPrice.toLocaleString('en-US')}</p>
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={activeFilters.minPrice}
                                onChange={(e) => setActiveFilters(prev => ({ ...prev, minPrice: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={activeFilters.maxPrice}
                                onChange={(e) => setActiveFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </CarFilters>
                        <CarFilters title="Body Type" open={filterStates.bodyType} onToggle={() => toggleCarFilters('bodyType')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.bodyType}
                                selectedItems={activeFilters.bodyType}
                                onToggle={(label) => handleCheckboxChange('bodyType', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Exterior Colour" open={filterStates.exteriorColor} onToggle={() => toggleCarFilters('exteriorColor')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.exteriorColor}
                                selectedItems={activeFilters.exteriorColor}
                                onToggle={(label) => handleCheckboxChange('exteriorColor', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Interior Colour" open={filterStates.interiorColor} onToggle={() => toggleCarFilters('interiorColor')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.interiorColor}
                                selectedItems={activeFilters.interiorColor}
                                onToggle={(label) => handleCheckboxChange('interiorColor', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Mileage" open={filterStates.mileage} onToggle={() => toggleCarFilters('mileage')}>
                            <p className="text-sm font-semibold">{activeFilters.minMileage.toLocaleString('en-US')} km - {activeFilters.maxMileage.toLocaleString('en-US')} km</p>
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                step="5000"
                                value={activeFilters.minMileage}
                                onChange={(e) => setActiveFilters(prev => ({ ...prev, minMileage: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                step="5000"
                                value={activeFilters.maxMileage}
                                onChange={(e) => setActiveFilters(prev => ({ ...prev, maxMileage: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </CarFilters>
                        <CarFilters title="Drivetrain" open={filterStates.drivetrain} onToggle={() => toggleCarFilters('drivetrain')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.drivetrain}
                                selectedItems={activeFilters.drivetrain}
                                onToggle={(label) => handleCheckboxChange('drivetrain', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Fuel Type" open={filterStates.fuelType} onToggle={() => toggleCarFilters('fuelType')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.fuelType}
                                selectedItems={activeFilters.fuelType}
                                onToggle={(label) => handleCheckboxChange('fuelType', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Number of cylinders" open={filterStates.cylinders} onToggle={() => toggleCarFilters('cylinders')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.cylinders}
                                selectedItems={activeFilters.cylinders}
                                onToggle={(label) => handleCheckboxChange('cylinders', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Transmission" open={filterStates.transmission} onToggle={() => toggleCarFilters('transmission')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.transmission}
                                selectedItems={activeFilters.transmission}
                                onToggle={(label) => handleCheckboxChange('transmission', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Number of seats" open={filterStates.seats} onToggle={() => toggleCarFilters('seats')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.seats}
                                selectedItems={activeFilters.seats}
                                onToggle={(label) => handleCheckboxChange('seats', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Number of doors" open={filterStates.doors} onToggle={() => toggleCarFilters('doors')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.doors}
                                selectedItems={activeFilters.doors}
                                onToggle={(label) => handleCheckboxChange('doors', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Features" open={filterStates.features} onToggle={() => toggleCarFilters('features')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.features}
                                selectedItems={activeFilters.features}
                                onToggle={(label) => handleCheckboxChange('features', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Seller Type" open={filterStates.seller} onToggle={() => toggleCarFilters('seller')}>
                            <CarCheckboxFilterGroup
                                items={availableFilters.sellerType}
                                selectedItems={activeFilters.seller}
                                onToggle={(label) => handleCheckboxChange('seller', label)}
                            />
                        </CarFilters>
                        <CarFilters title="Photos" open={filterStates.photos} onToggle={() => toggleCarFilters('photos')}>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                        checked={activeFilters.photos}
                                        onChange={() => setActiveFilters(prev => ({ ...prev, photos: !prev.photos }))}
                                    />
                                    Hide vehicles without photos
                                </label>
                            </div>
                        </CarFilters>
                        <CarFilters title="Keyword Search" open={filterStates.keyword} onToggle={() => toggleCarFilters('keyword')}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter Keywords"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={activeFilters.keyword}
                                    onChange={(e) => setActiveFilters(prev => ({ ...prev, keyword: e.target.value }))}
                                />
                                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </CarFilters>
                    </div>
                </div>

                {/* Right Content Area - Car Listings */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
                        <h1 className="text-lg font-bold text-slate-900">
                            {totalResults} Used Cars for sale
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-slate-700">Sort:</span>
                                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-40">
                                    <option value="default">Default</option>
                                    <option value="lowest_price">Lowest price first</option>
                                    <option value="highest_price">Highest price first</option>
                                    <option value="lowest_mileage">Lowest mileage first</option>
                                    <option value="highest_mileage">Highest mileage first</option>
                                    <option value="newest_year">Newest first (by car year)</option>
                                    <option value="oldest_year">Oldest first (by car year)</option>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-slate-700">Display:</span>
                                <Select value={displayCount} onChange={(e) => setDisplayCount(parseInt(e.target.value))} className="w-20">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button onClick={() => setView('list')} variant="outline" className={cn("p-2", view === 'list' && 'bg-blue-600 text-white')}>
                                    <List size={20} />
                                </Button>
                                <Button onClick={() => setView('grid')} variant="outline" className={cn("p-2", view === 'grid' && 'bg-blue-600 text-white')}>
                                    <LucideLayoutGrid size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Car Listings */}
                    <div className={cn("gap-6", view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col")}>
                        {paginatedCars.map((car) =>
                            car.type === 'car' ? (view === 'grid' ? <CarGrid key={car._id} car={car} onClick={() => { router.push(`/cars/${car._id}`) }} /> : <CarList key={car._id} car={car} onClick={() => { router.push(`/cars/${car._id}`) }} />) : <PromoCard key={car._id} />
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline" className="p-2">
                                <ChevronLeft size={20} />
                            </Button>
                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    variant={currentPage === index + 1 ? 'primary' : 'outline'}
                                    className="w-10 h-10"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline" className="p-2">
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
