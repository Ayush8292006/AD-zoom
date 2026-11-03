import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view' | 'play'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || 'hover';
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        if (type === 'view') setCursorVariant('view');
        else if (type === 'play') setCursorVariant('play');
        else setCursorVariant('hover');
      } else if (target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-orange -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: cursorVariant === 'view' || cursorVariant === 'play' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-offwhite/40 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorVariant === 'view' || cursorVariant === 'play' ? 84 : cursorVariant === 'hover' ? 44 : 28,
          height: cursorVariant === 'view' || cursorVariant === 'play' ? 84 : cursorVariant === 'hover' ? 44 : 28,
          backgroundColor:
            cursorVariant === 'view' || cursorVariant === 'play'
              ? 'rgba(14, 14, 14, 0.85)'
              : cursorVariant === 'hover'
              ? 'rgba(242, 96, 43, 0.12)'
              : 'transparent',
          borderColor:
            cursorVariant === 'view' || cursorVariant === 'play'
              ? '#F2602B'
              : cursorVariant === 'hover'
              ? '#F2602B'
              : 'rgba(246, 243, 238, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 260, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase font-medium tracking-[0.2em] text-offwhite text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};

