'use client';

import { useId } from 'react';

/*  ──────────────────────────────────────────────────────────────────
    EntrenaConIA — brand mark

    Concept: three ascending signal bars with a continuous diagonal
    gradient flowing purple→cyan across all three columns.

    Design rationale
    ─────────────────
    ● Three bars climbing left→right = progress, improvement, levels
    ● Gradient flows across the trio (not bar-by-bar) = unity, one brand
    ● Dark container (#0c0c14) = premium, high-contrast
    ● Round-top bars (rx = half-width) = friendly, not too corporate
    ● When animated: bars bounce like an audio equaliser = AI "listening"

    Proportions (100×100 viewBox, 10px edge padding)
    ─────────────────────────────────────────────────
    Bar width: 17px  |  gap: 10px  |  total span: 17+10+17+10+17 = 71px
    Left edge: 14px  |  Right edge: 14+71 = 85px  (centred, ±0.5px rounding)
    Bar heights: 22 / 44 / 68   (≈ 1 : 2 : 3.09 ratio)
    Bottom align: y = 84

    Bar 1:  x=14, y=62, w=17, h=22   (purple)
    Bar 2:  x=41, y=40, w=17, h=44   (violet)
    Bar 3:  x=68, y=16, w=17, h=68   (cyan)

    Gradient: horizontal, spans x=14→x=85 in userSpace
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
    b1:   `ecb1${u}`,
    b2:   `ecb2${u}`,
    b3:   `ecb3${u}`,
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
      {/* ── Equaliser animation ── */}
      {animated && (
        <style>{`
          @keyframes eq${u}{
            0%,100%{transform:scaleY(1)}
            50%    {transform:scaleY(1.22)}
          }
          #${ids.b1},#${ids.b2},#${ids.b3}{
            transform-box:fill-box;
            transform-origin:center bottom;
          }
          #${ids.b1}{animation:eq${u} 1.25s ease-in-out infinite}
          #${ids.b2}{animation:eq${u} 1.25s ease-in-out .22s infinite}
          #${ids.b3}{animation:eq${u} 1.25s ease-in-out .44s infinite}
        `}</style>
      )}

      <defs>
        {/* Horizontal gradient spanning all 3 bars */}
        <linearGradient
          id={ids.grad}
          x1="14" y1="0" x2="85" y2="0"
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

      {/* ── Bar 1 — left, shortest (purple zone) ── */}
      <rect
        id={ids.b1}
        x="14" y="62" width="17" height="22"
        rx="8.5"
        fill={`url(#${ids.grad})`}
      />

      {/* ── Bar 2 — centre, medium (violet zone) ── */}
      <rect
        id={ids.b2}
        x="41" y="40" width="17" height="44"
        rx="8.5"
        fill={`url(#${ids.grad})`}
      />

      {/* ── Bar 3 — right, tallest (cyan zone) ── */}
      <rect
        id={ids.b3}
        x="68" y="16" width="17" height="68"
        rx="8.5"
        fill={`url(#${ids.grad})`}
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
