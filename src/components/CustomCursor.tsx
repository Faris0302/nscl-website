import React, { useEffect } from 'react';

export const CustomCursor: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const dot = document.createElement('div');
    const ring = document.createElement('div');

    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const updatePosition = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      ring.style.left = `${clientX}px`;
      ring.style.top = `${clientY}px`;
    };

    const hover = () => ring.classList.add('cursor-ring-hover');
    const unhover = () => ring.classList.remove('cursor-ring-hover');

    const interactive = document.querySelectorAll('a, button, input, .nav-link, .btn, .social-icon, .search-result-item, .ai-chatbot-launcher');
    interactive.forEach((element) => {
      element.addEventListener('mouseenter', hover);
      element.addEventListener('mouseleave', unhover);
    });

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      interactive.forEach((element) => {
        element.removeEventListener('mouseenter', hover);
        element.removeEventListener('mouseleave', unhover);
      });
      document.body.classList.remove('custom-cursor-enabled');
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
};
