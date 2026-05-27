'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white hover:shadow-[0_0_30px_rgba(108,92,231,0.4)]',
  secondary: 'bg-[#1e1e2e] border border-[#2a2a3e] text-white hover:border-[#6c5ce7] hover:bg-[#2a2a3e]',
  ghost: 'bg-transparent text-white hover:bg-[#1e1e2e]',
  danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  loading,
  className = '',
  type = 'button',
  fullWidth,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl font-semibold transition-all duration-300 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Cargando...
        </span>
      ) : children}
    </motion.button>
  );
}
