"use client";
import { Button, Input } from '@app/components/ui';
import React from 'react';


/**
 * A form component for editing a user's profile information.
 * It includes fields for a user's name and email, with a save button.
 */
const ProfileForm = () => {
  // In a real application, you would manage state for the form inputs
  // and handle form submission here.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to save the user's profile data
    console.log('Profile saved!');
    alert('Profile saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <Input 
          id="name" 
          type="text" 
          placeholder="John Doe" 
          defaultValue="John Doe" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input 
          id="email" 
          type="email" 
          placeholder="john.doe@example.com" 
          defaultValue="john.doe@example.com"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export { ProfileForm };
