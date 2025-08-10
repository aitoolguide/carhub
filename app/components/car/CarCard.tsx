// CarCard.tsx
import React from 'react';
import { ICar } from '@app/types/car';

interface CarCardProps {
  car: ICar;
  onClick?: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  return (
    <div onClick={onClick}>
      {/* render car info */}
      <h3>{car.make} {car.model}</h3>
      {/* ... */}
    </div>
  );
};