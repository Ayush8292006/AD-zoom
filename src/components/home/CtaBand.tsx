import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../common/MagneticButton';

export const CtaBand: React.FC = () => {
  return (
    <section className="relative bg-ink text-offwhite py-28 lg:py-40 border-t border-white/10 film-grain text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 lg:px-10 space-y-8 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-accent-orange font-medium block">
          — RESERVE YOUR DATES
        </span>

        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
          Let’s Create Timeless <br />
          <span className="italic">Heirlooms Together</span>
        </h2>

        <p className="text-warmgrey text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
          Due to the bespoke nature of our cinema productions and artisanal colour grading, 
          we accept only a limited number of commissions each wedding season.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact">
            <MagneticButton variant="primary" className="!py-4 !px-8 text-xs">
              Check Date Availability
            </MagneticButton>
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagneticButton variant="secondary" className="!py-4 !px-8 text-xs">
              Direct WhatsApp Concierge
            </MagneticButton>
          </a>
        </div>
      </div>
    </section>
  );
};

