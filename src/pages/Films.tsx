import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { VideoModal } from '../components/common/VideoModal';
import { api } from '../lib/storage';
import { Film } from '../types';
import { Play, ArrowUpRight } from 'lucide-react';

export const Films: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Film | null>(null);

  useEffect(() => {
    api.getFilms().then(setFilms);
  }, []);

  return (
    <>
      <PageTransition>
        <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            {/* Header */}
            <div className="mb-14 lg:mb-20 space-y-4 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — CINEMATIC REPERTOIRE
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
                Cinematic <span className="italic">Films</span>
              </h1>
              <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
                Shot on 35mm full-frame cinema cameras with bespoke symphonic scoring, dialogue preservation, and filmic colour grading.
              </p>
            </div>

            {/* Films Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {films.map((film, idx) => (
                <div
                  key={film.id}
                  className="group bg-[#141414] border border-white/10 flex flex-col justify-between overflow-hidden"
                >
                  {/* Thumbnail / Facade with Play Button */}
                  <div
                    onClick={() => setSelectedVideo(film)}
                    className="relative aspect-video overflow-hidden bg-black cursor-pointer"
                    data-cursor="play"
                    data-cursor-text="PLAY"
                  >
                    <img
                      src={film.thumbnail_url}
                      alt={film.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-white/40 bg-ink/70 backdrop-blur-sm flex items-center justify-center text-offwhite group-hover:border-accent-orange group-hover:text-accent-orange group-hover:scale-110 transition-all duration-300">
                        <Play strokeWidth={1.5} className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {film.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-ink/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-offwhite">
                        {film.duration}
                      </div>
                    )}
                  </div>

                  {/* Metadata & Detail Link */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-accent-orange font-medium">
                        <span>0{idx + 1}</span>
                        <span>•</span>
                        <span>{film.category}</span>
                      </div>
                      <span className="text-xs text-warmgrey font-light">
                        {film.event_date}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-offwhite">
                      {film.title}
                    </h3>

                    <p className="text-xs uppercase tracking-widest text-warmgrey">
                      {film.couple_name} • {film.location}
                    </p>

                    <p className="text-xs sm:text-sm text-warmgrey font-light leading-relaxed">
                      {film.description}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedVideo(film)}
                        className="text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors"
                      >
                        Watch Film
                      </button>

                      <Link
                        to={`/films/${film.id}`}
                        className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.2em] text-warmgrey hover:text-accent-orange transition-colors"
                      >
                        <span>View Story & Stills</span>
                        <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.video_url}
          videoType={selectedVideo.video_type}
          title={`${selectedVideo.title} — ${selectedVideo.couple_name}`}
        />
      )}
    </>
  );
};

