import { Link } from 'react-router-dom';
import { ArrowUpRight, Facebook, Linkedin } from 'lucide-react';
import { Logo } from './Header';
import { contact, groupEntities, social } from '../data/site';

const quick = [['Home', '/'], ['About Us', '/about-us'], ['Sustainability', '/sustainability'], ['DRI Technology', '/dri-technology'], ['Products', '/products'], ['Contact Us', '/contact-us']];
const company = [['Leadership', '/our-leadership'], ['Our Journey', '/our-journey'], ['Collaborations', '/our-collaboration'], ['Health & Safety', '/health-safety'], ['Careers', '/hr-careers']];

export function Footer() {
  const head = 'mb-5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-amber-flame';
  const link = 'text-sm text-sky-light-800/70 transition hover:text-sky-light-900';
  return (
    <footer className="relative isolate z-10 overflow-hidden border-t border-sky-light/10 bg-deep-space-100/70">
      {/* NSCL watermark (17% opacity), bottom-left under the brand + quick-links columns */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        <div className="wrap relative h-full">
          <div className="absolute bottom-0 left-[max(20px,env(safe-area-inset-left,0px))] whitespace-nowrap font-display text-[clamp(6rem,24vw,11rem)] font-extrabold uppercase leading-[0.8] tracking-[0.04em] text-princeton opacity-[0.17] lg:text-[clamp(12rem,19vw,16rem)]">NSCL</div>
        </div>
      </div>
      <div className="wrap grid gap-12 pb-12 pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-sky-light-800/65">We believe in the transformative power of steel, to drive progress and prosperity for the generations to come.</p>
          <div className="mt-6 flex gap-3">
            {social.map(s => {
              const Icon = s.name === 'Facebook' ? Facebook : Linkedin;
              return <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} className="grid h-10 w-10 place-items-center rounded-md border border-sky-light/15 text-sky-light-800/80 transition hover:border-amber-flame hover:text-amber-flame"><Icon size={18} aria-hidden="true" /></a>;
            })}
          </div>
        </div>
        <div><h4 className={head}>Quick links</h4><ul className="grid gap-3">{quick.map(([n, p]) => <li key={p}><Link to={p} className={link}>{n}</Link></li>)}</ul></div>
        <div><h4 className={head}>Company</h4><ul className="grid gap-3">{company.map(([n, p]) => <li key={p}><Link to={p} className={link}>{n}</Link></li>)}</ul></div>
        <div><h4 className={head}>Group entities</h4><ul className="grid gap-3">{groupEntities.map(g => (
          <li key={g.url}><a href={g.url} target="_blank" rel="noreferrer" className={`${link} inline-flex items-start gap-1.5`}>{g.name}<ArrowUpRight size={14} className="mt-0.5 flex-none" /></a></li>))}</ul></div>
        <div>
          <h4 className={head}>Contact</h4>
          <ul className="grid gap-3 text-sm text-sky-light-800/70">
            <li className="select-all">{contact.email}</li>
            <li className="select-all">{contact.phone}</li>
            <li>{contact.plant}</li>
          </ul>
          <Link to="/contact-us" className="btn btn-line mt-6 w-full !py-3">Get in touch</Link>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-3 border-t border-sky-light/10 py-6 font-mono text-xs text-sky-light-700/50">
        <span>© {new Date().getFullYear()} National Steel Complex Limited</span>
        <span>Port Bin Qasim · Karachi · Pakistan</span>
      </div>
    </footer>
  );
}
