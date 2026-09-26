'use client';

import { useEffect } from 'react';
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
  // Close menu on Escape key press
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMenuClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, onMenuClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className={`nav${menuOpen ? ' menu-open' : ''}`} aria-label="Main">
      <a className="brand" href="#top">
        <Image
          src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
          alt=""
          width={54}
          height={54}
          priority
        />
        <span>The Foundry Loom</span>
      </a>

      <ul className={`navlinks${menuOpen ? ' open' : ''}`} id="tfl-navlinks">
        {NAV.map(([href, label]) => (
          <li key={href}>
            <a href={href} onClick={onMenuClose}>{label}</a>
          </li>
        ))}
        <li className="nav-drawer-cta">
          <a className="btn btn-primary" href="#contact" onClick={onMenuClose}>
            Contact us
          </a>
        </li>
      </ul>

      <div className="nav-right">
        <a
          className="icon-btn"
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Icon name="linkedin" size={19} />
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
