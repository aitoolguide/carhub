import React, { useState } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Select } from '../ui/Select';

interface FinanceFormProps {
  className?: string;
}

/**
 * A detailed form for a financing application.
 * @param {string} className - Additional CSS classes for styling.
 */
const FinanceForm = ({ className }: FinanceFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    employmentStatus: '',
    annualIncome: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Financing application submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '', email: '', phone: '', address: '', city: '',
      province: '', postalCode: '', employmentStatus: '', annualIncome: '',
    });
  };

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>Financing Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
              />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
              />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <Input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street Address"
                required
              />
              <Input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <Input
                name="province"
                type="text"
                value={formData.province}
                onChange={handleInputChange}
                placeholder="Province"
                required
              />
              <Input
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Employment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleInputChange}
                className="w-full"
                required
                options={[
                  { value: '', label: 'Select Employment Status' },
                  { value: 'employed', label: 'Employed' },
                  { value: 'self-employed', label: 'Self-Employed' },
                  { value: 'unemployed', label: 'Unemployed' },
                  { value: 'retired', label: 'Retired' },
                ]}
              />
              <Input
                name="annualIncome"
                type="number"
                value={formData.annualIncome}
                onChange={handleInputChange}
                placeholder="Annual Income"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { FinanceForm };
