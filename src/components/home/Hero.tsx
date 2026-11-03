import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../common/MagneticButton';
import { VideoModal } from '../common/VideoModal';
import { SiteSettings } from '../../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const showreelUrl = settings.hero_video_url || 'https://www.youtube.com/watch?v=ScMzIvxBSi4';

  const scrollToExplore = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <section className="relative w-full h-screen min-h-[680px] flex items-end pb-16 lg:pb-20 px-5 sm:px-10 lg:px-14 overflow-hidden select-none">
        {/* Hero Background Image with Scale Animation (1.15 -> 1) */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={settings.hero_image_url}
            alt="AD Zoom Studio Luxury Cinematography"
            className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.08]"
            loading="eager"
          />
          {/* Subtle multi-layer cinematic vignette & gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40 pointer-events-none" />
        </motion.div>

        {/* Top Floating Badge on Desktop */}
        <div className="hidden lg:flex absolute top-28 right-12 z-10 items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-offwhite/70 bg-ink/50 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
          <span>EST. 2016 • NEW DELHI • WORLDWIDE</span>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end space-y-6">
          {/* Top Label */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center space-x-3 text-xs uppercase tracking-[0.3em] text-accent-orange font-medium"
            >
              <span>— CINEMA & STILL HEIRLOOMS</span>
              <span className="text-white/30">•</span>
              <span className="text-offwhite/80">FINE ART ROYAL WEDDINGS</span>
            </motion.div>
          </div>

          {/* Masked Line-by-Line Headline Reveal */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-light text-offwhite leading-[0.92] tracking-tight text-[clamp(2.75rem,8.5vw,8.5rem)]"
              >
                {settings.hero_title_line1 || 'Where Sacred Vows Meet'}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-light text-offwhite leading-[0.92] tracking-tight italic text-[clamp(2.75rem,8.5vw,8.5rem)]"
              >
                {settings.hero_title_line2 || 'Cinematic Poetry.'}
              </motion.h1>
            </div>
          </div>

          {/* Bottom Controls & Description Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between pt-6 border-t border-white/15 gap-6"
          >
            <p className="text-xs sm:text-sm text-warmgrey max-w-md font-light leading-relaxed">
              {settings.hero_subtitle}
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsShowreelOpen(true)}
                className="group flex items-center space-x-3 px-5 py-3 rounded-full border border-white/20 bg-ink/60 backdrop-blur-sm text-offwhite hover:border-accent-orange hover:text-accent-orange transition-all"
                data-cursor="play"
                data-cursor-text="PLAY"
              >
                <div className="w-7 h-7 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange group-hover:bg-accent-orange group-hover:text-ink transition-colors">
                  <Play strokeWidth={1.5} className="w-3.5 h-3.5 fill-current translate-x-0.2" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium">
                  Watch Showreel
                </span>
              </button>

              <Link to="/contact">
                <MagneticButton variant="primary" className="!py-3 !px-6 text-xs">
                  Reserve Date
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Cue */}
        <div
          onClick={scrollToExplore}
          className="hidden lg:flex absolute bottom-6 right-14 z-20 items-center space-x-3 text-[10px] uppercase tracking-[0.25em] text-warmgrey hover:text-offwhite cursor-pointer transition-colors"
        >
          <span>Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-accent-orange"
            />
          </div>
        </div>
      </section>

      {/* Showreel Modal */}
      <VideoModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoUrl={showreelUrl}
        title="AD Zoom Studio — Official Cinema Showreel"
      />
    </>
  );
};
