import React, { useState, useEffect } from 'react';
import { Film } from '../../types';
import { api, getYouTubeId } from '../../lib/storage';
import { Plus, Trash2, Star, Play, Edit3 } from 'lucide-react';

export const FilmsTab: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [coupleName, setCoupleName] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('Wedding Films');
  const [videoType, setVideoType] = useState<'youtube' | 'vimeo' | 'mp4'>('youtube');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('05:30');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    api.getFilms().then(setFilms);
  }, []);

  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url);
    const ytId = getYouTubeId(url);
    if (ytId && !thumbnailUrl) {
      setThumbnailUrl(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) return;

    const newFilm: Film = {
      id: 'film-' + Date.now(),
      title,
      couple_name: coupleName,
      location,
      event_date: eventDate,
      category,
      video_type: videoType,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      duration,
      description,
      is_featured: isFeatured,
      display_order: films.length + 1,
      still_frames: [
        thumbnailUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      ],
    };

    const updated = [newFilm, ...films];
    setFilms(updated);
    await api.saveFilms(updated);

    // Reset
    setTitle('');
    setCoupleName('');
    setLocation('');
    setEventDate('');
    setVideoUrl('');
    setThumbnailUrl('');
    setDescription('');
    setShowAddModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this cinematic film?')) return;
    const updated = films.filter((f) => f.id !== id);
    setFilms(updated);
    await api.saveFilms(updated);
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = films.map((f) => (f.id === id ? { ...f, is_featured: !f.is_featured } : f));
    setFilms(updated);
    await api.saveFilms(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Cinematic Films & Videos</h2>
          <p className="text-xs text-warmgrey-dark">
            Curate wedding feature films, trailers, and teasers with direct YouTube, Vimeo, or MP4 playback.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add New Film</span>
        </button>
      </div>

      {/* Films List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {films.map((film) => (
          <div
            key={film.id}
            className="bg-white border border-sand p-4 flex flex-col justify-between shadow-sm space-y-3"
          >
            <div className="relative aspect-video bg-sand/30 overflow-hidden">
              <img
                src={film.thumbnail_url}
                alt={film.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play strokeWidth={1.5} className="w-8 h-8 text-white fill-current opacity-80" />
              </div>
              {film.duration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-ink text-[9px] font-mono text-white">
                  {film.duration}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-accent-orange">
                <span>{film.category}</span>
                <span>{film.event_date}</span>
              </div>
              <h4 className="font-display text-lg text-ink line-clamp-1">{film.title}</h4>
              <p className="text-xs text-warmgrey-dark font-medium">
                {film.couple_name} • {film.location}
              </p>
              <p className="text-xs text-warmgrey-dark line-clamp-2 pt-1 font-light">
                {film.description}
              </p>
            </div>

            <div className="pt-3 border-t border-sand flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleFeatured(film.id)}
                className={`p-1.5 rounded transition-colors ${
                  film.is_featured ? 'text-accent-orange' : 'text-warmgrey hover:text-ink'
                }`}
                title="Toggle Featured"
              >
                <Star strokeWidth={1.5} className={`w-4 h-4 ${film.is_featured ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(film.id)}
                className="p-1.5 text-warmgrey hover:text-red-600 transition-colors"
                title="Delete film"
              >
                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Film Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-offwhite border border-sand p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">Add Cinematic Film</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs uppercase tracking-wider text-warmgrey hover:text-ink"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Film Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Echoes of the Mewar Dynasty"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Couple Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya & Kabir"
                    value={coupleName}
                    onChange={(e) => setCoupleName(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Location / Venue *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Udaivilas, Udaipur"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Video Platform
                  </label>
                  <select
                    value={videoType}
                    onChange={(e) => setVideoType(e.target.value as any)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="mp4">Direct MP4 URL</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  >
                    <option value="Wedding Films">Wedding Films</option>
                    <option value="Pre-Wedding Film">Pre-Wedding Film</option>
                    <option value="Trailers & Teasers">Trailers & Teasers</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Video URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="Auto-extracted or custom URL"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Duration & Date
                  </label>
                  <input
                    type="text"
                    placeholder="06:42 • Feb 2026"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Description / Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Short cinematic summary of the celebration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-sand text-xs uppercase tracking-wider text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title || !videoUrl}
                  className="px-6 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black disabled:opacity-50"
                >
                  Save Film
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

