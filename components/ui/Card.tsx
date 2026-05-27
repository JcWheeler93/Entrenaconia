'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = { none: 'p-0', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export function Card({ children, className = '', hover = true, glow = false, onClick, padding = 'md' }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -2, borderColor: 'rgba(108,92,231,0.4)' } : undefined}
      className={`
        bg-[#12121a] border border-[#2a2a3e] rounded-2xl
        transition-all duration-300
        ${glow ? 'shadow-[0_0_30px_rgba(108,92,231,0.1)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
