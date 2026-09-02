import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Leaf, FileCheck, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Certifications: React.FC = () => {
  useRevealOnScroll();

  const certs = [
    {
      badge: 'ISO 9001:2015',
      title: 'Quality Management System',
      certificateUrl: '/Certificate-QMS.pdf',
      icon: <Award size={24} />,
      desc: 'Certified quality assurance governing continuous metallurgical testing, raw material grading, metallization verification, and customer delivery standards.',
      bullets: [
        'Statistical Process Control (SPC)',
        'XRF & Wet Chemistry Lab Testing',
        'Customer Lot Traceability',
      ],
    },
    {
      badge: 'ISO 14001:2015',
      title: 'Environmental Management System',
      certificateUrl: '/Certificate-EMS.pdf',
      icon: <Leaf size={24} />,
      desc: 'Systematic framework monitoring greenhouse gas emissions, closed-loop water treatment recycling, waste minimization, and industrial energy efficiency.',
      bullets: [
        'Continuous Stack Emissions Monitoring',
        '98%+ Water Recirculation',
        'Solid Waste Reutilization Protocols',
      ],
    },
    {
      badge: 'ISO 45001:2018',
      title: 'Occupational Health and Safety Management System',
      certificateUrl: '/Certificate-OHSMS.pdf',
      icon: <ShieldCheck size={24} />,
      desc: 'Comprehensive occupational safety systems ensuring zero-harm work conditions, high-temperature risk mitigations, and hazard prevention programs.',
      bullets: [
        'Permit-to-Work (PTW) Governance',
        'Real-time Multi-Gas Telemetry',
        '24/7 Command Center & Medical Unit',
      ],
    },
    {
      badge: 'SEPA & FEDERAL',
      title: 'Regulatory & Environmental Filings',
      icon: <FileCheck size={24} />,
      desc: 'Full compliance with Sindh Environmental Protection Agency (SEPA) statutory mandates, National Environmental Quality Standards (NEQS), and Port Qasim Authority rules.',
      bullets: [
        'Approved Environmental Impact Assessment (EIA)',
        'Periodic Third-Party NEQS Audits',
        'Hazardous Material Handling Consents',
      ],
    },
  ];

  return (
    <div className="certifications-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/certifications.jpeg"
          alt="NSCL Certifications"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/sustainability">Sustainability</Link>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Certifications & Compliance</span>
          </div>
          <div className="eyebrow">International Standards</div>
          <h1>Certifications & Regulatory Compliance</h1>
          <p className="lead">
            Adhering to rigorous global quality, environmental, and occupational safety benchmarks verified by leading international registrar bodies and national authorities.
          </p>
        </div>
      </section>

      {/* 4-Column Cert Card Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Accreditation Portfolio</div>
            <h2 className="section-title">Verified Operational Integrity</h2>
            <p className="section-subtitle">
              Every phase of our production and corporate governance meets world-class compliance standards.
            </p>
          </div>

          <div className="four-col">
            {certs.map((cert, idx) => (
              <Spotlight key={cert.badge} className="cert-card reveal">
                <span className="cert-badge">{cert.badge}</span>
                <div className={idx % 2 === 0 ? 'value-icon' : 'value-icon value-icon-steel'}>
                  {cert.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
                  {cert.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                  {cert.desc}
                </p>

                <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '1rem', width: '100%', marginTop: 'auto' }}>
                  {cert.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.35rem' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--ember-bright)', flexShrink: 0 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '1.25rem', width: '100%' }}
                  >
                    <span>View Certificate</span>
                    <ArrowRight size={14} />
                  </a>
                )}
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
              <div className="eyebrow">Technology Foundation</div>
              <h2 style={{ marginBottom: '1rem' }}>The Science of MIDREX Direct Reduction</h2>
              <p>
                Explore how solid-state gas reduction delivers superior purity metallics with verified performance parameters.
              </p>
              <div className="band-cta-buttons">
                <Link to="/dri-technology" className="btn btn-solid btn-lg">
                  <span>Explore DRI Technology</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  <span>View Product Catalog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
