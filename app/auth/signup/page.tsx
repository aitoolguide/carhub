import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui';
import React from 'react';
import { SignUpForm } from '../components/SignUpForm';

/**
 * The main sign-up page component.
 * It provides a container for the user registration form.
 */
const SignUpPage = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The actual sign-up form is rendered here */}
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
