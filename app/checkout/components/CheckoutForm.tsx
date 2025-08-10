import React from 'react';
import { User } from 'lucide-react';
import { Input } from '@app/components/ui';

interface CheckoutFormProps {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onCustomerInfoChange: (info: any) => void;
}

/**
 * A component to capture customer personal information during checkout.
 */
const CheckoutForm = ({ customerInfo, onCustomerInfoChange }: CheckoutFormProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <User size={20} />
        Customer Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="First Name"
          value={customerInfo.firstName}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, firstName: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={customerInfo.lastName}
          onChange={(e) => onCustomerInfoChange({ ...customerInfo, lastName: e.target.value })}
          required
        />
        <div className="md:col-span-2">
          <Input
            type="email"
            placeholder="Email Address"
            value={customerInfo.email}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, email: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
