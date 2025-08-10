import React, { FC } from 'react';
import { cn } from '@app/lib/utils';
import { CarCard } from './CarCard'; // Assuming CarCard component is available
import { CarCardProps } from '@app/types/car';
import { Badge, Card } from '../ui';
import { Gauge, Heart } from 'lucide-react';

const CarGrid: FC<CarCardProps> = ({ car, onClick }) => (
    <Card
        onClick={() => onClick(car)}
        className="flex flex-col h-full cursor-pointer"
    >
        <div className="relative">
            <img
                src={car.imageUrl}
                alt={car?.imageAlt || `${car.year} ${car.make} ${car.carModel}`}
                className="w-full h-48 object-cover rounded-t-xl"
            />
            <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 bg-white rounded-full p-2 text-slate-500 hover:text-red-500 transition-colors"
            >
                <Heart size={16} />
            </button>
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
            <div>
                <h3 className="text-lg font-bold text-slate-900">
                    {car.year} {car.make} {car.carModel}
                </h3>
                <p className="text-xl font-bold text-slate-700 mt-2">
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

export { CarGrid };
