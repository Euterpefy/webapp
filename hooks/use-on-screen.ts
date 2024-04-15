import { useState, useEffect, useMemo, RefObject } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          console.log('Intersection change:', entry.isIntersecting); // Debug log
          setIntersecting(entry.isIntersecting);
        },
        {
          threshold: 0.1,
        }
      ),
    []
  );

  useEffect(() => {
    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Clean up function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [observer, ref.current]); // Correctly react to changes in ref.current

  return isIntersecting;
}
