'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'linear-gradient(90deg, #6c5ce7, #00d2ff)',
  height = 8,
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white/60">{label}</span>
          <span className="text-sm font-semibold text-white">{percentage}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden bg-[#2a2a3e]"
        style={{ height }}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
