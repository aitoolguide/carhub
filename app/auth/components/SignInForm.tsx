'use client'
import { Button, Input } from '@app/components/ui';
import React from 'react';


/**
 * A form component for user sign-in.
 * It includes fields for email and password, with a submit button.
 */
const SignInForm = () => {
  // In a real application, you would manage state for the form inputs
  // and handle authentication logic here, likely with a backend API.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder logic for sign-in
    console.log('Attempting to sign in...');
    // A real implementation would involve fetching an API or using a library like Firebase
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-signin" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input id="email-signin" type="email" placeholder="email@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password-signin" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input id="password-signin" type="password" placeholder="Password" required />
        </div>
        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
          Sign In
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <a href="/auth/signup" className="font-medium text-teal-600 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export { SignInForm };
