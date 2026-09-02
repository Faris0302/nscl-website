import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Flame, Cpu, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { EmberParticles } from '../components/EmberParticles';
import { Spotlight } from '../components/Spotlight';
import { AnimatedStat } from '../components/AnimatedStat';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Home: React.FC = () => {
  useRevealOnScroll();

  const galleryItems = [
    {
      image: '/midrex-shaft-furnace.png',
      tag: 'METALLURGY',
      caption: 'Reduction Furnace - The Tallest Structure On The Industrial Map Of Pakistan - 107m',
    },
    {
      image: '/automation-system.png',
      tag: 'PROCESS AUTOMATION',
      caption: 'Main Control Room DCS System & Continuous Telemetry',
    },
    {
      image: '/day-bin.png',
      tag: 'RAW MATERIAL STORAGE',
      caption: 'Day Bin Storage & Controlled Ore Feed to the DRI Plant',
    },
    {
      image: '/high-temp-reactor.jpg',
      tag: 'THERMAL EFFICIENCY',
      caption: 'High-Temperature Gas Reforming Reactor Chamber (~900°C)',
    },
    {
      image: '/process-gas-compressor.png',
      tag: 'PROCESS GAS SYSTEM',
      caption: 'Process Gas Compression & Recirculation for the DRI Reduction Process',
    },
    {
      image: '/ro-plant.png',
      tag: 'WATER TREATMENT',
      caption: 'Reverse Osmosis Plant for Reliable Process Water Treatment & Supply',
    },
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero">
        {/* Fallback & Poster video container */}
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="/Video-Project-1.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />
        <div className="hero-scanner" />
        <EmberParticles count={20} />

        <div className="container">
          <div className="hero-content reveal">
            <div className="eyebrow">Integrated Direct Reduced Iron Complex</div>
            <h1 className="hero-headline">
              Forging the Future <span className="ember-text">Of <span className="steel-text">Steel</span></span>
            </h1>
            <p className="hero-lead">
              Pakistan’s premier private-sector integrated DRI manufacturing complex at Port Bin Qasim, Karachi. Engineered with Japanese MIDREX gas-based reduction technology to produce ultra-pure metallics while cutting carbon emissions.
            </p>

            <div className="hero-cta-group">
              <Link to="/dri-technology" className="btn btn-solid btn-lg">
                <span>Explore DRI Technology</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact-us" className="btn btn-outline btn-lg">
                <span>Contact Commercial Team</span>
              </Link>
            </div>

            {/* 3 Animated Hero Stat Counters */}
            <div className="hero-stats">
              <AnimatedStat
                value={220}
                label="Acres at Port Bin Qasim, Karachi"
              />
              <AnimatedStat
                value={1.28}
                decimals={2}
                suffix="M"
                label="Tons Annual DRI Plant Capacity"
              />
              <AnimatedStat
                value={700}
                suffix="°C"
                label="Hot DRI Direct Discharge Temperature"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / PILLARS TWO-COLUMN SECTION */}
      <section className="section section-bg">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Industrial Paradigm Shift</div>
              <h2 className="section-title">
                Redefining Metallurgy Through Clean Gas Reduction
              </h2>
              <p className="lead">
                National Steel Complex Limited (NSCL) represents a landmark leap in Pakistan's industrial development. By harnessing natural gas to directly reduce high-grade iron ore pellets in solid state, NSCL eliminates the high-carbon blast furnace route.
              </p>
              <p>
                Our facility delivers high-purity Direct Reduced Iron (DRI) boasting 93.9%+ metallization, providing local steel melters with a superior, uniform alternative to unpredictable scrap metal imports while securing national foreign exchange reserves.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/about-us" className="btn btn-solid">
                  <span>Learn More About NSCL</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* 3 Numbered Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Spotlight className="reveal">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div className="value-icon">
                    <Layers size={22} />
                  </div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Pillar 01</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Integrated Value Chain</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                      From domestic mine beneficiation and pelletization to gas-based shaft reduction and forward EAF melting.
                    </p>
                  </div>
                </div>
              </Spotlight>

              <Spotlight className="reveal">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div className="value-icon value-icon-steel">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <div className="eyebrow eyebrow-steel" style={{ marginBottom: '0.25rem' }}>Pillar 02</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>World-Class MIDREX Technology</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                      Licensed from Kobe Steel Ltd. Japan, setting international benchmarks for energy efficiency and metallization rates.
                    </p>
                  </div>
                </div>
              </Spotlight>

              <Spotlight className="reveal">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div className="value-icon">
                    <Flame size={22} />
                  </div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Pillar 03</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Forward Integration to EAF</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                      Direct hot-charging of HDRI at 700°C directly into Electric Arc Furnaces, saving up to 150 kWh/t of electrical energy.
                    </p>
                  </div>
                </div>
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4-COLUMN STAT STRIP */}
      <section className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            <div className="stat-strip-card reveal">
              <div className="stat-strip-value">
                1.5<span>M</span>
              </div>
              <div className="stat-strip-label">Tons Extendable Annual DRI Capacity</div>
            </div>

            <div className="stat-strip-card static-accent reveal">
              <div className="stat-strip-value" style={{ color: 'var(--steel-light)' }}>
                #1
              </div>
              <div className="stat-strip-label">Private-Sector Integrated DRI Complex in Pakistan</div>
            </div>

            <div className="stat-strip-card static-accent reveal">
              <div className="stat-strip-value" style={{ color: 'var(--steel-light)' }}>
                MIDREX
              </div>
              <div className="stat-strip-label">Kobe Steel, Japan — Process Licensor</div>
            </div>

            <div className="stat-strip-card reveal">
              <div className="stat-strip-value">
                220<span>ac</span>
              </div>
              <div className="stat-strip-label">Bin Qasim Oceanfront Industrial Site</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTO GALLERY "THE COMPLEX, IN PHOTOS" */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Visual Tour</div>
            <h2 className="section-title">The Complex, In Photos</h2>
            <p className="section-subtitle">
              A high-precision look at Pakistan’s metallurgical powerhouse located at Port Bin Qasim, Karachi.
            </p>
          </div>

          {/* 3x2 Grid of equal square tiles */}
          <div className="gallery-grid">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="gallery-tile reveal">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{item.tag}</span>
                  <div className="gallery-caption">{item.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CENTERED CTA BAND */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Strategic Industrial Capability</div>
              <h2 style={{ marginBottom: '1rem' }}>
                Transforming Pakistan’s Industrial Horizon
              </h2>
              <p>
                Discover the engineering science behind solid-state reduction, or contact our commercial sales team for bulk direct reduced iron procurement.
              </p>
              <div className="band-cta-buttons">
                <Link to="/dri-technology" className="btn btn-solid btn-lg">
                  <span>Explore DRI Technology</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Contact Sales Office</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
