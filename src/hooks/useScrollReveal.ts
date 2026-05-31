import { useEffect, useRef } from 'react';

/**
 * Reveal-on-scroll hook.
 *
 * Add `data-animate` to any element under the returned ref and it will
 * fade-up into view when intersecting the viewport. Optional `data-animate`
 * values: `left`, `right`, `zoom`.
 *
 * Children with `data-stagger` get incremental transition delays.
 */
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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    const observe = () => {
      const targets = el.querySelectorAll<HTMLElement>('[data-animate]');
      targets.forEach((node) => {
        if (!node.classList.contains('is-visible')) observer.observe(node);
      });
      if (el.hasAttribute('data-animate') && !el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    };

    observe();

    // Re-observe new nodes if the subtree changes (e.g. async content)
    const mutation = new MutationObserver(observe);
    mutation.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return ref;
}
