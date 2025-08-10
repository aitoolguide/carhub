import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card } from '@app/components/ui';
import { ICar } from '@app/types/car';

interface Car {
  id: string;
  title: string;
  price: number;
  location: string;
  year: number;
  type: string;
  imageUrl: string;
}

interface SearchResultsProps {
  cars: ICar[];
}

/**
 * A component to display the filtered car listings.
 * It shows a grid of car cards or a message if no results are found.
 */
const SearchResults = ({ cars }: SearchResultsProps) => {
  return (
    <div className="mt-8">
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link href={`/cars/${car._id}`} key={car._id}>
              <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <img src={car.imageUrl} alt={car.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">{car.title}</h2>
                  <p className="text-2xl font-semibold text-teal-600 mt-2">${car.price.toLocaleString()}</p>
                  <div className="mt-4 text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={16} />
                    <p>{car.year} &bull; {car.location}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg p-10 bg-white rounded-xl shadow-lg">
          No cars found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default SearchResults;
