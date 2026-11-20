import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';
import { BackToTop } from './BackToTop';
import { NetworkBackground } from './NetworkBackground';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

export function Layout() {
  const { pathname, hash } = useLocation();
  const bar = useRef<HTMLDivElement>(null);

  // New page: top of page. Anchors wait until the (lazy) page has rendered and measured its
  // scroll triggers (a refresh mid-scroll would cancel the smooth scroll), then scroll past the header.
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let fix = 0;
    const t = window.setInterval(() => {
      tries++;
      const el = document.getElementById(id);
      if (tries > 25) return window.clearInterval(t);
      if (!el || tries < 6) return;
      window.clearInterval(t);
      ScrollTrigger.refresh();
      const go = () => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      requestAnimationFrame(go);
      // images above the anchor can still grow; correct once if the target drifted
      fix = window.setTimeout(() => { if (Math.abs(el.getBoundingClientRect().top - 80) > 40) go(); }, 1400);
    }, 110);
    return () => { window.clearInterval(t); window.clearTimeout(fix); };
  }, [pathname, hash]);

  // Reading progress bar along the top edge
  useGSAP(() => {
    gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  }, { dependencies: [pathname], revertOnUpdate: true });

  return (
    <>
      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-blue-green via-amber-flame to-princeton" />
      <NetworkBackground />
      <Header />
      <main className="relative z-[1]">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </>
  );
}
