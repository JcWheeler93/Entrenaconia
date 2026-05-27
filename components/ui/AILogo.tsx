'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark  (NOVA dumbbell mascot)

    Concept: a friendly dumbbell CHARACTER — the dumbbell IS the mascot.
    Big eyes on the central bar, rosy cheeks, warm smile.
    Same spirit as Duolingo's owl but gym-native.

    Layout (100×100 viewBox, all horizontal)
    ──────────────────────────────────────────
    Left plate:    x=5..26   y=24..76  rx=7
    Left collar:   x=26..34  y=32..68  rx=3
    Bar (face):    x=34..66  y=35..65  rx=9
    Right collar:  x=66..74  y=32..68  rx=3
    Right plate:   x=74..95  y=24..76  rx=7

    Eyes on bar:
      Left  iris  cx=43 cy=46 r=7  |  pupil cx=44.5 cy=47.5 r=3.5
      Right iris  cx=57 cy=46 r=7  |  pupil cx=58.5 cy=47.5 r=3.5
      Shine: upper-right of each pupil

    Cheek blush: circles at cx=37/63 cy=57 r=5 (pink tint)
    Smile: M 42 57 Q 50 64 58 57

    Animation: eyes blink every 3.5 s (staggered 60 ms)
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
    el:   `ecel${u}`,
    er:   `ecer${u}`,
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
      {/* ── Blink animation ── */}
      {animated && (
        <style>{`
          @keyframes blink${u}{
            0%,84%,100%{ transform:scaleY(1)   }
            89%        { transform:scaleY(0.07) }
            93%        { transform:scaleY(1)    }
          }
          #${ids.el},#${ids.er}{
            transform-box:fill-box;
            transform-origin:center center;
            animation:blink${u} 3.5s ease-in-out infinite;
          }
          #${ids.er}{ animation-delay:.06s }
        `}</style>
      )}

      <defs>
        {/* Gradient left (purple) → right (cyan) across the whole dumbbell */}
        <linearGradient
          id={ids.grad}
          x1="5" y1="50" x2="95" y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#6c5ce7"/>
          <stop offset="48%"  stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Container glass sheen */}
        <radialGradient id={ids.hl} cx="30%" cy="22%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

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

      {showGlow && (
        <rect
          x="-3" y="-3" width="106" height="106" rx="24"
          fill={`url(#${ids.grad})`} opacity="0.28"
          filter={`url(#${ids.gf})`}
        />
      )}

      {/* ── Dark container ── */}
      <rect x="0" y="0" width="100" height="100" rx="22" fill="#0c0c14"/>
      <rect x="0" y="0" width="100" height="100" rx="22" fill={`url(#${ids.hl})`}/>
      <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="21.5"
        stroke="white" strokeOpacity="0.07" strokeWidth="1.5" fill="none"/>

      {/* ──────── LEFT PLATE ──────── */}
      <rect x="5"  y="24" width="21" height="52" rx="7" fill={`url(#${ids.grad})`}/>
      {/* top shine */}
      <rect x="5"  y="24" width="21" height="16" rx="7" fill="white" fillOpacity="0.22"/>
      {/* bottom shadow */}
      <rect x="5"  y="60" width="21" height="16" rx="7" fill="black" fillOpacity="0.15"/>

      {/* ──────── LEFT COLLAR ──────── */}
      <rect x="26" y="32" width="8"  height="36" rx="3" fill={`url(#${ids.grad})`}/>
      <rect x="26" y="32" width="8"  height="11" rx="3" fill="white" fillOpacity="0.20"/>

      {/* ──────── BAR — face lives here ──────── */}
      <rect x="34" y="35" width="32" height="30" rx="9" fill={`url(#${ids.grad})`}/>
      {/* bar top shine */}
      <rect x="34" y="35" width="32" height="10" rx="9" fill="white" fillOpacity="0.20"/>

      {/* ──────── RIGHT COLLAR ──────── */}
      <rect x="66" y="32" width="8"  height="36" rx="3" fill={`url(#${ids.grad})`}/>
      <rect x="66" y="32" width="8"  height="11" rx="3" fill="white" fillOpacity="0.20"/>

      {/* ──────── RIGHT PLATE ──────── */}
      <rect x="74" y="24" width="21" height="52" rx="7" fill={`url(#${ids.grad})`}/>
      <rect x="74" y="24" width="21" height="16" rx="7" fill="white" fillOpacity="0.22"/>
      <rect x="74" y="60" width="21" height="16" rx="7" fill="black" fillOpacity="0.15"/>

      {/* ──────── CHEEK BLUSH ──────── */}
      <circle cx="37" cy="57" r="5.5" fill="#fd79a8" fillOpacity="0.38"/>
      <circle cx="63" cy="57" r="5.5" fill="#fd79a8" fillOpacity="0.38"/>

      {/* ──────── LEFT EYE ──────── */}
      <g id={ids.el}>
        <circle cx="43"  cy="46"  r="7"   fill="white"/>
        <circle cx="44.5" cy="47.5" r="3.5" fill="#0c0c14"/>
        <circle cx="47"  cy="44.5" r="2"   fill="white"/>
      </g>

      {/* ──────── RIGHT EYE ──────── */}
      <g id={ids.er}>
        <circle cx="57"  cy="46"  r="7"   fill="white"/>
        <circle cx="58.5" cy="47.5" r="3.5" fill="#0c0c14"/>
        <circle cx="61"  cy="44.5" r="2"   fill="white"/>
      </g>

      {/* ──────── SMILE ──────── */}
      <path
        d="M 42 57 Q 50 65 58 57"
        stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round"
      />
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
