import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui';
import React from 'react';
import { SignInForm } from '../components/SignInForm';


/**
 * The main sign-in page component.
 * It provides a clean, centered container for the sign-in form.
 */
const SignInPage = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The actual sign-in form is rendered here */}
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
