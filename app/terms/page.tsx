import React from 'react';

/**
 * The Terms of Service page component.
 * This component provides placeholder text for the company's terms and conditions.
 */
const TermsPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>Effective Date: October 26, 2023</strong>
          </p>
          <p>
            Welcome to our website! By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). These Terms govern your use of the website and any services provided through it. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
          <p>
            By using the Service, you agree to be bound by these Terms. If you don't agree to these Terms, you may not use the Service. We may modify these Terms at any time, and such modifications shall be effective immediately upon posting.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Use of the Service</h2>
          <p>
            You agree to use the Service only for purposes that are permitted by these Terms and any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. User Conduct</h2>
          <p>
            You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
