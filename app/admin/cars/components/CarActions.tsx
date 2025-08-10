import React from 'react';
import Link from 'next/link';

import { Plus } from 'lucide-react';
import { Button } from '@app/components/ui';

/**
 * A component to display actions for car management, like adding a new car.
 */
const CarActions = () => {
  return (
    <div className="flex justify-end mb-4">
      <Link href="/admin/cars/new">
        <Button className="bg-teal-500 text-white hover:bg-teal-600">
          <Plus size={20} className="mr-2" />
          Add New Car
        </Button>
      </Link>
    </div>
  );
};

export default CarActions;
