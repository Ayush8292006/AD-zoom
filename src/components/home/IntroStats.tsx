import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface IntroStatsProps {
  settings: SiteSettings;
}

export const IntroStats: React.FC<IntroStatsProps> = ({ settings }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => setHasAnimated(true),
    });
  }, []);

  const stats = [
    { label: 'Years of Devotion', value: settings.stats_years || '10+' },
    { label: 'Royal Weddings Shot', value: settings.stats_weddings || '450+' },
    { label: 'Cinematic Films Delivered', value: settings.stats_films || '320+' },
    { label: 'Destinations Worldwide', value: settings.stats_destinations || '18+' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-ink text-offwhite py-24 lg:py-36 film-grain border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Upper Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="slide-up">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-3">
                — STUDIO STATEMENT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-snug">
                {settings.about_headline ||
                  'We do not simply record your wedding. We craft a generational heirloom.'}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={0.15}>
              <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed max-w-xl">
                {settings.about_story}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={0.25}>
              <div className="pt-4 flex items-center space-x-6">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors group"
                >
                  <span>Read Full Studio Philosophy</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image Column with clip reveal & subtle parallax */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal animation="clip-up" duration={1.1}>
              <div className="relative aspect-[4/5] overflow-hidden border border-white/15 group shadow-2xl">
                <img
                  src={settings.about_founder_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85'}
                  alt={settings.about_founder_name || 'AD Zoom Studio Directors'}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-xl text-offwhite">
                    {settings.about_founder_name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent-orange mt-0.5">
                    {settings.about_founder_role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Animated Counter Strip */}
        <ScrollReveal animation="fade" delay={0.2} threshold={90}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 mt-20 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 group">
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-offwhite tracking-tight group-hover:text-accent-orange transition-colors duration-300">
                  {hasAnimated ? stat.value : '0'}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-warmgrey font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
