import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, Factory, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { contact, forms, social } from '../data/site';
import { img } from '../lib/img';

const subjects = ['General enquiry', 'Commercial / DRI procurement', 'Media & press relations', 'Careers & HR enquiry', 'Supplier / vendor registration'];
const field = 'mt-2 block w-full rounded-lg border border-sky-light/15 bg-deep-space-200 px-4 py-3 text-sky-light-900 outline-none transition focus:border-amber-flame';

/** Map loads only when asked, so Google is not contacted until the visitor wants the map. */
function MapCard({ eyebrow, title, address, embed, link, icon: Icon }: { eyebrow: string; title: string; address: string; embed: string; link: string; icon: typeof Building2 }) {
  const [load, setLoad] = useState(false);
  return (
    <article data-reveal className="overflow-hidden rounded-2xl border border-sky-light/12 bg-deep-space-300">
      <div className="relative aspect-[16/10] bg-deep-space-400">
        {load ? (
          <iframe src={embed} title={`Map: ${title}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[30%]" />
        ) : (
          <button type="button" onClick={() => setLoad(true)} className="group absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,#023047,#011c2a)]">
            <span aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(142_202_230/0.25)_1px,transparent_1px),linear-gradient(90deg,rgb(142_202_230/0.25)_1px,transparent_1px)] [background-size:32px_32px]" />
            <span className="relative grid place-items-center gap-3">
              <span className="pin grid h-14 w-14 place-items-center rounded-full bg-amber-flame text-deep-space-100 shadow-[0_0_0_10px_rgb(255_183_3/0.15)]"><MapPin size={24} /></span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-light-800 group-hover:text-amber-flame">Load map</span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-start gap-4 p-6">
        <Icon size={22} className="mt-1 flex-none text-amber-flame" />
        <div className="min-w-0 flex-1">
          <div className="mono-label !text-blue-green-600">{eyebrow}</div>
          <h3 className="mt-1 text-2xl">{title}</h3>
          <p className="body mt-1 text-sm">{address}</p>
          <a href={link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-flame">Open in Google Maps <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </article>
  );
}

export function ContactUs() {
  const page = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.to('.pin', { y: -8, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }, { scope: page });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch(forms.contact, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('idle');
      setError(`Your message could not be sent. Please try again, or email ${contact.email}.`);
    }
  };

  const channels = [
    { icon: Building2, label: 'Head office (Karachi)', lines: [contact.head] },
    { icon: Factory, label: 'Bin Qasim plant site', lines: [contact.plant] },
    { icon: Mail, label: 'Corporate emails', lines: [`General: ${contact.email}`, `Commercial: ${contact.sales}`, `Careers: ${contact.careers}`] },
    { icon: Phone, label: 'Telephone', lines: [contact.phone] },
  ];

  return (
    <div ref={page}>
      <PageHero crumb="Contact Us" eyebrow="Direct communications" title="Connect with NSCL" image={img.office}
        lead="Reach out to us for commercial orders, technical inquiries, vendor registrations or media relations." />

      <section className="py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
          <div className="grid content-start gap-4">
            {channels.map(({ icon: Icon, label, lines }) => (
              <div key={label} data-reveal className="flex gap-4 rounded-xl border border-sky-light/12 bg-deep-space-300 p-5">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-blue-green/12 text-blue-green-600"><Icon size={20} /></span>
                <div className="min-w-0">
                  <div className="mono-label">{label}</div>
                  {lines.map(l => <p key={l} className="mt-1 select-all break-words text-sky-light-900">{l}</p>)}
                </div>
              </div>
            ))}
            <div data-reveal className="flex gap-3 pt-2">
              {social.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="btn btn-line !px-4 !py-2.5">{s.name} <ArrowUpRight size={14} /></a>)}
            </div>
          </div>

          <div data-reveal className="panel md:p-10">
            {status === 'done' ? (
              <div className="py-12 text-center" role="status">
                <CheckCircle2 size={48} className="mx-auto text-amber-flame" />
                <h3 className="mt-5 text-3xl">Message received</h3>
                <p className="body mt-3">Thank you for contacting NSCL. Your enquiry has been sent to {contact.email}, and we aim to reply within 24 business hours.</p>
                <button type="button" className="btn btn-line mt-7" onClick={() => setStatus('idle')}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="eyebrow">Transmission desk</div>
                  <h2 className="text-4xl">Send us a direct message</h2>
                  <p className="body mt-2">We route your message to the right corporate or plant division.</p>
                </div>
                <label htmlFor="cnt-name" className="block text-sm font-semibold">Your full name *<input id="cnt-name" name="name" required autoComplete="name" className={field} /></label>
                <label htmlFor="cnt-email" className="block text-sm font-semibold">Email address *<input id="cnt-email" name="email" type="email" required autoComplete="email" className={field} /></label>
                <label htmlFor="cnt-subject" className="block text-sm font-semibold sm:col-span-2">Subject *
                  <select id="cnt-subject" name="subject" required defaultValue={subjects[0]} className={field}>{subjects.map(s => <option key={s}>{s}</option>)}</select>
                </label>
                <label htmlFor="cnt-msg" className="block text-sm font-semibold sm:col-span-2">Message *<textarea id="cnt-msg" name="message" required rows={6} className={field} /></label>
                {error && <p role="alert" className="rounded-lg border border-princeton/50 bg-princeton/10 p-4 text-sm text-princeton-800 sm:col-span-2">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="btn btn-hot disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
                  {status === 'sending' ? 'Sending…' : <>Send message <ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-sky-light/10 bg-deep-space-300/50 py-28">
        <div className="wrap">
          <SectionHead eyebrow="Physical presence" title="Our facility locations" lead="Our corporate headquarters and coastal production site." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <MapCard eyebrow="Corporate operations" title="Head office, Shahrah-e-Faisal" address={contact.head} embed={contact.headMap.embed} link={contact.headMap.link} icon={Building2} />
            <MapCard eyebrow="Integrated complex" title="Plant site, Port Bin Qasim" address={contact.plant} embed={contact.plantMap.embed} link={contact.plantMap.link} icon={Factory} />
          </div>
        </div>
      </section>
    </div>
  );
}
