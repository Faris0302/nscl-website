import { useEffect, useRef } from 'react';

type RGB = [number, number, number];
const lerp3 = (a: RGB, b: RGB, f: number): RGB =>
  [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
const css = (c: RGB) => `${c[0] | 0},${c[1] | 0},${c[2] | 0}`;
/** Three-stop palette, picked by each point's position on screen */
const palette = (s: [RGB, RGB, RGB]) => (t: number) => {
  t = Math.min(1, Math.max(0, t));
  return css(t < 0.55 ? lerp3(s[0], s[1], t / 0.55) : lerp3(s[1], s[2], (t - 0.55) / 0.45));
};

// 1: gold to a deeper bronze-gold
const goldBronze = palette([[233, 184, 90], [192, 138, 62], [138, 90, 38]]);
// 2: mustard yellow to rust orange
const mustardRust = palette([[225, 173, 1], [204, 119, 34], [183, 65, 14]]);

type Pt = { x: number; y: number; vx: number; vy: number; r: number };
type Net = { tone: (t: number) => string; density: number; speed: number; pts: Pt[] };

const LINK = 150;

/**
 * Two slow networks of points and lines fixed behind every page (in the spirit of ruhr-montan.de):
 * gold-to-bronze and mustard-to-rust. Each links only its own points, so they drift through each
 * other as two webs. Ignores the pointer, stops at the footer's top edge, animates only while the
 * tab is visible, and draws a single still frame with reduced motion.
 */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, raf = 0, running = false;

    const nets: Net[] = [
      { tone: goldBronze, density: 15000, speed: 0.5, pts: [] },
      { tone: mustardRust, density: 19000, speed: 0.4, pts: [] },
    ];

    const seed = () => {
      for (const net of nets) {
        const n = Math.round(Math.min(140, Math.max(24, (W * H) / net.density)));
        net.pts = Array.from({ length: n }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * net.speed, vy: (Math.random() - 0.5) * net.speed, r: 1 + Math.random() * 1.4,
        }));
      }
    };
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawNet = ({ pts, tone }: Net) => {
      if (!reduce) for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          ctx.strokeStyle = `rgba(${tone(((a.x + b.x) / 2 / W) * 0.65 + ((a.y + b.y) / 2 / H) * 0.35)},${(1 - d / LINK) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${tone((p.x / W) * 0.65 + (p.y / H) * 0.35)},0.8)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      // the networks stop at the top edge of the footer
      const top = Math.min(H, document.querySelector('footer')?.getBoundingClientRect().top ?? H);
      if (top > 0) {
        ctx.save();
        ctx.beginPath(); ctx.rect(0, 0, W, top); ctx.clip();
        for (const net of nets) drawNet(net);
        ctx.restore();
      }
      if (running) raf = requestAnimationFrame(frame);
    };

    const update = () => {
      const want = !document.hidden && !reduce;
      if (want && !running) { running = true; raf = requestAnimationFrame(frame); }
      if (!want && running) { running = false; cancelAnimationFrame(raf); }
    };
    const onResize = () => { size(); if (!running) frame(); };
    // keep the footer cut-off in place on the still frame (reduced motion / hidden tab)
    const onScroll = () => { if (!running) frame(); };

    size(); frame(); update();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', update);
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
