import { useState, useEffect, useMemo, type RefObject } from "react";

/**
 * Checks if the HTML element referenced by `ref` is visible within the viewport based on an intersection threshold.
 * @param ref - RefObject pointing to the target HTML element to observe.
 * @returns Boolean indicating whether the element is currently visible on the screen.
 */
export default function useOnScreen(ref: RefObject<HTMLElement>): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      ([entry]) => {
        console.log("Intersection change:", entry.isIntersecting); // Debug log
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
  }, []);

  useEffect(() => {
    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [observer, ref]); // Dependency list adjusted

  return isIntersecting;
}
