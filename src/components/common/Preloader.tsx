import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Check sessionStorage
    const hasLoaded = sessionStorage.getItem('adz_preloader_seen');
    if (hasLoaded) {
      onComplete?.();
      return;
    }

    setShouldPlay(true);

    // Number counter interval from 0 to 100
    const duration = 1900; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const val = Math.floor(eased * 100);
      setCount(val);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem('adz_preloader_seen', 'true');
          setTimeout(() => {
            onComplete?.();
          }, 800);
        }, 300);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  if (!shouldPlay) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-[#0E0E0E] text-offwhite p-8 lg:p-14 select-none pointer-events-auto"
        >
          {/* Top Label */}
          <div className="w-full flex justify-between items-center text-xs tracking-[0.25em] text-warmgrey uppercase">
            <span>AD Zoom Studio</span>
            <span>Cinematography & Photography</span>
          </div>

          {/* Center Logo Draw-in Animation */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center">
              {/* Outer Camera Contour Stroke Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Stylized camera lens ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#F2602B"
                  strokeWidth="1.5"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                {/* Secondary inner aperture accents */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="37"
                  fill="none"
                  stroke="rgba(246, 243, 238, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="232"
                  initial={{ strokeDashoffset: 232 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.3, delay: 0.2, ease: 'easeOut' }}
                />
              </svg>

              {/* Logo monogram image fading in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 flex items-center justify-center p-3"
              >
                <img
                  src="/logo.png"
                  alt="AD Zoom Studio"
                  className="w-20 h-20 lg:w-24 lg:h-24 object-contain rounded-full"
                />
              </motion.div>
            </div>

            {/* Title Fade */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 text-center"
            >
              <h2 className="font-display text-2xl lg:text-3xl tracking-wide uppercase">AD Zoom Studio</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-orange mt-1">India • Worldwide</p>
            </motion.div>
          </div>

          {/* Bottom Counter & Status */}
          <div className="w-full flex justify-between items-end border-t border-white/10 pt-4">
            <div className="flex items-center space-x-2 text-xs tracking-widest text-warmgrey uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
              <span>Loading Visual Archive</span>
            </div>
            <div className="font-mono text-2xl lg:text-3xl font-light tracking-tighter text-offwhite">
              {String(count).padStart(2, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

