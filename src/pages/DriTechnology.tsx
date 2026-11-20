import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Flame, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Furnace } from '../components/Furnace';
import { usePageMotion } from '../components/Motion';
import type { FurnaceScene, Shot } from '../three/FurnaceScene';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { img } from '../lib/img';

const stages = [
  { title: 'Ore charging', temp: 'Ambient temperature', tone: 'text-sky-light', text: 'High-grade oxide iron ore pellets (67%+ Fe) are conveyed into the top seal hopper and move steadily downward through the vertical shaft furnace by gravity.' },
  { title: 'Gas reforming', temp: '~900°C catalytic reactor', tone: 'text-blue-green-600', text: 'Natural gas (CH₄) and recycled off-gas are catalytically reformed into high-purity reducing gas (H₂ + CO), with no external steam added.' },
  { title: 'Reduction zone', temp: '800°C – 850°C reaction bed', tone: 'text-amber-flame', text: 'Hot reducing gas flows upward against the descending pellet bed, stripping away oxygen while the iron stays solid.' },
  { title: 'Cooling / hot discharge', temp: '600°C – 700°C (HDRI / CDRI)', tone: 'text-princeton-700', text: 'Fully metallized DRI leaves the furnace through the product discharge chute. It is either cooled for merchant shipment (CDRI) or kept hot for the melt shop (HDRI), with a bypass feed leg to the quench tank.' },
  { title: 'Hot charging to the EAF', temp: '650°C+ direct charge', tone: 'text-princeton', text: 'Hot DRI is screw-fed into the EAF feed bin and drops down the feed leg straight into the electric arc furnace at 650°C or more, saving melting energy and shortening tap-to-tap time.' },
];

const processShots: Shot[] = [
  { pos: [9, 32, 15.5], look: [0, 26.2, 0], heat: 0.15, zone: 0 },      // charge hopper and seal leg
  { pos: [23, 13, -20], look: [9, 3, -6], heat: 0.35, zone: 1 },  // gas reformer
  { pos: [-10.5, 20, 12], look: [0, 18, 0], heat: 0.75, zone: 2 },        // reduction furnace
  { pos: [-11, 10, 18.5], look: [-2.6, 5.6, 1.2], heat: 0.9, zone: 3 },        // PDC and bypass to the quench tank
  { pos: [13, 8.5, 16.5], look: [2.6, 5, 0.6], heat: 1, zone: 3 },        // feed bin, feed leg and EAF
];

const comparison = [
  ['Primary reducing fuel', 'Clean natural gas (H₂ + CO) vs. metallurgical coal & coke'],
  ['Physical state during reduction', 'Solid-state (no melting) vs. liquid molten pig iron'],
  ['Reaction temperature zone', '800°C – 850°C vs. 1,450°C – 1,600°C blast smelting'],
];

const values = [
  { icon: Atom, tag: 'Purity & strength', title: 'Consistent chemistry', text: 'Virgin iron free of residual tramp elements (copper, tin, lead < 0.005%) for high-yield ductile rebar, seismic wire rod and automotive-grade alloy steels.' },
  { icon: ShieldCheck, tag: 'Supply security', title: 'Scrap independence', text: 'Shields Pakistan’s re-rolling mills from volatile global scrap prices and exchange-rate swings, with continuous domestic metallic supply.' },
  { icon: Flame, tag: 'Decarbonization', title: 'Lower emissions route', text: '55% to 60% lower carbon footprint per ton than coal-fired blast furnaces: a cornerstone of Pakistan’s green industrial transition.' },
];

const results: [string, string, number, number, string][] = [
  ['Average adjusted production rate (AP)', '160.0 t/h minimum', 163.6, 1, ' t/h'],
  ['Average metallization (M)', '93.0% minimum', 93.9, 1, '%'],
  ['Average carbon content', '1.2% – 1.8% controlled', 1.78, 2, '%'],
  ['Average net natural gas consumption', '10.5 mm Btu (2.65 Gcal) max / ton', 9.8, 1, ' mm Btu / ton'],
  ['Average electricity consumption', '125.0 kWh / ton maximum', 120, 1, ' kWh / ton'],
];

function ProcessScene() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<FurnaceScene | null>(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const prog = { p: 0 };
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => {
        scene.current?.setProgress(prog.p);
        const s = Math.min(stages.length - 1, Math.floor(prog.p * stages.length + 0.0001));
        if (s !== stageRef.current) { stageRef.current = s; setStage(s); }
      },
      scrollTrigger: { trigger: root.current, start: 'top top', end: '+=400%', pin: true, scrub: 0.6, anticipatePin: 1 },
    });
  }, { scope: root });

  const reduced = prefersReducedMotion();
  return (
    <div ref={root} className="relative flex min-h-[100svh] items-center py-24 lg:py-0">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <ol className="mb-8 flex gap-2" aria-label="Process stages">
            {stages.map((s, i) => (
              <li key={s.title} className="flex-1">
                <div className="h-1 overflow-hidden rounded-full bg-sky-light/12">
                  <div className={`h-full rounded-full bg-gradient-to-r from-amber-flame to-princeton transition-all duration-500 ${i <= stage ? 'w-full' : 'w-0'}`} />
                </div>
                <span className={`mono-label mt-2 block !text-[0.62rem] ${i === stage ? '!text-amber-flame' : ''}`}>0{i + 1}</span>
              </li>
            ))}
          </ol>
          <div className="relative min-h-[17rem]">
            {stages.map((s, i) => (
              <article key={s.title} aria-hidden={!reduced && i !== stage}
                className={`${reduced ? 'relative mb-8' : 'absolute inset-0'} transition-all duration-500 ${reduced || i === stage ? 'translate-y-0 opacity-100' : i < stage ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0'}`}>
                <div className="mono-label">Step 0{i + 1}</div>
                <h3 className="mt-2 text-[clamp(2.2rem,4vw,3.4rem)]">{s.title}</h3>
                <div className={`mt-2 font-mono text-sm font-semibold ${s.tone}`}>{s.temp}</div>
                <p className="body mt-5 max-w-md text-[1.05rem]">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="order-1 h-[46svh] overflow-hidden rounded-2xl border border-sky-light/12 bg-[radial-gradient(ellipse_at_50%_70%,#023047_0%,#01131c_70%)] lg:order-2 lg:h-[76vh]">
          <Furnace shots={processShots} onReady={s => (scene.current = s)} fallback={img.shaft} label="3D MIDREX plant with hot transport: charge hopper, reformer, reduction furnace, PDC, EAF feed bin and electric arc furnace" />
        </div>
      </div>
    </div>
  );
}

export function DriTechnology() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  return (
    <div ref={page}>
      <PageHero crumb="DRI Technology" eyebrow="The MIDREX process" title="World-class direct reduction technology" image={img.night}
        lead="Japanese MIDREX gas-based metallurgy that converts iron ore oxide pellets into ultra-high-purity solid metallics, with industry-leading thermal and environmental efficiency." />

      <section id="technology" className="scroll-mt-24 py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">Solid-state metallurgy</div>
            <h2 data-split className="h-section">A shaft furnace, not a blast furnace</h2>
            <p data-reveal className="lead mt-7">In Direct Reduced Iron (DRI), reduction happens entirely in the solid state. Conventional blast furnaces burn metallurgical coke to melt iron ore at 1,500°C+; the MIDREX shaft furnace runs below the melting point of iron, at about 800°C – 850°C.</p>
            <p data-reveal className="body mt-5">Inside the vertical shaft, a counter-current flow of hot reducing gas (hydrogen H₂ and carbon monoxide CO) strips oxygen from iron oxide pellets (Fe₂O₃). The result is metallic iron (Fe) that keeps its pellet shape and gains a porous, sponge-like structure.</p>
            <p data-reveal className="body mt-5">The route needs no coke ovens or sinter plants and avoids slag-heavy emissions, cutting capital footprint, energy use and environmental impact.</p>
          </div>
          <div data-reveal className="panel self-start">
            <div className="eyebrow">Process comparison</div>
            <h3 className="text-3xl">MIDREX shaft vs. blast furnace</h3>
            <dl className="mt-7 grid gap-3">
              {comparison.map(([k, v]) => (
                <div key={k} className="rounded-lg bg-deep-space-400/80 p-4">
                  <dt className="mono-label">{k}</dt>
                  <dd className="mt-1 font-semibold text-sky-light-900">{v}</dd>
                </div>
              ))}
              <div className="rounded-lg border-l-[3px] border-amber-flame bg-amber-flame/8 p-4">
                <dt className="mono-label !text-amber-flame">Hydrogen transition capability</dt>
                <dd className="mt-1 font-semibold text-sky-light-900">100% green H₂ ready architecture for net-zero steel</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="significance" className="scroll-mt-24 border-y border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">Strategic value proposition</div>
            <h2 data-split className="h-section">Why DRI matters to Pakistan’s economy</h2>
            <p data-reveal className="lead mt-5">Consistent metallurgy, scrap independence and environmental gains for downstream steelmakers.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, tag, title, text }) => (
              <article key={title} data-reveal className="panel group transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-amber-flame/50">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-amber-flame/30 bg-amber-flame/10 text-amber-flame transition group-hover:bg-amber-flame group-hover:text-deep-space-100"><Icon size={22} /></div>
                <div className="mono-label mt-6 !text-blue-green-600">{tag}</div>
                <h3 className="mt-1 text-3xl">{title}</h3>
                <p className="body mt-3">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 pt-28">
        <div className="wrap mx-auto max-w-3xl text-center">
          <div className="eyebrow">Thermodynamic precision</div>
          <h2 data-split className="h-section">Most efficient use of gas</h2>
          <p data-reveal className="lead mt-5">Scroll through the MIDREX shaft furnace and reformer loop at Port Bin Qasim, one stage at a time.</p>
        </div>
        <ProcessScene />
      </section>

      <section id="plant" className="scroll-mt-24 border-t border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-blue-green/40 bg-blue-green/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-blue-green-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-green-600" /> Verified by Midrex Technologies, Inc.
          </div>
          <h2 data-split className="h-section mt-6 max-w-4xl">Plant demonstration test & verified results</h2>
          <p data-reveal className="lead mt-6 max-w-4xl">After commercial start-up on May 25, 2013 (under the December 2011 licensing and technical assistance agreements), the Bin Qasim plant completed its official 72-hour continuous demonstration test, supervised by engineers from Midrex Technologies, Inc. (USA) and Kobe Steel, Ltd. (Japan).</p>
          <p data-reveal className="mt-4 text-sm italic text-sky-light-700/60">The facility was founded and commissioned as Tuwairqi Steel Mills Limited (TSML) and now operates as National Steel Complex Limited (NSCL).</p>

          <div data-reveal className="mt-12 overflow-x-auto rounded-xl border border-sky-light/12">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-deep-space-400 font-mono text-xs uppercase tracking-wider text-sky-light-700/70">
                <tr><th className="p-5 font-medium">Performance item</th><th className="p-5 font-medium">MIDREX guaranteed</th><th className="p-5 font-medium">Actual test result</th></tr>
              </thead>
              <tbody>
                {results.map(([item, g, v, d, suf]) => (
                  <tr key={item} className="border-t border-sky-light/10 transition hover:bg-deep-space-400/50">
                    <td className="p-5 font-semibold">{item}</td>
                    <td className="p-5 text-sky-light-800/70">{g}</td>
                    <td className="p-5 font-mono text-lg font-semibold text-amber-flame tabular-nums"><span data-count={v} data-decimals={d} data-suffix={suf}>{v.toFixed(d) + suf}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div data-reveal className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-sky-light/12 bg-deep-space-200 px-6 py-4 font-mono text-xs text-sky-light-800/70">
            <span>Performance formula: <code className="text-amber-flame">AP = P × {'{'}1 + 0.025 × (M − 93){'}'}</code>, where P = measured hourly output and M = metallization %.</span>
            <span>Commercial start-up: May 25, 2013</span>
          </div>
          <figure data-reveal className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-sky-light/12 bg-deep-space-200 p-4">
            <img src={img.certificate} alt="MIDREX demonstration test certificate" loading="lazy" className="w-full rounded" />
            <figcaption className="mono-label pt-3 text-center">Demonstration test certificate issued by Midrex Technologies, Inc. and Kobe Steel, Ltd.</figcaption>
          </figure>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-32">
        <div className="absolute inset-0 -z-20 overflow-hidden"><img src={img['p-hdri']} alt="" data-parallax="0.4" className="h-[130%] w-full object-cover" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-space-200/96 via-deep-space-200/85 to-deep-space-200/50" />
        <div className="wrap"><div className="max-w-3xl">
          <div className="eyebrow eyebrow-hot">Product offerings</div>
          <h2 data-split className="h-section">Explore our DRI & HBI specifications</h2>
          <p data-reveal className="lead mt-5">From cold merchant pellets (CDRI) to direct hot discharge (HDRI) and export-grade briquettes (HBI).</p>
          <div data-reveal className="mt-9 flex flex-wrap gap-4">
            <Link to="/products" className="btn btn-hot">View product catalog <ArrowRight size={16} /></Link>
            <Link to="/contact-us" className="btn btn-line">Inquire with sales</Link>
          </div>
        </div></div>
      </section>
    </div>
  );
}
