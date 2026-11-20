import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHead, CtaBand } from '../components/Blocks';
import { usePageMotion } from '../components/Motion';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { products } from '../data/products';
import { img } from '../lib/img';

const benefits = [
  ['Ultra-low residuals', 'Cu + Ni + Cr + Mo + Sn < 0.02% total.'],
  ['High combined carbon', '1.5%–2.0% as Fe₃C, enhancing EAF foaming slag and CO boil.'],
  ['Predictable yield', 'No non-metallic contamination, dirt or moisture trapped in bales.'],
  ['Continuous bulk logistics', 'Direct coastal loading and heavy rail siding at Bin Qasim.'],
];
const short: Record<string, string> = { cdri: 'CDRI', hdri: 'HDRI', hbi: 'HBI' };

export function Products() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(page);
    (q('.product') as HTMLElement[]).forEach(sec => {
      // Spec rows tick in one after another
      gsap.from(sec.querySelectorAll('.spec'), {
        x: 30, autoAlpha: 0, stagger: 0.07, duration: 0.7,
        scrollTrigger: { trigger: sec.querySelector('.specs'), start: 'top 80%', once: true },
      });
      // Product photo drifts and the big mark slides across as the section passes
      gsap.fromTo(sec.querySelector('.p-img'), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo(sec.querySelector('.p-mark'), { xPercent: -15 }, { xPercent: 15, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <PageHero crumb="Products" eyebrow="Metallurgical portfolio" title="Premium direct reduced iron products" image={img['products-hero']}
        lead="Certified high-purity metallic iron for electric arc furnaces (EAF), induction melting furnaces and international export.">
        <nav aria-label="Products" data-reveal className="mt-9 flex flex-wrap gap-3">
          {products.map(p => <Link key={p.anchor} to={`/products#${p.anchor}`} className="btn btn-line !px-5 !py-2.5">{short[p.anchor]}</Link>)}
        </nav>
      </PageHero>

      <section id="dri" className="scroll-mt-24 py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="The clean metallic advantage" title="Superior chemical purity for modern steelmakers" />
            <p data-reveal className="lead mt-7">NSCL’s DRI gives steelmakers control over residual tramp elements (copper, nickel, tin, lead and zinc) that cannot be refined out of molten steel.</p>
            <p data-reveal className="body mt-5">Replacing imported, variable post-consumer scrap with uniform 93.9%+ metallized iron gives melters predictable tap-to-tap times, lower refining power and premium construction and automotive-grade billets with tight micro-alloying specifications.</p>
          </div>
          <div data-reveal className="panel self-start">
            <h3 className="text-3xl">Why steelmakers choose NSCL DRI</h3>
            <ul className="mt-6 grid gap-5">
              {benefits.map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 flex-none text-amber-flame" />
                  <div><strong className="font-semibold">{t}</strong><p className="text-sm text-sky-light-800/70">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="wrap pb-6">
        <SectionHead center eyebrow="Product catalog" title="Three tailored metallic formats" lead="Built for merchant transport, on-site hot charging or maritime export." />
      </div>

      {products.map((p, i) => (
        <section key={p.anchor} id={p.anchor} className={`product scroll-mt-24 py-24 ${i % 2 ? 'bg-deep-space-300/60' : ''}`}>
          <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={`lg:sticky lg:top-28 lg:self-start ${i % 2 ? 'lg:order-2' : ''}`}>
              <div className="relative h-[420px] overflow-hidden rounded-2xl border border-sky-light/12 lg:h-[520px]">
                <img src={img[p.photo]} alt={p.name} loading="lazy" className="p-img absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space-200/90 via-transparent to-transparent" />
                <span aria-hidden="true" className="p-mark absolute -bottom-4 left-6 font-display text-[clamp(5rem,11vw,9rem)] font-bold leading-none text-transparent [-webkit-text-stroke:2px_#ffb703]">{p.mark}</span>
              </div>
            </div>
            <div>
              <div className="mono-label !text-blue-green-600">Product 0{i + 1} · {short[p.anchor]}</div>
              <h3 data-split className="mt-3 text-[clamp(2.4rem,4.2vw,3.8rem)]">{p.name}</h3>
              <p data-reveal className="lead mt-6">{p.text}</p>
              <dl className="specs mt-10 grid gap-px overflow-hidden rounded-xl border border-sky-light/12 bg-sky-light/10 sm:grid-cols-2">
                {p.specs.map(s => (
                  <div key={s.label} className="spec bg-deep-space-300 p-5">
                    <dt className="mono-label">{s.label}</dt>
                    <dd className="mt-1.5 font-semibold text-sky-light-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Link data-reveal to="/contact-us" className="btn btn-hot mt-8">Request {short[p.anchor]} quotation <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      ))}

      <CtaBand image={img.day} eyebrow="Procurement & sales" title="Inquire for bulk DRI & HBI orders"
        text="Our commercial team can share current production allocations, vessel scheduling and technical charging recommendations."
        primary={{ to: '/contact-us', label: 'Contact sales' }} secondary={{ to: '/dri-technology', label: 'How DRI is made' }} />
    </div>
  );
}
