'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark  (NOVA mascot)

    Concept: friendly mascot character in Duolingo spirit —
    round face, big expressive eyes, ear bumps on top, warm smile.
    Gradient purple→cyan flows diagonally (bottom-left → top-right)
    across the face, giving a premium glowing look.

    Design anatomy (100×100 viewBox)
    ─────────────────────────────────
    Face circle:   cx=50  cy=58  r=35   (top edge ≈ y=23)
    Left ear:      cx=28  cy=18  r=10   (overlaps face top by ~5px)
    Right ear:     cx=72  cy=18  r=10

    Left eye iris: cx=37  cy=51  r=11.5
    Left pupil:    cx=39  cy=53  r=5.5
    Left shine:    cx=43  cy=48  r=3

    Right eye iris: cx=63  cy=51  r=11.5
    Right pupil:    cx=65  cy=53  r=5.5
    Right shine:    cx=69  cy=48  r=3

    Smile: M 37 68 Q 50 80 63 68  (open arc, strokeWidth 3.5)

    Animation: eyes blink every 3.8 s (staggered 70 ms)
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
            0%,84%,100%{ transform:scaleY(1)    }
            89%        { transform:scaleY(0.07) }
            93%        { transform:scaleY(1)    }
          }
          #${ids.el},#${ids.er}{
            transform-box:fill-box;
            transform-origin:center center;
            animation:blink${u} 3.8s ease-in-out infinite;
          }
          #${ids.er}{ animation-delay:.07s }
        `}</style>
      )}

      <defs>
        {/* Diagonal gradient bottom-left purple → top-right cyan */}
        <linearGradient
          id={ids.grad}
          x1="10" y1="90" x2="90" y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#6c5ce7"/>
          <stop offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Glass sheen */}
        <radialGradient id={ids.hl} cx="30%" cy="22%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.13"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

        {/* Outer glow */}
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
        stroke="white" strokeOpacity="0.06" strokeWidth="1.5" fill="none"
      />

      {/* ── Ears (drawn before face so face overlaps the base) ── */}
      <circle cx="28" cy="18" r="10" fill={`url(#${ids.grad})`}/>
      <circle cx="72" cy="18" r="10" fill={`url(#${ids.grad})`}/>
      {/* Inner ear highlight */}
      <circle cx="28" cy="15" r="4.5" fill="white" fillOpacity="0.18"/>
      <circle cx="72" cy="15" r="4.5" fill="white" fillOpacity="0.18"/>

      {/* ── Face ── */}
      <circle cx="50" cy="58" r="35" fill={`url(#${ids.grad})`}/>

      {/* ── Left eye ── */}
      <g id={ids.el}>
        <circle cx="37" cy="51" r="11.5" fill="white"/>
        <circle cx="39" cy="53" r="5.5"  fill="#0c0c14"/>
        <circle cx="43" cy="48" r="3"    fill="white"/>
      </g>

      {/* ── Right eye ── */}
      <g id={ids.er}>
        <circle cx="63" cy="51" r="11.5" fill="white"/>
        <circle cx="65" cy="53" r="5.5"  fill="#0c0c14"/>
        <circle cx="69" cy="48" r="3"    fill="white"/>
      </g>

      {/* ── Smile ── */}
      <path
        d="M 37 68 Q 50 81 63 68"
        stroke="white" strokeWidth="3.5"
        fill="none" strokeLinecap="round"
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
