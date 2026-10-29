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
  // Path refs for the 4 layered fiber-optic loom threads
  const path1RailRef = useRef<SVGPathElement | null>(null);
  const path1GlowRef = useRef<SVGPathElement | null>(null);
  const path1BaseRef = useRef<SVGPathElement | null>(null);

  const path2GlowRef = useRef<SVGPathElement | null>(null);
  const path2BaseRef = useRef<SVGPathElement | null>(null);

  const path3GlowRef = useRef<SVGPathElement | null>(null);
  const path3BaseRef = useRef<SVGPathElement | null>(null);

  const path4GlowRef = useRef<SVGPathElement | null>(null);
  const path4BaseRef = useRef<SVGPathElement | null>(null);

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

      // Dreamy, laggy mouse: responds slowly like silk pulled by air
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;
      const mY = (mouseY - 0.5) * 45;
      const mX = (mouseX - 0.5) * 28;

      // ── THREAD 1: Primary sweeping S-curve (lower-left to upper-right) ──
      const t1_startY = 618 + Math.sin(t * 0.13) * 14 + Math.cos(t * 0.08) * 8;
      const t1_midX   = 545 + Math.cos(t * 0.11 + 0.6) * 18 + mX * 0.25;
      const t1_midY   = 390 + Math.sin(t * 0.17 + 1.1) * 48 + Math.cos(t * 0.09 + 2.4) * 24 + Math.sin(t * 0.23 + 0.4) * 12 + mY * 0.45;
      const t1_endX   = 1220 + Math.cos(t * 0.10) * 8;
      const t1_endY   = 185 + Math.sin(t * 0.14 + 2.0) * 16 + Math.cos(t * 0.08 + 0.7) * 9;
      const t1_cp1x   = 180 + Math.cos(t * 0.12 + 0.9) * 22 + mX * 0.15;
      const t1_cp1y   = 588 + Math.sin(t * 0.18 + 0.6) * 36 + Math.cos(t * 0.10 + 1.9) * 20 + mY * 0.25;
      const t1_cp2x   = t1_midX - 178 + Math.sin(t * 0.14 + 2.2) * 18;
      const t1_cp2y   = t1_midY + 78 + Math.cos(t * 0.11 + 1.0) * 24 + Math.sin(t * 0.08 + 2.8) * 14 + mY * 0.35;
      const t1_cp3x   = 968 + Math.cos(t * 0.15 + 1.4) * 24 + mX * 0.5;
      const t1_cp3y   = 252 + Math.sin(t * 0.12 + 0.7) * 30 + Math.cos(t * 0.09 + 2.0) * 16 + mY * 0.55;

      const d1 =
        `M -20 ${t1_startY.toFixed(1)} ` +
        `C ${t1_cp1x.toFixed(1)} ${t1_cp1y.toFixed(1)}, ` +
        `${t1_cp2x.toFixed(1)} ${t1_cp2y.toFixed(1)}, ` +
        `${t1_midX.toFixed(1)} ${t1_midY.toFixed(1)} ` +
        `S ${t1_cp3x.toFixed(1)} ${t1_cp3y.toFixed(1)}, ` +
        `${t1_endX.toFixed(1)} ${t1_endY.toFixed(1)}`;

      if (path1RailRef.current) path1RailRef.current.setAttribute('d', d1);
      if (path1GlowRef.current) path1GlowRef.current.setAttribute('d', d1);
      if (path1BaseRef.current) path1BaseRef.current.setAttribute('d', d1);

      // ── THREAD 2: Upper flowing ribbon (mid-left floating high & across) ──
      const t2_startY = 330 + Math.sin(t * 0.15 + 1.4) * 22 + Math.cos(t * 0.09 + 0.8) * 12;
      const t2_cp1x   = 240 + Math.cos(t * 0.13 + 2.1) * 26 + mX * 0.18;
      const t2_cp1y   = 165 + Math.sin(t * 0.19 + 1.8) * 34 + Math.cos(t * 0.07 + 0.5) * 18 + mY * 0.22;
      const t2_midX   = 590 + Math.sin(t * 0.10 + 2.8) * 24 + mX * 0.30;
      const t2_midY   = 215 + Math.cos(t * 0.16 + 0.9) * 36 + Math.sin(t * 0.22 + 2.3) * 16 + mY * 0.38;
      const t2_cp2x   = t2_midX - 160 + Math.cos(t * 0.12 + 1.6) * 20;
      const t2_cp2y   = t2_midY - 45 + Math.sin(t * 0.14 + 0.7) * 22 + mY * 0.32;
      const t2_cp3x   = 920 + Math.cos(t * 0.17 + 0.5) * 26 + mX * 0.42;
      const t2_cp3y   = 275 + Math.sin(t * 0.11 + 2.5) * 30 + Math.cos(t * 0.18 + 1.2) * 14 + mY * 0.48;
      const t2_endX   = 1220 + Math.sin(t * 0.08 + 1.9) * 10;
      const t2_endY   = 120 + Math.cos(t * 0.13 + 3.1) * 20 + Math.sin(t * 0.09 + 1.5) * 12;

      const d2 =
        `M -20 ${t2_startY.toFixed(1)} ` +
        `C ${t2_cp1x.toFixed(1)} ${t2_cp1y.toFixed(1)}, ` +
        `${t2_cp2x.toFixed(1)} ${t2_cp2y.toFixed(1)}, ` +
        `${t2_midX.toFixed(1)} ${t2_midY.toFixed(1)} ` +
        `S ${t2_cp3x.toFixed(1)} ${t2_cp3y.toFixed(1)}, ` +
        `${t2_endX.toFixed(1)} ${t2_endY.toFixed(1)}`;

      if (path2GlowRef.current) path2GlowRef.current.setAttribute('d', d2);
      if (path2BaseRef.current) path2BaseRef.current.setAttribute('d', d2);

      // ── THREAD 3: Lower sweeping weave (glides across bottom-center) ──
      const t3_startY = 475 + Math.sin(t * 0.11 + 2.7) * 18 + Math.cos(t * 0.16 + 1.3) * 12;
      const t3_cp1x   = 280 + Math.cos(t * 0.18 + 0.4) * 28 + mX * 0.16;
      const t3_cp1y   = 535 + Math.sin(t * 0.12 + 3.1) * 32 + Math.cos(t * 0.14 + 2.2) * 16 + mY * 0.28;
      const t3_midX   = 685 + Math.cos(t * 0.14 + 1.7) * 24 + mX * 0.32;
      const t3_midY   = 515 + Math.sin(t * 0.16 + 2.6) * 34 + Math.cos(t * 0.08 + 1.2) * 20 + mY * 0.40;
      const t3_cp2x   = t3_midX - 190 + Math.sin(t * 0.15 + 1.1) * 22;
      const t3_cp2y   = t3_midY + 45 + Math.cos(t * 0.10 + 2.0) * 24 + mY * 0.35;
      const t3_cp3x   = 995 + Math.sin(t * 0.13 + 0.8) * 28 + mX * 0.46;
      const t3_cp3y   = 445 + Math.cos(t * 0.15 + 1.9) * 28 + Math.sin(t * 0.20 + 0.6) * 14 + mY * 0.50;
      const t3_endX   = 1220 + Math.cos(t * 0.11 + 2.4) * 10;
      const t3_endY   = 435 + Math.sin(t * 0.12 + 1.7) * 18 + Math.cos(t * 0.17 + 0.4) * 10;

      const d3 =
        `M -20 ${t3_startY.toFixed(1)} ` +
        `C ${t3_cp1x.toFixed(1)} ${t3_cp1y.toFixed(1)}, ` +
        `${t3_cp2x.toFixed(1)} ${t3_cp2y.toFixed(1)}, ` +
        `${t3_midX.toFixed(1)} ${t3_midY.toFixed(1)} ` +
        `S ${t3_cp3x.toFixed(1)} ${t3_cp3y.toFixed(1)}, ` +
        `${t3_endX.toFixed(1)} ${t3_endY.toFixed(1)}`;

      if (path3GlowRef.current) path3GlowRef.current.setAttribute('d', d3);
      if (path3BaseRef.current) path3BaseRef.current.setAttribute('d', d3);

      // ── THREAD 4: Counter-curve ambient thread (upper-left dipping down) ──
      const t4_startY = 205 + Math.sin(t * 0.14 + 3.6) * 16 + Math.cos(t * 0.09 + 2.2) * 10;
      const t4_cp1x   = 210 + Math.cos(t * 0.19 + 2.5) * 24 + mX * 0.14;
      const t4_cp1y   = 295 + Math.sin(t * 0.11 + 0.7) * 30 + Math.cos(t * 0.15 + 3.0) * 18 + mY * 0.24;
      const t4_midX   = 645 + Math.cos(t * 0.16 + 1.2) * 26 + mX * 0.34;
      const t4_midY   = 355 + Math.sin(t * 0.15 + 0.5) * 34 + Math.cos(t * 0.11 + 3.4) * 18 + mY * 0.38;
      const t4_cp2x   = t4_midX - 180 + Math.sin(t * 0.13 + 3.2) * 22;
      const t4_cp2y   = t4_midY + 30 + Math.cos(t * 0.17 + 2.1) * 24 + mY * 0.32;
      const t4_cp3x   = 945 + Math.sin(t * 0.12 + 2.1) * 26 + mX * 0.44;
      const t4_cp3y   = 305 + Math.cos(t * 0.16 + 2.9) * 30 + Math.sin(t * 0.21 + 1.1) * 14 + mY * 0.46;
      const t4_endX   = 1220 + Math.cos(t * 0.14 + 1.1) * 8;
      const t4_endY   = 295 + Math.sin(t * 0.13 + 2.4) * 20 + Math.cos(t * 0.08 + 1.0) * 12;

      const d4 =
        `M -20 ${t4_startY.toFixed(1)} ` +
        `C ${t4_cp1x.toFixed(1)} ${t4_cp1y.toFixed(1)}, ` +
        `${t4_cp2x.toFixed(1)} ${t4_cp2y.toFixed(1)}, ` +
        `${t4_midX.toFixed(1)} ${t4_midY.toFixed(1)} ` +
        `S ${t4_cp3x.toFixed(1)} ${t4_cp3y.toFixed(1)}, ` +
        `${t4_endX.toFixed(1)} ${t4_endY.toFixed(1)}`;

      if (path4GlowRef.current) path4GlowRef.current.setAttribute('d', d4);
      if (path4BaseRef.current) path4BaseRef.current.setAttribute('d', d4);

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

        {/* ── Multi-Thread Loom System (4 randomly flowing threads) ── */}
        <svg
          className="thread"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Thread 1 (Primary): Rail, Main, Glow */}
            <linearGradient id="thread-gradient-rail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--thread-rail-color)" stopOpacity="0.10" />
              <stop offset="50%"  stopColor="var(--thread-color-2)"    stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--thread-rail-color)" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="thread-gradient-main" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--thread-color-1)" stopOpacity="0.40" />
              <stop offset="35%"  stopColor="var(--thread-color-2)" stopOpacity="0.75" />
              <stop offset="70%"  stopColor="var(--thread-color-1)" stopOpacity="0.60" />
              <stop offset="100%" stopColor="var(--thread-color-2)" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="thread-gradient-glow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--thread-glow-color)" stopOpacity="0.00" />
              <stop offset="40%"  stopColor="var(--thread-glow-color)" stopOpacity="0.55" />
              <stop offset="70%"  stopColor="var(--thread-color-2)"    stopOpacity="0.40" />
              <stop offset="100%" stopColor="var(--thread-glow-color)" stopOpacity="0.10" />
            </linearGradient>

            {/* Thread 2 (Upper flowing): Main, Glow */}
            <linearGradient id="thread-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="var(--thread-color-2)" stopOpacity="0.30" />
              <stop offset="40%"  stopColor="var(--thread-color-1)" stopOpacity="0.70" />
              <stop offset="75%"  stopColor="var(--thread-color-3)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--thread-color-2)" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="thread-gradient-glow-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="var(--thread-glow-color)" stopOpacity="0.00" />
              <stop offset="45%"  stopColor="var(--thread-glow-color)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--thread-glow-color)" stopOpacity="0.05" />
            </linearGradient>

            {/* Thread 3 (Lower weave): Main, Glow */}
            <linearGradient id="thread-gradient-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--thread-color-1)" stopOpacity="0.35" />
              <stop offset="40%"  stopColor="var(--thread-color-3)" stopOpacity="0.65" />
              <stop offset="75%"  stopColor="var(--thread-color-2)" stopOpacity="0.50" />
              <stop offset="100%" stopColor="var(--thread-color-1)" stopOpacity="0.30" />
            </linearGradient>

            <linearGradient id="thread-gradient-glow-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--thread-glow-color)" stopOpacity="0.00" />
              <stop offset="50%"  stopColor="var(--thread-glow-color)" stopOpacity="0.40" />
              <stop offset="100%" stopColor="var(--thread-glow-color)" stopOpacity="0.05" />
            </linearGradient>

            {/* Thread 4 (Counter-weave): Main, Glow */}
            <linearGradient id="thread-gradient-4" x1="0%" y1="30%" x2="100%" y2="70%">
              <stop offset="0%"   stopColor="var(--thread-color-3)" stopOpacity="0.30" />
              <stop offset="45%"  stopColor="var(--thread-color-2)" stopOpacity="0.60" />
              <stop offset="80%"  stopColor="var(--thread-color-1)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--thread-color-3)" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="thread-gradient-glow-4" x1="0%" y1="30%" x2="100%" y2="70%">
              <stop offset="0%"   stopColor="var(--thread-glow-color)" stopOpacity="0.00" />
              <stop offset="50%"  stopColor="var(--thread-glow-color)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--thread-glow-color)" stopOpacity="0.05" />
            </linearGradient>

            {/* Signal: bright laser core */}
            <linearGradient id="thread-gradient-signal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#FFFFFF"                 stopOpacity="0.00" />
              <stop offset="20%"  stopColor="var(--thread-color-2)"   stopOpacity="0.90" />
              <stop offset="55%"  stopColor="#FFFFFF"                 stopOpacity="1.00" />
              <stop offset="80%"  stopColor="var(--thread-color-1)"   stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF"                 stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* ── Thread 4 (Ambient backdrop) ── */}
          <path
            ref={path4GlowRef}
            className="thread-glow-path-4"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 205 C 210 295, 465 385, 645 355 S 945 305, 1220 295"
          />
          <path
            ref={path4BaseRef}
            className="thread-base-4"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 205 C 210 295, 465 385, 645 355 S 945 305, 1220 295"
          />

          {/* ── Thread 3 (Lower weave) ── */}
          <path
            ref={path3GlowRef}
            className="thread-glow-path-3"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 475 C 280 535, 495 560, 685 515 S 995 445, 1220 435"
          />
          <path
            ref={path3BaseRef}
            className="thread-base-3"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 475 C 280 535, 495 560, 685 515 S 995 445, 1220 435"
          />

          {/* ── Thread 2 (Upper ribbon) ── */}
          <path
            ref={path2GlowRef}
            className="thread-glow-path-2"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 330 C 240 165, 430 170, 590 215 S 920 275, 1220 120"
          />
          <path
            ref={path2BaseRef}
            className="thread-base-2"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 330 C 240 165, 430 170, 590 215 S 920 275, 1220 120"
          />

          {/* ── Thread 1 (Primary sweeping diagonal) ── */}
          <path
            ref={path1RailRef}
            className="thread-rail"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />
          <path
            ref={path1GlowRef}
            className="thread-glow-path"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />
          <path
            ref={path1BaseRef}
            className="thread-base"
            pathLength="1000"
            vectorEffect="non-scaling-stroke"
            d="M -20 590 C 200 630, 380 540, 560 480 S 900 360, 1040 260 S 1180 190, 1220 185"
          />
        </svg>

        {/* Backdrop for mobile menu within hero */}
        <div
          className={`nav-backdrop${menuOpen ? ' open' : ''}`}
          onClick={onMenuClose}
          aria-hidden="true"
        />

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
                Inquire about our services <span className="dot"><Arrow /></span>
              </a>
              <a className="btn btn-ghost" href="#work">See our work</a>
            </div>
          </div>
          <div className="hero-mark glass">
            <div className="hero-mark-coin">
              {/* Side A: rest state (matches current theme) */}
              <div className="hero-mark-face hero-mark-side-a">
                <Image
                  src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
                  alt="The Foundry Loom monogram"
                  width={360}
                  height={360}
                />
              </div>
              {/* Side B: opposite theme appearance (revealed on hover) */}
              <div className="hero-mark-face hero-mark-side-b">
                <Image
                  src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
                  alt="The Foundry Loom monogram"
                  width={360}
                  height={360}
                />
              </div>
            </div>
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
