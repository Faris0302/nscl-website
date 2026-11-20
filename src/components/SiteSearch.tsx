import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { nav } from '../data/site';

// Every page and menu section, so "safety" or "HBI" finds the right place
const entries = [
  { label: 'Home', path: '/', group: 'Page' },
  ...nav.flatMap(n => [{ label: n.title, path: n.path, group: 'Page' }, ...n.children.map(c => ({ label: c.name, path: c.path, group: n.title }))]),
  { label: 'Contact Us', path: '/contact-us', group: 'Page' },
].filter((e, i, all) => all.findIndex(o => o.path === e.path && o.label === e.label) === i);

export function SiteSearch({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? entries.filter(e => `${e.label} ${e.group}`.toLowerCase().includes(t)).slice(0, 7) : [];
  }, [q]);

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const done = () => { setQ(''); setOpen(false); onNavigate?.(); };

  return (
    <div ref={wrap} className="relative">
      <div className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ${open ? 'w-60 border-amber-flame/60 bg-deep-space-300' : 'w-11 border-sky-light/20'}`}>
        <button type="button" onClick={() => (open ? done() : setOpen(true))} aria-label={open ? 'Close search' : 'Search the site'} aria-expanded={open}
          className="grid h-11 w-11 flex-none place-items-center text-sky-light-800 hover:text-amber-flame">
          {open ? <X size={17} /> : <Search size={17} />}
        </button>
        <input ref={input} value={q} onChange={e => setQ(e.target.value)} placeholder="Search NSCL…" aria-label="Search pages and sections" tabIndex={open ? 0 : -1}
          onKeyDown={e => e.key === 'Escape' && done()} className="min-w-0 flex-1 bg-transparent pr-4 text-sm outline-none" />
      </div>
      {open && q.trim() && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-sky-light/12 bg-deep-space-300/95 p-2 shadow-2xl backdrop-blur-xl">
          {results.length ? results.map(r => (
            <Link key={r.path + r.label} to={r.path} onClick={done} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-sky-light/8 hover:text-amber-flame">
              <span><span className="block">{r.label}</span><span className="mono-label !text-[0.6rem]">{r.group}</span></span>
              <ArrowRight size={14} />
            </Link>
          )) : <p className="px-3 py-2.5 text-sm text-sky-light-700/70">No pages match “{q.trim()}”.</p>}
        </div>
      )}
    </div>
  );
}
