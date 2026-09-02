import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap, Stethoscope, BookOpen, HardHat, MessagesSquare } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const SocialResponsibility: React.FC = () => {
  useRevealOnScroll();

  const csrItems = [
    {
      icon: <Users size={22} />,
      title: 'Local Employment',
      eyebrow: 'Pillar 01',
      description: 'Prioritizing local hiring across Karachi, Bin Qasim, and adjoining coastal communities, providing thousands of sustainable direct and indirect technical livelihoods.',
    },
    {
      icon: <GraduationCap size={22} />,
      title: 'Technical Skills Development',
      eyebrow: 'Pillar 02',
      description: 'Operating on-site apprenticeship academies offering certified training in heavy metallurgy, high-voltage electrical systems, DCS automation, and precision welding.',
    },
    {
      icon: <Stethoscope size={22} />,
      title: 'Community Healthcare Access',
      eyebrow: 'Pillar 03',
      description: 'Sponsoring free mobile medical camps, maternal health screenings, and clean drinking water filtration plants for residential areas adjacent to Port Qasim.',
    },
    {
      icon: <BookOpen size={22} />,
      title: 'Education Support',
      eyebrow: 'Pillar 04',
      description: 'Partnering with local public schools and technical vocational institutes to upgrade science laboratories, provide textbooks, and award engineering scholarships.',
    },
    {
      icon: <HardHat size={22} />,
      title: 'Civic Infrastructure',
      eyebrow: 'Pillar 05',
      description: 'Investing in industrial corridor road safety, drainage reinforcement, solar-powered street illumination, and municipal sanitation improvements around Bin Qasim.',
    },
    {
      icon: <MessagesSquare size={22} />,
      title: 'Stakeholder Engagement',
      eyebrow: 'Pillar 06',
      description: 'Maintaining transparent, constructive dialogue with local community elders, labor unions, government authorities, and port administrators to foster inclusive prosperity.',
    },
  ];

  return (
    <div className="csr-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/csr.jpg"
          alt="NSCL Social Responsibility"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/sustainability">Sustainability</Link>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Social Responsibility</span>
          </div>
          <div className="eyebrow">Community & Human Capital</div>
          <h1>Corporate Social Responsibility</h1>
          <p className="lead">
            Empowering coastal communities through local job creation, vocational engineering mentorship, healthcare interventions, and civic infrastructure development.
          </p>
        </div>
      </section>

      {/* 6-Card Value Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Social Impact Framework</div>
            <h2 className="section-title">Investing In People & Communities</h2>
            <p className="section-subtitle">
              Our growth is inextricably linked with the socioeconomic well-being of the people and region in which we operate.
            </p>
          </div>

          <div className="three-col">
            {csrItems.map((item, idx) => (
              <Spotlight key={item.title} className="reveal">
                <div className={idx % 2 === 0 ? 'value-icon' : 'value-icon value-icon-steel'}>
                  {item.icon}
                </div>
                <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>{item.eyebrow}</div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{item.description}</p>
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
              <div className="eyebrow">Workplace Rigor</div>
              <h2 style={{ marginBottom: '1rem' }}>Zero Compromise on Health & Safety</h2>
              <p>
                Explore the stringent international protocols, protective equipment standards, and emergency response mechanisms protecting NSCL's personnel.
              </p>
              <div className="band-cta-buttons">
                <Link to="/health-safety" className="btn btn-solid btn-lg">
                  <span>View Health & Safety</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/hr-careers" className="btn btn-outline btn-lg">
                  <span>Join Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
