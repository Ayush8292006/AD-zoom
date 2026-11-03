import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getYouTubeId } from '../../lib/storage';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoType?: 'youtube' | 'vimeo' | 'mp4';
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  videoType = 'youtube',
  title,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Resolve iframe embed URL
  let embedSrc = '';
  const ytId = getYouTubeId(videoUrl);

  if (videoType === 'youtube' || ytId) {
    const id = ytId || videoUrl;
    embedSrc = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  } else if (videoType === 'vimeo' || videoUrl.includes('vimeo')) {
    const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
    const vimeoId = vimeoMatch ? vimeoMatch[1] : '';
    embedSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/95 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full max-w-5xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-ink">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange block">Cinema Player</span>
              <h3 className="font-display text-lg text-offwhite tracking-wide truncate max-w-md sm:max-w-xl">
                {title || 'AD Zoom Studio Cinema'}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-warmgrey hover:text-offwhite transition-colors"
            >
              <X strokeWidth={1.25} className="w-6 h-6" />
            </button>
          </div>

          {/* Player Container */}
          <div className="relative aspect-video w-full bg-black">
            {videoType === 'mp4' ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={embedSrc}
                title={title || 'AD Zoom Studio Cinema'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

