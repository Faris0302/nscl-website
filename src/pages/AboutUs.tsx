import { useRef } from 'react';
import { Building2, CheckCircle2, Crosshair, Eye, HeartPulse, Leaf, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { values } from '../data/company';
import { img } from '../lib/img';

const valueIcons = [Crosshair, ShieldCheck, HeartPulse, Leaf, Sparkles, Building2];

const glance = [
  ['220-acre coastal industrial complex', 'Prime deep-water port proximity at Bin Qasim for bulk capesize vessel handling.'],
  ['1.28 MTPA certified gas-based DRI capacity', 'Extendable to 1.5 MTPA, verified by Midrex Technologies Inc. performance guarantees.'],
  ['93.9%+ verified metallization rate', 'Ultra-low tramp elements (Cu, Sn, Pb) yielding premium steel grades.'],
  ['Forward integration to EAF steelmaking', 'Direct hot-charging at 700°C saving up to 150 kWh per ton of melted steel.'],
];

const statements = [
  { icon: Eye, label: 'Corporate vision', text: 'To be South Asia’s most sustainable, technologically advanced and operationally rigorous integrated steel producer, anchoring Pakistan’s industrial economy with ultra-pure metallics and decarbonized manufacturing.' },
  { icon: Target, label: 'Corporate mission', text: 'To maximize national value addition by integrating domestic mineral beneficiation with world-class MIDREX gas reduction technology, delivering consistently superior DRI products while championing environmental stewardship and safety.' },
];

export function AboutUs() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    // Photo opens like a shutter as it scrolls in
    gsap.fromTo(q('.shutter'), { clipPath: 'inset(18% 18% 18% 18% round 18px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 18px)', ease: 'none',
      scrollTrigger: { trigger: q('.shutter')[0], start: 'top 85%', end: 'center 45%', scrub: true },
    });
    // Vision and mission light up word by word with the scroll
    q('.statement').forEach((el: HTMLElement) => {
      const split = SplitText.create(el, { type: 'words' });
      gsap.fromTo(split.words, { opacity: 0.14 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    });
    // Value cards stack: each card shrinks back as the next one slides over it
    const cards = q('.stack-card') as HTMLElement[];
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const st = { trigger: cards[i + 1], start: 'top bottom', end: 'top 35%', scrub: true };
      gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger: st });
      // the covered card's content fades so only its edge shows in the stack
      gsap.to(card.querySelector('.stack-inner'), { opacity: 0, ease: 'none', scrollTrigger: st });
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="About Us" eyebrow="Enterprise overview" title="Pioneering industrial sovereignty" image={img.aerial}
        lead="National Steel Complex Limited (NSCL) is Pakistan’s flagship private-sector integrated Direct Reduced Iron (DRI) producer, driving domestic self-reliance through advanced metallurgical science." />

      <section id="who" className="scroll-mt-24 py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Who we are" title="A new era for Pakistan’s basic metal industry" />
            <p data-reveal className="lead mt-7">Established over 220 acres at Port Bin Qasim, Karachi, NSCL operates a 1.28 million metric tons per annum (extendable to 1.5 MTPA) gas-based MIDREX Direct Reduction Plant.</p>
            <p data-reveal className="body mt-5">As the country’s premier producer of high-metallization DRI, NSCL bridges the gap between raw mineral resources and downstream precision steel manufacturing, reducing dependence on volatile, contaminated scrap and helping Pakistani rolling mills produce international-grade construction and engineering steel.</p>
            <p data-reveal className="body mt-5">Originally established as Tuwairqi Steel Mills Limited (TSML), commercial production began in May 2013. The facility has since evolved into NSCL, strengthened by improved governance, domestic backward integration and a forward-looking EAF melting strategy.</p>
          </div>
          <figure className="shutter relative overflow-hidden rounded-2xl">
            <img src={img.day} alt="NSCL plant at Port Bin Qasim" className="h-[460px] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-space-200 to-transparent p-6 pt-16">
              <span className="mono-label !text-amber-flame">Strategic location</span>
              <p className="mt-1 font-display text-2xl font-semibold uppercase">Port Bin Qasim ocean terminal</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="our" className="scroll-mt-24 border-y border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="Strategic horizon" title="Our vision & mission" />
            <div className="mt-14 grid gap-14">
              {statements.map(({ icon: Icon, label, text }) => (
                <div key={label}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-blue-green/30 bg-blue-green/10 text-blue-green-600"><Icon size={20} /></span>
                    <h3 className="text-2xl">{label}</h3>
                  </div>
                  <p className="statement font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-[1.2] text-sky-light-900">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside data-reveal className="panel self-start lg:sticky lg:top-28">
            <div className="eyebrow">Enterprise snapshot</div>
            <h3 className="text-3xl">NSCL at a glance</h3>
            <ul className="mt-6 grid gap-5">
              {glance.map(([t, d]) => (
                <li key={t} className="flex gap-3 border-b border-sky-light/10 pb-5 last:border-0 last:pb-0">
                  <CheckCircle2 size={20} className="mt-0.5 flex-none text-amber-flame" />
                  <div><strong className="block font-semibold">{t}</strong><span className="text-sm text-sky-light-800/70">{d}</span></div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="our-values" className="scroll-mt-24 py-28">
        <div className="wrap">
          <SectionHead center eyebrow="Our guiding tenets" title="Core corporate values" lead="Every process, interaction and engineering milestone is governed by our foundational principles." />
          <div className="mx-auto mt-16 grid max-w-4xl gap-6">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <article key={v.title} className="stack-card panel origin-top bg-deep-space-300 p-8 shadow-[0_-20px_60px_-20px_rgb(0_9_14/0.9)] md:sticky md:p-10"
                  style={{ top: `${110 + i * 14}px` }}>
                  <div className="stack-inner grid gap-6 md:grid-cols-[auto_1fr]">
                  <div className="flex items-center gap-4 md:block">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-amber-flame to-princeton text-deep-space-100"><Icon size={24} /></span>
                  </div>
                  <div>
                    <h3 className="text-[clamp(1.8rem,3vw,2.6rem)]">{v.title}</h3>
                    <p className="body mt-3 text-lg">{v.text}</p>
                  </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand image={img.control} eyebrow="Explore next" title="Meet the leaders steering NSCL"
        text="The engineers, financial strategists and plant leaders shaping our industrial footprint."
        primary={{ to: '/our-leadership', label: 'View executive leadership' }} secondary={{ to: '/dri-technology', label: 'Explore DRI Technology' }} />
    </div>
  );
}
