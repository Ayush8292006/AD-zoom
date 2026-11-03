import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Service } from '../../types';

interface StickyServicesProps {
  services: Service[];
}

export const StickyServices: React.FC<StickyServicesProps> = ({ services }) => {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  return (
    <section className="relative bg-offwhite text-ink py-24 lg:py-32 border-t border-sand selection:bg-accent-orange selection:text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Title & Dynamic Preview Photo */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — 02 / EXPERTISE & DISCIPLINES
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-light leading-none">
                Bespoke <br />
                <span className="italic">Commissions</span>
              </h2>
              <p className="text-sm text-warmgrey-dark max-w-sm font-light pt-2 leading-relaxed">
                From delicate intimate rituals to grand palace spectacles, we tailor each commission with 
                uncompromising artistic rigor.
              </p>
            </div>

            {/* Desktop Preview Image Swap */}
            <div className="hidden lg:block relative w-full h-[380px] rounded-none overflow-hidden border border-sand bg-sand/30 shadow-md mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeService.image_url}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 text-offwhite">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange font-medium block">
                      {activeService.subtitle}
                    </span>
                    <span className="font-display text-2xl text-offwhite font-light">
                      {activeService.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block pt-4">
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-ink font-medium hover:text-accent-orange transition-colors"
              >
                <span>View Full Service Catalog</span>
                <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
              </Link>
            </div>
          </div>

          {/* Right Column: Scrolling Services List */}
          <div className="lg:col-span-7 space-y-6">
            {services.map((service, idx) => {
              const isActive = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service)}
                  className={`group relative p-6 sm:p-8 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-beige/70 border-sand-border shadow-md translate-x-1'
                      : 'bg-white/80 border-sand hover:border-ink/30 hover:bg-white'
                  }`}
                >
                  {/* Active Orange Accent Pill on the left edge */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-accent-orange transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Mobile Preview Image Inline */}
                  <div className="lg:hidden w-full h-48 mb-4 overflow-hidden border border-sand">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-accent-orange font-medium">
                        <span>0{idx + 1}</span>
                        <span>•</span>
                        <span>{service.subtitle}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl text-ink group-hover:italic transition-all">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-warmgrey-dark font-light leading-relaxed max-w-xl pt-1">
                        {service.description}
                      </p>

                      {/* Service Feature Tags */}
                      <div className="flex flex-wrap gap-2 pt-3">
                        {service.features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-sand/50 border border-sand-border text-ink/80"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      {service.show_price && service.price && (
                        <p className="text-xs font-mono text-warmgrey-dark pt-2">
                          {service.price}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/contact"
                      className="shrink-0 p-3 rounded-full border border-sand-border group-hover:border-accent-orange text-ink group-hover:text-accent-orange group-hover:bg-accent-orange/5 transition-all"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight strokeWidth={1.25} className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
