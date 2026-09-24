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
  // Five path refs for the layered fiber-optic thread system
  const pathRailRef   = useRef<SVGPathElement | null>(null); // ghost rail (dashed)
  const pathGlowRef   = useRef<SVGPathElement | null>(null); // wide soft glow
  const pathBaseRef   = useRef<SVGPathElement | null>(null); // main filament
  const pathPulseRef  = useRef<SVGPathElement | null>(null); // primary laser signal
  const pathPulse2Ref = useRef<SVGPathElement | null>(null); // secondary laser signal

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
      const d =
        `M -20 ${startY.toFixed(1)} ` +
        `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ` +
        `${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ` +
        `${midX.toFixed(1)} ${midY.toFixed(1)} ` +
        `S ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ` +
        `${endX.toFixed(1)} ${endY.toFixed(1)}`;

      // All five paths share the same spline — layers differentiate visually
      if (pathRailRef.current)   pathRailRef.current.setAttribute('d', d);
      if (pathGlowRef.current)   pathGlowRef.current.setAttribute('d', d);
      if (pathBaseRef.current)   pathBaseRef.current.setAttribute('d', d);
      if (pathPulseRef.current)  pathPulseRef.current.setAttribute('d', d);
      if (pathPulse2Ref.current) pathPulse2Ref.current.setAttribute('d', d);

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
      <header className="hero" id="top" ref={heroRef}>
        <div className="weave" aria-hidden="true" />

        {/* ── Sci-fi fiber-optic thread system ───────────────────────── */}
        <svg
          className="thread"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Rail — barely-there dashed track ghost */}
            <linearGradient id="thread-gradient-rail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--pink)"  stopOpacity="0.08" />
              <stop offset="50%"  stopColor="var(--peach)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--pink)"  stopOpacity="0.06" />
            </linearGradient>

            {/* Main filament — the resting fiber */}
            <linearGradient id="thread-gradient-main" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--pink)"  stopOpacity="0.30" />
              <stop offset="30%"  stopColor="var(--peach)" stopOpacity="0.70" />
              <stop offset="65%"  stopColor="var(--pink)"  stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--peach)" stopOpacity="0.40" />
            </linearGradient>

            {/* Glow envelope — wide blurred halo under the filament */}
            <linearGradient id="thread-gradient-glow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--pink)"  stopOpacity="0.00" />
              <stop offset="40%"  stopColor="var(--pink)"  stopOpacity="0.60" />
              <stop offset="70%"  stopColor="var(--peach)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--peach)" stopOpacity="0.10" />
            </linearGradient>

            {/* Signal — bright peach-white laser core */}
            <linearGradient id="thread-gradient-signal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#FFFFFF"      stopOpacity="0.00" />
              <stop offset="20%"  stopColor="var(--peach)" stopOpacity="0.90" />
              <stop offset="55%"  stopColor="#FFFFFF"      stopOpacity="1.00" />
              <stop offset="80%"  stopColor="var(--pink)"  stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF"      stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Layer 1 — ghost rail dashes */}
          <path
            ref={pathRailRef}
            className="thread-rail"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />

          {/* Layer 2 — wide soft glow (blurred) */}
          <path
            ref={pathGlowRef}
            className="thread-glow-path"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />

          {/* Layer 3 — main filament (crisp) */}
          <path
            ref={pathBaseRef}
            className="thread-base"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />

          {/* Layer 4 — primary laser pulse */}
          <path
            ref={pathPulseRef}
            className="thread-pulse"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />

          {/* Layer 5 — secondary laser (smaller, delayed) */}
          <path
            ref={pathPulse2Ref}
            className="thread-pulse2"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
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
            <Image
              src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
              alt="The Foundry Loom monogram"
              width={360}
              height={360}
            />
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
