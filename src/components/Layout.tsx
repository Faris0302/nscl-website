import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { Footer } from './Footer';
import { ScrollProgressBar } from './ScrollProgressBar';
import { BackToTop } from './BackToTop';
import { ScrollToAnchor } from './ScrollToAnchor';
import { AIChatbot } from './AIChatbot';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgressBar />
      <ScrollToAnchor />
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main style={{ flex: '1 0 auto' }}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <AIChatbot />
    </div>
  );
};
