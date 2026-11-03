import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    // Base horizontal marquee animation
    const tween = gsap.to(textEl, {
      xPercent: -50,
      ease: 'none',
      duration: 25,
      repeat: -1,
    });

    // React to scroll velocity
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMultiplier = Math.min(Math.max(velocity / 400, 1), 4);
        gsap.to(tween, {
          timeScale: speedMultiplier,
          duration: 0.3,
          overwrite: 'auto',
          onComplete: () => {
            gsap.to(tween, { timeScale: 1, duration: 0.8 });
          },
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const marqueeText = 'WEDDINGS • PRE-WEDDINGS • CINEMATIC FILMS • EDITORIAL STILLS • ROYAL DESTINATIONS • ';

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 lg:py-12 bg-ink border-y border-white/10 overflow-hidden select-none"
    >
      <div ref={textRef} className="flex whitespace-nowrap will-change-transform">
        <span className="font-display text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-wider text-transparent [-webkit-text-stroke:1px_rgba(246,243,238,0.35)] hover:[-webkit-text-stroke:1px_#F2602B] transition-all">
          {marqueeText.repeat(4)}
        </span>
      </div>
    </div>
  );
};

