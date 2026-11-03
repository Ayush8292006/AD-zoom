import React, { useEffect, useState, useMemo } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { Lightbox } from '../components/common/Lightbox';
import { api } from '../lib/storage';
import { Photo, Category } from '../types';

export const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([api.getPhotos(), api.getCategories()]).then(([p, c]) => {
      setPhotos(p);
      setCategories(c);
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return photos;
    return photos.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [photos, selectedCategory]);

  return (
    <>
      <PageTransition>
        <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            {/* Header */}
            <div className="mb-12 lg:mb-16 space-y-4 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — VISUAL ARCHIVE
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
                Photography <span className="italic">Gallery</span>
              </h1>
              <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
                A curated selection of authentic frames, heritage ceremonies, emotional vows, and fine-art portraits.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-white/10">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'bg-offwhite text-ink font-semibold'
                    : 'text-warmgrey hover:text-offwhite bg-transparent'
                }`}
              >
                All ({photos.length})
              </button>
              {categories.map((cat) => {
                const count = photos.filter(
                  (p) => p.category.toLowerCase() === cat.name.toLowerCase()
                ).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-offwhite text-ink font-semibold'
                        : 'text-warmgrey hover:text-offwhite bg-transparent'
                    }`}
                  >
                    {cat.name} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Photos Masonry / Grid */}
            {filteredPhotos.length === 0 ? (
              <div className="py-20 text-center text-warmgrey text-sm">
                No frames currently found in this category.
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setLightboxIndex(index)}
                    className="group relative overflow-hidden bg-[#141414] border border-white/10 break-inside-avoid cursor-pointer"
                    data-cursor="view"
                    data-cursor-text="VIEW"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.alt_text || photo.title}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Hover Caption Details */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-medium block">
                        {photo.category}
                      </span>
                      <h4 className="font-display text-lg text-offwhite mt-1">
                        {photo.title}
                      </h4>
                      {photo.caption && (
                        <p className="text-xs text-warmgrey font-light line-clamp-1 mt-0.5">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </PageTransition>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </>
  );
};

