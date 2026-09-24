'use client';

import Image from 'next/image';
import { NAV, SITE } from '@/app/lib/data';
import Icon from './Icon';

import ThemeToggle from './ThemeToggle';

interface NavProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Nav({ menuOpen, onMenuToggle, onMenuClose, theme, onToggleTheme }: NavProps) {
  return (
    <nav className="nav" aria-label="Main">
      <a className="brand" href="#top">
        <Image src="/logo-light.png" alt="" width={54} height={54} priority />
        <span>The Foundry Loom</span>
      </a>

      <ul className={`navlinks${menuOpen ? ' open' : ''}`} id="tfl-navlinks">
        {NAV.map(([href, label]) => (
          <li key={href}>
            <a href={href} onClick={onMenuClose}>{label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <a
          className="icon-btn"
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Icon name="linkedin" size={16} />
        </a>
        <a
          className="icon-btn"
          href={SITE.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <Icon name="youtube" size={17} />
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <a className="btn btn-light cta-top" href="#contact">
          Contact us
        </a>
        <button
          className="icon-btn menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="tfl-navlinks"
          onClick={onMenuToggle}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
