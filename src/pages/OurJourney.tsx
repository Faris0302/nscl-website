import { useCallback, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand, Modal } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { journey, type JourneyPhoto } from '../data/company';
import { img } from '../lib/img';

/** A phase's photos: the first large, the rest as a row of smaller ones. Each opens full size. */
function PhaseGallery({ images, onOpen, tall = false }: { images: JourneyPhoto[]; onOpen: (p: JourneyPhoto) => void; tall?: boolean }) {
  const [first, ...rest] = images;
  const tile = 'group relative block w-full overflow-hidden rounded-xl border border-sky-light/12 bg-deep-space-400 text-left';
  return (
    <div className="grid gap-3">
      <button type="button" onClick={() => onOpen(first)} aria-label={`Enlarge photo: ${first.caption}`}
        className={`${tile} ${rest.length ? (tall ? 'h-[38vh]' : 'h-64') : (tall ? 'h-[52vh]' : 'h-80')}`}>
        <img src={img[first.src]} alt={first.alt} loading="lazy" className="tl-img h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-deep-space-200/95 to-transparent p-4 pt-12">
          <span className="mono-label !text-sky-light-800">{first.caption}</span>
          <Maximize2 size={16} className="flex-none text-amber-flame opacity-0 transition group-hover:opacity-100" />
        </span>
      </button>
      {rest.length > 0 && (
        <div className={`grid gap-3 ${rest.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {rest.map(p => (
            <button key={p.src} type="button" onClick={() => onOpen(p)} aria-label={`Enlarge photo: ${p.caption}`} className={`${tile} ${tall ? 'h-[13vh] min-h-24' : 'h-32'}`}>
              <img src={img[p.src]} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-space-200/95 to-transparent p-2.5 pt-8 font-mono text-[0.6rem] uppercase tracking-wider text-sky-light-800">{p.caption}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OurJourney() {
  const page = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<JourneyPhoto | null>(null);
  const close = useCallback(() => setPhoto(null), []);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    const mm = gsap.matchMedia();
    // Desktop: the timeline pins and slides sideways, the progress line fills, years swell as they pass
    mm.add('(min-width: 1024px)', () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: pin.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.to(q('.tl-fill'), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin.current, start: 'top top', end: () => '+=' + dist(), scrub: true } });
      (q('.tl-panel') as HTMLElement[]).forEach(panel => {
        gsap.fromTo(panel.querySelector('.tl-year'), { opacity: 0.25, scale: 0.85 }, {
          opacity: 1, scale: 1, ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 85%', end: 'left 35%', scrub: true },
        });
        gsap.fromTo(panel.querySelector('.tl-img'), { scale: 1.25 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        });
      });
    });
    // Phones and tablets: a vertical line draws down beside the phases
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(q('.v-fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.v-list')[0], start: 'top 70%', end: 'bottom 70%', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Our Journey" eyebrow="Milestones & heritage" title="The journey of NSCL" image={img['j-phase3-3']}
        lead="From strategic coastal land acquisition to verified MIDREX commercial operation, the move to NSCL and value-chain integration." />

      <section className="pt-28 lg:pb-0">
        <div className="wrap">
          <SectionHead eyebrow="Strategic evolution" title="Forging a metallurgical landmark" lead="Seven phases that define our technological capability, industrial resilience and future roadmap. Select a photo to see it full size." />
        </div>
      </section>

      {/* Desktop: pinned horizontal timeline */}
      <section ref={pin} className="relative hidden h-screen items-center overflow-hidden lg:flex">
        <div className="absolute inset-x-0 top-[13vh] h-px bg-sky-light/15">
          <div className="tl-fill h-full origin-left scale-x-0 bg-gradient-to-r from-blue-green via-amber-flame to-princeton" />
        </div>
        <div ref={track} className="flex gap-12 pl-[max(40px,calc((100vw-1240px)/2))] pr-[18vw]">
          {journey.map(j => (
            <article key={j.label} className="tl-panel grid w-[min(80vw,1000px)] flex-none grid-cols-[0.9fr_1.1fr] items-center gap-10 pt-[6vh]">
              <div>
                <div className={`tl-year origin-left font-display font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#ffb703] ${j.years.length > 9 ? 'text-[clamp(3rem,5vw,5rem)]' : 'text-[clamp(4rem,7vw,7rem)]'}`}>{j.years}</div>
                <div className="mono-label mt-4 !text-blue-green-600">{j.label}</div>
                <h3 className="mt-3 text-[clamp(1.8rem,2.6vw,2.5rem)]">{j.title}</h3>
                <p className="body mt-4 text-[1.05rem]">{j.text}</p>
              </div>
              <PhaseGallery images={j.images} onOpen={setPhoto} tall />
            </article>
          ))}
        </div>
      </section>

      {/* Phones and tablets: vertical timeline */}
      <section className="py-16 lg:hidden">
        <div className="wrap">
          <ol className="v-list relative grid gap-14 pl-10">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-sky-light/15" aria-hidden="true">
              <span className="v-fill block h-full w-full origin-top bg-gradient-to-b from-blue-green via-amber-flame to-princeton" />
            </span>
            {journey.map(j => (
              <li key={j.label} data-reveal className="relative">
                <span className="absolute -left-10 top-2 h-4 w-4 rounded-full bg-amber-flame ring-6 ring-amber-flame/15" aria-hidden="true" />
                <div className="font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_#ffb703]">{j.years}</div>
                <div className="mono-label mt-2 !text-blue-green-600">{j.label}</div>
                <h3 className="mt-2 text-3xl">{j.title}</h3>
                <p className="body mb-6 mt-3">{j.text}</p>
                <PhaseGallery images={j.images} onOpen={setPhoto} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand image={img.day} eyebrow="Alliances & ecosystem" title="Built with world-class partners"
        text="How technology licensors, engineering firms, group entities and financial advisors accelerate NSCL’s progress."
        primary={{ to: '/our-collaboration', label: 'View our collaborations' }} secondary={{ to: '/dri-technology', label: 'Explore MIDREX technology' }} />

      <Modal open={!!photo} onClose={close} label={photo ? photo.caption : 'Photo'}>
        {photo && (
          <figure>
            <img src={img[photo.src]} alt={photo.alt} className="max-h-[70vh] w-full rounded-lg object-contain" />
            <figcaption className="mono-label mt-4 pr-12">{photo.caption}</figcaption>
          </figure>
        )}
      </Modal>
    </div>
  );
}
