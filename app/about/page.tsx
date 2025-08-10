import React from 'react';

/**
 * The About Us page component.
 * This component provides an overview of the company or application.
 */
const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About Our Company
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          A brief introduction to our mission, vision, and values.
        </p>
      </div>

      <div className="mt-12 space-y-8 text-lg text-gray-700 leading-relaxed">
        <p>
          Welcome to our platform! We are dedicated to providing the best possible experience for our users. Our journey began with a simple idea: to make a difference in the digital world by creating innovative and user-friendly solutions. We believe in the power of technology to connect people and simplify lives.
        </p>
        <p>
          Our team is comprised of passionate and talented individuals from diverse backgrounds, all united by a common goal. We work tirelessly to develop products that are not only functional but also delightful to use. We are constantly learning, evolving, and adapting to new challenges to ensure we stay at the forefront of the industry.
        </p>
        <p>
          Thank you for being a part of our community. We are excited about the future and look forward to building amazing things with you.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
