import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-white/5">
      <div
        className="h-full bg-accent-orange transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(242, 96, 43, 0.7)',
        }}
      />
    </div>
  );
};

