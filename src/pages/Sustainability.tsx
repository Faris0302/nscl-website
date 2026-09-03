import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Droplet, Zap, HeartHandshake, ShieldAlert, Award } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Sustainability: React.FC = () => {
  useRevealOnScroll();

  return (
    <div className="sustainability-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/sustainability.jpg"
          alt="NSCL Sustainability"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Sustainability</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Environmental Initiatives</span>
          </div>
          <div className="eyebrow">Decarbonized Metallurgy</div>
          <h1>Sustainable Industrial Stewardship</h1>
          <p className="lead">
            Championing low-emission ironmaking through clean natural gas solid-state reduction, closed-loop water recirculation, and energy-conserving thermal recovery networks.
          </p>
        </div>
      </section>

      {/* #Environmental: Two-column section on gas-based DRI/emissions */}
      <section id="Environmental" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Gas-Based Reduction</div>
              <h2 className="section-title">A Drastic Reduction in Greenhouse Gas Emissions</h2>
              <p className="lead">
                Unlike traditional integrated steel mills that rely on coal-fired coke ovens and blast furnaces—which generate over 1.8 to 2.2 tons of CO₂ per ton of crude steel—NSCL’s MIDREX gas-based DRI route drastically lowers CO₂ intensity.
              </p>
              <p>
                By utilizing reformed natural gas (a synthesis of H₂ and CO) as the primary reducing agent, iron oxides are reduced to metallic iron in solid state without melting inside the shaft furnace. This eliminates the toxic slag, particulate soot, and high carbon emissions typical of blast furnace smelting.
              </p>
              <p>
                Furthermore, the MIDREX shaft architecture is inherently future-proof: it can seamlessly transition to blend increasing percentages of green hydrogen (H₂), unlocking the pathway to near-zero net emissions steelmaking in Pakistan.
              </p>
            </div>

            <div className="reveal">
              <Spotlight>
                <div className="eyebrow" style={{ color: 'var(--steel-light)' }}>Environmental Benchmark</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Emissions Differential</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #64748B' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
                      TRADITIONAL BLAST FURNACE ROUTE (BF-BOF)
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', margin: '0.25rem 0' }}>
                      ~2.0 – 2.2 t CO₂ / ton liquid steel
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Heavy coal combustion, coke ovens & sinter dust.</span>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 122, 26, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--ember-bright)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ember-bright)' }}>
                      NSCL GAS-BASED MIDREX DRI ROUTE
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#FFF', margin: '0.25rem 0' }}>
                      ~0.7 – 0.9 t CO₂ / ton metallic Fe
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                      55%–60% reduction in carbon footprint with zero coke combustion.
                    </span>
                  </div>
                </div>
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Card Environmental Value Grid */}
      <section className="section section-bg" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="three-col sustainability-values-grid">
            <Spotlight className="reveal">
              <div className="value-icon">
                <Wind size={22} />
              </div>
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Air Quality</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Emissions Management</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Continuous stack emission monitors (CEMS) measure NOₓ, SOₓ, and particulate matter, ensuring emissions consistently beat Sindh Environmental Protection Agency (SEPA) statutory thresholds.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon value-icon-steel">
                <Droplet size={22} />
              </div>
              <div className="eyebrow eyebrow-steel" style={{ marginBottom: '0.25rem' }}>Water Resources</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Water Stewardship</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Advanced multi-stage closed-circuit cooling towers with clarifiers and filtration units recycle 98%+ of process water, minimizing fresh intake in coastal Karachi.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon">
                <Zap size={22} />
              </div>
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Thermal Recovery</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Energy Efficiency</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Reformer flue gas recuperators preheat combustion air and natural gas feeds, capturing waste sensible heat and driving thermal net efficiency below 2.47 Gcal per ton.
              </p>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* Full-width framed photo with caption */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
            <img
              src="/closed-loop-cooling-infrastructure.png"
              alt="Closed-loop cooling infrastructure at Bin Qasim"
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
            <div
              style={{
                padding: '1.5rem 2rem',
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--hairline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span className="eyebrow" style={{ margin: 0 }}>Infrastructure Spotlight</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Closed-loop cooling infrastructure at Bin Qasim
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--steel-light)' }}>
                98% Water Recirculation Rate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Card Band Linking to CSR, Health & Safety, Certifications */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Comprehensive Governance</div>
            <h2 className="section-title">Explore Our Sustainability Pillars</h2>
            <p className="section-subtitle">
              Learn how NSCL balances environmental rigor with community empowerment and workplace safety.
            </p>
          </div>

          <div className="three-col">
            <Spotlight className="reveal">
              <div className="value-icon">
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Social Responsibility</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Local youth skill training, community health interventions, and educational infrastructure in Bin Qasim and Malir.
              </p>
              <Link to="/social-responsibility" className="btn btn-outline btn-sm">
                <span>View CSR Initiatives</span>
                <ArrowRight size={14} />
              </Link>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon value-icon-steel">
                <ShieldAlert size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Health & Safety</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Zero-harm occupational safety management, high-temperature protocols, and emergency readiness drills.
              </p>
              <Link to="/health-safety" className="btn btn-outline btn-sm">
                <span>View Safety Standards</span>
                <ArrowRight size={14} />
              </Link>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon">
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Certifications & Compliance</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                ISO 9001, ISO 14001, and ISO 45001 certified operational standards and SEPA environmental compliance.
              </p>
              <Link to="/certifications" className="btn btn-outline btn-sm">
                <span>View Certifications</span>
                <ArrowRight size={14} />
              </Link>
            </Spotlight>
          </div>
        </div>
      </section>
    </div>
  );
};
