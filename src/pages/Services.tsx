import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { Service } from '../types';
import { ArrowUpRight, Check } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="mb-16 lg:mb-24 space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — COMMISSIONS & EXPERTISE
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
              Our Disciplines & <span className="italic">Services</span>
            </h1>
            <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
              Every celebration possesses its own tempo. Whether you require full-scale 4K multi-cam cinema direction or bespoke fine-art medium format portraiture, explore our core disciplines below.
            </p>
          </div>

          {/* Services Stack */}
          <div className="space-y-16">
            {services.map((srv, idx) => (
              <div
                key={srv.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 p-6 sm:p-10 bg-[#141414] border border-white/10 items-center"
              >
                {/* Image Column */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                    <img
                      src={srv.image_url}
                      alt={srv.title}
                      className="w-full h-full object-cover filter grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-accent-orange">
                    <span>0{idx + 1}</span>
                    <span>•</span>
                    <span>{srv.subtitle}</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-offwhite font-light">
                    {srv.title}
                  </h2>

                  <p className="text-sm text-warmgrey font-light leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Highlights list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {srv.features.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-offwhite/90">
                        <Check strokeWidth={1.5} className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                    <div>
                      {srv.show_price && srv.price ? (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Investment</span>
                          <span className="font-mono text-sm text-offwhite">{srv.price}</span>
                        </div>
                      ) : (
                        <span className="text-xs uppercase tracking-widest text-warmgrey">Custom Quote on Request</span>
                      )}
                    </div>

                    <Link to={`/contact?service=${encodeURIComponent(srv.title)}`}>
                      <MagneticButton variant="primary" className="!py-3 !px-6 text-xs">
                        Enquire for this Service
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
};
