import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
const AboutUs = lazy(() => import('./pages/AboutUs').then(m => ({ default: m.AboutUs })));
const OurLeadership = lazy(() => import('./pages/OurLeadership').then(m => ({ default: m.OurLeadership })));
const OurJourney = lazy(() => import('./pages/OurJourney').then(m => ({ default: m.OurJourney })));
const OurCollaboration = lazy(() => import('./pages/OurCollaboration').then(m => ({ default: m.OurCollaboration })));
const Sustainability = lazy(() => import('./pages/Sustainability').then(m => ({ default: m.Sustainability })));
const HealthSafety = lazy(() => import('./pages/HealthSafety').then(m => ({ default: m.HealthSafety })));
const DriTechnology = lazy(() => import('./pages/DriTechnology').then(m => ({ default: m.DriTechnology })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const QEngineering = lazy(() => import('./pages/QEngineering').then(m => ({ default: m.QEngineering })));
const Careers = lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));
const ContactUs = lazy(() => import('./pages/ContactUs').then(m => ({ default: m.ContactUs })));

// Home loads with the app; other pages load on demand.
// Same 13 routes as the current nscl-website.vercel.app
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter;

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suspense fallback={<div className="min-h-screen" />}><Layout /></Suspense>}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="our-leadership" element={<OurLeadership />} />
          <Route path="our-journey" element={<OurJourney />} />
          <Route path="our-collaboration" element={<OurCollaboration />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="health-safety" element={<HealthSafety />} />
          <Route path="dri-technology" element={<DriTechnology />} />
          <Route path="products" element={<Products />} />
          <Route path="projects" element={<Projects />} />
          <Route path="q-engineering" element={<QEngineering />} />
          <Route path="hr-careers" element={<Careers />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
