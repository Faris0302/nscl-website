import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({
  end,
  duration = 1400,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) {
  const [value, setValue] = useState<string>(decimals > 0 ? (0).toFixed(decimals) : '0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(decimals > 0 ? end.toFixed(decimals) : Math.round(end).toString());
      setHasAnimated(true);
      return;
    }

    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = easeProgress * end;

            setValue(decimals > 0 ? currentNumber.toFixed(decimals) : Math.round(currentNumber).toString());

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(decimals > 0 ? end.toFixed(decimals) : Math.round(end).toString());
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, decimals, hasAnimated]);

  return {
    formattedValue: `${prefix}${value}${suffix}`,
    elementRef,
  };
}
