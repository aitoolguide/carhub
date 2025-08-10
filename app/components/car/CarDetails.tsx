import React, { FC, ReactNode } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

import { Badge, Car, Check, ChevronLeft, Fuel, Gauge, Heart, MapPin, Settings, Share2 } from 'lucide-react';
import { CarGallery } from './CarGallery';
import { CarFeatures } from './CarFeatures';
import { CarSpecifications } from './CarSpecifications';
import { CarDetailProps } from '@app/types/car';


const CarDetails: FC<CarDetailProps> = ({ car, onBackClick }) => (
    <div className="min-h-screen bg-slate-50 antialiased font-sans text-slate-800 p-8">
        <Button onClick={onBackClick} variant="outline" className="mb-6">
            <ChevronLeft size={20} className="mr-2" />
            Back to Listings
        </Button>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <img src={car.imageUrl} alt={`${car.year} ${car.make} ${car.model}`} className="w-full h-96 object-cover rounded-xl shadow-md" />
                </div>
                <div className="md:w-1/3">
                    <h1 className="text-3xl font-bold text-slate-900">{car.year} {car.make} {car.model}</h1>
                    <p className="text-4xl font-black text-blue-600 mt-2">${car.price.toLocaleString('en-US')}</p>
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        {car.isGoodDeal && <Badge className="bg-green-100 text-green-700">Good Deal</Badge>}
                        <Badge className="bg-slate-100 text-slate-700">{car.condition}</Badge>
                        <Badge className="bg-slate-100 text-slate-700">{car.bodyType}</Badge>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center text-slate-700">
                            <MapPin size={20} className="mr-2 text-blue-600" />
                            <span>{car.location}</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Gauge size={20} className="mr-2 text-blue-600" />
                            <span>{car.mileage?.toLocaleString('en-US')} km</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Car size={20} className="mr-2 text-blue-600" />
                            <span>{car.drivetrain}</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Fuel size={20} className="mr-2 text-blue-600" />
                            <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Settings size={20} className="mr-2 text-blue-600" />
                            <span>{car.transmission}</span>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Button className="flex-1">Contact Seller</Button>
                        <Button variant="outline" className="p-3">
                            <Heart size={20} />
                        </Button>
                        <Button variant="outline" className="p-3">
                            <Share2 size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Key Features</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {car.features?.map(feature => (
                        <div key={feature} className="flex items-center bg-gray-50 p-3 rounded-lg text-slate-700">
                            <Check size={18} className="mr-2 text-green-500" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
export { CarDetails };
