import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Socials */}
          <div className="footer-col">
            <Link to="/" className="logo-wrapper" style={{ marginBottom: '0.5rem' }}>
              <span className="logo-mark" aria-hidden="true">
                <img src="/NSCL_Final_Logo-1.png" alt="" />
              </span>
              <div className="logo-text">
                <span className="logo-title">NSCL</span>
                <span className="logo-subtitle">National Steel Complex Limited</span>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--muted)' }}>
              Pioneering low-emission DRI steelmaking in Pakistan.
            </p>
            <div className="social-row" style={{ marginTop: '0.75rem' }}>
              {/* Facebook */}
              <a
                href="https://web.facebook.com/tuwairqisteelmillslimited/?_rdc=2&_rdr#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-fb"
                aria-label="NSCL Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-ig"
                aria-label="NSCL Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/national-steel-complex-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-li"
                aria-label="NSCL LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about-us" className="footer-link">About Us</Link></li>
              <li><Link to="/sustainability" className="footer-link">Sustainability</Link></li>
              <li><Link to="/dri-technology" className="footer-link">DRI Technology</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/contact-us" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/our-leadership" className="footer-link">Leadership</Link></li>
              <li><Link to="/our-journey" className="footer-link">Our Journey</Link></li>
              <li><Link to="/certifications" className="footer-link">Certifications</Link></li>
              <li><Link to="/health-safety" className="footer-link">Health & Safety</Link></li>
            </ul>
          </div>

          {/* Col 4: Group */}
          <div className="footer-col">
            <h4 className="footer-title">Group Entities</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://apcl.com.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>Al Hadeed Pelletization</span>
                  <ExternalLink size={12} style={{ opacity: 0.6 }} />
                </a>
              </li>
              <li>
                <Link to="/our-collaboration" className="footer-link">
                  Al Hadeed Extraction Co.
                </Link>
              </li>
              <li>
                <Link to="/q-engineering" className="footer-link">
                  Q Engineering Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
                <Mail size={16} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '3px' }} />
                <a href="mailto:info@nscl.com.pk" className="footer-link">info@nscl.com.pk</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
                <Phone size={16} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '3px' }} />
                <a href="tel:+922135641607" className="footer-link">+92 21 35641607</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.875rem' }}>
                <MapPin size={16} style={{ color: 'var(--ember)', flexShrink: 0, marginTop: '3px' }} />
                <span>Port Bin Qasim, Karachi, Sindh, Pakistan</span>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <Link to="/contact-us" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} National Steel Complex Limited - NSCL. All rights reserved.
          </div>
          <div>
            Bin Qasim, Karachi, Pakistan
          </div>
        </div>
      </div>
    </footer>
  );
};
