import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

export function SectionHead({ eyebrow, title, lead, center = false, hot = false }: { eyebrow: string; title: string; lead?: string; center?: boolean; hot?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`eyebrow ${hot ? 'eyebrow-hot' : ''}`}>{eyebrow}</div>
      <h2 data-split className="h-section">{title}</h2>
      {lead && <p data-reveal className="lead mt-5">{lead}</p>}
    </div>
  );
}

type Cta = { to: string; label: string };
export function CtaBand({ image, eyebrow, title, text, primary, secondary }: { image: string; eyebrow: string; title: string; text: string; primary: Cta; secondary?: Cta }) {
  return (
    <section className="relative isolate overflow-hidden py-32">
      <div className="absolute inset-0 -z-20 overflow-hidden"><img src={image} alt="" data-parallax="0.4" className="h-[130%] w-full object-cover" /></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-space-200/96 via-deep-space-200/85 to-deep-space-200/45" />
      <div className="wrap">
        <div className="max-w-3xl">
          <div className="eyebrow eyebrow-hot">{eyebrow}</div>
          <h2 data-split className="h-section">{title}</h2>
          <p data-reveal className="lead mt-5">{text}</p>
          <div data-reveal className="mt-9 flex flex-wrap gap-4">
            <Link to={primary.to} className="btn btn-hot">{primary.label} <ArrowRight size={16} /></Link>
            {secondary && <Link to={secondary.to} className="btn btn-line">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Accessible dialog that animates in with GSAP; closes on Escape or backdrop click. */
export function Modal({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    closeBtn.current?.focus();
    if (!prefersReducedMotion()) gsap.from(panel.current, { y: 40, autoAlpha: 0, duration: 0.5, ease: 'power3.out' });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
      prevFocus?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={label} onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-deep-space-100/85 p-0 backdrop-blur-md sm:items-center sm:p-6">
      <div ref={panel} className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-sky-light/15 bg-deep-space-300 p-7 shadow-2xl sm:rounded-2xl md:p-10">
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-sky-light/25 transition hover:border-amber-flame hover:text-amber-flame"><X size={20} /></button>
        {children}
      </div>
    </div>
  );
}
