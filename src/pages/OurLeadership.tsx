import { useCallback, useEffect, useRef, useState, type UIEvent } from 'react';
import { ArrowRight, FileText, X } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { leadership, coreTeam, type Leader } from '../data/leaders';
import { img } from '../lib/img';

const CHAIRMAN = 'Muhammad Ashraf Qazi';
const PDF = '/Chairman-Profile-Details.pdf';

// Tailwind needs whole class names, so each breakpoint gets its own set
const BP = {
  md: {
    rail: 'md:flex', group: 'grid gap-4 md:flex md:gap-0 md:overflow-hidden md:rounded-2xl md:border md:border-sky-light/10',
    panel: 'min-h-[480px] md:min-h-0 md:basis-0 md:rounded-none md:border-0 md:border-r md:border-sky-light/10 md:last:border-r-0',
    grey: 'md:grayscale', bioIdle: 'md:grid-rows-[0fr] md:opacity-0',
  },
  lg: {
    rail: 'lg:flex', group: 'grid gap-4 sm:grid-cols-2 lg:flex lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-sky-light/10',
    panel: 'min-h-[440px] lg:min-h-0 lg:basis-0 lg:rounded-none lg:border-0 lg:border-r lg:border-sky-light/10 lg:last:border-r-0',
    grey: 'lg:grayscale', bioIdle: 'lg:grid-rows-[0fr] lg:opacity-0',
  },
} as const;

/** AECL-style row: portraits share the width; the one in focus widens, turns to colour and shows its short bio. */
function PanelRow({ people, bp, height, onOpen }: { people: Leader[]; bp: keyof typeof BP; height: string; onOpen: (p: Leader) => void }) {
  const [active, setActive] = useState<number | null>(null);
  const c = BP[bp];
  return (
    <div className={`panel-row ${c.group} ${height}`} role="group" aria-label="Leaders, in order of hierarchy"
      onMouseLeave={() => setActive(null)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null); }}>
      {people.map((p, i) => {
        const on = active === i;
        return (
          <article key={p.name} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
            style={{ flexGrow: on ? 2 : 1 }}
            className={`relative cursor-pointer overflow-hidden rounded-2xl border border-sky-light/12 bg-deep-space-300 outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-flame ${c.panel}`}>
            <img src={img[p.photo]} alt={p.name} loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${on ? 'scale-105' : c.grey}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space-100 via-deep-space-100/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <div className="mono-label !text-amber-flame">{p.role}</div>
              <h3 className="mt-1.5 text-2xl leading-[1.05] md:text-3xl">{p.name}</h3>
              <div className={`grid transition-all duration-700 ${on ? 'grid-rows-[1fr]' : `grid-rows-[1fr] ${c.bioIdle}`}`}>
                <div className="overflow-hidden">
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-sky-light-900/90">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={e => { e.stopPropagation(); onOpen(p); }} className="btn btn-hot !px-4 !py-2 !text-[0.78rem]">
                      See more <ArrowRight size={14} />
                    </button>
                    {p.name === CHAIRMAN && (
                      <a href={PDF} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn btn-line !px-4 !py-2 !text-[0.78rem]"><FileText size={14} /> Profile PDF</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Hierarchy line above a gallery: first role on the left, last on the right. */
function Rail({ from, to, bp }: { from: string; to: string; bp: keyof typeof BP }) {
  return (
    <div className={`mb-3 hidden items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-sky-light-700/60 ${BP[bp].rail}`}>
      <span>{from}</span><span className="h-px flex-1 bg-amber-flame/50" /><span>{to}</span>
    </div>
  );
}

/** Full biography: portrait down the left, text scrolling on the right. */
function LeaderDialog({ p, onClose }: { p: Leader | null; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef(0);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.add('is-scrolling');
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => el.classList.remove('is-scrolling'), 900);
  };
  useEffect(() => {
    if (!p) return;
    const prev = document.activeElement as HTMLElement | null;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    closeBtn.current?.focus();
    if (!prefersReducedMotion()) gsap.fromTo(panel.current, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' });
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); prev?.focus(); };
  }, [p, onClose]);
  if (!p) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[80] grid place-items-center bg-deep-space-100/85 p-4 backdrop-blur-md">
      <div ref={panel} role="dialog" aria-modal="true" aria-label={p.name}
        className="grid max-h-[90dvh] w-[min(980px,100%)] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border border-amber-flame/40 bg-deep-space-300 shadow-2xl md:grid-cols-[1fr_1.8fr] md:grid-rows-1">
        <img src={img[p.photo]} alt={p.name} className="h-56 w-full object-cover object-top md:h-full" />
        <div onScroll={onScroll} className="scroll-fade min-h-0 overflow-y-auto p-6 md:p-9">
          <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close" className="float-right -mr-2 -mt-2 grid h-10 w-10 place-items-center rounded-full text-amber-flame transition hover:bg-amber-flame/10"><X size={22} /></button>
          <div className="mono-label !text-amber-flame">{p.role}</div>
          <h3 className="mb-5 mt-1.5 text-3xl md:text-4xl">{p.name}</h3>
          {p.bio.map((para, i) => <p key={i} className="mb-4 text-[0.95rem] leading-relaxed text-sky-light-800/85">{para}</p>)}
          {p.name === CHAIRMAN && <a href={PDF} target="_blank" rel="noreferrer" className="btn btn-line mt-2 !py-3"><FileText size={15} /> Chairman profile (PDF)</a>}
        </div>
      </div>
    </div>
  );
}

export function OurLeadership() {
  const page = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Leader | null>(null);
  const close = useCallback(() => setOpen(null), []);
  usePageMotion(page);

  // Core team in rows of four, each its own expanding gallery
  const rows: Leader[][] = [];
  for (let i = 0; i < coreTeam.length; i += 4) rows.push(coreTeam.slice(i, i + 4));

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Panels rise in one after another as each row arrives
    (gsap.utils.toArray('.panel-row', page.current) as HTMLElement[]).forEach(row => {
      gsap.fromTo(row.children, { y: 50, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: row, start: 'top 85%', once: true },
      });
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Our Leadership" eyebrow="Governance & executive team" title="Leadership & governance" image={img.office}
        lead="Heavy-industry leaders, metallurgical engineers and capital strategists dedicated to scaling Pakistan’s steel manufacturing sector." />

      <section className="py-28">
        <div className="wrap">
          <SectionHead eyebrow="Strategic direction" title="Board of Directors" lead="Long-term corporate stewardship, capital allocation and international technology partnerships." />
          <p data-reveal className="mb-8 mt-4 font-mono text-xs uppercase tracking-[0.14em] text-sky-light-700/60">Hover over a member to read more, or select See more for the full biography.</p>
          <div className="md:mx-auto md:max-w-3xl">
            <Rail bp="md" from={leadership.board[0].role} to={leadership.board[leadership.board.length - 1].role} />
            <PanelRow people={leadership.board} bp="md" height="md:h-[580px]" onOpen={setOpen} />
          </div>
        </div>
      </section>

      <section className="border-y border-sky-light/10 bg-deep-space-300/50 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Corporate & plant operations" title="Executive leadership" lead="Driving corporate strategy and organizational growth alongside the technical operations of our Bin Qasim plant." />
          <div className="mt-12">
            <Rail bp="lg" from={coreTeam[0].role} to={coreTeam[coreTeam.length - 1].role} />
            <div className="grid gap-4">
              {rows.map((r, i) => <PanelRow key={i} people={r} bp="lg" height="lg:h-[540px]" onOpen={setOpen} />)}
            </div>
          </div>
        </div>
      </section>

      <CtaBand image={img["j-phase3-3"]} eyebrow="Our story" title="From a coastal site to a MIDREX landmark"
        text="Follow the phases that took NSCL from land acquisition to verified commercial operation and value-chain integration."
        primary={{ to: '/our-journey', label: 'See our journey' }} secondary={{ to: '/about-us', label: 'About NSCL' }} />

      <LeaderDialog p={open} onClose={close} />
    </div>
  );
}
