import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Crosshair, ShieldCheck, HeartPulse, Leaf, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { MoltenSteelSection } from '../components/MoltenSteelSection';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { valuesList } from '../data/siteData';

export const AboutUs: React.FC = () => {
  useRevealOnScroll();

  const valueIcons = [
    <Crosshair size={22} />,
    <ShieldCheck size={22} />,
    <HeartPulse size={22} />,
    <Leaf size={22} />,
    <Sparkles size={22} />,
    <Building2 size={22} />,
  ];

  return (
    <div className="about-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/plant-aerial-view.png"
          alt="NSCL Complex"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Company</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>About Us</span>
          </div>
          <div className="eyebrow">Enterprise Overview</div>
          <h1>Pioneering Industrial Sovereignty</h1>
          <p className="lead">
            National Steel Complex Limited (NSCL) is Pakistan’s flagship private-sector integrated Direct Reduced Iron (DRI) producer, driving domestic self-reliance through advanced metallurgical science.
          </p>
        </div>
      </section>

      {/* #who: Two-column Who We Are Intro */}
      <section id="who" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Who We Are</div>
              <h2 className="section-title">A New Era for Pakistan's Basic Metal Industry</h2>
              <p className="lead">
                Established over 220 acres at Port Bin Qasim, Karachi, NSCL operates a state-of-the-art 1.28 million metric tons per annum (extendable to 1.5 MTPA) gas-based MIDREX Direct Reduction Plant.
              </p>
              <p>
                As the country’s premier producer of high-metallization Direct Reduced Iron, NSCL bridges the critical gap between raw mineral resources and downstream precision steel manufacturing. We reduce dependence on volatile, contaminated scrap metal, empowering Pakistani rolling mills to produce international-grade construction and engineering steel.
              </p>
              <p>
                Originally established as Tuwairqi Steel Mills Limited (TSML), commercial production began in May 2013. The facility has since evolved into NSCL—strengthened by improved governance, domestic backward integration, and a forward-looking EAF melting strategy.
              </p>
            </div>

            <div className="reveal">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--hairline)',
                }}
              >
                <img
                  src="/plant-aerial-view.png"
                  alt="Bin Qasim Plant Site"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 18, 0.95) 100%)',
                  }}
                >
                  <span className="eyebrow" style={{ color: 'var(--ember-bright)' }}>Strategic Location</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#FFF' }}>
                    Port Bin Qasim Ocean Terminal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MoltenSteelSection />

      {/* #our: Vision & Mission with At A Glance side-card */}
      <section id="our" className="section section-bg">
        <div className="container">
          <div className="two-col">
            <div className="reveal strategy-copy">
              <div className="eyebrow">Strategic Horizon</div>
              <h2 className="section-title">Our Vision & Mission</h2>

              <div className="strategy-block reveal reveal-child">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Eye className="value-icon" size={20} style={{ margin: 0 }} />
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Corporate Vision</h3>
                </div>
                <p>
                  To be South Asia’s most sustainable, technologically advanced, and operationally rigorous integrated steel producer—anchoring Pakistan’s industrial economy with ultra-pure metallics and decarbonized manufacturing.
                </p>
              </div>

              <div className="strategy-block reveal reveal-child">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Target className="value-icon value-icon-steel" size={20} style={{ margin: 0 }} />
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Corporate Mission</h3>
                </div>
                <p>
                  To maximize national value addition by integrating domestic mineral beneficiation with world-class MIDREX gas reduction technology, delivering consistently superior DRI products while championing environmental stewardship and safety.
                </p>
              </div>
            </div>

            {/* At a glance side card */}
            <Spotlight className="reveal snapshot-card">
              <div className="eyebrow">Enterprise Snapshot</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>NSCL At A Glance</h3>

              <div className="snapshot-list">
                <div className="snapshot-item reveal reveal-child">
                  <CheckCircle2 size={20} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--ink)', display: 'block', fontSize: '0.95rem' }}>
                      220-Acre Coastal Industrial Complex
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      Prime deep-water port proximity at Bin Qasim for bulk capesize vessel handling.
                    </span>
                  </div>
                </div>

                <div className="snapshot-item reveal reveal-child">
                  <CheckCircle2 size={20} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--ink)', display: 'block', fontSize: '0.95rem' }}>
                      1.28 MTPA Certified Gas-Based DRI Capacity
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      Extendable to 1.5 MTPA, verified by Midrex Technologies Inc. performance guarantees.
                    </span>
                  </div>
                </div>

                <div className="snapshot-item reveal reveal-child">
                  <CheckCircle2 size={20} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--ink)', display: 'block', fontSize: '0.95rem' }}>
                      93.9%+ Verified Metallization Rate
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      Ultra-low tramp elements (Cu, Sn, Pb) yielding premium steel grades.
                    </span>
                  </div>
                </div>

                <div className="snapshot-item reveal reveal-child">
                  <CheckCircle2 size={20} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--ink)', display: 'block', fontSize: '0.95rem' }}>
                      Forward Integration to EAF Steelmaking
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      Direct hot-charging at 700°C saving up to 150 kWh per ton of melted steel.
                    </span>
                  </div>
                </div>
              </div>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* #our-values: 6 Value Cards */}
      <section id="our-values" className="section">
        <div className="container">
          <div className="section-header centered reveal values-intro">
            <div className="eyebrow">Our Guiding Tenets</div>
            <h2 className="section-title">Core Corporate Values</h2>
            <p className="section-subtitle">
              Every process, interaction, and engineering milestone is governed by our foundational principles.
            </p>
          </div>

          <div className="three-col values-grid">
            {valuesList.map((val, idx) => (
              <Spotlight key={val.title} className={`reveal value-card-animated value-card-delay-${idx + 1}`}>
                <div className="value-icon">
                  {valueIcons[idx]}
                </div>
                <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Value 0{idx + 1}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{val.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{val.description}</p>
              </Spotlight>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Explore Next</div>
              <h2 style={{ marginBottom: '1rem' }}>Meet The Leaders Steering NSCL</h2>
              <p>
                Discover the seasoned metallurgical directors, engineers, and financial strategists shaping our industrial footprint.
              </p>
              <div className="band-cta-buttons">
                <Link to="/our-leadership" className="btn btn-solid btn-lg">
                  <span>View Executive Leadership</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/dri-technology" className="btn btn-outline btn-lg">
                  <span>Explore DRI Technology</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
