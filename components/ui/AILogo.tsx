'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────
    EntrenaConIA  —  brand mark & wordmark

    Design concept:
    ● Bold italic "E" lettermark (E = Entrena, italicised = forward motion)
    ● Three bars + stem — also reads as "signal strength" / AI data bars
    ● Gradient-filled rounded-square container (#6c5ce7 → #00d2ff)
    ● Small lightning-bolt spark in the top-right corner space
    ● Depth: inner radial highlight on bg + subtle drop-shadow ring

    Inspired by: Strava, Peloton, Apple Fitness+ — clean app-icon logic.
    Works at 16 px favicon → 256 px header.
    ────────────────────────────────────────────────────────────── */

export interface AILogoProps {
  size?: number;
  animated?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function AILogo({
  size = 40,
  animated = false,
  showGlow = false,
  className = '',
}: AILogoProps) {
  const raw = useId();
  const u = raw.replace(/[^a-z0-9]/gi, '');

  const G = {
    bg:    `ecbg${u}`,
    hl:    `echl${u}`,
    sh:    `ecsh${u}`,
    anim:  `ecam${u}`,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'block' }}
      aria-label="EntrenaConIA"
    >
      {/* ── Optional shimmer animation ── */}
      {animated && (
        <style>{`
          @keyframes ecsh${u} {
            0%   { stop-color: #6c5ce7 }
            50%  { stop-color: #8b5cf6 }
            100% { stop-color: #6c5ce7 }
          }
          @keyframes ecsh2${u} {
            0%   { stop-color: #00d2ff }
            50%  { stop-color: #06b6d4 }
            100% { stop-color: #00d2ff }
          }
          #${G.anim}-s1 { animation: ecsh${u} 3s ease-in-out infinite }
          #${G.anim}-s2 { animation: ecsh2${u} 3s ease-in-out infinite 1.5s }
        `}</style>
      )}

      <defs>
        {/* Main gradient — diagonal purple → cyan */}
        <linearGradient id={G.bg} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop id={`${G.anim}-s1`} offset="0%"   stopColor="#6c5ce7"/>
          <stop id={`${G.anim}-s2`} offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Top-left highlight for depth / glass feel */}
        <radialGradient id={G.hl} cx="28%" cy="22%" r="58%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

        {/* Outer glow shadow (optional) */}
        {showGlow && (
          <filter id={G.sh} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        )}
      </defs>

      {/* ── Outer glow halo ── */}
      {showGlow && (
        <rect
          x="2" y="2" width="96" height="96" rx="24"
          fill={`url(#${G.bg})`}
          opacity="0.35"
          filter={`url(#${G.sh})`}
        />
      )}

      {/* ── Background rounded square ── */}
      <rect x="0" y="0" width="100" height="100" rx="22" fill={`url(#${G.bg})`}/>

      {/* ── Glass highlight (depth) ── */}
      <rect x="0" y="0" width="100" height="100" rx="22" fill={`url(#${G.hl})`}/>

      {/* ──────────────────────────────────────────────
          Bold italic "E" lettermark
          Skewed -11° (forward lean = motion / speed)
          White, bold proportions
          ────────────────────────────────────────── */}
      <g transform="skewX(-11) translate(6 0)">
        {/* Vertical stem */}
        <rect x="16" y="13" width="14" height="74" rx="4" fill="white"/>
        {/* Top bar */}
        <rect x="16" y="13" width="52" height="15" rx="4" fill="white"/>
        {/* Middle bar (slightly shorter — classic E proportion) */}
        <rect x="16" y="43" width="40" height="14" rx="4" fill="white"/>
        {/* Bottom bar */}
        <rect x="16" y="72" width="52" height="15" rx="4" fill="white"/>
      </g>

      {/* ──────────────────────────────────────────────
          Lightning-bolt spark  (top-right corner space)
          Small, clean, referencing the "IA" energy
          ────────────────────────────────────────── */}
      <path
        d="M 84 12  L 78 26  L 83 26  L 77 40  L 90 24  L 85 24  Z"
        fill="white"
        opacity="0.88"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   AIWordmark  —  icon + gradient text side by side
   ────────────────────────────────────────────────────────────── */

export interface AIWordmarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function AIWordmark({ size = 36, animated = false, className = '' }: AIWordmarkProps) {
  const fs = Math.max(12, Math.round(size * 0.48));
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ flexShrink: 0 }}>
      <AILogo size={size} animated={animated}/>
      <span className="font-bold leading-none whitespace-nowrap" style={{ fontSize: fs }}>
        <span className="text-white">Entrena</span>
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(90deg, #6c5ce7, #00d2ff)' }}
        >
          ConIA
        </span>
      </span>
    </div>
  );
}
