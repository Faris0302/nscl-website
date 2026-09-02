import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Handshake, Globe2, Building, Cpu, Flame, Layers } from 'lucide-react';
import { collaborationPartners } from '../data/siteData';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const OurCollaboration: React.FC = () => {
  useRevealOnScroll();

  const partnerIcons = [
    <Cpu size={24} />,
    <Layers size={24} />,
    <Flame size={24} />,
    <Building size={24} />,
    <Globe2 size={24} />,
    <Handshake size={24} />,
  ];

  return (
    <div className="collaboration-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/collab.jpg"
          alt="NSCL Collaborations"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Company</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Our Collaborations</span>
          </div>
          <div className="eyebrow">Strategic Ecosystem</div>
          <h1>Partnerships & Group Synergies</h1>
          <p className="lead">
            Forging enduring alliances across global technology licensors, domestic mining divisions, and heavy engineering EPC providers to ensure seamless value-chain excellence.
          </p>
        </div>
      </section>

      {/* Grid of Partners */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Ecosystem Architecture</div>
            <h2 className="section-title">Strategic Collaboration Matrix</h2>
            <p className="section-subtitle">
              Comprehensive integration bridging international technological pedigree with local mineral extraction and manufacturing mastery.
            </p>
          </div>

          <div className="two-col" style={{ alignItems: 'stretch' }}>
            {collaborationPartners.map((partner, idx) => (
              <Spotlight key={partner.name} className="reveal">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      style={{ width: '96px', height: '72px', objectFit: 'contain', flexShrink: 0, backgroundColor: '#FFF', borderRadius: 'var(--radius-sm)', padding: '0.5rem' }}
                    />
                  ) : (
                    <div className={idx % 2 === 0 ? 'value-icon' : 'value-icon value-icon-steel'}>
                      {partnerIcons[idx % partnerIcons.length]}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>{partner.category}</div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{partner.name}</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{partner.description}</p>
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: 'var(--surface-2)',
                        borderLeft: '2px solid var(--ember)',
                        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink-secondary)',
                      }}
                    >
                      <strong style={{ color: 'var(--ember-bright)', display: 'block', marginBottom: '0.2rem' }}>
                        Strategic Synergy:
                      </strong>
                      {partner.focus}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.9rem', color: 'var(--muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      {partner.flagUrl && <img src={partner.flagUrl} alt={`${partner.country} flag`} style={{ width: '24px', height: '16px', objectFit: 'cover' }} />}
                      <span>{partner.country}</span>
                    </div>
                  </div>
                </div>
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
              <div className="eyebrow">Green Metallurgy</div>
              <h2 style={{ marginBottom: '1rem' }}>Committed to Sustainable Production</h2>
              <p>
                Learn how NSCL’s gas-based MIDREX reduction slashes carbon footprint compared to coal-fired blast furnaces while managing closed-loop water resources.
              </p>
              <div className="band-cta-buttons">
                <Link to="/sustainability" className="btn btn-solid btn-lg">
                  <span>Explore Sustainability</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Partner With NSCL</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
