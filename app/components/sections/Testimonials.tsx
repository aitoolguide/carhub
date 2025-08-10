import React from 'react';
import { cn } from '@app/lib/utils';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatarSrc: string;
}

interface TestimonialsProps {
  className?: string;
}

/**
 * A section to display customer testimonials.
 * @param {string} className - Additional CSS classes for styling.
 */
const Testimonials = ({ className }: TestimonialsProps) => {
  const testimonials: Testimonial[] = [
    {
      name: "Jane Doe",
      title: "Happy Customer",
      quote: "The team was incredibly helpful and made the car buying process a breeze. I'm thrilled with my new car!",
      avatarSrc: "https://placehold.co/100x100/fecaca/991b1b?text=JD"
    },
    {
      name: "John Smith",
      title: "Repeat Buyer",
      quote: "This is my third car from this dealership. The quality and service are consistently excellent. Highly recommend!",
      avatarSrc: "https://placehold.co/100x100/c7d2fe/3730a3?text=JS"
    },
    {
      name: "Emily White",
      title: "First-time Buyer",
      quote: "I was a bit nervous about buying my first car, but they walked me through everything with patience and professionalism.",
      avatarSrc: "https://placehold.co/100x100/d1fae5/065f46?text=EW"
    }
  ];

  return (
    <div className={cn("bg-gray-50 p-8", className)}>
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6">
            <div className="flex mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="italic text-gray-600">"{testimonial.quote}"</p>
            <div className="flex items-center mt-6">
              <Avatar src={testimonial.avatarSrc} alt={testimonial.name} />
              <div className="ml-4">
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Testimonials };
