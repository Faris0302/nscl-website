import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, Layers, Flame, Hammer, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Projects: React.FC = () => {
  useRevealOnScroll();

  return (
    <div className="projects-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/OurProjectsHero.jpg"
          alt="NSCL Projects"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Strategic Expansion</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Our Projects</span>
          </div>
          <div className="eyebrow">Strategic Expansion Roadmap</div>
          <h1>Integrating Pakistan's Full Steel Value Chain</h1>
          <p className="lead">
            Scaling backward into domestic iron ore beneficiation and pelletization while executing forward integration into modern Electric Arc Furnace (EAF) billet casting.
          </p>
        </div>
      </section>

      {/* 1. #beneficiation: Beneficiation Plant (Two-column) */}
      <section id="beneficiation" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Project 01 — Backward Integration</div>
              <h2 className="section-title">Domestic Iron Ore Beneficiation Plant</h2>
              <p className="lead">
                To unlock Pakistan's vast domestic mineral deposits in Balochistan (Nokkundi, Chilghazi) and Khyber Pakhtunkhwa, NSCL is establishing high-intensity magnetic and flotation beneficiation facilities.
              </p>
              <p>
                Our beneficiation process upgrades indigenous low-to-medium grade iron ores (35%–48% Fe) into ultra-pure concentrate slurries exceeding 67.5% Fe with gangue (SiO₂ + Al₂O₃) controlled under 2.5%, creating the ideal feedstock for direct reduction pelletization.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>Planned Capacity: 2.0 Million Metric Tons Concentrate per Annum</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>Substitutes 100% of imported foreign iron ore fines</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
                <img
                  src="/iron-ore-benefication.jpg"
                  alt="Beneficiation Plant"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. #pelletization: Pelletization Plant (Two-column Reversed) */}
      <section id="pelletization" className="section section-bg">
        <div className="container">
          <div className="two-col two-col-reversed">
            <div className="reveal">
              <div className="eyebrow eyebrow-steel">Project 02 — Feedstock Security</div>
              <h2 className="section-title">Al Hadeed Oxide Pelletization Facility</h2>
              <p className="lead">
                Direct reduction shaft furnaces demand spherical oxide pellets (9–16mm) with exceptional cold crushing strength (&gt;250 daN/pellet) and controlled porosity for optimum gas permeability.
              </p>
              <p>
                In partnership with Al Hadeed Pelletization Co., NSCL is installing a traveling grate pelletizing plant at Port Qasim. The facility ball-mills beneficiated concentrates, disc-pelletizes them with specialized binders, and indurates them at 1,300°C to feed the adjacent MIDREX shaft reactor.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--steel-light)' }} />
                  <span>Target Output: 2.4 Million Metric Tons DR-Grade Pellets / Year</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--steel-light)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--steel-light)' }} />
                  <span>Direct automated conveyor link to NSCL Shaft Furnace Silos</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
                <img
                  src="/iron-ore-pelletization.jpg"
                  alt="Pelletization Facility"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. #forward: Forward Integration Plant (Two-column) */}
      <section id="forward" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Project 03 — Forward Integration</div>
              <h2 className="section-title">Electric Arc Furnace (EAF) & Continuous Billet Casting</h2>
              <p className="lead">
                The ultimate phase of NSCL's master plan is the construction of a state-of-the-art melt shop featuring a 120-ton ultra-high-power Electric Arc Furnace (EAF), Ladle Refining Furnace (LRF), and continuous 6-strand billet caster.
              </p>
              <p>
                By hot-charging HDRI directly from the MIDREX shaft furnace at 700°C into the EAF bath, the plant saves 120–150 kWh per ton of melted liquid steel, cuts electrode consumption, and produces 1.0 MTPA of high-tensile engineering billets for Pakistan's national infrastructure projects.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>Annual Liquid Steel Capacity: 1.0 MTPA Prime Billets</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ember-bright)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>Direct Hot Charge (HDRI) pneumatic transport infrastructure</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
                <img
                  src="/EAF-Steelmaking.jpg"
                  alt="Forward Integration EAF"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Value Chain: 4-Step Horizontal Process Track */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">End-To-End Architecture</div>
            <h2 className="section-title">Full Value Chain Integration</h2>
            <p className="section-subtitle">
              From indigenous mountain extraction to international-standard certified construction steel.
            </p>
          </div>

          <div className="process-track">
            <Spotlight className="process-step reveal">
              <div className="process-step-num">STAGE 01</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Iron Ore Extraction</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Surface mining across domestic iron ore concessions in Balochistan and KPK by Al Hadeed Extraction Co.
              </p>
            </Spotlight>

            <Spotlight className="process-step reveal">
              <div className="process-step-num" style={{ color: 'var(--steel-light)' }}>STAGE 02</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ore Beneficiation</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Upgrading raw run-of-mine ore into ultra-high-grade concentrate slurries exceeding 67.5% Fe purity.
              </p>
            </Spotlight>

            <Spotlight className="process-step reveal">
              <div className="process-step-num">STAGE 03</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>DR Pelletization</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Indurating micro-fines into spherical oxide pellets optimized for shaft furnace gas permeability.
              </p>
            </Spotlight>

            <Spotlight className="process-step reveal">
              <div className="process-step-num" style={{ color: 'var(--ember-bright)' }}>STAGE 04</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>DRI & Forward EAF</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Solid-state MIDREX gas reduction and direct hot-charging to produce certified prime steel billets.
              </p>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section">
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Engineering Precision</div>
              <h2 style={{ marginBottom: '1rem' }}>Engineered by Q-Engineering Services</h2>
              <p>
                Discover the heavy fabrication workshops, technology center, and EPC project capabilities supporting NSCL.
              </p>
              <div className="band-cta-buttons">
                <Link to="/q-engineering" className="btn btn-solid btn-lg">
                  <span>Explore Q-Engineering</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Contact Projects Division</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
