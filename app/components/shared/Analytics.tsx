import React, { useEffect } from 'react';

interface AnalyticsProps {
  trackingId: string;
}

/**
 * A shared component for integrating a third-party analytics script.
 * This component is a conceptual representation of how an analytics script
 * would be added and managed in a client-side rendered React application.
 *
 * @param {string} trackingId - The tracking ID for the analytics service (e.g., 'G-XXXXXXXXXX').
 */
const Analytics = ({ trackingId }: AnalyticsProps) => {
  useEffect(() => {
    // This effect runs only once when the component mounts.
    if (typeof window !== 'undefined') {
      // In a real application, you would create and append a script tag
      // for your analytics service (e.g., Google Analytics, Plausible, etc.).
      // Example for Google Analytics 4 (gtag.js):
      //
      // const script = document.createElement('script');
      // script.async = true;
      // script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      // document.head.appendChild(script);
      //
      // window.dataLayer = window.dataLayer || [];
      // function gtag() {
      //   window.dataLayer.push(arguments);
      // }
      // gtag('js', new Date());
      // gtag('config', trackingId);

      console.log(`[Analytics]: Initializing analytics with tracking ID: ${trackingId}`);
    }
  }, [trackingId]);

  // This component does not render any visible UI.
  return null;
};

export { Analytics };
