import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { nav } from '../data/site';
import { img } from '../lib/img';
import { SiteSearch } from './SiteSearch';

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="NSCL home">
      <img src={img.logo} alt="" className="h-11 w-auto" />
      <span className="leading-none">
        <span className="block font-display text-2xl font-bold tracking-[0.08em]">NSCL</span>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-sky-light-700/60 sm:block">National Steel Complex Limited</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { pathname, hash } = useLocation();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false); setOpenGroup(null);
    // The clicked menu link keeps focus after navigating, and focus-within would hold its dropdown open
    const el = document.activeElement as HTMLElement | null;
    if (el?.closest('header')) el.blur();
  }, [pathname, hash]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid || open ? 'border-b border-sky-light/10 bg-deep-space-200/85 py-3 backdrop-blur-xl' : 'py-5'}`}>
      <div className="wrap flex items-center justify-between gap-4 2xl:gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
          {nav.map(item => (
            <div key={item.title} className="group relative">
              <NavLink to={item.path} className={({ isActive }) =>
                `flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors 2xl:px-3 ${isActive ? 'text-amber-flame' : 'text-sky-light-800/90 hover:text-sky-light-900'}`}>
                {item.title}
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </NavLink>
              <div className="invisible absolute left-0 top-full min-w-64 translate-y-2 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-xl border border-sky-light/12 bg-deep-space-300/95 p-2 shadow-2xl backdrop-blur-xl">
                  {item.children.map(c => (
                    <Link key={c.path} to={c.path} className="block rounded-lg px-4 py-2.5 text-sm text-sky-light-800/85 transition hover:bg-sky-light/8 hover:text-amber-flame">{c.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden md:block"><SiteSearch /></div>
          <Link to="/contact-us" className="btn btn-hot hidden whitespace-nowrap !px-5 !py-2.5 sm:inline-flex">Contact Us</Link>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-md border border-sky-light/20 xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="wrap mt-3 max-h-[calc(100dvh-80px)] overflow-y-auto pb-10 xl:hidden">
          <div className="pb-3 md:hidden"><SiteSearch onNavigate={() => setOpen(false)} /></div>
          {nav.map(item => (
            <div key={item.title} className="border-b border-sky-light/10">
              <button type="button" className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold uppercase" aria-expanded={openGroup === item.title}
                onClick={() => setOpenGroup(openGroup === item.title ? null : item.title)}>
                {item.title}
                <ChevronDown size={18} className={`transition-transform ${openGroup === item.title ? 'rotate-180 text-amber-flame' : ''}`} />
              </button>
              {openGroup === item.title && (
                <div className="grid pb-4">
                  {item.children.map(c => <Link key={c.path} to={c.path} className="py-2 pl-3 text-sky-light-800/85 hover:text-amber-flame">{c.name}</Link>)}
                </div>
              )}
            </div>
          ))}
          <Link to="/contact-us" className="btn btn-hot mt-6 w-full">Contact Us</Link>
        </nav>
      )}
    </header>
  );
}
