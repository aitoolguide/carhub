import React, { useState, useEffect } from 'react';
import { cn } from '@app/lib/utils';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/Button';

interface BackToTopProps {
  className?: string;
  showBelow?: number;
}

/**
 * A floating button that appears after scrolling down, allowing the user to
 * quickly scroll back to the top of the page.
 *
 * @param {string} className - Additional CSS classes for styling.
 * @param {number} [showBelow=300] - The scroll position in pixels to show the button.
 */
const BackToTop = ({ className, showBelow = 300 }: BackToTopProps) => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > showBelow) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {show && (
        <div className={cn("fixed bottom-6 right-6 z-40 transition-opacity duration-300", className)}>
          <Button
            onClick={handleClick}
            size="icon"
            className="rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={24} />
          </Button>
        </div>
      )}
    </>
  );
};

export { BackToTop };
