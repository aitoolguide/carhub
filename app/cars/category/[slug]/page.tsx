import React from 'react';
import Link from 'next/link';
import { mockCars } from '@app/data/cars';

export default async function CarsByCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: category } = await params;
  console.log('Category:', category);
  const filteredCars = mockCars.filter(car => car.bodyType?.toLowerCase() === category.toLowerCase());

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 capitalize">
        {category} Cars
      </h1>
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link href={`/cars/${car._id}`} key={car._id}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                <img src={car.imageUrl} alt={car.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">{car.title}</h2>
                  <p className="text-2xl font-semibold text-teal-600 mt-2">${car.price}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>{car.year} &bull; {car.location}</p>
                    <p className="capitalize">Type: {car.type}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No cars found in the category: <span className="font-semibold capitalize">{category}</span>.
        </div>
      )}
    </div>
  );
}
