'use client';

import Image from 'next/image';
import { NAV } from '@/app/lib/data';
import ThemeToggle from './ThemeToggle';

interface StickyNavProps {
  show: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function StickyNav({ show, theme, onToggleTheme }: StickyNavProps) {
  return (
    <div
      className={`sticky${show ? ' show' : ''}`}
      aria-hidden={!show}
    >
      <a
        className="brand"
        href="#top"
        tabIndex={show ? 0 : -1}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <Image
          src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
          alt=""
          width={38}
          height={38}
        />
        <span>The Foundry Loom</span>
      </a>
      <ul>
        {NAV.slice(0, 5).map(([href, label]) => (
          <li key={href}>
            <a href={href} tabIndex={show ? 0 : -1}>{label}</a>
          </li>
        ))}
      </ul>
      <div className="sticky-actions">
        <ThemeToggle
          theme={theme}
          onToggle={onToggleTheme}
          className="sticky-theme-toggle"
          tabIndex={show ? 0 : -1}
        />
        <a
          className="btn btn-primary"
          href="#consultation-cta"
          tabIndex={show ? 0 : -1}
        >
          Book a 30-Min Discovery Call
        </a>
      </div>
    </div>
  );
}
