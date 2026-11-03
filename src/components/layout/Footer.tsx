import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink text-offwhite border-t border-white/10 pt-20 pb-28 lg:pb-16 film-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                <img
                  src="/logo.png"
                  alt="AD Zoom Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display text-2xl tracking-wide uppercase block leading-none">
                  AD Zoom Studio
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange mt-1 block">
                  Photography & Cinematography
                </span>
              </div>
            </Link>

            <p className="text-warmgrey text-sm font-light leading-relaxed max-w-md">
              We document the sacred, the quiet, and the grand. Visual heirlooms handcrafted with 
              35mm cinematic soul for families who cherish real, timeless emotion.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-warmgrey hover:text-accent-orange hover:border-accent-orange transition-colors"
              >
                <Instagram strokeWidth={1.25} className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-warmgrey hover:text-accent-orange hover:border-accent-orange transition-colors"
              >
                <Youtube strokeWidth={1.25} className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@adzoomstudio.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-warmgrey hover:text-accent-orange hover:border-accent-orange transition-colors"
              >
                <Mail strokeWidth={1.25} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — Exploration
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-[0.18em] text-warmgrey">
              <li>
                <Link to="/about" className="hover:text-offwhite transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-offwhite transition-colors">
                  Services & Commissions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-offwhite transition-colors">
                  Photography Archive
                </Link>
              </li>
              <li>
                <Link to="/films" className="hover:text-offwhite transition-colors">
                  Cinematic Wedding Films
                </Link>
              </li>
              <li>
                <Link to="/gear" className="hover:text-offwhite transition-colors">
                  Cinema Gear & Optics
                </Link>
              </li>
              <li>
                <Link to="/p/investment-guide" className="hover:text-offwhite transition-colors">
                  Investment Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — Commissions & Inquiries
            </span>
            <div className="space-y-3 text-sm font-light text-warmgrey">
              <div className="flex items-start space-x-3">
                <MapPin strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0 mt-1" />
                <span>Heritage Arts Enclave, MG Road, New Delhi, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0" />
                <a href="tel:+919876543210" className="hover:text-offwhite transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0" />
                <a href="mailto:contact@adzoomstudio.com" className="hover:text-offwhite transition-colors">
                  contact@adzoomstudio.com
                </a>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-widest text-warmgrey/60 block">
                Office Hours: Mon – Sat / 10:00 AM – 7:30 PM IST
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warmgrey gap-4">
          <p>© {new Date().getFullYear()} AD Zoom Studio. All Rights Reserved. Handcrafted in India.</p>

          <div className="flex items-center space-x-6">
            <Link to="/admin" className="hover:text-accent-orange transition-colors">
              Studio Admin
            </Link>
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-1.5 hover:text-offwhite transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp strokeWidth={1.25} className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

