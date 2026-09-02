import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ExternalLink, Building2, Factory, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const ContactUs: React.FC = () => {
  useRevealOnScroll();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xzebrvag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('General Enquiry');
        setMessage('');
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1920&q=80"
          alt="Contact NSCL"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Contact Us</span>
          </div>
          <div className="eyebrow">Direct Communications</div>
          <h1>Connect With NSCL</h1>
          <p className="lead">
            Reach out to our executive head office or Bin Qasim plant operations for commercial orders, technical inquiries, vendor registrations, or media relations.
          </p>
        </div>
      </section>

      {/* Two-Column Section: Stacked Contact Blocks (Left) + Contact Form (Right) */}
      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: 'flex-start' }}>
            {/* Left Column: Stacked Contact Blocks */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Spotlight>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="value-icon">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Executive Office</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Head Office (Karachi)</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Block-D, 1st Floor, Finance & Trade Centre, Main Shahrah-e-Faisal, Karachi, Pakistan
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--steel-light)' }}>
                      <Phone size={14} />
                      <a href="tel:+922135641607">+92 21 35641607</a>
                    </div>
                  </div>
                </div>
              </Spotlight>

              <Spotlight>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="value-icon value-icon-steel">
                    <Factory size={22} />
                  </div>
                  <div>
                    <div className="eyebrow eyebrow-steel" style={{ marginBottom: '0.25rem' }}>Production Complex</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Bin Qasim Plant Site</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Plot DP-12, Sector 1-B, Port Qasim Industrial Zone, Bin Qasim, Karachi, Pakistan
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ember-bright)' }}>
                      <Phone size={14} />
                      <a href="tel:+922134740001">+92 21 34740001–05</a>
                    </div>
                  </div>
                </div>
              </Spotlight>

              <Spotlight>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="value-icon">
                    <Mail size={22} />
                  </div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Electronic Inquiries</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Corporate Emails</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      General: <a href="mailto:info@nscl.com.pk" style={{ color: 'var(--ink)' }}>info@nscl.com.pk</a>
                    </p>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      Commercial: <a href="mailto:sales@nscl.com.pk" style={{ color: 'var(--ink)' }}>sales@nscl.com.pk</a>
                    </p>
                    <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                      Careers: <a href="mailto:careers@nscl.com.pk" style={{ color: 'var(--ink)' }}>careers@nscl.com.pk</a>
                    </p>
                  </div>
                </div>
              </Spotlight>

              {/* Social Icon Row */}
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
                <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Follow NSCL</div>
                <div className="social-row">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon social-fb" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon social-ig" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon social-li" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="reveal">
              <Spotlight>
                <div className="eyebrow">Transmission Desk</div>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Send Us A Direct Message</h2>
                <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Please fill out the form below. We will route your message to the appropriate corporate or plant division.
                </p>

                {submitted ? (
                  <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div className="value-icon" style={{ margin: '0 auto 1.5rem auto' }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message Received!</h3>
                    <p>
                      Thank you for contacting NSCL. Your inquiry has been successfully transmitted to info@nscl.com.pk. We will respond within 24 business hours.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div style={{ padding: '1rem', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', marginBottom: '1rem', color: '#7f1d1d', fontSize: '0.9rem' }}>
                        {error}
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="cnt-name">Your Full Name *</label>
                        <input
                          id="cnt-name"
                          type="text"
                          className="form-input"
                          required
                          placeholder="e.g. Mian Tariq"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="cnt-email">Email Address *</label>
                        <input
                          id="cnt-email"
                          type="email"
                          className="form-input"
                          required
                          placeholder="e.g. name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cnt-subject">Subject *</label>
                      <select
                        id="cnt-subject"
                        className="form-select"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Commercial/Sales">Commercial / DRI Procurement</option>
                        <option value="Media/Press">Media & Press Relations</option>
                        <option value="Careers">Careers & HR Inquiry</option>
                        <option value="Supplier/Vendor">Supplier / Vendor Registration</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cnt-msg">Message *</label>
                      <textarea
                        id="cnt-msg"
                        className="form-textarea"
                        required
                        rows={5}
                        placeholder="Please detail your inquiry, order quantities, or specific technical questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-solid btn-lg" style={{ width: '100%' }} disabled={loading}>
                      <span>{loading ? 'Sending...' : 'Transmit Message'}</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section with 2 Maps */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Physical Presence</div>
            <h2 className="section-title">Our Facility Locations</h2>
            <p className="section-subtitle">
              Interactive geographic coordinates for our corporate headquarters and coastal production site.
            </p>
          </div>

          <div className="two-col">
            {/* Location 1: Head Office */}
            <Spotlight className="location-card reveal">
              <div className="eyebrow">Corporate Operations</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Head Office — Shahrah-e-Faisal</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                Main Shahrah-e-Faisal, Karachi, Sindh, Pakistan.
              </p>

              <div className="map-container">
                <iframe
                  title="NSCL Head Office Map"
                  className="map-iframe"
                  src="https://www.google.com/maps?q=24.8584457,67.0522474&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href="https://www.google.com/maps/place/Finance+%26+Trade+Center+(FTC)/@24.8584505,67.0496725,718m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3eb33f076cd1a04f:0x2b5ad311fdff3bbe!8m2!3d24.8584457!4d67.0522474!16s%2Fg%2F11fr6_cqvm?entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </Spotlight>

            {/* Location 2: Plant Site */}
            <Spotlight className="location-card reveal">
              <div className="eyebrow eyebrow-steel">Integrated Complex</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Plant Site — Port Bin Qasim</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                Port Qasim Industrial Zone, Bin Qasim, Karachi, Sindh, Pakistan.
              </p>

              <div className="map-container">
                <iframe
                  title="NSCL Bin Qasim Plant Map"
                  className="map-iframe"
                  src="https://www.google.com/maps?q=24.7874375,67.3533125&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href="https://www.google.com/maps/place/National+Steel+Complex+Limited/@24.7883668,67.3512647,1436m/data=!3m1!1e3!4m6!3m5!1s0x3eb32d0068a5b727:0x284a4dfa8eba06c!8m2!3d24.7874375!4d67.3533125!16s%2Fg%2F11vszzdjzp?entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </Spotlight>
          </div>
        </div>
      </section>
    </div>
  );
};
