import React, { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const searchableItems = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Our Leadership', path: '/our-leadership' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'DRI Technology', path: '/dri-technology' },
  { label: 'Our Products', path: '/products' },
  { label: 'Our Projects', path: '/projects' },
  { label: 'Q-Engineering', path: '/q-engineering' },
  { label: 'Careers', path: '/hr-careers' },
  { label: 'Contact Us', path: '/contact-us' },
];

export const DynamicSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return [];

    return searchableItems.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="dynamic-search-wrap">
      <label className="dynamic-search" aria-label="Site search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search NSCL pages..."
          aria-label="Search pages"
        />
      </label>

      {results.length > 0 && (
        <div className="search-results" role="listbox" aria-label="Search results">
          {results.slice(0, 5).map((item) => (
            <Link key={item.path} to={item.path} className="search-result-item" onClick={() => setQuery('')}>
              <span>{item.label}</span>
              <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
