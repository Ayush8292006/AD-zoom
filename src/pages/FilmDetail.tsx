import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { api, getYouTubeId } from '../lib/storage';
import { Film } from '../types';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Film as FilmIcon } from 'lucide-react';

export const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getFilms().then((films) => {
      const match = films.find((f) => f.id === id);
      setFilm(match || films[0] || null);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-warmgrey text-xs uppercase tracking-widest">
        Loading Film Archive...
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center p-6">
        <h2 className="font-display text-3xl text-offwhite mb-4">Film Not Found</h2>
        <Link to="/films" className="text-xs uppercase tracking-[0.2em] text-accent-orange">
          Return to Cinema Archive
        </Link>
      </div>
    );
  }

  const ytId = getYouTubeId(film.video_url);
  const embedUrl = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0`
    : film.video_url;

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Back Navigation */}
          <Link
            to="/films"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-warmgrey hover:text-accent-orange transition-colors mb-10"
          >
            <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            <span>Return to Cinema Showcase</span>
          </Link>

          {/* Film Header */}
          <div className="space-y-4 max-w-4xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — {film.category} • FEATURE FILM
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
              {film.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs uppercase tracking-wider text-warmgrey">
              <span className="flex items-center space-x-1.5">
                <FilmIcon strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                <span className="text-offwhite">{film.couple_name}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <MapPin strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                <span>{film.location}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Calendar strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                <span>{film.event_date}</span>
              </span>
            </div>
          </div>

          {/* Embedded Cinema Player */}
          <div className="relative aspect-video w-full bg-black border border-white/10 mb-16 shadow-2xl overflow-hidden">
            {film.video_type === 'mp4' ? (
              <video
                src={film.video_url}
                controls
                poster={film.thumbnail_url}
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={embedUrl}
                title={film.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Narrative & Still Frames */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — THE NARRATIVE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-offwhite font-light">
                Documenting the Sacred Cadence
              </h3>
              <p className="text-sm text-warmgrey font-light leading-relaxed">
                {film.description}
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors"
                >
                  <span>Commission a Similar Wedding Film</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                </Link>
              </div>
            </div>

            {/* Still Frames Gallery */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — ANAMORPHIC STILL FRAMES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(film.still_frames && film.still_frames.length > 0
                  ? film.still_frames
                  : [film.thumbnail_url]
                ).map((frame, fIdx) => (
                  <div
                    key={fIdx}
                    className="aspect-[16/10] overflow-hidden border border-white/10 bg-[#141414]"
                  >
                    <img
                      src={frame}
                      alt={`Still frame ${fIdx + 1} from ${film.title}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

