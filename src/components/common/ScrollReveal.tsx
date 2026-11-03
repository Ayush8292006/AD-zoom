import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'slide-up' | 'fade' | 'clip-up' | 'scale-in';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 0.9,
  className = '',
  threshold = 85,
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, clipPath: 'none' });
      return;
    }

    let initialVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
    };

    if (animation === 'slide-up') {
      initialVars = { opacity: 0, y: 40 };
      toVars = { ...toVars, y: 0 };
    } else if (animation === 'fade') {
      initialVars = { opacity: 0 };
      toVars = { ...toVars };
    } else if (animation === 'clip-up') {
      initialVars = { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 };
      toVars = { ...toVars, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: duration * 1.2 };
    } else if (animation === 'scale-in') {
      initialVars = { opacity: 0, scale: 0.94 };
      toVars = { ...toVars, scale: 1 };
    }

    gsap.set(el, initialVars);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${threshold}%`,
      once: true,
      onEnter: () => {
        gsap.to(el, toVars);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
};

