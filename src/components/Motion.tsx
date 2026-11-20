import { type RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap';

/**
 * Page-wide scroll motion, set up declaratively with data attributes:
 *  data-split        headline splits into lines that rise in
 *  data-reveal       fades/rises in (batched, staggered with siblings)
 *  data-count="1.28" counts up; data-decimals, data-suffix, data-group (thousands commas) optional
 *  data-parallax="0.2" image drifts against the scroll
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    // Counters always land on their final value, even with reduced motion
    q('[data-count]').forEach((el: HTMLElement) => {
      const end = parseFloat(el.dataset.count!);
      const dec = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      const group = el.dataset.group !== undefined;
      const set = (v: number) => (el.textContent = (group ? v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec)) + suffix);
      if (prefersReducedMotion()) return set(end);
      const o = { v: 0 };
      set(0);
      gsap.to(o, {
        v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => set(o.v),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    if (prefersReducedMotion()) return;

    q('[data-split]').forEach((el: HTMLElement) => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.from(self.lines, {
          yPercent: 110, duration: 1.1, stagger: 0.09, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }),
      });
    });

    const reveal = (els: Element[]) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1, overwrite: true });
    gsap.set(q('[data-reveal]'), { autoAlpha: 0, y: 40 });
    ScrollTrigger.batch(q('[data-reveal]'), { start: 'top 92%', once: true, onEnter: reveal });
    // Safety net: anything still hidden appears once the reader reaches the end of the page
    ScrollTrigger.create({
      trigger: root, start: 'bottom bottom+=40', once: true,
      onEnter: () => reveal(q('[data-reveal]').filter((el: HTMLElement) => getComputedStyle(el).visibility === 'hidden')),
    });
    // Lazy pages, images and the 3D section change the page height after mount. Without a fresh
    // measurement, triggers near the bottom can sit past the furthest scroll point and never fire.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 450);
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    let lastH = root.offsetHeight, rt = 0;
    const ro = new ResizeObserver(() => {
      const h = root.offsetHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      window.clearTimeout(rt);
      rt = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(root);

    q('[data-parallax]').forEach((el: HTMLElement) => {
      const amt = parseFloat(el.dataset.parallax || '0.2');
      gsap.fromTo(el, { yPercent: -amt * 50 }, {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => { window.clearTimeout(t); window.clearTimeout(rt); ro.disconnect(); };
  }, { scope });
}
