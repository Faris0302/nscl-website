import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { partners } from '../data/company';
import { img } from '../lib/img';

// Country of each partner (from the original nscl.com.pk collaboration page)
const country: Record<string, string> = {
  'Allmineral Aufbereitungstechnik GmbH & Co. KG': 'Germany', 'NewFer GmbH & Co. KG': 'Germany', 'DMT GmbH & Co. KG': 'Germany',
  'TripleS GmbH & Co. KG': 'Germany', 'Ruhr Montan Group (RMG)': 'Germany', 'KPMG Taseer Hadi & Co.': 'Pakistan',
  'Ali Khan Law Associates': 'Pakistan', 'Delphos International': 'United States', 'Next Capital Limited': 'Pakistan',
  'National Management Consultants (Pvt) Limited': 'Pakistan', 'Syed Shabbar Zaidi & Co.': 'Pakistan', 'EMC Pakistan (Pvt) Ltd': 'Pakistan',
};
// Partner logos: file key and natural size, used to give wide and tall marks similar visual weight
const logos: Record<string, [string, number, number]> = {
  'Allmineral Aufbereitungstechnik GmbH & Co. KG': ['partner-allmineral', 151, 150], 'NewFer GmbH & Co. KG': ['partner-newfer', 204, 208],
  'DMT GmbH & Co. KG': ['partner-dmt', 480, 170], 'TripleS GmbH & Co. KG': ['partner-triples', 281, 130],
  'Ruhr Montan Group (RMG)': ['partner-rmg', 247, 61], 'EMC Pakistan (Pvt) Ltd': ['partner-emc', 332, 480],
  'KPMG Taseer Hadi & Co.': ['partner-kpmg', 396, 168], 'Ali Khan Law Associates': ['partner-alikhan', 418, 96],
  'Delphos International': ['partner-delphos', 223, 72], 'Next Capital Limited': ['partner-nextcapital', 249, 98],
  'National Management Consultants (Pvt) Limited': ['partner-nmc', 172, 48], 'Syed Shabbar Zaidi & Co.': ['partner-shabbar', 149, 46],
};
const logoSize = (w: number, h: number) => {
  const a = w / h;
  let ht = Math.sqrt(7800 / a), wd = ht * a;
  if (ht > 74) { ht = 74; wd = ht * a; }
  if (wd > 230) { wd = 230; ht = wd / a; }
  return { width: Math.round(wd), height: Math.round(ht) };
};
const engineering = new Set(['Allmineral Aufbereitungstechnik GmbH & Co. KG', 'NewFer GmbH & Co. KG', 'DMT GmbH & Co. KG', 'TripleS GmbH & Co. KG', 'Ruhr Montan Group (RMG)', 'EMC Pakistan (Pvt) Ltd']);
const groups = [
  { title: 'Technology & engineering', items: partners.filter(p => engineering.has(p.name)) },
  { title: 'Finance, legal & advisory', items: partners.filter(p => !engineering.has(p.name)) },
];

const entities = [
  { short: 'APCL', name: 'AlHadeed Pelletization Company Limited', url: 'https://apcl.com.pk/', image: img.pelletization, text: 'Beneficiation and pelletization projects that drive vertical integration and feed the DRI plant.' },
  { short: 'AECL', name: 'AlHadeed Extraction Company Limited', url: 'https://aecl.pk/', image: img.beneficiation, text: 'Mechanized mining of high-grade iron ore in Pakistan, securing the first link of the value chain.' },
  { short: 'QES', name: 'Q Engineering Services', url: 'https://qes-peach.vercel.app/', image: img.fabrication, text: 'EPC services, a technology centre and a large-scale fabrication facility at Port Qasim.' },
];

export function OurCollaboration() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    // Partner cards flip up out of the page in a wave
    (q('.partner-grid') as HTMLElement[]).forEach(grid => {
      // fromTo with explicit end values: a plain from() reads the cards' current style as its target,
      // which is opacity 0 if the effect runs again before the first run's styles have cleared.
      gsap.fromTo(grid.children, { rotateX: -55, y: 50, autoAlpha: 0, transformOrigin: '50% 0%' }, {
        rotateX: 0, y: 0, autoAlpha: 1, stagger: { each: 0.08, from: 'start' }, duration: 1, ease: 'power3.out', clearProps: 'transform,transformOrigin',
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
      });
    });
    // Group entity panels expand from a sliver
    gsap.from(q('.entity'), {
      clipPath: 'inset(45% 0 45% 0 round 18px)', stagger: 0.15, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: q('.entities')[0], start: 'top 80%', once: true },
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Our Collaborations" eyebrow="Strategic ecosystem" title="Partnerships & group synergies" image={img.day}
        lead="Alliances across global technology licensors, domestic mining divisions and heavy engineering EPC providers." />

      <section className="py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <SectionHead eyebrow="Ecosystem architecture" title="Strategic collaboration matrix" lead="International technological pedigree combined with local mineral extraction and manufacturing expertise." />
            <dl className="flex gap-10">
              {[[partners.length, 'Project partners'], [new Set(Object.values(country)).size, 'Countries']].map(([v, l]) => (
                <div key={l as string} className="border-l-2 border-amber-flame pl-5">
                  <dd className="font-mono text-5xl font-semibold tabular-nums"><span data-count={v}>{v}</span></dd>
                  <dt className="mono-label mt-2">{l}</dt>
                </div>
              ))}
            </dl>
          </div>

          {groups.map(g => (
            <div key={g.title} className="mt-16">
              <h3 className="mb-6 flex items-center gap-4 text-2xl">{g.title}<span className="h-px flex-1 bg-sky-light/15" /></h3>
              <div className="partner-grid grid gap-5 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
                {g.items.map(p => (
                  <article key={p.name} className="panel group flex min-w-0 flex-col transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-blue-green/50">
                    {logos[p.name] && (
                      <div className="mb-5 grid h-[104px] place-items-center rounded-[10px] bg-white">
                        <img src={img[logos[p.name][0]]} alt="" loading="lazy" style={logoSize(logos[p.name][1], logos[p.name][2])} />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="min-w-0 text-2xl leading-tight [overflow-wrap:anywhere]">{p.name}</h4>
                      <span className="flex-none rounded-full border border-blue-green/35 bg-blue-green/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-blue-green-700">{country[p.name] ?? '—'}</span>
                    </div>
                    <p className="body mt-3 flex-1 text-sm">{p.text}</p>
                    <div className="mt-5 rounded-lg border-l-[3px] border-amber-flame bg-amber-flame/8 px-4 py-3">
                      <div className="mono-label !text-amber-flame">Scope with NSCL</div>
                      <div className="mt-1 text-sm font-semibold text-sky-light-900">{p.focus}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Group synergies" title="Our group companies" lead="From raw ore extraction to high-precision engineering services across the steel value chain." />
          <div className="entities mt-14 grid gap-6 lg:grid-cols-3">
            {entities.map(e => (
              <a key={e.short} href={e.url} target="_blank" rel="noreferrer" className="entity group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-2xl border border-sky-light/12">
                <img src={e.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space-200 via-deep-space-200/70 to-deep-space-200/10" />
                <div className="relative p-7">
                  <span className="inline-grid h-12 w-16 place-items-center rounded-lg bg-gradient-to-br from-amber-flame to-princeton font-display text-lg font-bold text-deep-space-100">{e.short}</span>
                  <h3 className="mt-4 text-3xl">{e.name}</h3>
                  <p className="body mt-2 text-sm">{e.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-flame">Visit site <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand image={img.cooling} eyebrow="Green metallurgy" title="Committed to sustainable production"
        text="How gas-based MIDREX reduction lowers the carbon footprint compared with coal-fired blast furnaces, alongside closed-loop water management."
        primary={{ to: '/sustainability', label: 'Our sustainability' }} secondary={{ to: '/contact-us', label: 'Partner with us' }} />
    </div>
  );
}
