import { useRef } from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { img } from '../lib/img';

const chain = [
  ['Iron ore extraction', 'Surface mining across domestic iron ore concessions in Balochistan and KPK by Al Hadeed Extraction Co.'],
  ['Ore beneficiation', 'Upgrading run-of-mine ore into high-grade concentrate slurries exceeding 67.5% Fe.'],
  ['DR pelletization', 'Indurating fines into spherical oxide pellets optimized for shaft furnace gas permeability.'],
  ['DRI & forward EAF', 'Solid-state MIDREX gas reduction and direct hot-charging to produce prime steel billets.'],
];

const projects = [
  {
    id: 'beneficiation', tag: 'Project 01 · Backward integration', title: 'Domestic iron ore beneficiation plant', image: img.beneficiation,
    lead: 'To unlock Pakistan’s domestic mineral deposits in Balochistan (Nokkundi, Chilghazi) and Khyber Pakhtunkhwa, NSCL is establishing high-intensity magnetic and flotation beneficiation facilities.',
    body: 'The process upgrades indigenous low-to-medium grade iron ores (35%–48% Fe) into concentrate slurries above 67.5% Fe, with gangue (SiO₂ + Al₂O₃) held under 2.5%: the ideal feedstock for direct reduction pelletization.',
    facts: [['2.4 MTPA', 'Planned concentrate capacity'], ['35–48%', 'Fe in run-of-mine ore'], ['67.5%+', 'Fe in concentrate'], ['< 2.5%', 'SiO₂ + Al₂O₃ gangue']],
  },
  {
    id: 'pelletization', tag: 'Project 02 · Feedstock security', title: 'Al Hadeed oxide pelletization facility', image: img.pelletization,
    lead: 'Direct reduction shaft furnaces need spherical oxide pellets (9–16 mm) with high cold crushing strength (>250 daN per pellet) and controlled porosity for gas permeability.',
    body: 'With Al Hadeed Pelletization Co., NSCL is installing a traveling grate pelletizing plant at Port Qasim. It ball-mills beneficiated concentrate, disc-pelletizes it with binders and indurates the pellets at 1,300°C to feed the adjacent MIDREX shaft reactor.',
    facts: [['9–16 mm', 'Pellet size'], ['> 250 daN', 'Cold crushing strength'], ['1,300°C', 'Induration temperature']],
  },
  {
    id: 'forward', tag: 'Project 03 · Forward integration', title: 'Electric arc furnace (EAF) & continuous billet casting', image: img.eaf,
    lead: 'The final phase of NSCL’s plan is a melt shop with a 120-ton ultra-high-power Electric Arc Furnace (EAF), a Ladle Refining Furnace (LRF) and a 6-strand continuous billet caster.',
    body: 'Hot-charging HDRI straight from the MIDREX shaft furnace at 700°C into the EAF saves 120–150 kWh per ton of liquid steel, cuts electrode consumption, and will produce 1.0 MTPA of high-tensile billets for Pakistan’s national infrastructure.',
    facts: [['120 t', 'UHP electric arc furnace'], ['6-strand', 'Continuous billet caster'], ['1.0 MTPA', 'Billet output']],
  },
];

export function Projects() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    // Value chain: connector line draws across, then each step pops in
    const tl = gsap.timeline({ scrollTrigger: { trigger: q('.chain')[0], start: 'top 75%', once: true } });
    tl.from(q('.chain-line'), { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power2.inOut' })
      .from(q('.chain-step'), { y: 40, autoAlpha: 0, stagger: 0.18, duration: 0.8 }, 0.2);
    // Project photos open from a diagonal as they arrive
    (q('.proj-img') as HTMLElement[]).forEach(el => {
      gsap.fromTo(el, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.4, ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Projects" eyebrow="Strategic expansion roadmap" title="Integrating Pakistan’s full steel value chain" image={img['projects-hero']}
        lead="Scaling back into domestic iron ore beneficiation and pelletization while integrating forward into modern Electric Arc Furnace (EAF) billet casting." />

      <section className="py-28">
        <div className="wrap">
          <SectionHead eyebrow="End-to-end architecture" title="Full value chain integration" lead="From domestic mine extraction to certified construction steel." />
          <ol className="chain relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="chain-line absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-blue-green via-amber-flame to-princeton md:block" />
            {chain.map(([t, d], i) => (
              <li key={t} className="chain-step relative md:pt-16">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-full border-2 border-amber-flame bg-deep-space-200 font-mono font-semibold text-amber-flame md:absolute md:left-0 md:top-0 md:mb-0">{i + 1}</span>
                <h3 className="text-2xl">{t}</h3>
                <p className="body mt-2 text-sm">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {projects.map((p, i) => (
        <section key={p.id} id={p.id} className={`scroll-mt-24 py-24 ${i % 2 === 0 ? 'border-t border-sky-light/10 bg-deep-space-300/60' : ''}`}>
          <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <div className="proj-img overflow-hidden rounded-2xl border border-sky-light/12">
                <img src={p.image} alt={p.title} loading="lazy" className="h-[420px] w-full object-cover" />
              </div>
            </div>
            <div>
              <div className={`eyebrow ${p.id === 'forward' ? 'eyebrow-hot' : ''}`}>{p.tag}</div>
              <h2 data-split className="h-section">{p.title}</h2>
              <p data-reveal className="lead mt-6">{p.lead}</p>
              <p data-reveal className="body mt-4">{p.body}</p>
              <dl data-reveal className={`mt-8 grid gap-3 ${p.facts.length > 3 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {p.facts.map(([v, l]) => (
                  <div key={l} className="rounded-xl border border-sky-light/12 bg-deep-space-200 p-4">
                    <dd className="font-mono text-[clamp(1.1rem,2vw,1.6rem)] font-semibold text-amber-flame">{v}</dd>
                    <dt className="mt-1 text-xs text-sky-light-800/70">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      <CtaBand image={img.fabrication} eyebrow="Engineering precision" title="Engineered by Q-Engineering Services"
        text="The heavy fabrication workshops, technology centre and EPC project capabilities supporting NSCL."
        primary={{ to: '/q-engineering', label: 'About Q-Engineering' }} secondary={{ to: '/our-collaboration', label: 'Our partners' }} />
    </div>
  );
}
