import React from 'react';

/**
 * The Privacy Policy page component.
 * This component provides placeholder text for the company's privacy policy.
 */
const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>Effective Date: October 26, 2023</strong>
          </p>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the site includes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Create and manage your account.</li>
            <li>Send you a newsletter.</li>
            <li>Process payments and refunds.</li>
            <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
