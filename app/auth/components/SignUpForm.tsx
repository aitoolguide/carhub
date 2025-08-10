"use client";
import { Button, Input } from '@app/components/ui';
import React from 'react';


/**
 * A form component for user sign-up (registration).
 * It includes fields for email, password, and password confirmation.
 */
const SignUpForm = () => {
  // In a real application, you would manage state for the form inputs,
  // validate the fields (e.g., check if passwords match), and handle
  // the user registration process here.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder logic for sign-up
    console.log('Attempting to sign up...');
    // A real implementation would involve creating a new user in your authentication system.
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-signup" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input id="email-signup" type="email" placeholder="email@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password-signup" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input id="password-signup" type="password" placeholder="Password" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input id="confirm-password" type="password" placeholder="Confirm Password" required />
        </div>
        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
          Sign Up
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/auth/signin" className="font-medium text-teal-600 hover:underline">
          Sign In
        </a>
      </div>
    </div>
  );
};

export { SignUpForm };
