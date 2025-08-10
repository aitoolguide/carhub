import React, { useState } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface InquiryFormProps {
  carTitle: string;
  className?: string;
}

/**
 * An inquiry form for a specific car listing.
 * @param {string} carTitle - The title of the car the inquiry is about.
 * @param {string} className - Additional CSS classes for styling.
 */
const InquiryForm = ({ carTitle, className }: InquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I would like to inquire about the ${carTitle}. Please contact me to provide more details.`,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Inquiry submitted for:', carTitle, formData);
    // Reset form after submission
    setFormData({ ...formData, name: '', email: '', phone: '' });
  };

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle>Inquire about the {carTitle}</CardTitle>
      </CardHeader>
      <CardContent>
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
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <Button type="submit" className="w-full">
            Send Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { InquiryForm };
