import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Common Components
import { CustomCursor } from './components/common/CustomCursor';
import { SmoothScroll } from './components/common/SmoothScroll';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { Footer } from './components/layout/Footer';

// Code-split route components for extreme performance & Lighthouse 90+
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Films = lazy(() => import('./pages/Films').then((m) => ({ default: m.Films })));
const FilmDetail = lazy(() => import('./pages/FilmDetail').then((m) => ({ default: m.FilmDetail })));
const Gear = lazy(() => import('./pages/Gear').then((m) => ({ default: m.Gear })));
const YouTubePage = lazy(() => import('./pages/YouTubePage').then((m) => ({ default: m.YouTubePage })));
const InstagramPage = lazy(() => import('./pages/InstagramPage').then((m) => ({ default: m.InstagramPage })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const CustomPageView = lazy(() => import('./pages/CustomPageView').then((m) => ({ default: m.CustomPageView })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// Admin Panel Lazy
const AdminLayout = lazy(() => import('./admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));

const RouteFallback: React.FC = () => (
  <div className="min-h-screen bg-ink flex items-center justify-center">
    <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-accent-orange font-medium animate-pulse">
      <span className="w-2 h-2 rounded-full bg-accent-orange" />
      <span>AD Zoom Studio</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('adz_admin_authenticated') === 'true';
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScroll>
      {/* Scroll Progress Bar */}
      {!isAdminRoute && <ScrollProgressBar />}

      {/* Desktop Custom Cursor */}
      {!isAdminRoute && <CustomCursor />}

      {/* Public Navigation */}
      {!isAdminRoute && <Navbar />}

      {/* Routes Switch */}
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmDetail />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/youtube" element={<YouTubePage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/p/:slug" element={<CustomPageView />} />

          {/* Admin Panel */}
          <Route
            path="/admin"
            element={
              isAdminAuthenticated ? (
                <AdminLayout onLogout={() => setIsAdminAuthenticated(false)} />
              ) : (
                <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
              )
            }
          />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Public Footer & Floating Widgets */}
      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingWhatsApp />
          <MobileTabBar />
        </>
      )}
    </SmoothScroll>
  );
};
