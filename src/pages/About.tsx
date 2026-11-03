import React, { useEffect, useState } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { SiteSettings } from '../types';
import { initialSiteSettings } from '../lib/initialData';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);

  useEffect(() => {
    api.getSiteSettings().then(setSettings);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Initial Consultation & Alignment',
      desc: 'We begin with an unhurried conversation exploring your family heritage, venue architecture, personal aesthetics, and unspoken emotional priorities.',
    },
    {
      num: '02',
      title: 'Bespoke Creative Pre-Production',
      desc: 'From custom lighting blueprints to music curation and timeline pacing, every element is meticulously scheduled to allow pure spontaneity on the day.',
    },
    {
      num: '03',
      title: 'The Shoot: Unobtrusive Mastery',
      desc: 'Our lead cinematographers and photographers blend seamlessly into your ceremonies. We work with natural ambient light and discreet master primes.',
    },
    {
      num: '04',
      title: 'Artisanal Colour & Symphonic Sound',
      desc: 'Each frame is individually graded with 35mm film tonality. Dialogue from vows is synchronized with custom classical or cinematic arrangements.',
    },
    {
      num: '05',
      title: 'Handcrafted Archival Delivery',
      desc: 'Digital visual archive delivered via a private encrypted 4K gallery, complemented by handcrafted Italian leather albums that will be held by generations.',
    },
  ];

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="mb-16 lg:mb-24 space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — ABOUT AD ZOOM STUDIO
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
              Preserving <span className="italic">Soul</span>, Light & Legacy
            </h1>
            <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
              Born from a quiet rebellion against mass-produced wedding photography, AD Zoom Studio was created to make wedding cinema feel like fine-art cinema.
            </p>
          </div>

          {/* Founder Feature & Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-24 border-b border-white/10">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] border border-white/15 overflow-hidden">
                <img
                  src={settings.about_founder_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85'}
                  alt={settings.about_founder_name}
                  className="w-full h-full object-cover filter grayscale-[25%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl text-offwhite">
                    {settings.about_founder_name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-orange mt-1">
                    {settings.about_founder_role}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl text-offwhite font-light">
                “A wedding is not a photo session. It is a sacred gathering of human vulnerability.”
              </h2>
              <div className="space-y-4 text-warmgrey text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Over the past decade, we have journeyed across Jaipur, Udaipur, Jaisalmer, Goa, Shimla, and international destinations, capturing multi-day royal weddings for discerning patrons.
                </p>
                <p>
                  Our visual philosophy is anchored in truth. We avoid theatrical forced smiles or intrusive lighting rigs that disrupt your sanctity. Instead, our crew moves with invisible grace, capturing the private glance your father gave you when you stepped onto the mandap, or the tear that caught the golden afternoon sun.
                </p>
                <p>
                  Every commission receives our undivided commitment. We only undertake a limited number of commissions each year to ensure that every film and album receives the obsessive craftsmanship it deserves.
                </p>
              </div>

              {/* Stats Numbers */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="font-display text-4xl text-offwhite">{settings.stats_years}</div>
                  <div className="text-[10px] uppercase tracking-wider text-warmgrey mt-1">Years Active</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-offwhite">{settings.stats_weddings}</div>
                  <div className="text-[10px] uppercase tracking-wider text-warmgrey mt-1">Weddings Immortalised</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-offwhite">{settings.stats_destinations}</div>
                  <div className="text-[10px] uppercase tracking-wider text-warmgrey mt-1">Destinations</div>
                </div>
              </div>
            </div>
          </div>

          {/* The 5-Step Process */}
          <div className="py-24 border-b border-white/10">
            <div className="mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-2">
                — OUR METHODOLOGY
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-light">
                From First Spark to <span className="italic">Generational Heirloom</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="p-6 bg-[#141414] border border-white/10 flex flex-col justify-between space-y-6"
                >
                  <div className="font-display text-4xl text-accent-orange font-light">
                    {step.num}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl text-offwhite">
                      {step.title}
                    </h4>
                    <p className="text-xs text-warmgrey font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-20 text-center max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl text-offwhite font-light">
              Are you planning an upcoming celebration?
            </h3>
            <p className="text-sm text-warmgrey font-light">
              We would be deeply honored to tell your story. Connect with our creative director today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-offwhite text-ink text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-accent-orange transition-colors"
            >
              <span>Initiate Conversation</span>
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

