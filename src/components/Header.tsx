import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const navStructure = [
  {
    title: 'Our Company',
    path: '/about-us',
    items: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Our Vision & Mission', path: '/about-us#our' },
      { name: 'Our Values', path: '/about-us#our-values' },
      { name: 'Our Leadership', path: '/our-leadership' },
      { name: 'Our Journey', path: '/our-journey' },
      { name: 'Our Collaborations', path: '/our-collaboration' },
    ],
  },
  {
    title: 'Sustainability',
    path: '/sustainability',
    items: [
      { name: 'Environmental Initiatives', path: '/sustainability#Environmental' },
      { name: 'Social Responsibility', path: '/social-responsibility' },
      { name: 'Health & Safety', path: '/health-safety' },
      { name: 'Certifications & Compliance', path: '/certifications' },
    ],
  },
  {
    title: 'DRI Technology',
    path: '/dri-technology',
    items: [
      { name: 'Technology Overview', path: '/dri-technology#technology' },
      { name: 'Strategic Significance', path: '/dri-technology#significance' },
      { name: 'MIDREX Process Flow', path: '/dri-technology#process' },
      { name: 'Plant Demonstration Test', path: '/dri-technology#plant' },
    ],
  },
  {
    title: 'Our Products',
    path: '/products',
    items: [
      { name: 'DRI Overview', path: '/products#dri' },
      { name: 'CDRI (Cold DRI)', path: '/products#cdri' },
      { name: 'HDRI (Hot DRI)', path: '/products#hdri' },
      { name: 'HBI (Hot Briquetted Iron)', path: '/products#hbi' },
    ],
  },
  {
    title: 'Our Projects',
    path: '/projects',
    items: [
      { name: 'Beneficiation Plant', path: '/projects#beneficiation' },
      { name: 'Pelletization Plant', path: '/projects#pelletization' },
      { name: 'Forward Integration Plant', path: '/projects#forward' },
    ],
  },
  {
    title: 'Q-Engineering',
    path: '/q-engineering',
    items: [
      { name: 'Technology Center', path: '/q-engineering#technology' },
      { name: 'Fabrication Facility', path: '/q-engineering#fabrication' },
      { name: 'Machine Gallery', path: '/q-engineering#machines' },
      { name: 'Engineering Tools', path: '/q-engineering#tools' },
      { name: 'Corporate Profiles', path: '/q-engineering#profile' },
    ],
  },
  {
    title: 'Careers',
    path: '/hr-careers',
    items: [
      { name: 'Future Of Steel', path: '/hr-careers#future-of-steel' },
      { name: 'Creating Strength', path: '/hr-careers#creating-strength' },
      { name: 'Why Work At NSCL', path: '/hr-careers#work-at-nscl' },
      { name: 'Current Job Openings', path: '/hr-careers#openings' },
      { name: 'How To Apply', path: '/hr-careers#how-to-apply' },
    ],
  },
];

export const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-wrapper" aria-label="NSCL Home">
          <span className="logo-mark" aria-hidden="true">
            <img src="/NSCL_Final_Logo-1.png" alt="" />
          </span>
          <div className="logo-text">
            <span className="logo-title">NSCL</span>
            <span className="logo-subtitle">National Steel Complex Limited</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navStructure.map((menu) => {
            const isActive = location.pathname === menu.path || location.pathname.startsWith(`${menu.path}/`);
            return (
              <li key={menu.title} className="nav-item">
                <Link
                  to={menu.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{menu.title}</span>
                  <ChevronDown className="nav-caret" size={14} />
                </Link>

                {/* Dropdown Mega Menu */}
                <div className="mega-menu">
                  <ul className="mega-menu-list">
                    {menu.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link to={subItem.path} className="mega-menu-link">
                          <span>{subItem.name}</span>
                          <ArrowRight size={12} style={{ opacity: 0.5 }} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <Link to="/contact-us" className="btn btn-solid btn-sm">
            Contact Us
          </Link>
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
