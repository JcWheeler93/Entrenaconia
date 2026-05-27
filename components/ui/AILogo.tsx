'use client';

import { useId } from 'react';

/* ─────────────────────────────────────────────────────────────
   NOVA — AI mascot / logo for EntrenaConIA
   Designer concept: determined fitness-AI face with:
     • Brand gradient (purple #6c5ce7 → cyan #00d2ff)
     • White lightning-bolt on forehead (brand mark)
     • Focused eyebrows + glowing eyes with gradient iris
     • Confident smile
     • Circuit-tech side accents
   Supports: static icon, animated (blink + glow pulse + bolt flicker)
   ────────────────────────────────────────────────────────── */

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
  const u = raw.replace(/[^a-z0-9]/gi, ''); // safe CSS class / filter id suffix

  // Named IDs to avoid collisions when multiple instances render
  const G = {
    bg:    `nb${u}`,
    iris:  `ni${u}`,
    inner: `nn${u}`,
    glow:  `ng${u}`,
    oglow: `no${u}`,
    outer: `noc${u}`,
    bolt:  `nbt${u}`,
    eyes:  `nee${u}`,
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
      {/* ── Keyframe animations (injected only when animated) ── */}
      {animated && (
        <style>{`
          @keyframes nbp${u}{0%,100%{opacity:.18}50%{opacity:.38}}
          @keyframes nbb${u}{0%,100%{opacity:.82}38%{opacity:1}70%{opacity:.58}}
          @keyframes nbk${u}{0%,88%,100%{transform:scaleY(1)}91%{transform:scaleY(.08)}94%{transform:scaleY(1)}}
          #${G.outer}{animation:nbp${u} 2.8s ease-in-out infinite}
          #${G.bolt} {animation:nbb${u} 2.2s ease-in-out infinite}
          #${G.eyes} {
            animation:nbk${u} 5.5s ease-in-out infinite;
            transform-box:fill-box;
            transform-origin:center;
          }
        `}</style>
      )}

      <defs>
        {/* Main gradient – diagonal purple→cyan */}
        <linearGradient id={G.bg} x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c5ce7"/>
          <stop offset="1" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Iris gradient */}
        <linearGradient id={G.iris} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c4bbff"/>
          <stop offset="0.5" stopColor="#4ecdc4"/>
          <stop offset="1" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Inner face highlight */}
        <radialGradient id={G.inner} cx="33%" cy="26%" r="52%">
          <stop offset="0%" stopColor="white" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>

        {/* White-element glow filter */}
        <filter id={G.glow} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* Outer halo glow filter */}
        {showGlow && (
          <filter id={G.oglow} x="-55%" y="-55%" width="210%" height="210%">
            <feGaussianBlur stdDeviation="8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        )}
      </defs>

      {/* ── Outer glow halo ── */}
      {showGlow ? (
        <circle
          id={G.outer}
          cx="50" cy="50" r="48"
          fill={`url(#${G.bg})`}
          opacity="0.28"
          filter={`url(#${G.oglow})`}
        />
      ) : animated ? (
        <circle
          id={G.outer}
          cx="50" cy="50" r="48"
          fill={`url(#${G.bg})`}
          opacity="0.18"
        />
      ) : null}

      {/* ── Head ── */}
      <circle cx="50" cy="50" r="44" fill={`url(#${G.bg})`}/>

      {/* Inner top-left highlight for depth */}
      <ellipse cx="35" cy="30" rx="22" ry="15" fill={`url(#${G.inner})`}/>

      {/* Face panel – subtle dark overlay */}
      <ellipse cx="50" cy="57" rx="32" ry="27" fill="rgba(0,0,0,0.12)"/>

      {/* ── Lightning bolt (forehead brand mark) ── */}
      <path
        id={G.bolt}
        d="M 54 15 L 46 30 L 52 30 L 46 42 L 58 27 L 52 27 Z"
        fill="white"
        opacity="0.87"
        filter={`url(#${G.glow})`}
      />

      {/* ── Eyebrows — angled inward for focused/determined look ── */}
      <path d="M 17 37 Q 28 32 40 37"
        stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75"/>
      <path d="M 60 37 Q 72 32 83 37"
        stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75"/>

      {/* ── Eyes ── */}
      <g id={G.eyes}>
        {/* Left eye — white sclera + gradient iris + dark pupil + highlight */}
        <rect x="15" y="41" width="28" height="13" rx="6.5" fill="white" opacity="0.96"/>
        <rect x="17" y="43" width="14" height="9"  rx="4.5" fill={`url(#${G.iris})`}/>
        <circle cx="24"  cy="47.5" r="3.6" fill="#0e0a1a"/>
        <circle cx="26.5" cy="45.2" r="1.7" fill="white" opacity="0.92"/>
        <circle cx="22"  cy="49"   r="0.9" fill="white" opacity="0.45"/>

        {/* Right eye */}
        <rect x="57" y="41" width="28" height="13" rx="6.5" fill="white" opacity="0.96"/>
        <rect x="69" y="43" width="14" height="9"  rx="4.5" fill={`url(#${G.iris})`}/>
        <circle cx="76"  cy="47.5" r="3.6" fill="#0e0a1a"/>
        <circle cx="78.5" cy="45.2" r="1.7" fill="white" opacity="0.92"/>
        <circle cx="74"  cy="49"   r="0.9" fill="white" opacity="0.45"/>
      </g>

      {/* ── Mouth — confident smile ── */}
      <path
        d="M 37 67 Q 50 80 63 67"
        stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.85"
      />

      {/* ── Tech circuit side accents ── */}
      <circle cx="8"  cy="50" r="2.2" fill="white" opacity="0.32"/>
      <circle cx="4"  cy="50" r="1.3" fill="white" opacity="0.18"/>
      <line x1="10.5" y1="50" x2="14" y2="50" stroke="white" strokeWidth="1.3" opacity="0.28"/>

      <circle cx="92" cy="50" r="2.2" fill="white" opacity="0.32"/>
      <circle cx="96" cy="50" r="1.3" fill="white" opacity="0.18"/>
      <line x1="86"  y1="50" x2="89.5" y2="50" stroke="white" strokeWidth="1.3" opacity="0.28"/>

      {/* Bottom chin accent */}
      <line x1="43" y1="87" x2="57" y2="87"
        stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.32"/>
      <circle cx="50" cy="87" r="1.6" fill="white" opacity="0.36"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   AIWordmark — logo icon + "EntrenaConIA" text side by side
   ────────────────────────────────────────────────────────── */

export interface AIWordmarkProps {
  size?: number;          // icon size (text scales proportionally)
  animated?: boolean;
  className?: string;
}

export function AIWordmark({ size = 36, animated = false, className = '' }: AIWordmarkProps) {
  const fontSize = Math.max(12, Math.round(size * 0.48));
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ flexShrink: 0 }}
    >
      <AILogo size={size} animated={animated}/>
      <span className="font-bold leading-none whitespace-nowrap" style={{ fontSize }}>
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
