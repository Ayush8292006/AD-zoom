import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Photo } from '../../types';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[10001] flex flex-col justify-between bg-ink/98 backdrop-blur-lg select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Controls Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent-orange font-medium">
              {currentPhoto.category}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-warmgrey">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label="Toggle zoom"
              className="text-warmgrey hover:text-offwhite transition-colors hidden sm:block p-1"
            >
              {isZoomed ? <ZoomOut strokeWidth={1.25} className="w-5 h-5" /> : <ZoomIn strokeWidth={1.25} className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="text-warmgrey hover:text-offwhite transition-colors p-1"
            >
              <X strokeWidth={1.25} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Central Display Area */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous frame"
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center text-offwhite hover:border-accent-orange hover:text-accent-orange transition-all bg-ink/40 backdrop-blur-sm"
          >
            <ChevronLeft strokeWidth={1.25} className="w-6 h-6" />
          </button>

          {/* Active Image */}
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.35 : 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className={`relative max-w-5xl max-h-[75vh] flex items-center justify-center transition-transform ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={currentPhoto.image_url}
              alt={currentPhoto.alt_text || currentPhoto.title}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
              loading="eager"
            />
          </motion.div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next frame"
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center text-offwhite hover:border-accent-orange hover:text-accent-orange transition-all bg-ink/40 backdrop-blur-sm"
          >
            <ChevronRight strokeWidth={1.25} className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details Bar */}
        <div className="relative z-10 px-6 py-4 border-t border-white/10 bg-ink/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-display text-lg text-offwhite tracking-wide">
              {currentPhoto.title}
            </h4>
            {currentPhoto.caption && (
              <p className="text-xs text-warmgrey mt-0.5 max-w-xl font-light">
                {currentPhoto.caption}
              </p>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-warmgrey/60 hidden sm:block">
            Keyboard ← → • Esc to close
          </span>
        </div>
      </div>
    </AnimatePresence>
  );
};

