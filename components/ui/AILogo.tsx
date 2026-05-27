'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark

    Concept: diagonal dumbbell — the universal gym symbol, rendered
    with metallic depth (collar + plates + bar highlights) and a
    continuous purple→cyan gradient along its length.

    Design anatomy (100×100 viewBox, group rotated −38°)
    ──────────────────────────────────────────────────────
    Unrotated layout (all centred around y=50):
      Left plate:    x=8..27   y=33..67  rx=5  h=34
      Left collar:   x=27..35  y=41..59  rx=3  h=18
      Bar:           x=35..65  y=44..56  rx=4  h=12
      Right collar:  x=65..73  y=41..59  rx=3
      Right plate:   x=73..92  y=33..67  rx=5

    Highlights: white overlay at 18-22% opacity on the top third of
    each element → simulates cylindrical metallic surface.

    Gradient: userSpaceOnUse x=8→92 y=50 (horizontal in local space),
    so after −38° rotation the colour flows purple (left plate) →
    cyan (right plate) along the dumbbell axis.
    ────────────────────────────────────────────────────────────────── */

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
  const u   = raw.replace(/[^a-z0-9]/gi, '');

  const ids = {
    grad: `ecg${u}`,
    hl:   `ech${u}`,
    gf:   `ecs${u}`,
    dm:   `ecdm${u}`,
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
      {/* ── Glow pulse when animated ── */}
      {animated && (
        <style>{`
          @keyframes dbpulse${u}{
            0%,100%{ filter:drop-shadow(0 0 3px #6c5ce788) }
            50%    { filter:drop-shadow(0 0 9px #00d2ffaa) }
          }
          #${ids.dm}{ animation:dbpulse${u} 2.2s ease-in-out infinite }
        `}</style>
      )}

      <defs>
        {/* Gradient runs left→right in the dumbbell's local space.
            Because the group is rotated −38°, the gradient also
            reads as diagonal in screen space — purple left, cyan right. */}
        <linearGradient
          id={ids.grad}
          x1="8" y1="50" x2="92" y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#6c5ce7"/>
          <stop offset="55%"  stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Container glass sheen */}
        <radialGradient id={ids.hl} cx="30%" cy="22%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.13"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

        {/* Outer glow filter */}
        {showGlow && (
          <filter id={ids.gf} x="-45%" y="-45%" width="190%" height="190%">
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
        <rect
          x="-3" y="-3" width="106" height="106" rx="24"
          fill={`url(#${ids.grad})`}
          opacity="0.28"
          filter={`url(#${ids.gf})`}
        />
      )}

      {/* ── Container ── */}
      <rect x="0" y="0" width="100" height="100" rx="20" fill="#0c0c14"/>
      <rect x="0" y="0" width="100" height="100" rx="20" fill={`url(#${ids.hl})`}/>
      <rect
        x="0.75" y="0.75" width="98.5" height="98.5" rx="19.5"
        stroke="white" strokeOpacity="0.07" strokeWidth="1.5" fill="none"
      />

      {/* ── Dumbbell — rotated −38° around centre ── */}
      <g id={ids.dm} transform="rotate(-38 50 50)">

        {/* ──── Left plate ──── */}
        <rect x="8"  y="33" width="19" height="34" rx="5" fill={`url(#${ids.grad})`}/>
        {/* plate top highlight (metallic sheen) */}
        <rect x="8"  y="33" width="19" height="11" rx="5" fill="white" fillOpacity="0.22"/>
        {/* plate bottom edge shadow */}
        <rect x="8"  y="56" width="19" height="11" rx="5" fill="black" fillOpacity="0.18"/>

        {/* ──── Left collar ──── */}
        <rect x="27" y="41" width="8"  height="18" rx="3" fill={`url(#${ids.grad})`}/>
        <rect x="27" y="41" width="8"  height="6"  rx="3" fill="white" fillOpacity="0.20"/>

        {/* ──── Bar ──── */}
        <rect x="35" y="44" width="30" height="12" rx="4" fill={`url(#${ids.grad})`}/>
        {/* bar top highlight — knurling shimmer */}
        <rect x="35" y="44" width="30" height="4"  rx="2" fill="white" fillOpacity="0.18"/>
        {/* bar bottom shadow */}
        <rect x="35" y="52" width="30" height="4"  rx="2" fill="black" fillOpacity="0.15"/>

        {/* ──── Right collar ──── */}
        <rect x="65" y="41" width="8"  height="18" rx="3" fill={`url(#${ids.grad})`}/>
        <rect x="65" y="41" width="8"  height="6"  rx="3" fill="white" fillOpacity="0.20"/>

        {/* ──── Right plate ──── */}
        <rect x="73" y="33" width="19" height="34" rx="5" fill={`url(#${ids.grad})`}/>
        <rect x="73" y="33" width="19" height="11" rx="5" fill="white" fillOpacity="0.22"/>
        <rect x="73" y="56" width="19" height="11" rx="5" fill="black" fillOpacity="0.18"/>

      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
   AIWordmark  —  icon + "EntrenaConIA" gradient text
   ────────────────────────────────────────────────────────────────── */

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
      <span
        className="font-bold leading-none whitespace-nowrap"
        style={{ fontSize: fs }}
      >
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
