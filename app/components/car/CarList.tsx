import React, { FC } from 'react';
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
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CarCardProps } from '@app/types/car';

const formatPrice = (price: number) =>
  price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const CarList: FC<CarCardProps> = ({ car, onClick }) => {
  const photoCount =
    (car.images && car.images.length) ||
    (car.thumbnailUrls && car.thumbnailUrls.length) ||
    0;

  return (
    <Card
      onClick={() => onClick(car)}
      className="flex flex-col sm:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Image Section */}
      <div className="w-full sm:w-1/3 flex-shrink-0 relative">
        <img
          src={car.imageUrl || car.image || '/placeholder.jpg'}
          alt={car?.imageAlt || `${car.year} ${car.make} ${car.carModel}`}
          className="w-full h-48 sm:h-full object-cover"
        />

        {/* Favorite button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 left-2 bg-white rounded-full p-2 text-slate-500 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart size={16} />
        </button>

        {/* Featured / Good Deal Badge */}
        {car.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-black font-bold shadow-sm">
            Featured
          </Badge>
        )}
        {!car.isFeatured && car.isGoodDeal && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white font-semibold shadow-sm">
            Good Deal
          </Badge>
        )}

        {/* Photo count */}
        {photoCount > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Camera size={12} className="mr-1" />
            {photoCount} photos
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        {/* Title + Price */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {car.year} {car.make} {car.carModel}
          </h3>
          {car.trim && <p className="text-sm text-slate-600">{car.trim}</p>}
          <p className="text-2xl font-bold text-teal-700 mt-2">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Quick Specs */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
          {car.mileage && (
            <div className="flex items-center">
              <Gauge size={14} className="mr-1" />
              {car.mileage.toLocaleString()} km
            </div>
          )}
          {car.transmission && (
            <div className="flex items-center">
              <Settings size={14} className="mr-1" />
              {car.transmission}
            </div>
          )}
          {car.fuelType && (
            <div className="flex items-center">
              <Fuel size={14} className="mr-1" />
              {car.fuelType}
            </div>
          )}
          {car.location && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {car.location}
            </div>
          )}

          {/* Newly added attributes */}
          {car.hybrid !== undefined && (
            <div className="flex items-center">
              <Fuel size={14} className="mr-1" />
              {car.hybrid ? 'Hybrid' : 'Non-Hybrid'}
            </div>
          )}
          {car.horsepower && (
            <div className="flex items-center">
              <Settings size={14} className="mr-1" />
              {car.horsepower}
            </div>
          )}
          {car.sellerType && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {car.sellerType}
            </div>
          )}
          {car.warranty && (
            <div className="flex items-center">
              <CheckCircle2 size={14} className="mr-1" />
              {car.warranty}
            </div>
          )}
          {car.steeringSide && (
            <div className="flex items-center">
              <Settings size={14} className="mr-1" />
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

        {/* Dealer Info */}
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

export { CarList };
