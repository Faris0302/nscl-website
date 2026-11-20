import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Briefcase, CheckCircle2, Clock, GraduationCap, MapPin, ShieldCheck, Trophy, Upload } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { Flip, gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { jobs, type Job } from '../data/jobs';
import { contact, forms } from '../data/site';
import { img } from '../lib/img';

const depts = ['All', 'Operations', 'Engineering', 'HSE', 'Corporate'] as const;
const evp = [
  { icon: ShieldCheck, title: 'World-class safety first', text: 'ISO 45001 certified protocols, personal telemetry gas detectors, top-tier PPE and dedicated medical support teams.' },
  { icon: GraduationCap, title: 'Continuous upskilling', text: 'Technical seminars with Kobe Steel / Midrex specialists, advanced instrumentation certifications and leadership training.' },
  { icon: Trophy, title: 'Meritocracy & rewards', text: 'Performance-linked annual incentives, provident funds, comprehensive health insurance and fast promotion paths.' },
];
const MAX_CV = 5 * 1024 * 1024;
const field = 'mt-2 block w-full rounded-lg border border-sky-light/15 bg-deep-space-200 px-4 py-3 text-sky-light-900 outline-none transition placeholder:text-sky-light-700/40 focus:border-amber-flame';

function JobCard({ job, onApply }: { job: Job; onApply: (title: string) => void }) {
  return (
    <article data-flip-id={job.id} className="job panel flex flex-col transition-colors hover:border-blue-green/50">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-green/12 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-blue-green-700">{job.department}</span>
        <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-wider text-sky-light-700/60"><Clock size={12} /> {job.type}</span>
      </div>
      <h3 className="mt-4 text-2xl">{job.title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-sky-light-700/70"><MapPin size={14} /> {job.location}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-sky-light-700/70"><Briefcase size={14} /> {job.experience}</p>
      <p className="body mt-4 flex-1 text-sm">{job.description}</p>
      <button type="button" onClick={() => onApply(job.title)} className="btn btn-line mt-6 self-start !py-2.5">Apply now <ArrowRight size={14} /></button>
    </article>
  );
}

export function Careers() {
  const page = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [dept, setDept] = useState<(typeof depts)[number]>('All');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [cvName, setCvName] = useState('');
  usePageMotion(page);

  const shown = dept === 'All' ? jobs : jobs.filter(j => j.department === dept);

  // Filtering: remember card positions, then let Flip animate them into the new layout
  const choose = (d: (typeof depts)[number]) => {
    if (grid.current && !prefersReducedMotion()) flipState.current = Flip.getState(grid.current.querySelectorAll('.job'));
    setDept(d);
  };
  useLayoutEffect(() => {
    // The page height changes with the number of cards, so re-measure scroll triggers
    if (!flipState.current || !grid.current) { ScrollTrigger.refresh(); return; }
    Flip.from(flipState.current, {
      targets: grid.current.querySelectorAll('.job'), duration: 0.6, ease: 'power2.inOut', absolute: true, scale: true,
      onEnter: els => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.5 }),
      onLeave: els => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
  }, [dept]);

  const apply = (title: string) => {
    setRole(title);
    const form = document.getElementById('how-to-apply');
    form && window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    window.setTimeout(() => document.getElementById('app-name')?.focus({ preventScroll: true }), 700);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const cv = fd.get('resume');
    if (!(cv instanceof File) || !cv.size) return setError('Attach your CV or resume (PDF, DOC or DOCX).');
    if (cv.size > MAX_CV) return setError('Your CV or resume must be 5 MB or smaller.');
    if (!/\.(pdf|docx?)$/i.test(cv.name)) return setError('Upload your CV as a PDF, DOC or DOCX file.');
    fd.append('access_key', forms.careers.accessKey);
    fd.append('subject', `Job Application: ${fd.get('role')}`);
    fd.append('replyto', String(fd.get('email')));
    setStatus('sending');
    try {
      const res = await fetch(forms.careers.url, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      const data = await res.json().catch(() => null) as { success?: boolean; message?: string } | null;
      if (!res.ok || !data?.success) throw new Error(data?.message || 'The application could not be sent.');
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(`${err instanceof Error ? err.message : 'The application could not be sent.'} Please try again, or email your CV to ${contact.careers}.`);
    }
  };

  return (
    <div ref={page}>
      <PageHero crumb="Careers" eyebrow="Human capital excellence" title="Shape the future of heavy metallurgy" image={img.careers}
        lead="Join the engineers, metallurgists, control specialists and operational leaders driving Pakistan’s first private-sector integrated DRI complex." />

      <section id="future-of-steel" className="scroll-mt-24 py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Pioneering industry" title="The future of steel is built here" />
            <p data-reveal className="lead mt-7">Working at NSCL puts you at the forefront of Pakistan’s industrial transformation, with hands-on experience of Japanese MIDREX gas reduction technology, a benchmark rarely found in the region.</p>
            <p data-reveal className="body mt-5">From DCS-automated furnace operations and catalytic gas reforming to high-voltage power networks and forward EAF melting, our teams tackle high-impact metallurgical challenges that displace foreign scrap imports and strengthen the national economy.</p>
          </div>
          <div data-reveal className="panel self-start">
            <div className="eyebrow">Why heavy industry?</div>
            <h3 className="text-3xl">Real engineering at scale</h3>
            <ul className="mt-6 grid gap-5">
              {[['1.28 MTPA direct impact', 'Operate high-capacity shaft reactors processing thousands of tons daily.'],
                ['Kobe Steel & Midrex pedigree', 'Learn from global technology licensors and international technical advisors.'],
                ['Decarbonization leadership', 'Pioneer low-carbon gas and green hydrogen reduction routes.']].map(([t, d]) => (
                <li key={t} className="flex gap-3"><CheckCircle2 size={20} className="mt-0.5 flex-none text-amber-flame" /><div><strong className="font-semibold">{t}</strong><p className="text-sm text-sky-light-800/70">{d}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="creating-strength" className="relative isolate scroll-mt-24 overflow-hidden py-32">
        <div className="absolute inset-0 -z-20 overflow-hidden"><img src={img.control} alt="" data-parallax="0.35" className="h-[130%] w-full object-cover" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-space-200/96 via-deep-space-200/88 to-deep-space-200/50" />
        <div className="wrap">
          <div className="max-w-3xl">
            <SectionHead hot eyebrow="Talent development" title="Creating strength from within" />
            <p data-reveal className="lead mt-6">The strength of our steel reflects the strength of our people. NSCL invests in continuous technical education, structured on-site apprenticeships and executive leadership tracks.</p>
            <p data-reveal className="body mt-5">Employees benefit from competitive pay, comprehensive family medical coverage, safe transport to Port Bin Qasim, and on-site continuing professional development (CPD) programs endorsed by the Pakistan Engineering Council (PEC).</p>
          </div>
        </div>
      </section>

      <section id="work-at-nscl" className="scroll-mt-24 py-28">
        <div className="wrap">
          <SectionHead center eyebrow="Employee value proposition" title="Why build your career at NSCL" lead="Comprehensive benefits, a strong safety culture and clear career progression." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {evp.map(({ icon: Icon, title, text }) => (
              <article key={title} data-reveal className="panel group transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-blue-green/50">
                <span className="grid h-12 w-12 place-items-center rounded-lg border border-blue-green/30 bg-blue-green/10 text-blue-green-600 transition group-hover:bg-blue-green group-hover:text-deep-space-100"><Icon size={22} /></span>
                <h3 className="mt-6 text-3xl">{title}</h3>
                <p className="body mt-3">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="scroll-mt-24 border-y border-sky-light/10 bg-deep-space-300/70 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Current opportunities" title="Job openings" lead="Open positions across operations, engineering, HSE and corporate headquarters." />
          <div role="group" aria-label="Filter by department" className="mt-10 flex flex-wrap gap-2">
            {depts.map(d => (
              <button key={d} type="button" aria-pressed={dept === d} onClick={() => choose(d)}
                className={`rounded-lg px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${dept === d ? 'bg-princeton text-deep-space-100' : 'border border-sky-light/20 text-sky-light-800/80 hover:border-amber-flame hover:text-amber-flame'}`}>
                {d} <span className="opacity-60">({d === 'All' ? jobs.length : jobs.filter(j => j.department === d).length})</span>
              </button>
            ))}
          </div>
          <div ref={grid} className="relative mt-10 grid gap-6 md:grid-cols-2">
            {shown.map(j => <JobCard key={j.id} job={j} onApply={apply} />)}
          </div>
          {!shown.length && <p className="body mt-10">No open roles in this category right now. Submit a general application below.</p>}
        </div>
      </section>

      <section id="how-to-apply" className="scroll-mt-24 py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Submit your candidacy" title="How to apply" lead="Fill in your details below. Your application and CV go straight to our talent acquisition team." />
            <p data-reveal className="mono-label mt-8">Recruitment desk: <span className="select-all !text-amber-flame">{contact.email}</span></p>
          </div>

          <div data-reveal className="panel md:p-10">
            {status === 'done' ? (
              <div className="py-10 text-center" role="status">
                <CheckCircle2 size={48} className="mx-auto text-amber-flame" />
                <h3 className="mt-5 text-3xl">Application submitted</h3>
                <p className="body mt-3">Thank you. Your details and CV are with the NSCL talent acquisition team.</p>
                <button type="button" className="btn btn-line mt-7" onClick={() => { setStatus('idle'); setCvName(''); setRole(''); }}>Submit another application</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate={false} className="grid gap-5 sm:grid-cols-2">
                <label htmlFor="app-name" className="block text-sm font-semibold">Full name *<input id="app-name" name="name" required autoComplete="name" className={field} /></label>
                <label htmlFor="app-email" className="block text-sm font-semibold">Email address *<input id="app-email" name="email" type="email" required autoComplete="email" className={field} /></label>
                <label htmlFor="app-role" className="block text-sm font-semibold">Target position *<input id="app-role" name="role" required value={role} onChange={e => setRole(e.target.value)} list="job-titles" className={field} />
                  <datalist id="job-titles">{jobs.map(j => <option key={j.id} value={j.title} />)}</datalist>
                </label>
                <label htmlFor="app-exp" className="block text-sm font-semibold">Total experience
                  <select id="app-exp" name="experience" defaultValue="" className={field}>
                    <option value="" disabled>Select experience</option>
                    {['Fresh graduate / entry level', '1–3 years', '4–7 years', '8–12 years', '12+ years (executive)'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label htmlFor="app-msg" className="block text-sm font-semibold sm:col-span-2">Cover letter / professional summary *<textarea id="app-msg" name="message" required rows={5} className={field} /></label>
                <div className="sm:col-span-2">
                  <span className="text-sm font-semibold">Attach CV / resume *</span>
                  <label htmlFor="app-cv" className="mt-2 flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-sky-light/25 bg-deep-space-200 p-5 transition hover:border-amber-flame">
                    <Upload size={22} className="flex-none text-amber-flame" />
                    <span className="min-w-0 text-sm"><span className="block truncate font-semibold text-sky-light-900">{cvName || 'Choose a file'}</span><span id="app-cv-help" className="text-sky-light-700/60">PDF, DOC or DOCX up to 5 MB</span></span>
                  </label>
                  <input id="app-cv" name="resume" type="file" required accept=".pdf,.doc,.docx" aria-describedby="app-cv-help" className="sr-only"
                    onChange={e => setCvName(e.target.files?.[0]?.name ?? '')} />
                </div>
                {error && <p role="alert" className="rounded-lg border border-princeton/50 bg-princeton/10 p-4 text-sm text-princeton-800 sm:col-span-2">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="btn btn-hot disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
                  {status === 'sending' ? 'Sending application…' : <>Submit application <ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
