import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Film, Photo } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedStoriesProps {
  films: Film[];
  photos: Photo[];
}

export const FeaturedStories: React.FC<FeaturedStoriesProps> = ({ films }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!isDesktop || !section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth + 200;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollPercent(Math.round(self.progress * 100));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [films]);

  const featuredStories = [
    {
      id: 'story-1',
      title: 'Echoes of the Mewar Dynasty',
      subtitle: 'Ananya & Kabir • Udaipur',
      coordinates: '24° 34′ N, 73° 41′ E',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      category: 'Palace Wedding',
      link: '/films/film-1',
      aspect: 'w-[320px] sm:w-[420px] lg:w-[490px] h-[480px] lg:h-[580px]',
    },
    {
      id: 'story-2',
      title: 'Himalayan Ridge Serenade',
      subtitle: 'Tara & Siddharth • Shimla',
      coordinates: '31° 06′ N, 77° 10′ E',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      category: 'Destination Pre-Wedding',
      link: '/films/film-2',
      aspect: 'w-[320px] sm:w-[400px] lg:w-[450px] h-[420px] lg:h-[530px]',
    },
    {
      id: 'story-3',
      title: 'Sands of the Golden Fortress',
      subtitle: 'Meera & Devraj • Jaisalmer',
      coordinates: '26° 54′ N, 70° 54′ E',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
      category: 'Desert Romance',
      link: '/films/film-3',
      aspect: 'w-[340px] sm:w-[460px] lg:w-[540px] h-[480px] lg:h-[600px]',
    },
    {
      id: 'story-4',
      title: 'Vows along the Arabian Shore',
      subtitle: 'Rhea & Neil • Goa',
      coordinates: '15° 17′ N, 73° 58′ E',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
      category: 'Coastal Celebration',
      link: '/films/film-4',
      aspect: 'w-[320px] sm:w-[400px] lg:w-[470px] h-[440px] lg:h-[550px]',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-offwhite overflow-hidden py-20 lg:py-0 border-t border-white/10"
    >
      <div className="lg:h-screen flex flex-col justify-center px-5 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 max-w-7xl">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-2">
              — 01 / FEATURED STORIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight">
              Selected <span className="italic">Odysseys</span>
            </h2>
          </div>

          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <p className="hidden md:block text-xs sm:text-sm text-warmgrey max-w-xs font-light">
              Cinematic masterworks curated from multi-day royal wedding celebrations across India.
            </p>
            {/* Desktop Horizontal Scroll Progress Indicator */}
            <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-warmgrey border border-white/15 px-3 py-1 bg-[#141414]">
              <span>{String(scrollPercent).padStart(2, '0')}%</span>
              <div className="w-16 h-1 bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-accent-orange transition-all duration-100"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Track (Pinned on Desktop, Native swipe on Mobile) */}
        <div
          ref={trackRef}
          className="flex space-x-6 sm:space-x-8 lg:space-x-12 overflow-x-auto lg:overflow-visible no-scrollbar pb-6 lg:pb-0 items-center will-change-transform"
        >
          {featuredStories.map((story, idx) => (
            <div
              key={story.id}
              className={`shrink-0 ${story.aspect} group relative flex flex-col justify-end p-6 sm:p-8 bg-[#121212] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-accent-orange/40`}
              data-cursor="view"
              data-cursor-text="EXPLORE"
            >
              <Link to={story.link} className="absolute inset-0 z-20" aria-label={story.title} />

              {/* Viewfinder Corner Crop Markers on Hover */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Background Image with slow zoom on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-108 filter grayscale-[20%] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
              </div>

              {/* Foreground Story Details */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-accent-orange">
                  <span>0{idx + 1} • {story.category}</span>
                  <span className="font-mono text-white/50 text-[9px]">{story.coordinates}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-offwhite group-hover:italic transition-all leading-tight">
                  {story.title}
                </h3>
                <p className="text-xs font-light text-warmgrey tracking-wide flex items-center justify-between pt-1">
                  <span>{story.subtitle}</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </p>
              </div>
            </div>
          ))}

          {/* Final Call to Action Card in Horizontal Track */}
          <div className="shrink-0 w-[280px] sm:w-[340px] h-[400px] lg:h-[520px] bg-[#141414] border border-white/15 p-8 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange">
              — Visual Archive
            </span>
            <div className="space-y-4">
              <h4 className="font-display text-3xl sm:text-4xl text-offwhite font-light leading-snug">
                Every love story possesses its own <span className="italic">cadence</span>.
              </h4>
              <p className="text-xs text-warmgrey font-light leading-relaxed">
                Discover our complete collection of wedding films, pre-wedding trailers, and royal ceremonies.
              </p>
            </div>
            <Link
              to="/films"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors"
            >
              <span>Explore All Films</span>
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
