import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';
import { Film } from '../../types';
import { VideoModal } from '../common/VideoModal';
import { ScrollReveal } from '../common/ScrollReveal';

interface LatestFilmsProps {
  films: Film[];
}

export const LatestFilms: React.FC<LatestFilmsProps> = ({ films }) => {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const displayFilms = films.slice(0, 3);

  return (
    <>
      <section className="relative bg-ink text-offwhite py-24 lg:py-32 border-t border-white/10 film-grain overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Section Header */}
          <ScrollReveal animation="slide-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-2">
                  — 03 / CINEMA REPERTOIRE
                </span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light">
                  Motion & <span className="italic">Scores</span>
                </h2>
              </div>
              <Link
                to="/films"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors mt-4 sm:mt-0"
              >
                <span>Explore All Films</span>
                <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Films Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFilms.map((film, idx) => (
              <ScrollReveal key={film.id} animation="slide-up" delay={idx * 0.12}>
                <div
                  onClick={() => setSelectedFilm(film)}
                  className="group relative flex flex-col bg-[#141414] border border-white/10 overflow-hidden cursor-pointer h-full transition-all duration-500 hover:border-accent-orange/40 hover:-translate-y-1.5"
                  data-cursor="play"
                  data-cursor-text="PLAY"
                >
                  {/* Video Thumbnail with hover zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={film.thumbnail_url}
                      alt={film.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors" />

                    {/* Play Button Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-white/30 bg-ink/70 backdrop-blur-sm flex items-center justify-center text-offwhite group-hover:border-accent-orange group-hover:text-accent-orange group-hover:scale-115 transition-all duration-300">
                        <Play strokeWidth={1.5} className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {film.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-ink/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-offwhite">
                        {film.duration}
                      </div>
                    )}
                  </div>

                  {/* Film Details */}
                  <div className="p-6 flex flex-col justify-between flex-1 space-y-3">
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-accent-orange">
                      <span>0{idx + 1}</span>
                      <span>•</span>
                      <span>{film.category}</span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl text-offwhite group-hover:italic transition-all">
                        {film.title}
                      </h3>
                      <p className="text-xs text-warmgrey mt-1 font-light">
                        {film.couple_name} — {film.location}
                      </p>
                    </div>

                    <p className="text-xs text-warmgrey/80 line-clamp-2 font-light pt-1 leading-relaxed">
                      {film.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedFilm && (
        <VideoModal
          isOpen={Boolean(selectedFilm)}
          onClose={() => setSelectedFilm(null)}
          videoUrl={selectedFilm.video_url}
          videoType={selectedFilm.video_type}
          title={`${selectedFilm.title} (${selectedFilm.couple_name})`}
        />
      )}
    </>
  );
};
