'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark

    Concept: ECG / heartbeat line — universal symbol of life, health
    and human warmth. The pulse flows through a gradient purple→cyan.

    Design rationale
    ─────────────────
    ● ECG line = heartbeat = life = closeness to the person
    ● Gradient flows left→right as the pulse travels (purple → cyan)
    ● Single continuous stroke = simplicity, confidence
    ● Round caps & joins = friendly, human, not corporate
    ● Pulsing dot at end = AI "alive and listening"
    ● Dark container (#0c0c14) = premium, high-contrast

    Path anatomy (100×100 viewBox)
    ────────────────────────────────
    Baseline: y = 50 (horizontal centre)
    Left flat:    M 10,50 → L 28,50
    QRS peak:     L 38,20          (30px above baseline — R wave)
    QRS trough:   L 46,74          (24px below baseline — S wave)
    Return:       L 56,50
    T-wave flat:  L 64,50
    T-wave peak:  L 69,37 L 74,50  (13px above baseline)
    Right flat:   L 90,50

    Gradient spans x=10→90 in userSpace, so the line starts purple
    and ends cyan as the pulse travels right.
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
    line: `ecl${u}`,
    dot:  `ecd${u}`,
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
      {/* ── Heartbeat animation ── */}
      {animated && (
        <style>{`
          @keyframes hb${u}{
            0%,100%{ opacity:1 }
            12%    { opacity:0.55 }
            28%    { opacity:1 }
          }
          @keyframes hbdot${u}{
            0%,100%{ r:3.5; opacity:1 }
            12%    { r:6;   opacity:0.55 }
            28%    { r:3.5; opacity:1 }
          }
          #${ids.line}{ animation:hb${u} 1.3s ease-out infinite }
          #${ids.dot} { animation:hbdot${u} 1.3s ease-out infinite }
        `}</style>
      )}

      <defs>
        {/* Horizontal gradient spanning the whole pulse path */}
        <linearGradient
          id={ids.grad}
          x1="10" y1="0" x2="90" y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#6c5ce7"/>
          <stop offset="100%" stopColor="#00d2ff"/>
        </linearGradient>

        {/* Top-left glass sheen */}
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

      {/* ── Container: near-black rounded square ── */}
      <rect x="0" y="0" width="100" height="100" rx="20" fill="#0c0c14"/>
      {/* Glass sheen */}
      <rect x="0" y="0" width="100" height="100" rx="20" fill={`url(#${ids.hl})`}/>
      {/* Subtle inner edge */}
      <rect
        x="0.75" y="0.75" width="98.5" height="98.5" rx="19.5"
        stroke="white" strokeOpacity="0.06" strokeWidth="1.5" fill="none"
      />

      {/* ── ECG / heartbeat line ── */}
      <path
        id={ids.line}
        d="M 10 50 L 28 50 L 38 20 L 46 74 L 56 50 L 64 50 L 69 37 L 74 50 L 90 50"
        stroke={`url(#${ids.grad})`}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Pulsing dot — AI alive at the end of the line ── */}
      <circle
        id={ids.dot}
        cx="90" cy="50" r="3.5"
        fill="#00d2ff"
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
