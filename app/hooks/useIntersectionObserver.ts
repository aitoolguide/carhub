// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

/**
 * A custom hook to observe when a DOM element enters or exits the viewport.
 * @param props Configuration options for the IntersectionObserver.
 * @returns A ref object to be attached to the target element.
 */
export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  onIntersect,
}: IntersectionObserverProps): RefObject<Element|null> => {
  const ref = useRef<Element>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], observerInstance) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observerInstance);
      }
    }, { root, rootMargin, threshold });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, root, rootMargin, threshold, onIntersect]);

  return ref;
};
