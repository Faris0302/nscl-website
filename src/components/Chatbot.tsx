import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Bot, MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { contact } from '../data/site';

// Scripted assistant carried over from the current site: answers from fixed topics, no AI service.
const quickReplies = ['Where are you located?', 'What do you produce?', 'How sustainable is the process?', 'How can I contact NSCL?', 'What is DRI technology?'];

const knowledge = [
  { keywords: ['location', 'where', 'located', 'karachi', 'bin qasim', 'address', 'site'], response: 'NSCL is located at Port Bin Qasim, Karachi, Pakistan, with direct access to the port, logistics network and industrial infrastructure.' },
  { keywords: ['dri', 'direct reduced iron', 'technology', 'midrex', 'process'], response: 'DRI stands for Direct Reduced Iron. NSCL uses a MIDREX gas-based reduction process to convert iron ore into high-metallization iron, a more efficient and lower-emission route than conventional blast furnace production.' },
  { keywords: ['product', 'produce', 'steel', 'iron', 'output', 'capacity', 'hbi', 'hdri', 'cdri'], response: 'NSCL produces high-purity Direct Reduced Iron in three formats: Cold DRI (CDRI), Hot DRI (HDRI) and Hot Briquetted Iron (HBI), for domestic steelmakers and export.' },
  { keywords: ['sustainable', 'environment', 'carbon', 'green', 'emissions', 'eco'], response: 'The MIDREX gas-based DRI route produces up to 55%–60% less CO₂ than coal-fired blast furnaces, and the plant recirculates over 98% of its process water.' },
  { keywords: ['contact', 'email', 'phone', 'reach', 'inquiry', 'enquiry', 'call'], response: `You can reach NSCL at ${contact.email} or ${contact.phone}, or use the form on the Contact Us page.` },
  { keywords: ['job', 'career', 'vacanc', 'hiring', 'apply'], response: 'Current openings and the application form are on the Careers page.' },
];

const has = (text: string, word: string) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text);

type Msg = { sender: 'user' | 'bot'; text: string };

function reply(input: string, history: Msg[]) {
  const t = input.toLowerCase();
  if (['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening'].some(g => has(t, g)))
    return 'Hello! I can help with NSCL’s location, DRI technology, products, sustainability and contact details.';
  const direct = knowledge.find(k => k.keywords.some(w => has(t, w)));
  if (direct) return direct.response;
  const recent = history.filter(m => m.sender === 'user').slice(-2).map(m => m.text.toLowerCase()).join(' ');
  if ((has(t, 'what about') || has(t, 'how about') || has(t, 'and')) && recent) {
    const follow = knowledge.find(k => k.keywords.some(w => has(recent, w)));
    if (follow) return follow.response;
  }
  if (has(t, 'thank')) return 'You’re welcome. Ask me anything else about NSCL.';
  if (has(t, 'who') && has(t, 'nscl')) return 'NSCL is a private-sector integrated DRI steel complex in Pakistan focused on domestic steel self-reliance and cleaner industrial production.';
  return 'I can help with NSCL’s location, DRI technology, products, sustainability, careers and contact details. Try one of the suggestions below.';
}

const greeting: Msg = { sender: 'bot', text: 'Hi, I’m the NSCL assistant. Ask me about our plant, products or how to get in touch.' };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    if (!prefersReducedMotion()) gsap.from(panel.current, { y: 24, scale: 0.96, autoAlpha: 0, duration: 0.4, ease: 'power3.out', transformOrigin: 'bottom right' });
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }); }, [msgs, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    const next: Msg[] = [...msgs, { sender: 'user', text: q }];
    setMsgs(next);
    setInput('');
    setTyping(true);
    window.setTimeout(() => { setMsgs(m => [...m, { sender: 'bot', text: reply(q, next) }]); setTyping(false); }, 550);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); send(input); };

  return (
    <div className="fixed bottom-[max(20px,env(safe-area-inset-bottom,0px))] right-[max(20px,env(safe-area-inset-right,0px))] z-[65] flex flex-col items-end gap-3">
      {open && (
        <div ref={panel} role="dialog" aria-label="NSCL assistant" className="flex h-[min(560px,calc(100dvh-120px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-sky-light/15 bg-deep-space-300 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-sky-light/10 bg-deep-space-400 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-flame to-princeton text-deep-space-100"><Bot size={18} /></span>
            <div className="flex-1">
              <div className="font-display text-lg font-bold uppercase leading-none">NSCL assistant</div>
              <div className="mono-label mt-1 !text-[0.6rem]">Answers from site information</div>
            </div>
            <button type="button" onClick={() => setMsgs([greeting])} aria-label="Start a new conversation" className="grid h-9 w-9 place-items-center rounded-lg text-sky-light-700 hover:bg-sky-light/8 hover:text-amber-flame"><RotateCcw size={16} /></button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-9 w-9 place-items-center rounded-lg text-sky-light-700 hover:bg-sky-light/8 hover:text-amber-flame"><X size={18} /></button>
          </div>
          <div ref={list} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.sender === 'user' ? 'ml-auto rounded-br-sm bg-princeton text-deep-space-100' : 'rounded-bl-sm bg-deep-space-400 text-sky-light-900'}`}>{m.text}</div>
            ))}
            {typing && <div className="w-16 rounded-2xl rounded-bl-sm bg-deep-space-400 px-4 py-3 text-center tracking-[0.3em] text-sky-light-700" aria-label="Assistant is typing">•••</div>}
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-3">
            {quickReplies.map(q => <button key={q} type="button" onClick={() => send(q)} className="flex-none rounded-full border border-blue-green/35 px-3 py-1.5 text-xs text-blue-green-700 transition hover:border-amber-flame hover:text-amber-flame">{q}</button>)}
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-sky-light/10 p-3">
            <label htmlFor="chat-input" className="sr-only">Your question</label>
            <input id="chat-input" ref={field} value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about NSCL…" autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-sky-light/15 bg-deep-space-200 px-3 py-2.5 text-sm outline-none focus:border-amber-flame" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-lg bg-princeton text-deep-space-100 transition hover:bg-amber-flame disabled:opacity-50"><Send size={16} /></button>
          </form>
        </div>
      )}
      <button type="button" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close assistant' : 'Open the NSCL assistant'} aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-flame to-princeton text-deep-space-100 shadow-[0_10px_30px_-8px] shadow-princeton/70 transition hover:scale-105">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
