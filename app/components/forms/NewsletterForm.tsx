import React, { useState } from 'react';
import { cn } from '@app/lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface NewsletterFormProps {
  className?: string;
}

/**
 * A simple form to subscribe to a newsletter.
 * @param {string} className - Additional CSS classes for styling.
 */
const NewsletterForm = ({ className }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    // Here you would typically handle the subscription, e.g., send data to an API
    setEmail('');
  };

  return (
    <Card className={cn('w-full max-w-sm', className)}>
      <CardHeader>
        <CardTitle>Subscribe to our Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="flex-grow"
          />
          <Button type="submit" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { NewsletterForm };
