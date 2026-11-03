import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close full-screen menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Photo Gallery', path: '/gallery' },
    { label: 'Films', path: '/films' },
    { label: 'Gear', path: '/gear' },
    { label: 'YouTube', path: '/youtube' },
    { label: 'Instagram', path: '/instagram' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ink/90 backdrop-blur-md py-3.5 border-b border-white/5 shadow-lg'
            : 'bg-transparent py-5 lg:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden border border-white/20 group-hover:border-accent-orange transition-colors">
              <img
                src="/logo.png"
                alt="AD Zoom Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg lg:text-xl font-medium tracking-wide text-offwhite group-hover:text-accent-orange transition-colors uppercase leading-none">
                AD Zoom
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-warmgrey mt-1">
                Studio • India
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group text-xs uppercase tracking-[0.2em] font-medium text-offwhite/80 hover:text-offwhite transition-colors py-1"
                >
                  {link.label}
                  {/* Left to right orange underline draw */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-orange transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="hidden sm:inline-block">
              <MagneticButton
                variant="primary"
                className="!py-2.5 !px-5 text-[11px]"
              >
                Book a Shoot
              </MagneticButton>
            </Link>

            {/* Menu Trigger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="flex items-center space-x-2 p-2 text-offwhite hover:text-accent-orange transition-colors"
            >
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] text-warmgrey">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              {isMenuOpen ? (
                <X strokeWidth={1.25} className="w-6 h-6" />
              ) : (
                <Menu strokeWidth={1.25} className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Editorial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium">
                — Index / Visual Archive
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-warmgrey">
                AD Zoom Studio 2026
              </span>
            </div>

            {/* Central Large Serif Links */}
            <div className="my-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-6xl">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-warmgrey block mb-2">
                  Navigation
                </span>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline justify-between py-1 border-b border-white/5 hover:border-accent-orange/40 transition-colors"
                    >
                      <div className="flex items-baseline space-x-4">
                        <span className="text-xs font-mono text-warmgrey group-hover:text-accent-orange">
                          0{idx + 1}
                        </span>
                        <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-offwhite group-hover:italic group-hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        strokeWidth={1.25}
                        className="w-5 h-5 text-warmgrey opacity-0 group-hover:opacity-100 group-hover:text-accent-orange transition-opacity"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Studio Coordinates & Quick Links */}
              <div className="flex flex-col justify-between space-y-8 md:pl-10 md:border-l border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-warmgrey block mb-3">
                    Studio Inquiries
                  </span>
                  <p className="font-display text-2xl text-offwhite">
                    contact@adzoomstudio.com
                  </p>
                  <p className="font-sans text-sm text-warmgrey mt-1">
                    +91 98765 43210
                  </p>
                  <p className="font-sans text-xs text-warmgrey/70 mt-3 max-w-xs">
                    Heritage Arts Enclave, MG Road, New Delhi, India. Commissions accepted worldwide.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-warmgrey block mb-3">
                    Client Portal
                  </span>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-warmgrey hover:text-accent-orange transition-colors"
                  >
                    <span>Studio CMS / Admin Access</span>
                    <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-warmgrey block mb-3">
                    Social Channels
                  </span>
                  <div className="flex space-x-6 text-xs uppercase tracking-[0.2em] text-offwhite">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-orange transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-orange transition-colors"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-orange transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Menu Footer */}
            <div className="pt-6 border-t border-white/10 text-xs text-warmgrey flex justify-between items-center">
              <span>© {new Date().getFullYear()} AD Zoom Studio. Handcrafted Cinema.</span>
              <span className="hidden sm:inline">Press ESC to return</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

