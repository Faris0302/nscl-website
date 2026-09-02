import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Flame, Package, CheckCircle2 } from 'lucide-react';
import { productsData } from '../data/siteData';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Products: React.FC = () => {
  useRevealOnScroll();

  const productIcons = [
    <Layers size={22} />,
    <Flame size={22} />,
    <Package size={22} />,
  ];

  return (
    <div className="products-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/OurProductsHero.jpg"
          alt="NSCL Products"
          className="hero-page-bg"
        />
        
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Commercial</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Our Products</span>
          </div>
          <div className="eyebrow">Metallurgical Portfolio</div>
          <h1>Premium Direct Reduced Iron Products</h1>
          <p className="lead">
            Delivering certified high-purity metallic iron products engineered for electric arc furnaces (EAF), induction melting furnaces, and international export logistics.
          </p>
        </div>
      </section>

      {/* #dri: Intro Two-Column Section */}
      <section id="dri" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">The Clean Metallic Advantage</div>
              <h2 className="section-title">Superior Chemical Purity for Modern Steelmakers</h2>
              <p className="lead">
                NSCL’s Direct Reduced Iron products provide steelmakers with absolute control over residual tramp elements (such as Copper, Nickel, Tin, Lead, and Zinc), which cannot be refined out of molten steel baths.
              </p>
              <p>
                By substituting imported and variable post-consumer scrap with our uniform 93.9%+ metallized iron, steel melters achieve predictable tap-to-tap cycle times, reduce refining power consumption, and cast premium construction and automotive-grade billets with tight micro-alloying specifications.
              </p>
            </div>

            <div className="reveal">
              <Spotlight>
                <div className="eyebrow" style={{ color: 'var(--steel-light)' }}>Quality Benchmarks</div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Why Steelmakers Choose NSCL DRI</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>Ultra-Low Residuals:</strong> Cu + Ni + Cr + Mo + Sn &lt; 0.02% total.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>High Combined Carbon:</strong> 1.5%–2.0% as Fe₃C, enhancing EAF foaming slag and CO boil.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>Predictable Yield:</strong> Zero non-metallic contamination, dirt, or moisture trapped in bales.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>Continuous Bulk Logistics:</strong> Direct coastal loading and heavy rail siding at Bin Qasim.
                    </span>
                  </div>
                </div>
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Product Grid */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Product Catalog</div>
            <h2 className="section-title">Three Tailored Metallic Formats</h2>
            <p className="section-subtitle">
              Engineered for merchant transport, forward on-site hot charging, or maritime export.
            </p>
          </div>

          <div className="three-col">
            {productsData.map((prod, idx) => (
              <div id={prod.anchor} key={prod.name} className="product-card reveal" style={{ backgroundColor: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="product-tag">{prod.tag}</span>
                  <div className={idx === 1 ? 'value-icon' : 'value-icon value-icon-steel'} style={{ width: '36px', height: '36px', margin: 0 }}>
                    {productIcons[idx]}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{prod.name}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.55', color: 'var(--muted)' }}>
                  {prod.description}
                </p>

                {/* Framed product photo */}
                <div className="product-photo-frame">
                  <img src={prod.photoUrl} alt={prod.name} loading="lazy" />
                </div>

                {/* Specification Table */}
                <table className="spec-table">
                  <tbody>
                    {prod.specs.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--hairline)' }}>
                  <Link to="/contact-us" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                    <span>Request Specification Sheet</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section">
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Procurement & Sales</div>
              <h2 style={{ marginBottom: '1rem' }}>Inquire for Bulk DRI & HBI Orders</h2>
              <p>
                Our commercial sales directors can provide current production allocations, vessel scheduling, and technical charging recommendations.
              </p>
              <div className="band-cta-buttons">
                <Link to="/contact-us" className="btn btn-solid btn-lg">
                  <span>Contact Sales Department</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/projects" className="btn btn-outline btn-lg">
                  <span>Explore Expansion Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
