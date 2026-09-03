import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, MapPin, Award, Shield, Sparkles, Send, CheckCircle2, Paperclip, X } from 'lucide-react';
import { jobOpenings } from '../data/siteData';
import { JobOpening } from '../types';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const Careers: React.FC = () => {
  useRevealOnScroll();

  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantRole, setApplicantRole] = useState<string>('');
  const [applicantExperience, setApplicantExperience] = useState<string>('');
  const [applicantMessage, setApplicantMessage] = useState<string>('');
  const [applicantCv, setApplicantCv] = useState<File | null>(null);
  const applicantCvInputRef = useRef<HTMLInputElement | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const departments = ['All', 'Operations', 'Engineering', 'HSE', 'Corporate'];

  const filteredJobs = selectedDept === 'All'
    ? jobOpenings
    : jobOpenings.filter((job) => job.department === selectedDept);

  const handleApplyClick = (jobTitle: string) => {
    setApplicantRole(jobTitle);
    const formElement = document.getElementById('how-to-apply');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCvClear = () => {
    setApplicantCv(null);
    if (applicantCvInputRef.current) {
      applicantCvInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantCv) {
      setError('Please attach your CV or resume before submitting.');
      return;
    }

    if (applicantCv.size > 10 * 1024 * 1024) {
      setError('Your CV or resume must be 10 MB or smaller.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', applicantName);
      formData.append('email', applicantEmail);
      formData.append('role', applicantRole);
      formData.append('experience', applicantExperience);
      formData.append('message', applicantMessage);
      formData.append('type', 'Job Application');
      if (applicantCv) {
        formData.append('cv', applicantCv);
      }

      const response = await fetch('https://formspree.io/f/xzebrvag', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setApplicantName('');
        setApplicantEmail('');
        setApplicantRole('');
        setApplicantExperience('');
        setApplicantMessage('');
        handleCvClear();
      } else {
        setError('Failed to submit application. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="careers-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1920&q=80"
          alt="NSCL Careers"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>People & Culture</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Careers</span>
          </div>
          <div className="eyebrow">Human Capital Excellence</div>
          <h1>Shape The Future Of Heavy Metallurgy</h1>
          <p className="lead">
            Join the visionary engineers, metallurgists, control specialists, and operational leaders driving Pakistan’s first private-sector integrated DRI complex.
          </p>
        </div>
      </section>

      {/* #future-of-steel: Future of Steel Section */}
      <section id="future-of-steel" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Pioneering Industry</div>
              <h2 className="section-title">The Future of Steel is Built Here</h2>
              <p className="lead">
                Working at NSCL means being at the forefront of Pakistan's industrial transformation. We offer hands-on immersion in state-of-the-art Japanese MIDREX gas reduction technology—a benchmark rarely found in the region.
              </p>
              <p>
                From DCS-automated furnace operations and catalytic gas reforming to high-voltage power networks and forward EAF melting, our teams tackle high-impact metallurgical challenges that directly displace foreign scrap imports and strengthen national GDP.
              </p>
            </div>

            <div className="reveal">
              <Spotlight>
                <div className="eyebrow" style={{ color: 'var(--steel-light)' }}>Why Heavy Industry?</div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Real Engineering at Scale</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>1.28 MTPA Direct Impact:</strong> Operate high-capacity shaft reactors processing thousands of tons daily.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>Kobe Steel & Midrex Pedigree:</strong> Learn from global technology licensors and international technical advisors.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--ember-bright)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                      <strong>Decarbonization Leadership:</strong> Pioneer low-carbon gas and green hydrogen reduction routes.
                    </span>
                  </div>
                </div>
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* #creating-strength: Creating Strength Section */}
      <section id="creating-strength" className="section section-bg">
        <div className="container">
          <div className="two-col two-col-reversed">
            <div className="reveal">
              <div className="eyebrow eyebrow-steel">Talent Development</div>
              <h2 className="section-title">Creating Strength From Within</h2>
              <p className="lead">
                We believe that the strength of our steel is a reflection of the strength of our people. NSCL invests heavily in continuous technical education, structured on-site apprenticeships, and executive leadership tracks.
              </p>
              <p>
                Our employees benefit from competitive compensation frameworks, comprehensive medical coverage for families, safe transportation to Port Bin Qasim, and on-site continuing professional development (CPD) programs endorsed by the Pakistan Engineering Council (PEC).
              </p>
            </div>

            <div className="reveal">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
                <img
                  src="/talent-dev.jpg"
                  alt="Creating Strength"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #work-at-nscl: Why Work At NSCL */}
      <section id="work-at-nscl" className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Employee Value Proposition</div>
            <h2 className="section-title">Why Build Your Career At NSCL</h2>
            <p className="section-subtitle">
              Comprehensive benefits, uncompromising safety culture, and unhindered career progression.
            </p>
          </div>

          <div className="three-col">
            <Spotlight className="reveal">
              <div className="value-icon">
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>World-Class Safety First</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                ISO 45001 certified protocols, personalized telemetry gas detectors, top-tier PPE, and dedicated medical support teams.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon value-icon-steel">
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Continuous Upskilling</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Technical seminars with Kobe Steel/Midrex specialists, advanced instrumentation certifications, and leadership training.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon">
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Meritocracy & Rewards</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Performance-linked annual incentives, provident funds, comprehensive health insurance, and rapid promotion paths.
              </p>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* #openings: Current Job Openings with Department Filter */}
      <section id="openings" className="section section-bg">
        <div className="container">
          <div className="section-header reveal">
            <div className="eyebrow">Current Opportunities</div>
            <h2 className="section-title">Job Openings</h2>
            <p className="section-subtitle">
              Explore open positions across operations, engineering, HSE, and corporate headquarters.
            </p>
          </div>

          {/* Department Filter Buttons */}
          <div className="filter-btn-group reveal">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={`filter-btn ${selectedDept === dept ? 'active' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept === 'All' ? 'All Roles' : dept}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div className="job-list reveal">
            {filteredJobs.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--muted)' }}>No open roles currently listed in this category. Submit a general application below.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-row">
                  <div className="job-info">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-tags">
                      <span className="badge-tag badge-tag-ember">{job.department}</span>
                      <span className="badge-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span className="badge-tag">{job.type}</span>
                      <span className="badge-tag">{job.experience}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '0.35rem', marginBottom: 0 }}>
                      {job.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-solid btn-sm"
                    onClick={() => handleApplyClick(job.title)}
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* #how-to-apply: Application Form */}
      <section id="how-to-apply" className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header centered reveal">
            <div className="eyebrow">Submit Your Candidacy</div>
            <h2 className="section-title">How To Apply</h2>
            <p className="section-subtitle">
              Fill in your details below. Submitting will generate an official application email directed to our Talent Acquisition team.
            </p>
          </div>

          <Spotlight className="reveal">
            {submitted ? (
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div className="value-icon" style={{ margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Application Initialized</h3>
                <p>
                  Your email client has been prepared with your application details. Please attach your updated CV/Resume and send the email to complete submission.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="app-name">Full Name *</label>
                    <input
                      id="app-name"
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Ahmed Khan"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="app-email">Email Address *</label>
                    <input
                      id="app-email"
                      type="email"
                      className="form-input"
                      required
                      placeholder="e.g. ahmed.khan@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="app-role">Target Position *</label>
                    <input
                      id="app-role"
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Lead Shaft Furnace Operator"
                      value={applicantRole}
                      onChange={(e) => setApplicantRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="app-exp">Total Experience</label>
                    <select
                      id="app-exp"
                      className="form-select"
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                    >
                      <option value="">Select experience</option>
                      <option value="Fresh Graduate / Entry Level">Fresh Graduate / Entry Level</option>
                      <option value="1–3 Years">1–3 Years</option>
                      <option value="4–7 Years">4–7 Years</option>
                      <option value="8–12 Years">8–12 Years</option>
                      <option value="12+ Years Executive">12+ Years Executive</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="app-msg">Cover Letter / Professional Summary *</label>
                  <textarea
                    id="app-msg"
                    className="form-textarea"
                    required
                    rows={4}
                    placeholder="Briefly describe your metallurgical, engineering, or operations background and key career achievements..."
                    value={applicantMessage}
                    onChange={(e) => setApplicantMessage(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="app-cv">Attach CV / Resume *</label>
                  <div className="file-input-wrap" aria-describedby="app-cv-help">
                    <Paperclip size={18} aria-hidden="true" />
                    <button
                      type="button"
                      className="file-input-button"
                      onClick={() => applicantCvInputRef.current?.click()}
                    >
                      Choose File
                    </button>
                    <input
                      id="app-cv"
                      ref={applicantCvInputRef}
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="file-input-hidden"
                      onChange={(e) => setApplicantCv(e.target.files?.[0] ?? null)}
                    />
                    <span className="file-input-name">
                      {applicantCv?.name ?? 'No file chosen'}
                    </span>
                    {applicantCv && (
                      <button
                        type="button"
                        className="file-input-clear"
                        aria-label="Remove attached CV"
                        title="Remove attached CV"
                        onClick={handleCvClear}
                      >
                        <X size={16} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  <span id="app-cv-help" className="file-input-help">PDF, DOC, or DOCX up to 10 MB</span>
                </div>

                {error && <p className="form-error" role="alert">{error}</p>}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    Official Recruitment Desk: careers@nscl.com.pk
                  </span>
                  <button type="submit" className="btn btn-solid btn-lg" disabled={loading}>
                    <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </Spotlight>
        </div>
      </section>
    </div>
  );
};
