import React from 'react';
import { Testimonial } from '../../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="relative bg-beige text-ink py-24 lg:py-32 border-t border-sand selection:bg-accent-orange selection:text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="mb-14 lg:mb-20 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-2">
            — 05 / HEIRLOOM VOICES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-light">
            Reflections & <span className="italic">Trust</span>
          </h2>
        </div>

        {/* Quotes Grid: Minimalist, strictly no star widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="relative flex flex-col justify-between p-8 bg-offwhite border border-sand shadow-sm"
            >
              <div>
                <span className="font-display text-5xl text-accent-orange/40 leading-none block -mt-2">
                  “
                </span>
                <p className="font-display text-xl sm:text-2xl text-ink font-light leading-snug italic pt-2">
                  {t.quote}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-sand/80">
                <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-ink">
                  {t.client_name}
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-warmgrey-dark mt-1">
                  <span>{t.event_type}</span>
                  <span>•</span>
                  <span>{t.location}</span>
                  <span>•</span>
                  <span>{t.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

