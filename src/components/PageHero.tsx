import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = { crumb: string; eyebrow: string; title: string; lead?: string; image: string; children?: ReactNode };

export function PageHero({ crumb, eyebrow, title, lead, image, children }: Props) {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden pb-20 pt-40">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img src={image} alt="" data-parallax="0.35" className="h-[125%] w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-space-200 via-deep-space-200/80 to-deep-space-200/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-deep-space-200" />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="mono-label mb-6 flex gap-2">
          <Link to="/" className="hover:text-amber-flame">Home</Link><span>/</span><span className="text-amber-flame">{crumb}</span>
        </nav>
        <div className="eyebrow eyebrow-hot">{eyebrow}</div>
        <h1 data-split className="max-w-5xl text-[clamp(3rem,7.5vw,6.5rem)]">{title}</h1>
        {lead && <p data-reveal className="lead mt-6 max-w-3xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
