import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Wrench, Building, Layers, ShieldCheck, Cog, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { EngineeringCalculators } from '../components/EngineeringCalculators';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const QEngineering: React.FC = () => {
  useRevealOnScroll();

  const profileCards = [
    {
      title: 'Detailed Engineering & Design',
      eyebrow: 'Capability 01',
      icon: <Cpu size={22} />,
      desc: '3D plant modeling, finite element analysis (FEA), stress piping simulations, and advanced DCS/SCADA architectural schematics.',
    },
    {
      title: 'Global Sourcing & Procurement',
      eyebrow: 'Capability 02',
      icon: <Layers size={22} />,
      desc: 'Strategic international supply chain management for API-grade piping, specialized alloys, high-temperature refractories, and critical rotating equipment.',
    },
    {
      title: 'Civil & Heavy Construction',
      eyebrow: 'Capability 03',
      icon: <Building size={22} />,
      desc: 'Deep marine pile driving, reinforced mass foundations for vibrating machinery, structural steel erection, and industrial roofing systems.',
    },
    {
      title: 'Precision Heavy Fabrication',
      eyebrow: 'Capability 04',
      icon: <Wrench size={22} />,
      desc: 'ASME-certified welding, pressure vessel manufacturing, heat exchanger bundles, heavy ductwork, and modular process skid assemblies.',
    },
    {
      title: 'Plant Commissioning & Start-up',
      eyebrow: 'Capability 05',
      icon: <ShieldCheck size={22} />,
      desc: 'Cold loop checks, hot refractory dry-out, burner management tuning, safety shutdown verification, and performance guarantee demonstration trials.',
    },
    {
      title: 'Lifecycle Maintenance & Overhaul',
      eyebrow: 'Capability 06',
      icon: <Cog size={22} />,
      desc: '24/7 predictive condition monitoring, vibration analysis, emergency shutdown repairs, and planned major turnaround overhauls.',
    },
  ];

  const machineGallery = [
    { image: '/machine1.jpeg', name: 'Engine Lathe / Centre Lathe' },
    { image: '/machine2.jpeg', name: 'Hydraulic Press Brake' },
    { image: '/machine3.jpeg', name: 'Horizontal Band Saw / Metal Cutting Saw' },
    { image: '/machine4.jpeg', name: 'Hydraulic Ironworker / Punching & Shearing Machine' },
    { image: '/machine5.jpeg', name: 'Plate / Section Rolling Machine' },
    { image: '/machine6.jpeg', name: '3-Roll Plate Bending Machine' },
    { image: '/machine7.jpeg', name: 'Hydraulic Guillotine Shearing Machine' },
    { image: '/machine8.jpeg', name: 'Radial Arm Drilling Machine' },
  ];

  return (
    <div className="q-engineering-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80"
          alt="Q-Engineering Services"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Group Services</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Q-Engineering</span>
          </div>
          <div className="eyebrow">Engineering, Procurement & Construction</div>
          <h1>Q-Engineering Services</h1>
          <p className="lead">
            The heavy engineering arm of our industrial group, delivering world-class design, structural fabrication, precision machining, and EPC execution for heavy industrial facilities.
          </p>
        </div>
      </section>

      {/* 1. #technology: Technology Center (Two-column) */}
      <section id="technology" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Innovation & Design Center</div>
              <h2 className="section-title">State-of-the-Art Technology Center</h2>
              <p className="lead">
                Q-Engineering’s Technology Center houses multi-disciplinary teams of metallurgical, mechanical, civil, and electrical engineers specializing in heavy process industry infrastructure.
              </p>
              <p>
                Equipped with cutting-edge CAD/CAM workstations, dynamic computational fluid dynamics (CFD) simulation suites, and finite element modeling tools, our engineering teams design high-temperature gas conduits, pressure vessels, and automation control systems to stringent international codes (ASME, API, DIN, ISO).
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>Comprehensive 3D BIM Plant Digitization</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--ember-bright)' }} />
                  <span>High-Temperature Thermal Stress Modeling</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="technology-gallery">
                <img
                  src="/Q-Engineering-1.jpeg"
                  alt="Q-Engineering Technology Centre"
                />
                <img
                  src="/Q-Engineering-2.jpeg"
                  alt="Q-Engineering Technology Centre equipment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. #fabrication: Fabrication Facility (Two-column Reversed) */}
      <section id="fabrication" className="section section-bg">
        <div className="container">
          <div className="two-col two-col-reversed">
            <div className="reveal">
              <div className="eyebrow eyebrow-steel">Heavy Manufacturing</div>
              <h2 className="section-title">Heavy Fabrication & Machining Facility</h2>
              <p className="lead">
                Spanning over 25,000 square meters of covered workshop floor with 50-ton overhead crane capacities, our Bin Qasim fabrication facility executes complex structural and pressure equipment manufacturing.
              </p>
              <p>
                Capabilities include CNC plasma and oxy-fuel cutting, 4-roll heavy plate bending (up to 75mm thickness), submerged arc welding (SAW), automated tube-to-tubesheet orbital welding, and precision large-diameter horizontal boring machines.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--steel-light)' }} />
                  <span>15,000 Metric Tons Annual Structural Fabrication Capacity</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--steel-light)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--steel-light)' }} />
                  <span>ASME 'U' and 'S' Stamp Certified Quality Control</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
                <img
                  src="/fabrication-facility.png"
                  alt="Fabrication Facility"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. #machines: Industrial Machinery Gallery */}
      <section id="machines" className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow eyebrow-steel">Workshop Equipment</div>
            <h2 className="section-title">Industrial Machinery Gallery</h2>
            <p className="section-subtitle">
              A closer look at the heavy-duty machinery supporting our fabrication, machining, and industrial construction capabilities.
            </p>
          </div>

          <div className="machine-grid">
            {machineGallery.map((machine, index) => (
              <figure key={machine.image} className="machine-card reveal">
                <div className="machine-image-wrapper">
                  <img
                    src={machine.image}
                    alt={`${machine.name} at Q-Engineering`}
                    className="machine-image"
                    loading={index > 1 ? 'lazy' : undefined}
                  />
                </div>
                <figcaption>
                  <span className="machine-index">Machine {String(index + 1).padStart(2, '0')}</span>
                  <span className="machine-caption">{machine.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. #tools: Engineering Calculators */}
      <section id="tools" className="section q-tools-section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Fabrication Planning Tools</div>
            <h2 className="section-title">Engineering Calculators</h2>
            <p className="section-subtitle">
              Estimate material weights and rolling requirements before your next fabrication inquiry.
            </p>
          </div>
          <div className="reveal">
            <EngineeringCalculators />
          </div>
        </div>
      </section>

      {/* 5. #profile: 6-Card Value Grid */}
      <section id="profile" className="section q-profile-section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Service Spectrum</div>
            <h2 className="section-title">Corporate Engineering Capabilities</h2>
            <p className="section-subtitle">
              End-to-end industrial execution capabilities spanning concept, manufacturing, and operational maintenance.
            </p>
          </div>

          <div className="three-col">
            {profileCards.map((item, idx) => (
              <Spotlight key={item.title} className="reveal">
                <div className={idx % 2 === 0 ? 'value-icon' : 'value-icon value-icon-steel'}>
                  {item.icon}
                </div>
                <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>{item.eyebrow}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>{item.desc}</p>
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
              <div className="eyebrow">Talent & Opportunities</div>
              <h2 style={{ marginBottom: '1rem' }}>Build Your Engineering Career at NSCL</h2>
              <p>
                We are actively recruiting passionate metallurgists, mechanical designers, control engineers, and safety professionals.
              </p>
              <div className="band-cta-buttons">
                <Link to="/hr-careers" className="btn btn-solid btn-lg">
                  <span>View Career Openings</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Contact Engineering Desk</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
