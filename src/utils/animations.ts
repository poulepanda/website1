import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isVisible;
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  animation: string,
  threshold: number = 0.1,
  once: boolean = true
): void {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add(animation);
          setHasAnimated(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          ref.current?.classList.remove(animation);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, animation, threshold, once, hasAnimated]);
}