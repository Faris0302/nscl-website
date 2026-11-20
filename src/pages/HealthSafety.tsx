import { useRef, useState } from 'react';
import { AlertOctagon, ChevronDown, ClipboardCheck, Flame, GraduationCap, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { ScrollTrigger } from '../lib/gsap';
import { img } from '../lib/img';

const framework = [
  { icon: ShieldCheck, title: 'Personal protective equipment (PPE) mandates', text: 'All personnel, contractors and site visitors wear specialized protective gear: heat-resistant aluminized clothing near the furnace, NFPA-certified flame-retardant coveralls, steel-toed dielectric safety footwear, high-impact polycarbonate eye protection and personal gas monitors for CO/CH₄ detection.' },
  { icon: Flame, title: 'High-temperature process safety & gas interlocks', text: 'Running a direct reduction shaft furnace at up to 900°C requires fail-safe engineering: automated nitrogen purging circuits, dual automated emergency shutdown (ESD) valves on all natural gas feed lines, and triple-redundant flame scanners continuously polled by safety PLCs.' },
  { icon: AlertOctagon, title: 'Emergency response & crisis management', text: 'NSCL maintains a 24/7 on-site emergency command center with dedicated industrial fire tenders, self-contained breathing apparatus (SCBA) banks, high-volume foam suppression systems, and mutual-aid agreements with the Port Qasim Authority Fire & Rescue brigades.' },
  { icon: GraduationCap, title: 'Continuous training & competency certification', text: 'Before entering active operational areas, every employee completes induction modules covering permit-to-work (PTW), lockout-tagout (LOTO) isolation, confined space entry, working at heights, and high-temperature molten metal handling drills.' },
  { icon: ClipboardCheck, title: 'Incident reporting & independent safety audits', text: 'A transparent, no-blame near-miss reporting culture. Periodic third-party safety audits, daily toolbox talks and weekly safety steering committee reviews drive continuous improvement toward Zero Harm across all operations.' },
];

export function HealthSafety() {
  const page = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  usePageMotion(page);

  return (
    <div ref={page}>
      <PageHero crumb="Health & Safety" eyebrow="Zero harm philosophy" title="Health, safety & environment" image={img.safety}
        lead="Safety governance, hazard prevention and high-temperature operating protocols so that everyone on our site returns home safely every day." />

      <section className="py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead eyebrow="Operational standards" title="Comprehensive safety framework" lead="Open each pillar to see our protocols, engineering controls and emergency procedures." />
            <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-sky-light/12">
              <img src={img.careers} alt="NSCL plant team in protective equipment" className="h-72 w-full object-cover" />
              <div className="flex items-center gap-5 bg-deep-space-300 p-6">
                <span className="font-display text-7xl font-bold leading-none text-amber-flame">0</span>
                <span className="text-sm text-sky-light-800/75">Our goal: <strong className="text-sky-light-900">Zero Harm</strong> across all operations, for employees, contractors and visitors.</span>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4">
            {framework.map(({ icon: Icon, title, text }, i) => {
              const isOpen = open === i;
              return (
                <div key={title} data-reveal className={`rounded-xl border transition-colors duration-300 ${isOpen ? 'border-amber-flame/50 bg-deep-space-300' : 'border-sky-light/12 bg-deep-space-300/50 hover:border-sky-light/30'}`}>
                  <h3 className="text-xl md:text-2xl">
                    <button type="button" id={`hs-q${i}`} aria-controls={`hs-a${i}`} aria-expanded={isOpen} onClick={() => { setOpen(isOpen ? -1 : i); window.setTimeout(() => ScrollTrigger.refresh(), 550); }}
                      className="flex w-full items-center gap-4 p-6 text-left uppercase">
                      <span className={`grid h-11 w-11 flex-none place-items-center rounded-lg transition ${isOpen ? 'bg-amber-flame text-deep-space-100' : 'bg-blue-green/10 text-blue-green-600'}`}><Icon size={20} /></span>
                      <span className="flex-1">{title}</span>
                      <ChevronDown size={20} className={`flex-none transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-flame' : ''}`} />
                    </button>
                  </h3>
                  <div id={`hs-a${i}`} role="region" aria-labelledby={`hs-q${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="body px-6 pb-6 pl-[5.25rem] text-[1rem]">{text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
