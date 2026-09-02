import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, Flame, AlertOctagon, GraduationCap, ClipboardCheck } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { Spotlight } from '../components/Spotlight';

export const HealthSafety: React.FC = () => {
  useRevealOnScroll();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const accordionItems = [
    {
      title: 'Personal Protective Equipment (PPE) Mandates',
      icon: <ShieldCheck size={22} />,
      content: 'All personnel, contractors, and site visitors are required to wear specialized protective gear: heat-resistant aluminized clothing in furnace proximity, NFPA-certified flame-retardant coveralls, steel-toed dielectric safety footwear, high-impact polycarbonate eye protection, and personal gas monitors for CO/CH₄ detection.',
    },
    {
      title: 'High-Temperature Process Safety & Gas Interlocks',
      icon: <Flame size={22} />,
      content: 'Operating a direct reduction shaft furnace at temperatures up to 900°C requires fail-safe engineering. Our facility integrates automated nitrogen purging circuits, dual automated emergency shutdown (ESD) valves on all natural gas feed lines, and triple-redundant flame scanners continuously polled by safety PLCs.',
    },
    {
      title: 'Emergency Response & Crisis Management',
      icon: <AlertOctagon size={22} />,
      content: 'NSCL maintains a 24/7 on-site emergency command center equipped with dedicated industrial fire tenders, self-contained breathing apparatus (SCBA) banks, high-volume foam suppression systems, and mutual-aid agreements with the Port Qasim Authority Fire & Rescue brigades.',
    },
    {
      title: 'Continuous Training & Competency Certification',
      icon: <GraduationCap size={22} />,
      content: 'Prior to entering active operational areas, every employee undergoes rigorous induction modules covering permit-to-work (PTW) protocols, lockout-tagout (LOTO) isolation, confined space entry, working at heights, and live high-temperature molten metal handling drills.',
    },
    {
      title: 'Incident Reporting & Independent Safety Audits',
      icon: <ClipboardCheck size={22} />,
      content: 'We enforce a transparent "Near-Miss" reporting culture with zero blame. Periodic third-party safety audits, daily tool-box talks, and weekly safety steering committee reviews ensure continuous improvement toward our goal of Zero Harm across all operations.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="health-safety-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/health-and-safety.jpg"
          alt="NSCL Health & Safety"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/sustainability">Sustainability</Link>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Health & Safety</span>
          </div>
          <div className="eyebrow">Zero Harm Philosophy</div>
          <h1>Health, Safety & Environment (HSE)</h1>
          <p className="lead">
            Uncompromising safety governance, advanced hazard prevention, and high-temperature operational protocols ensuring our workforce returns home safely every single day.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Operational Standards</div>
            <h2 className="section-title">Comprehensive Safety Framework</h2>
            <p className="section-subtitle">
              Click on each pillar below to explore our safety protocols, engineering controls, and emergency procedures.
            </p>
          </div>

          <div className="accordion reveal">
            {accordionItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.title}
                  className={`accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: isOpen ? 'var(--ember-bright)' : 'var(--muted)' }}>
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className="accordion-icon" size={20} />
                  </button>

                  {isOpen && (
                    <div className="accordion-body">
                      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.7' }}>
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Quality & Compliance</div>
              <h2 style={{ marginBottom: '1rem' }}>Verified International Certifications</h2>
              <p>
                Review our full suite of ISO 9001, ISO 14001, ISO 45001 accreditations and environmental statutory compliances.
              </p>
              <div className="band-cta-buttons">
                <Link to="/certifications" className="btn btn-solid btn-lg">
                  <span>View Certifications</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Contact Safety Officer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
