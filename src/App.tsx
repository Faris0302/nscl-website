import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { OurLeadership } from './pages/OurLeadership';
import { OurJourney } from './pages/OurJourney';
import { OurCollaboration } from './pages/OurCollaboration';
import { Sustainability } from './pages/Sustainability';
import { SocialResponsibility } from './pages/SocialResponsibility';
import { HealthSafety } from './pages/HealthSafety';
import { Certifications } from './pages/Certifications';
import { DriTechnology } from './pages/DriTechnology';
import { Products } from './pages/Products';
import { Projects } from './pages/Projects';
import { QEngineering } from './pages/QEngineering';
import { Careers } from './pages/Careers';
import { ContactUs } from './pages/ContactUs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="our-leadership" element={<OurLeadership />} />
          <Route path="our-journey" element={<OurJourney />} />
          <Route path="our-collaboration" element={<OurCollaboration />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="social-responsibility" element={<SocialResponsibility />} />
          <Route path="health-safety" element={<HealthSafety />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="dri-technology" element={<DriTechnology />} />
          <Route path="products" element={<Products />} />
          <Route path="projects" element={<Projects />} />
          <Route path="q-engineering" element={<QEngineering />} />
          <Route path="hr-careers" element={<Careers />} />
          <Route path="contact-us" element={<ContactUs />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
