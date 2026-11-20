import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Flame, Layers, X, ChevronDown } from 'lucide-react';
import { usePageMotion } from '../components/Motion';
import heroDesktop from '../assets/video/hero.mp4';
import heroMobile from '../assets/video/hero-mobile.mp4';
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { img } from '../lib/img';

const pillars = [
  { icon: Layers, title: 'Integrated Value Chain', text: 'From domestic mine beneficiation and pelletization to gas-based shaft reduction and forward EAF melting.' },
  { icon: Cpu, title: 'World-Class MIDREX Technology', text: 'Licensed from Kobe Steel Ltd. Japan, setting international benchmarks for energy efficiency and metallization rates.' },
  { icon: Flame, title: 'Forward Integration to EAF', text: 'Direct hot-charging of HDRI at 700°C into Electric Arc Furnaces, saving up to 150 kWh/t of electrical energy.' },
];

const gallery = [
  { image: img.shaft, tag: 'Metallurgy', caption: 'Reduction furnace: the tallest structure on the industrial map of Pakistan, 107 m' },
  { image: img.automation, tag: 'Process automation', caption: 'Main control room DCS system and continuous telemetry' },
  { image: img['day-bin'], tag: 'Raw material storage', caption: 'Day bin storage and controlled ore feed to the DRI plant' },
  { image: img.Reformer, tag: 'Gas reforming', caption: 'Industrial reformer unit and associated process structures' },
  { image: img.compressor, tag: 'Process gas system', caption: 'Process gas compression and recirculation for the reduction process' },
  { image: img['ro-plant'], tag: 'Water treatment', caption: 'Reverse osmosis plant for reliable process water treatment and supply' },
];

// Desktop and phone cuts of the drone film; the review preview carries only the small one.
const heroVideo = __HASH_ROUTER__ ? heroMobile : heroDesktop;

function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Pick the lighter file on phones, and never autoplay for people who ask for reduced motion
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.src = window.matchMedia('(max-width: 768px)').matches ? heroMobile : heroVideo;
    if (!prefersReducedMotion()) v.play().catch(() => {});
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    if (prefersReducedMotion()) return;
    // Load-in: headline words rise, then the copy, then the stats count up
    const split = SplitText.create(q('.hero-title'), { type: 'lines,words', mask: 'lines' });
    // Each word rises in turn, flaring white-hot like fresh metal, then cools to its place on the yellow-to-red scale
    const words = split.words as HTMLElement[];
    const tl = gsap.timeline({ delay: 0.15 })
      .from(words, { yPercent: 115, duration: 1.2, stagger: 0.18, ease: 'expo.out' });
    words.forEach((w, i) => {
      tl.fromTo(w, { color: '#fff6dc', textShadow: '0 0 18px rgba(255, 214, 105, 0.85)' },
        { color: getComputedStyle(w).color, textShadow: '0 0 0px rgba(255, 214, 105, 0)', duration: 1.4, ease: 'power2.out', clearProps: 'color,textShadow' }, i * 0.18);
    });
    tl.from(q('.hero-fade'), { autoAlpha: 0, y: 30, stagger: 0.1, duration: 0.9 }, 0.95);
    q('.hero-count').forEach((el: HTMLElement) => {
      const o = { v: 0 }, to = parseFloat(el.dataset.to!), dec = parseInt(el.dataset.dec || '0', 10);
      tl.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = o.v.toFixed(dec)) }, 1);
    });
    // Scrolling away: the film eases back and the copy lifts off
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to(q('.hero-video'), { scale: 1.12, yPercent: 8, ease: 'none', scrollTrigger: st });
    gsap.to(q('.hero-copy'), { yPercent: -18, autoAlpha: 0.2, ease: 'none', scrollTrigger: st });
  }, { scope: root });

  return (
    <section ref={root} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-deep-space-200">
      <video ref={video} className="hero-video absolute inset-0 h-full w-full object-cover" poster={img['hero-poster']}
        muted loop playsInline preload="metadata" aria-label="Drone film of the NSCL plant at Port Qasim" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-deep-space-200/95 via-deep-space-200/65 to-deep-space-200/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-deep-space-200" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep-space-200/70 to-transparent" />

      <div className="wrap relative z-10 flex h-full items-center pt-20">
        <div className="hero-copy max-w-2xl">
          <div className="eyebrow eyebrow-hot hero-fade">Integrated Direct Reduced Iron Complex</div>
          <h1 className="hero-title text-[clamp(2.8rem,6.2vw,6rem)] leading-[0.92]">
            <span className="block whitespace-nowrap">
              <span className="text-[#F2F1EC]">Forging</span>{" "}
              <span className="text-[#F2F1EC]">the</span>
            </span>
            <span className="block whitespace-nowrap">
              <span className="text-[#f2c40d]">future</span>{" "}
              <span className="text-[#f4a107]">of</span>{" "}
              <span className="text-[#f4a107]">steel.</span>
            </span>
          </h1>
          <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-sky-light-800/90">Pakistan’s premier private-sector integrated DRI manufacturing complex at Port Bin Qasim, Karachi. Engineered with Japanese MIDREX gas-based reduction technology to produce ultra-pure metallics while cutting carbon emissions.</p>
          <div className="hero-fade mt-8 flex flex-wrap gap-4">
            <Link to="/dri-technology" className="btn btn-hot">Explore DRI Technology <ArrowRight size={16} /></Link>
            <Link to="/contact-us" className="btn btn-line">Contact Commercial Team</Link>
          </div>
          <dl className="hero-fade mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-sky-light/15 pt-7">
            {[['220', 0, '', 'Acres at Port Bin Qasim'], ['1.5', 2, 'M', 'Extendable Tons annual DRI capacity'], ['700', 0, '°C', 'Hot DRI discharge']].map(([v, d, s, l]) => (
              <div key={l as string}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-mono text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-none tabular-nums"><span className="hero-count" data-to={v} data-dec={d}>{Number(v).toFixed(d as number)}</span><span className="text-amber-flame">{s}</span></dd>
                <dd className="mono-label mt-2 !text-[0.65rem]">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-sky-light-700/80 md:flex">
        Scroll <ChevronDown size={16} className="animate-bounce motion-reduce:animate-none" />
      </div>
    </section>
  );
}

/**
 * Marquee: Surah Al-Hadid 57:25 on two rows, driven by page scroll.
 * Arabic travels left to right, the English translation right to left.
 */
function Ticker() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const rows = gsap.utils.toArray<HTMLElement>('.tick-row', root.current);
    rows.forEach(row => {
      const ltr = row.dataset.dir === 'ltr';
      gsap.fromTo(row, { xPercent: ltr ? -25 : 0 }, {
        xPercent: ltr ? 0 : -25, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      });
    });
  }, { scope: root });
  const diamond = <span className="mx-7 inline-block size-3 flex-none rotate-45 bg-princeton md:mx-9 md:size-3.5" />;
  const gold = 'text-[rgb(201_164_96/0.82)]';
  const arabic = (
    <span lang="ar" dir="rtl" className={`font-arabic text-[clamp(1.4rem,2.8vw,2.3rem)] font-extrabold leading-[1.6] ${gold}`}>
      وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ
    </span>
  );
  const english = (
    <span className={`font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-bold uppercase leading-none tracking-[0.03em] ${gold}`}>
      “And We sent down iron, in which is strong material, as well as benefits for mankind.” <span className="text-princeton/75">— Surah Al-Hadid 57:25</span>
    </span>
  );
  // the phrase repeats so the row stays wider than the screen while it slides 25% of its width
  const row = (content: React.ReactNode, repeat: number, dir: 'ltr' | 'rtl') => (
    <div data-dir={dir} className="tick-row flex w-max items-center whitespace-nowrap">
      {Array.from({ length: repeat }, (_, i) => (
        <span key={i} aria-hidden={i > 0 || undefined} className="flex items-center">{diamond}{content}</span>
      ))}
    </div>
  );
  return (
    <div ref={root} className="select-none overflow-hidden border-y border-sky-light/10 bg-deep-space-300 py-5">
      {row(arabic, 6, 'ltr')}
      <div className="my-2 h-px w-full bg-sky-light/5" />
      {row(english, 3, 'rtl')}
    </div>
  );
}

function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 80;
      gsap.to(track.current, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>('.g-img', track.current).forEach(el =>
        gsap.fromTo(el, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + distance(), scrub: true } }));
    });
    return () => mm.revert();
  }, { scope: root });

  useEffect(() => {
    if (!selected) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [selected]);

  return (
    <section ref={root} className="relative overflow-hidden py-24 min-[900px]:flex min-[900px]:h-screen min-[900px]:items-center min-[900px]:py-0">
      <div ref={track} className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(20px,env(safe-area-inset-left,0px))] pb-4 min-[900px]:snap-none min-[900px]:overflow-visible min-[900px]:pl-[max(40px,calc((100vw-1240px)/2))] min-[900px]:pb-0">
        <div className="w-[85vw] flex-none snap-start self-center min-[900px]:w-[30rem]">
          <div className="eyebrow">Visual tour</div>
          <h2 className="h-section">The complex, in photos</h2>
          <p className="lead mt-5">A close look at Pakistan’s metallurgical powerhouse at Port Bin Qasim, Karachi.</p>
          <p className="mono-label mt-8 hidden min-[900px]:block">Keep scrolling →</p>
        </div>
        {gallery.map((g, i) => (
          <button key={g.tag} type="button" onClick={() => setSelected(g)} aria-label={`Enlarge photo: ${g.caption}`}
            className="group relative h-[60vh] max-h-[620px] min-h-[380px] w-[80vw] flex-none snap-start overflow-hidden rounded-2xl border border-sky-light/10 text-left min-[900px]:w-[44vw]">
            <img src={g.image} alt={g.caption} loading="lazy" className="g-img absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space-200 via-deep-space-200/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="mono-label !text-amber-flame">{String(i + 1).padStart(2, '0')} / {g.tag}</div>
              <p className="mt-2 max-w-md font-display text-2xl font-semibold uppercase leading-tight md:text-3xl">{g.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-label={selected.caption} onClick={e => e.target === e.currentTarget && setSelected(null)}
          className="fixed inset-0 z-[70] grid place-items-center bg-deep-space-100/92 p-6 backdrop-blur-md">
          <button type="button" onClick={() => setSelected(null)} aria-label="Close enlarged photo" className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-sky-light/30 hover:border-amber-flame hover:text-amber-flame"><X size={22} /></button>
          <figure className="max-w-6xl">
            <img src={selected.image} alt={selected.caption} className="max-h-[78vh] w-auto rounded-xl" />
            <figcaption className="mono-label mt-4 text-center">{selected.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

export function Home() {
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);
  useEffect(() => { ScrollTrigger.refresh(); }, []);

  return (
    <div ref={page}>
      <Hero />
      <Ticker />

      <section className="py-28 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <div className="eyebrow">Industrial paradigm shift</div>
            <h2 data-split className="h-section">Redefining metallurgy through clean gas reduction</h2>
            <p data-reveal className="lead mt-7">National Steel Complex Limited (NSCL) represents a landmark leap in Pakistan’s industrial development. By harnessing natural gas to directly reduce high-grade iron ore pellets in solid state, NSCL eliminates the high-carbon blast furnace route.</p>
            <p data-reveal className="body mt-5">Our facility delivers high-purity Direct Reduced Iron (DRI) with 93.9%+ metallization, giving local steel melters a superior, uniform alternative to unpredictable scrap imports while protecting national foreign exchange reserves.</p>
            <Link data-reveal to="/about-us" className="btn btn-hot mt-9">Learn more about NSCL <ArrowRight size={16} /></Link>
          </div>
          <div className="grid content-center gap-5">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <article key={title} data-reveal className="panel group flex gap-5 transition-[translate,border-color] duration-500 hover:-translate-y-1 hover:border-blue-green/50">
                <div className="grid h-12 w-12 flex-none place-items-center rounded-lg border border-blue-green/30 bg-blue-green/10 text-blue-green-600 transition group-hover:bg-blue-green group-hover:text-deep-space-100"><Icon size={22} /></div>
                <div>
                  <div className="mono-label !text-blue-green-600">Pillar {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-1 text-2xl">{title}</h3>
                  <p className="body mt-2 text-[0.95rem]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-sky-light/10 bg-deep-space-300/70 py-16">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: <><span data-count="1.5" data-decimals="1">1.5</span><span className="text-amber-flame">M</span></>, l: 'Tons extendable annual DRI capacity', hot: true },
            { v: <>#<span data-count="1">1</span></>, l: 'Private-sector integrated DRI complex in Pakistan' },
            { v: <>MIDREX®</>, l: 'U.S. - Process Licensor' },
            { v: <><span data-count="220">220</span><span className="text-amber-flame">ac</span></>, l: 'Bin Qasim oceanfront industrial site', hot: true },
          ].map(s => (
            <div key={s.l} data-reveal className={`border-l-2 pl-6 ${s.hot ? 'border-princeton' : 'border-blue-green'}`}>
              <div className={`font-mono text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tabular-nums ${s.hot ? '' : 'text-sky-light'}`}>{s.v}</div>
              <p className="mt-3 text-sm text-sky-light-800/70">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <Gallery />

      <section className="relative isolate overflow-hidden py-36">
        <div className="absolute inset-0 -z-20 overflow-hidden"><img src={img.night} alt="" data-parallax="0.4" className="h-[130%] w-full object-cover" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-space-200/95 via-deep-space-200/80 to-deep-space-200/40" />
        <div className="wrap">
          <div className="max-w-3xl">
            <div className="eyebrow eyebrow-hot">Strategic industrial capability</div>
            <h2 data-split className="h-section">Transforming Pakistan’s industrial horizon</h2>
            <p data-reveal className="lead mt-6">Discover the engineering science behind solid-state reduction, or contact our commercial sales team for bulk direct reduced iron procurement.</p>
            <div data-reveal className="mt-9 flex flex-wrap gap-4">
              <Link to="/dri-technology" className="btn btn-hot">Explore DRI Technology <ArrowRight size={16} /></Link>
              <Link to="/contact-us" className="btn btn-line">Contact Sales Office</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
