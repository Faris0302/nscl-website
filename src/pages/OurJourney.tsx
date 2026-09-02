import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { journeyTimeline } from '../data/siteData';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const OurJourney: React.FC = () => {
  useRevealOnScroll();

  return (
    <div className="journey-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/nsclJourney.jpg"
          alt="NSCL Journey"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Company</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Our Journey</span>
          </div>
          <div className="eyebrow">Milestones & Heritage</div>
          <h1>The Journey of NSCL</h1>
          <p className="lead">
            Tracking the evolution of Pakistan’s premier direct reduced iron complex—from strategic coastal land acquisition to verified MIDREX commercial operation and value-chain integration.
          </p>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Strategic Evolution</div>
            <h2 className="section-title">Forging A Metallurgical Landmark</h2>
            <p className="section-subtitle">
              Key phases defining our technological capability, industrial resilience, and future roadmap.
            </p>
          </div>

          <div className="journey-timeline">
            {journeyTimeline.map((item, idx) => (
              <div key={item.phase} className="timeline-item reveal">
                <div className="timeline-marker" />
                <Spotlight>
                  <div className="timeline-phase">{item.phase}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>{item.description}</p>
                </Spotlight>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Alliances & Ecosystem</div>
              <h2 style={{ marginBottom: '1rem' }}>Collaborations Powering Our Scale</h2>
              <p>
                Learn how our synergies with Kobe Steel, Midrex Technologies, Al Hadeed group entities, and domestic financial institutions accelerate national progress.
              </p>
              <div className="band-cta-buttons">
                <Link to="/our-collaboration" className="btn btn-solid btn-lg">
                  <span>View Our Collaborations</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/dri-technology" className="btn btn-outline btn-lg">
                  <span>Explore MIDREX Technology</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
