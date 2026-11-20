import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, ShieldAlert, Sun, TreePine, Wind, Zap } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { img } from '../lib/img';

// Renewable and nature-based initiatives (from the current nscl.com.pk sustainability page)
const initiatives = [
  { icon: Sun, value: 10, suffix: ' MW', unit: 'per year, initial target', title: 'Solar power generation',
    text: 'Carbon emission savings from solar EPC projects and the sale and distribution of solar PV modules, under a formal agreement with Zi Solar (Pvt) Ltd, the sole authorised distributor in Pakistan of Hyundai Energy Solutions (South Korea), covering both B2C installation and B2B sales.' },
  { icon: Wind, value: 20, suffix: ' MW', unit: 'planned wind capacity', title: 'Wind power generation',
    text: 'Wind turbines planned along the plant periphery, which lies in a natural wind corridor. Turbines from Siemens, GE or comparable European manufacturers, with NSCL delivering the entire balance of plant in-house.' },
  { icon: TreePine, value: 1250, suffix: '+', unit: 'acres, first phase', title: 'Mangrove plantation',
    text: 'Land acquired for mangrove planting with specialist consultants in Pakistan: a nature-based solution that captures carbon, protects the coastline and restores habitat around Port Qasim.' },
];

// Decarbonisation pathway, from today's operation to net zero
const roadmap = [
  { stage: 'Today', title: 'Gas-based MIDREX DRI', text: 'Natural gas reduction in the solid state, with up to 60% lower CO₂ than the blast furnace route.' },
  { stage: 'Optimise', title: 'Efficiency across the plant', text: 'Improving energy and process efficiency and shrinking the footprint of every steelmaking asset.' },
  { stage: 'Renewables', title: 'Solar, wind & mangroves', text: '10 MW a year of solar, 20 MW of wind and 1,250+ acres of mangroves in the first phase.' },
  { stage: 'Transition', title: 'MIDREX Flex', text: 'A planned move to MIDREX Flex, which runs on any blend of natural gas and hydrogen.' },
  { stage: 'Goal', title: 'Net zero', text: 'Hydrogen-led ironmaking, renewable power and nature-based offsets combined.' },
];

const pillars = [
  { icon: Wind, title: 'Emissions management', text: 'Continuous stack emission monitors (CEMS) measure NOₓ, SOₓ and particulate matter, keeping emissions below Sindh Environmental Protection Agency (SEPA) statutory thresholds.' },
  { icon: Droplet, title: 'Water stewardship', text: 'Multi-stage closed-circuit cooling towers with clarifiers and filtration recycle 98%+ of process water, minimizing fresh intake in coastal Karachi.' },
  { icon: Zap, title: 'Energy efficiency', text: 'Reformer flue gas recuperators preheat combustion air and natural gas feeds, capturing waste heat and keeping thermal consumption below 2.47 Gcal per ton.' },
];

export function Sustainability() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    // Emission bars grow to their real proportions as the chart scrolls in
    gsap.from(q('.bar'), {
      scaleX: 0, transformOrigin: 'left center', stagger: 0.25, duration: 1.6, ease: 'power3.out',
      scrollTrigger: { trigger: q('.chart')[0], start: 'top 75%', once: true },
    });
    // Net zero banner pulls back gently as you scroll past it
    gsap.fromTo(q('.zoom-img'), { scale: 1.25 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: q('.zoom-wrap')[0], start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Sustainability" eyebrow="Decarbonized metallurgy" title="Sustainable industrial stewardship" image={img['sustainability-hero']}
        lead="Low-emission ironmaking through clean natural gas solid-state reduction, closed-loop water recirculation and energy-conserving heat recovery." />

      <section id="Environmental" className="scroll-mt-24 py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Gas-based reduction" title="A drastic reduction in greenhouse gas emissions" />
            <p data-reveal className="lead mt-7">Traditional integrated steel mills rely on coal-fired coke ovens and blast furnaces that generate 1.8 to 2.2 tons of CO₂ per ton of crude steel. NSCL’s MIDREX gas-based DRI route lowers CO₂ intensity dramatically.</p>
            <p data-reveal className="body mt-5">Reformed natural gas (H₂ and CO) reduces iron oxide to metallic iron in the solid state, without melting, inside the shaft furnace. That removes the slag, soot and high carbon emissions typical of blast furnace smelting.</p>
            <p data-reveal className="body mt-5">The MIDREX shaft can also move to increasing shares of green hydrogen (H₂), opening a path to near-zero-emission steelmaking in Pakistan.</p>
          </div>

          <figure data-reveal className="chart panel self-start" aria-label="Carbon intensity comparison">
            <div className="eyebrow">Emissions differential</div>
            <h3 className="text-3xl">CO₂ per ton of iron</h3>
            <div className="mt-8 grid gap-7">
              <div>
                <div className="flex justify-between gap-4 text-sm"><span className="mono-label">Blast furnace route (BF-BOF)</span><span className="font-mono font-semibold">~2.0 – 2.2 t</span></div>
                <div className="mt-2 h-4 rounded-full bg-sky-light/8"><div className="bar h-full rounded-full bg-gradient-to-r from-sky-light-300 to-sky-light-200" style={{ width: '100%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between gap-4 text-sm"><span className="mono-label !text-amber-flame">NSCL gas-based MIDREX DRI</span><span className="font-mono font-semibold text-amber-flame">~0.7 – 0.9 t</span></div>
                <div className="mt-2 h-4 rounded-full bg-sky-light/8"><div className="bar h-full rounded-full bg-gradient-to-r from-amber-flame to-princeton" style={{ width: '38%' }} /></div>
              </div>
            </div>
            <figcaption className="mt-8 flex items-end gap-4 border-t border-sky-light/10 pt-6">
              <span className="font-mono text-6xl font-semibold leading-none text-amber-flame tabular-nums"><span data-count="60">60</span>%</span>
              <span className="pb-1 text-sm text-sky-light-800/70">Up to 55%–60% lower carbon footprint, with zero coke combustion.</span>
            </figcaption>
          </figure>
        </div>

        <div className="wrap mt-20 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} data-reveal className="panel group transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-blue-green/50">
              <span className="grid h-12 w-12 place-items-center rounded-lg border border-blue-green/30 bg-blue-green/10 text-blue-green-600 transition group-hover:bg-blue-green group-hover:text-deep-space-100"><Icon size={22} /></span>
              <h3 className="mt-6 text-3xl">{title}</h3>
              <p className="body mt-3">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Net zero banner: same treatment as the other full-bleed photo bands (tall, faded into the page, mono caption).
          Height is capped so the 3:1 image keeps its centred "Net Zero" lettering on wide screens. */}
      <section className="zoom-wrap relative h-[min(80vh,46vw)] min-h-[420px] overflow-hidden">
        <img src={img['net-zero']} alt="Net zero carbon emission: solar panels, mangroves, recycling and wind turbines" loading="lazy"
          className="zoom-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-deep-space-200/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space-200 via-deep-space-200/10 to-deep-space-200/70" />
        <div className="wrap relative flex h-full items-end pb-14">
          <div>
            <div className="eyebrow eyebrow-hot">Long-term goal</div>
            <p className="mono-label !text-sky-light-800">Net zero carbon emission · solar, wind, mangroves &amp; hydrogen-ready ironmaking</p>
          </div>
        </div>
      </section>

      <section id="Renewables" className="scroll-mt-24 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Renewables & nature" title="Clean power and carbon sinks"
            lead="Beyond cleaner ironmaking, NSCL is building its own renewable generation and a coastal carbon sink at Port Qasim." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {initiatives.map(({ icon: Icon, value, suffix, unit, title, text }) => (
              <article key={title} data-reveal className="panel group flex flex-col transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-amber-flame/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[clamp(2.8rem,5vw,4rem)] font-semibold leading-none text-amber-flame tabular-nums">
                      <span data-count={value} data-group={value >= 1000 ? '' : undefined}>{value.toLocaleString('en-US')}</span>{suffix}
                    </div>
                    <div className="mono-label mt-3">{unit}</div>
                  </div>
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-lg border border-amber-flame/30 bg-amber-flame/10 text-amber-flame transition group-hover:bg-amber-flame group-hover:text-deep-space-100"><Icon size={22} /></span>
                </div>
                <h3 className="mt-8 border-t border-sky-light/10 pt-6 text-3xl">{title}</h3>
                <p className="body mt-3">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="Roadmap" className="scroll-mt-24 border-y border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <SectionHead center eyebrow="Decarbonisation pathway" title="Our route to net zero"
            lead="Each step builds on the gas-based platform NSCL runs today." />
          <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-flame via-princeton to-sky-light/15 lg:inset-x-[10%] lg:top-[11px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" />
            {roadmap.map(({ stage, title, text }, i) => (
              <li key={title} data-reveal className="relative pl-12 lg:pl-0 lg:text-center">
                <span aria-hidden="true" className={`absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full border-2 lg:relative lg:mx-auto ${i === 0 ? 'border-amber-flame bg-amber-flame' : 'border-amber-flame/60 bg-deep-space-200'}`}>
                  {i === 0 && <span className="h-2 w-2 rounded-full bg-deep-space-100" />}
                </span>
                <div className={`mono-label lg:mt-6 ${i === 0 ? '!text-amber-flame' : ''}`}>{String(i + 1).padStart(2, '0')} · {stage}</div>
                <h3 className="mt-2 text-2xl">{title}</h3>
                <p className="body mt-2 text-[0.95rem]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHead center eyebrow="Comprehensive governance" title="Explore our sustainability pillars" lead="How NSCL balances environmental rigor with workplace safety and operational accountability." />
          <div className="mx-auto mt-14 max-w-xl">
            <Link to="/health-safety" data-reveal className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-sky-light/12">
              <img src={img.safety} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-space-200 via-deep-space-200/75 to-deep-space-200/20" />
              <div className="relative p-8">
                <ShieldAlert size={26} className="text-amber-flame" />
                <h3 className="mt-4 text-3xl">Health &amp; safety</h3>
                <p className="body mt-2">Zero-harm occupational safety management, high-temperature protocols and emergency readiness drills.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-flame">View safety standards <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand image={img.night} eyebrow="Green steel" title="Built for the hydrogen transition"
        text="See how the MIDREX shaft furnace reduces iron ore with natural gas today and is ready for higher hydrogen blends tomorrow."
        primary={{ to: '/dri-technology', label: 'Explore DRI Technology' }} secondary={{ to: '/contact-us', label: 'Contact us' }} />
    </div>
  );
}
