import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Equipment } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

interface GearTeaserProps {
  equipment: Equipment[];
}

export const GearTeaser: React.FC<GearTeaserProps> = ({ equipment }) => {
  const displayGear = equipment.slice(0, 4);

  return (
    <section className="relative bg-[#111111] text-offwhite py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <ScrollReveal animation="slide-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-2">
                — 04 / THE APPARATUS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light">
                Cinema <span className="italic">Optics</span>
              </h2>
            </div>
            <Link
              to="/gear"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors mt-4 sm:mt-0"
            >
              <span>View Full Gear Arsenal</span>
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayGear.map((item, idx) => (
            <ScrollReveal key={item.id} animation="slide-up" delay={idx * 0.1}>
              <div className="group relative bg-[#181818] border border-white/10 p-6 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-2 hover:border-accent-orange/40 hover:shadow-xl">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-medium block mb-3">
                    {item.category}
                  </span>

                  <div className="relative aspect-[4/3] w-full overflow-hidden mb-5 bg-black/40 border border-white/5">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-108 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-display text-xl text-offwhite group-hover:text-accent-orange transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-warmgrey font-mono mt-1">
                    {item.model}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-warmgrey/90 font-light leading-relaxed line-clamp-2">
                    {item.specs}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
