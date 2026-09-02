import { useEffect } from 'react';

export function useRevealOnScroll(dependency?: unknown) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('in')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
