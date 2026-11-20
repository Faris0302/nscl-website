import { useRef } from 'react';
import { ArrowUpRight, Boxes, Building, ClipboardList, Cog, PencilRuler, Wrench } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { Calculators } from '../components/Calculators';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { img } from '../lib/img';

const capabilities = [
  { icon: PencilRuler, title: 'Detailed engineering & design', text: '3D plant modeling, finite element analysis (FEA), piping stress simulation and DCS/SCADA architecture schematics.' },
  { icon: Boxes, title: 'Global sourcing & procurement', text: 'International supply chain management for API-grade piping, specialized alloys, high-temperature refractories and critical rotating equipment.' },
  { icon: Building, title: 'Civil & heavy construction', text: 'Marine pile driving, reinforced foundations for vibrating machinery, structural steel erection and industrial roofing.' },
  { icon: Wrench, title: 'Precision heavy fabrication', text: 'ASME-certified welding, pressure vessels, heat exchanger bundles, heavy ductwork and modular process skids.' },
  { icon: ClipboardList, title: 'Plant commissioning & start-up', text: 'Cold loop checks, refractory dry-out, burner management tuning, safety shutdown verification and performance guarantee trials.' },
  { icon: Cog, title: 'Lifecycle maintenance & overhaul', text: '24/7 predictive condition monitoring, vibration analysis, emergency repairs and planned turnaround overhauls.' },
];

const machines = [
  ['machine1', 'Heavy-duty lathe'], ['machine2', 'Hydraulic press brake'], ['machine3', 'Industrial band saw'], ['machine4', 'Hydraulic ironworker'],
  ['machine5', 'Section bending machine'], ['machine6', 'Plate rolling machine'], ['machine7', 'Hydraulic guillotine shear'], ['machine8', 'Radial drilling machine'],
];

export function QEngineering() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    // Two office photos move at different speeds for depth
    gsap.to(q('.depth-a'), { yPercent: -12, ease: 'none', scrollTrigger: { trigger: q('.depth')[0], start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to(q('.depth-b'), { yPercent: 14, ease: 'none', scrollTrigger: { trigger: q('.depth')[0], start: 'top bottom', end: 'bottom top', scrub: true } });
    // Machinery tiles deal out from the centre
    gsap.from(q('.machine'), {
      scale: 0.7, autoAlpha: 0, y: 40, duration: 0.9, ease: 'back.out(1.4)', stagger: { each: 0.08, from: 'center' },
      scrollTrigger: { trigger: q('.machines')[0], start: 'top 78%', once: true },
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Q-Engineering Services" eyebrow="Engineering, procurement & construction" title="Q-Engineering Services" image={img.fabrication}
        lead="The heavy engineering arm of our group: design, structural fabrication, precision machining and EPC execution for heavy industrial facilities.">
        <a data-reveal href="https://qes-peach.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-line mt-8">Visit the QES website <ArrowUpRight size={16} /></a>
      </PageHero>

      <section id="technology" className="scroll-mt-24 py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Innovation & design center" title="State-of-the-art technology center" />
            <p data-reveal className="lead mt-7">Q-Engineering’s Technology Center brings together metallurgical, mechanical, civil and electrical engineers specializing in heavy process industry infrastructure.</p>
            <p data-reveal className="body mt-5">With CAD/CAM workstations, computational fluid dynamics (CFD) simulation and finite element modeling, the teams design high-temperature gas conduits, pressure vessels and automation control systems to international codes (ASME, API, DIN, ISO).</p>
          </div>
          <div className="depth relative h-[460px]">
            <img src={img['qes-1']} alt="QES technology center" loading="lazy" className="depth-a absolute left-0 top-0 h-[78%] w-[62%] rounded-2xl border border-sky-light/12 object-cover shadow-2xl" />
            <img src={img['qes-2']} alt="QES engineering office" loading="lazy" className="depth-b absolute bottom-0 right-0 h-[62%] w-[60%] rounded-2xl border border-sky-light/12 object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="fabrication" className="scroll-mt-24 border-y border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <SectionHead eyebrow="Workshop capability" title="Heavy fabrication & machining facility" />
              <p data-reveal className="lead mt-7">The Bin Qasim fabrication facility handles complex structural and pressure equipment manufacturing.</p>
              <p data-reveal className="body mt-5">Capabilities include CNC plasma and oxy-fuel cutting, 4-roll heavy plate bending, submerged arc welding (SAW), automated tube-to-tubesheet orbital welding and precision large-diameter horizontal boring.</p>
            </div>
            <dl className="grid grid-cols-3 content-center gap-4">
              {[['25000', 'm²', 'Covered workshop floor'], ['50', 't', 'Overhead crane capacity'], ['75', 'mm', 'Max plate bending thickness']].map(([v, u, l]) => (
                <div key={l} data-reveal className="rounded-xl border border-sky-light/12 bg-deep-space-200 p-5">
                  <dd className="font-mono text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold leading-none tabular-nums"><span data-count={v} data-group>{Number(v).toLocaleString('en-US')}</span><span className="text-amber-flame">{u}</span></dd>
                  <dt className="mt-3 text-xs text-sky-light-800/70">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-14 overflow-hidden rounded-2xl border border-sky-light/12">
            <img src={img.fabrication} alt="QES fabrication workshop" loading="lazy" data-parallax="0.15" className="h-[460px] w-full scale-110 object-cover" />
          </div>
        </div>
      </section>

      <section id="machines" className="scroll-mt-24 py-28">
        <div className="wrap">
          <SectionHead center eyebrow="On the workshop floor" title="Industrial machinery gallery" lead="The heavy-duty machines behind our fabrication, machining and construction work." />
          <div className="machines mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {machines.map(([key, name]) => (
              <figure key={key} className="machine group relative aspect-[4/3] overflow-hidden rounded-xl border border-sky-light/12">
                <img src={img[key]} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-deep-space-200 to-transparent p-4 pt-10 font-display text-lg font-semibold uppercase leading-tight opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100">{name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-24 border-t border-sky-light/10 bg-deep-space-300/50 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Fabrication planning tools" title="Engineering calculators" lead="Estimate material weights and rolling requirements before your next fabrication inquiry." />
          <div data-reveal className="mt-12"><Calculators /></div>
        </div>
      </section>

      <section id="profile" className="scroll-mt-24 py-28">
        <div className="wrap">
          <SectionHead center eyebrow="Service spectrum" title="Corporate engineering capabilities" lead="From concept and manufacturing to operational maintenance." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article key={title} data-reveal className="panel group transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-amber-flame/50">
                <span className="grid h-12 w-12 place-items-center rounded-lg border border-amber-flame/30 bg-amber-flame/10 text-amber-flame transition group-hover:bg-amber-flame group-hover:text-deep-space-100"><Icon size={22} /></span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="body mt-3 text-[0.95rem]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand image={img.careers} eyebrow="Talent & opportunities" title="Build your engineering career at NSCL"
        text="We recruit metallurgists, mechanical designers, control engineers and safety professionals."
        primary={{ to: '/hr-careers', label: 'View careers' }} secondary={{ to: '/contact-us', label: 'Fabrication inquiry' }} />
    </div>
  );
}
