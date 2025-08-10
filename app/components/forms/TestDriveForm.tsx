import React, { useState } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface TestDriveFormProps {
  carTitle: string;
  className?: string;
}

/**
 * A form for scheduling a test drive for a specific car.
 * @param {string} carTitle - The title of the car for the test drive.
 * @param {string} className - Additional CSS classes for styling.
 */
const TestDriveForm = ({ carTitle, className }: TestDriveFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Test drive scheduled for:', carTitle, formData);
    // Reset form after submission
    setFormData({ name: '', email: '', phone: '', date: '', time: '' });
  };

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle>Schedule a Test Drive</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">For the {carTitle}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="123-456-7890"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Request Test Drive
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { TestDriveForm };
