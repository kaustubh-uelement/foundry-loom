'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { STATS } from '@/app/lib/data';
import Arrow from './Arrow';
import Nav from './Nav';

interface HeroSectionProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  heroRef: React.RefObject<HTMLElement | null>;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function HeroSection({
  menuOpen,
  onMenuToggle,
  onMenuClose,
  heroRef,
  theme,
  onToggleTheme,
}: HeroSectionProps) {
  const pathBaseRef = useRef<SVGPathElement | null>(null);
  const pathGlowRef = useRef<SVGPathElement | null>(null);
  const pathPulseRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const heroEl = heroRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0.5;
      targetMouseY = 0.5;
    };

    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
      heroEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      // Dreamy, laggy mouse — responds slowly like silk pulled by air
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;
      const mY = (mouseY - 0.5) * 45;
      const mX = (mouseX - 0.5) * 28;

      // ── Start anchor — barely moves ────────────────────────────────────
      const startY = 618
        + Math.sin(t * 0.13) * 14
        + Math.cos(t * 0.08) * 8;

      // ── Mid-point: the S-curve inflection — the thread's heartbeat ─────
      // Three stacked harmonics with irrational ratios → never repeats
      const midX = 545
        + Math.cos(t * 0.11 + 0.6) * 18
        + mX * 0.25;
      const midY = 390
        + Math.sin(t * 0.17 + 1.1) * 50   // dominant slow drift
        + Math.cos(t * 0.09 + 2.4) * 26   // secondary lazy sway
        + Math.sin(t * 0.23 + 0.4) * 12   // fine organic texture
        + mY * 0.45;

      // ── End anchor — drifts slowly in the upper-right ─────────────────
      const endX = 1220
        + Math.cos(t * 0.10) * 8;
      const endY = 185
        + Math.sin(t * 0.14 + 2.0) * 16
        + Math.cos(t * 0.08 + 0.7) * 9;

      // ── CP1: lifts the thread off the start, sets first-half tone ──────
      const cp1x = 180
        + Math.cos(t * 0.12 + 0.9) * 22
        + mX * 0.15;
      const cp1y = 588
        + Math.sin(t * 0.18 + 0.6) * 38
        + Math.cos(t * 0.10 + 1.9) * 20
        + mY * 0.25;

      // ── CP2: tangent INTO the midpoint — also defines the S reflection ─
      // Offset below-and-left of mid so the SVG S command reflects it
      // above-and-right → creating the inflection that makes the S-curve
      const cp2x = midX - 178
        + Math.sin(t * 0.14 + 2.2) * 18;
      const cp2y = midY + 78
        + Math.cos(t * 0.11 + 1.0) * 24
        + Math.sin(t * 0.08 + 2.8) * 14
        + mY * 0.35;

      // ── CP3: explicit control point for the S segment ─────────────────
      const cp3x = 968
        + Math.cos(t * 0.15 + 1.4) * 24
        + mX * 0.5;
      const cp3y = 252
        + Math.sin(t * 0.12 + 0.7) * 30
        + Math.cos(t * 0.09 + 2.0) * 16
        + mY * 0.55;

      // M start → C cp1 cp2 mid → S cp3 end
      // The S command auto-mirrors cp2 around mid → C1 continuity, zero kinks
      const d =
        `M -20 ${startY.toFixed(1)} ` +
        `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ` +
        `${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ` +
        `${midX.toFixed(1)} ${midY.toFixed(1)} ` +
        `S ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ` +
        `${endX.toFixed(1)} ${endY.toFixed(1)}`;

      if (pathBaseRef.current) pathBaseRef.current.setAttribute('d', d);
      if (pathGlowRef.current) pathGlowRef.current.setAttribute('d', d);
      if (pathPulseRef.current) pathPulseRef.current.setAttribute('d', d);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [heroRef]);

  return (
    <div className="wrap hero-shell">
      {/* Hidden SVG filter definition for liquid glass effect */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <filter id="glass-filter-hero" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65 0.75"
              numOctaves="1"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur stdDeviation="18" in="displaced" result="blurred" />
          </filter>
        </defs>
      </svg>

      <header className="hero" id="top" ref={heroRef}>
        {/* Glass surface filter overlay — applies the SVG filter as backdrop */}
        <svg
          className="glass-surface__filter"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="glass-filter-hero-surface" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65 0.75" numOctaves="1" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur stdDeviation="18" in="displaced" result="blurred" />
          </filter>
        </svg>
        <div className="weave" aria-hidden="true" />
        <svg
          className="thread"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="thread-gradient-main" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--pink)" stopOpacity="0.4" />
              <stop offset="35%" stopColor="var(--peach)" stopOpacity="0.8" />
              <stop offset="70%" stopColor="var(--pink)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--peach)" stopOpacity="0.5" />
            </linearGradient>
            <filter id="thread-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathGlowRef}
            className="thread-glow-path"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 C 740 420, 900 360, 1040 260 C 1180 190, 1180 200, 1220 210"
          />
          <path
            ref={pathBaseRef}
            className="thread-base"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 C 740 420, 900 360, 1040 260 C 1180 190, 1180 200, 1220 210"
          />
          <path
            ref={pathPulseRef}
            className="thread-pulse"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 C 740 420, 900 360, 1040 260 C 1180 190, 1180 200, 1220 210"
          />
        </svg>

        <Nav
          menuOpen={menuOpen}
          onMenuToggle={onMenuToggle}
          onMenuClose={onMenuClose}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <div className="hero-body">
          <div>
            <h1>
              Forged in substance.<em>Woven into influence.</em>
            </h1>
            <p className="intro">
              We build the personal brands of founders, investors and domain experts, so the people who matter know what you know.
            </p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#contact">
                Contact us <span className="dot"><Arrow /></span>
              </a>
              <a className="btn btn-ghost" href="#work">See our work</a>
            </div>
          </div>
          <div className="hero-mark glass">
            <Image src="/logo-light.png" alt="The Foundry Loom monogram" width={360} height={360} />
          </div>
        </div>

        <div className="stats glass">
          {STATS.map(([value, label]) => (
            <div className="stat" key={label}>
              <b>{value}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}
