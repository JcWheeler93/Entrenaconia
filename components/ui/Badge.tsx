import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'xp' | 'level' | 'streak' | 'success' | 'warning' | 'rare' | 'epic' | 'legendary';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-[#2a2a3e] text-white/70',
  xp: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold',
  level: 'bg-gradient-to-r from-[#6c5ce7] to-[#00d2ff] text-white font-bold',
  streak: 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  rare: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  legendary: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span className={`rounded-full ${variants[variant]} ${sizes[size]} inline-flex items-center gap-1`}>
      {children}
    </span>
  );
}
