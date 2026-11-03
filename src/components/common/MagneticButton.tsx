import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.28;
    const y = (clientY - (top + height / 2)) * 0.28;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 select-none';
  
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-offwhite text-ink hover:bg-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-ink text-offwhite border border-white/20 hover:border-offwhite px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium';
  } else if (variant === 'outline') {
    variantStyles = 'bg-transparent text-offwhite border border-white/25 hover:border-accent-orange hover:text-accent-orange px-6 py-3 text-xs uppercase tracking-[0.2em]';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-offwhite hover:text-accent-orange p-2 text-xs uppercase tracking-[0.2em]';
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      className={`${baseStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Rolling text swap container */}
      <span className="relative inline-flex flex-col overflow-hidden h-[1.25em]">
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-accent-orange">
          {children}
        </span>
      </span>
    </motion.button>
  );
};

