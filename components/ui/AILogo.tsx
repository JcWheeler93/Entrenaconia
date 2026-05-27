'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark

    Design: geometric sprinter figure in full stride
    ● Head (circle) + torso (forward lean ~30°) + 4 limbs
    ● Bold rounded strokes — athletic, confident
    ● Gradient rounded-square container  #6c5ce7 → #00d2ff
    ● Glass highlight layer for premium depth
    ● Animated: subtle breathing pulse on the figure

    Reference: Strava / RunKeeper style but fully custom geometry.
    Works at 16 px favicon → 256 px display.
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
    bg:   `ecbg${u}`,
    hl:   `echl${u}`,
    sh:   `ecsh${u}`,
    fig:  `ecfg${u}`,
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
      {/* ── Keyframes (only when animated) ── */}
      {animated && (
        <style>{`
          @keyframes ecpulse${u} {
            0%,100% { transform:scale(1); }
            50%      { transform:scale(.95); }
          }
          #${G.fig} {
            animation: ecpulse${u} 1.9s ease-in-out infinite;
            transform-origin: 50px 52px;
            transform-box: fill-box;
          }
        `}</style>
      )}

      <defs>
        {/* Main brand gradient */}
        <linearGradient id={G.bg} x1="4" y1="4" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6c5ce7"/>
          <stop offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Top-left glass highlight */}
        <radialGradient id={G.hl} cx="26%" cy="20%" r="54%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.26"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

        {/* Outer glow filter (only when showGlow) */}
        {showGlow && (
          <filter id={G.sh} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Outer halo */}
      {showGlow && (
        <rect x="-2" y="-2" width="104" height="104" rx="24"
          fill={`url(#${G.bg})`} opacity="0.28"
          filter={`url(#${G.sh})`}/>
      )}

      {/* ── Background: gradient rounded square ── */}
      <rect x="0" y="0" width="100" height="100" rx="21" fill={`url(#${G.bg})`}/>
      {/* Glass depth highlight */}
      <rect x="0" y="0" width="100" height="100" rx="21" fill={`url(#${G.hl})`}/>

      {/* ───────────────────────────────────────────────────────
          SPRINTER FIGURE  — full mid-stride pose
          Proportions: head ≈ ⅛ body height, strong forward lean

          Landmark coords (100×100 viewBox, 8px padding):
            head    cx=61  cy=14  r=9
            torso   (61,23)→(44,58)     ← ~30° forward lean
            shoulder (53,38)            ← ~40% down torso
            hip     (44,58)

          Arms (shoulder junction):
            front arm (R, punching fwd): (53,38)→(79,24)
            back arm  (L, driving back):  (53,38)→(25,52)

          Legs (hip junction):
            front leg  (R, stride fwd):  (44,58)→(68,86)
            back leg   (L, kick high):   (44,58)→(26,34)  ← heel to butt
          ─────────────────────────────────────────────────── */}
      <g
        id={G.fig}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.96"
      >
        {/* Head */}
        <circle cx="61" cy="14" r="9" fill="white" stroke="none"/>

        {/* Torso — strong forward lean */}
        <line x1="61" y1="23" x2="44" y2="58" strokeWidth="9.5"/>

        {/* Front arm — driving forward + up */}
        <line x1="53" y1="38" x2="79" y2="24" strokeWidth="8.5"/>

        {/* Back arm — pulling back + down */}
        <line x1="53" y1="38" x2="25" y2="52" strokeWidth="8.5"/>

        {/* Front leg — long stride forward */}
        <line x1="44" y1="58" x2="68" y2="86" strokeWidth="9.5"/>

        {/* Back leg — high heel kick (power) */}
        <line x1="44" y1="58" x2="26" y2="34" strokeWidth="9.5"/>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   AIWordmark  —  icon + "EntrenaConIA" gradient text
   ────────────────────────────────────────────────────────────── */

export interface AIWordmarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function AIWordmark({ size = 36, animated = false, className = '' }: AIWordmarkProps) {
  const fs = Math.max(12, Math.round(size * 0.48));
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      style={{ flexShrink: 0 }}
    >
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
