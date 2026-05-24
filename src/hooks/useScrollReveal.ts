import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const children = el.querySelectorAll('[data-animate]');
    children.forEach((child) => observer.observe(child));
    // Also observe the container itself if it has the attribute
    if (el.hasAttribute('data-animate')) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
