import React from 'react';
import Link from 'next/link';

// Mock data for car listings with a category property
const mockCars = [
  { id: '1', title: '2023 Mercedes-Benz C-Class', price: '64,980', location: 'Concord, ON', year: '2023', type: 'Sedan', category: 'sedan', imageUrl: 'https://placehold.co/400x300/22d3ee/ffffff?text=Mercedes' },
  { id: '2', title: '2022 BMW 4 Series Convertible', price: '58,500', location: 'Toronto, ON', year: '2022', type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/60a5fa/ffffff?text=BMW' },
  { id: '3', title: '2021 Audi A5 Convertible', price: '52,000', location: 'Mississauga, ON', year: '2021', type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/a3e635/ffffff?text=Audi' },
  { id: '4', title: '2020 Ford Mustang GT', price: '45,000', location: 'Brampton, ON', year: '2020', type: 'Convertible', category: 'convertible', imageUrl: 'https://placehold.co/400x300/fbbf24/ffffff?text=Mustang' },
];

/**
 * The cars by category page component.
 * It filters and displays cars based on the category slug provided in the URL.
 */
const CarsByCategoryPage = ({ params }: { params: { slug: string } }) => {
  const category = params.slug;
  const filteredCars = mockCars.filter(car => car.category === category);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 capitalize">
        {category} Cars
      </h1>
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link href={`/cars/${car.id}`} key={car.id}>
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
};

export default CarsByCategoryPage;
