import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { navStructure } from './Header';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const location = useLocation();
  const previousLocation = useRef(`${location.pathname}${location.hash}`);

  // Close when route changes
  useEffect(() => {
    const currentLocation = `${location.pathname}${location.hash}`;
    if (previousLocation.current !== currentLocation) {
      previousLocation.current = currentLocation;
      onClose();
    }
  }, [location.pathname, location.hash, onClose]);

  if (!isOpen) return null;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <ul className="mobile-nav-list">
        {navStructure.map((menu, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <li key={menu.title} className="mobile-nav-item">
              <button
                type="button"
                className="mobile-nav-header"
                onClick={() => toggleExpand(idx)}
              >
                <span>{menu.title}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: 'var(--ember)',
                  }}
                />
              </button>

              {isExpanded && (
                <ul className="mobile-sub-list">
                  {menu.items.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className="mobile-sub-link"
                        onClick={onClose}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <ArrowRight size={12} style={{ color: 'var(--ember)' }} />
                          {subItem.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link
          to="/contact-us"
          className="btn btn-solid"
          style={{ width: '100%', textAlign: 'center' }}
          onClick={onClose}
        >
          Contact Head Office
        </Link>
        <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textAlign: 'center' }}>
          Port Bin Qasim, Karachi, Pakistan
        </div>
      </div>
    </div>
  );
};
