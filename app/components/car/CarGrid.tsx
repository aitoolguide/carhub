import React, { FC } from 'react';
import { cn } from '@app/lib/utils';
import { CarCardProps } from '@app/types/car';
import { Badge, Card } from '../ui';
import {
  Gauge,
  Heart,
  Fuel,
  Settings,
  MapPin,
  Camera,
  CheckCircle2,
  Sparkles,
  Clock,
} from 'lucide-react';

const formatPrice = (price: number) =>
  price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const CarGrid: FC<CarCardProps> = ({ car, onClick }) => {
  const photoCount =
    (car.images && car.images.length) ||
    (car.thumbnailUrls && car.thumbnailUrls.length) ||
    0;

  return (
    <Card
      onClick={() => onClick(car)}
      className="group flex flex-col h-full cursor-pointer hover:shadow-xl transition-shadow duration-200"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={car.imageUrl || car.image || '/placeholder.jpg'}
          alt={car?.imageAlt || `${car.year} ${car.make} ${car.carModel}`}
          className="w-full h-52 object-cover rounded-t-xl transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />

        {/* Photo count overlay */}
        {photoCount > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Camera size={12} className="mr-1" />
            {photoCount} photos
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white rounded-full p-2 text-slate-500 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart size={16} />
        </button>

        {/* Featured or Good Deal badge */}
        {car.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-400 text-black font-bold shadow-sm">
            Featured
          </Badge>
        )}
        {!car.isFeatured && car.isGoodDeal && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white font-semibold shadow-sm">
            Good Deal
          </Badge>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Title + Price */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">
            {car.year} {car.make} {car.carModel}
          </h3>
          {car.trim && <p className="text-sm text-slate-600">{car.trim}</p>}
          <p className="text-xl font-bold text-teal-700 mt-2">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-600 mt-3">
          {car.mileage && (
            <div className="flex items-center">
              <Gauge size={12} className="mr-1 text-slate-500" />
              {car.mileage.toLocaleString()} km
            </div>
          )}
          {car.transmission && (
            <div className="flex items-center">
              <Settings size={12} className="mr-1 text-slate-500" />
              {car.transmission}
            </div>
          )}
          {car.fuelType && (
            <div className="flex items-center">
              <Fuel size={12} className="mr-1 text-slate-500" />
              {car.fuelType}
            </div>
          )}
          {car.location && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1 text-slate-500" />
              {car.location}
            </div>
          )}
          {car.hybrid !== undefined && (
            <div className="flex items-center">
              <Fuel size={12} className="mr-1 text-slate-500" />
              {car.hybrid ? 'Hybrid' : 'Non-Hybrid'}
            </div>
          )}
          {car.horsepower && (
            <div className="flex items-center">
              <Settings size={12} className="mr-1 text-slate-500" />
              {car.horsepower}
            </div>
          )}
          {car.sellerType && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1 text-slate-500" />
              {car.sellerType}
            </div>
          )}
          {car.warranty && (
            <div className="flex items-center">
              <CheckCircle2 size={12} className="mr-1 text-slate-500" />
              {car.warranty}
            </div>
          )}
          {car.steeringSide && (
            <div className="flex items-center">
              <Settings size={12} className="mr-1 text-slate-500" />
              {car.steeringSide}
            </div>
          )}
        </div>

        {/* Bottom Meta */}
        <div className="flex justify-between items-center mt-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            {car.condition && (
              <Badge className="bg-slate-100 text-slate-700">
                {car.condition}
              </Badge>
            )}
            {car.isVerified && (
              <span className="flex items-center text-green-600 font-semibold">
                <CheckCircle2 size={12} className="mr-1" /> Verified
              </span>
            )}
          </div>
          {car.createdAt && (
            <div className="flex items-center text-slate-400">
              <Clock size={12} className="mr-1" />
              {new Date(car.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Dealer info */}
        <div className="mt-3 border-t border-slate-200 pt-2 flex justify-between items-center">
          <p className="text-xs text-slate-600 truncate">
            {car.dealerName || 'Private Seller'}
          </p>
          {car.isFeatured && <Sparkles size={14} className="text-yellow-500" />}
        </div>
      </div>
    </Card>
  );
};

export { CarGrid };
