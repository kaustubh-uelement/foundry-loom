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

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const mY = (mouseY - 0.5) * 30;
      const mX = (mouseX - 0.5) * 20;

      // --- Single smooth cubic Bézier (M → C with ONE control-point pair) ---
      // Anchor points that drift very slowly so the overall arc changes organically
      const startY = 595
        + Math.sin(t * 0.31) * 8
        + Math.cos(t * 0.17) * 5;

      const endY = 200
        + Math.sin(t * 0.28 + 1.4) * 10
        + Math.cos(t * 0.19) * 6;

      const endX = 1220
        + Math.cos(t * 0.23) * 6;

      // Control point 1 – pulls the curve up/down near the left quarter
      const cp1x = 370
        + Math.cos(t * 0.22 + 0.8) * 18
        + mX * 0.4;
      const cp1y = 560
        + Math.sin(t * 0.37 + 0.4) * 22
        + Math.cos(t * 0.19 + 2.1) * 12
        + mY * 0.5;

      // Control point 2 – pulls near the right quarter; kept tangentially coherent
      const cp2x = 860
        + Math.sin(t * 0.26 + 1.6) * 18
        + mX * 0.6;
      const cp2y = 340
        + Math.cos(t * 0.33 + 0.9) * 24
        + Math.sin(t * 0.18 + 2.8) * 12
        + mY * 0.7;

      const d =
        `M -20 ${startY.toFixed(1)} ` +
        `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ` +
        `${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ` +
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
