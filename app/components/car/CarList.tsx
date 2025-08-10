import React, { FC } from 'react';
import { Car, Fuel, Gauge, MapPin, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

import { CarCardProps, ICar } from '@app/types/car';

// Car Card for List View
const CarList: FC<CarCardProps> = ({ car, onClick }) => (
    <Card
        onClick={() => onClick(car)}
        className="flex flex-col sm:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
        <div className="w-full sm:w-1/3 flex-shrink-0 relative">
            <img
                src={car.imageUrl}
                alt={car?.imageAlt || `${car.year} ${car.make} ${car.carModel}`}
                className="w-full h-48 sm:h-full object-cover"
            />
            <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 left-2 bg-white rounded-full p-2 text-slate-500 hover:text-red-500 transition-colors"
            >
                <Heart size={16} />
            </button>
        </div>
        <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-slate-900">
                    {car.year} {car.make} {car.carModel}
                </h3>
                <p className="text-2xl font-bold text-slate-700 mt-2">
                    ${car.price.toLocaleString('en-US')}
                </p>
                <div className="flex items-center mt-2 text-sm text-slate-500">
                    <Gauge size={14} className="mr-1" />
                    <span>{car.mileage?.toLocaleString('en-US')} km</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{car.drivetrain}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
                {car.isGoodDeal && (
                    <Badge className="bg-green-100 text-green-700">Good Deal</Badge>
                )}
                <Badge className="bg-slate-100 text-slate-700">{car.dealerName}</Badge>
            </div>
        </div>
    </Card>
);

export { CarList };
