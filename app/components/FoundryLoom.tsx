'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Event } from '@/app/lib/types';
import StickyNav from './StickyNav';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import WhoSection from './WhoSection';
import ServicesSection from './ServicesSection';
import WorkSection from './WorkSection';
import RoomsSection from './RoomsSection';
import ProcessSection from './ProcessSection';
import EventsSection from './EventsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import BackToTop from './BackToTop';
import RsvpModal from './RsvpModal';

type Theme = 'light' | 'dark';

export default function FoundryLoom() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [stickyOn, setStickyOn] = useState(false);
  const [rsvpFor, setRsvpFor] = useState<Event | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // Restore theme from localStorage on mount (defaults to 'dark', no OS theme detection)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tfl-theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      } else {
        setTheme('dark');
      }
    } catch {
      // localStorage may be unavailable in some environments
    }
  }, []);

  // IntersectionObserver for sticky nav
  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setStickyOn(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((curr) => {
      const next: Theme = curr === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('tfl-theme', next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const openRsvp = useCallback((ev: Event) => {
    setRsvpFor(ev);
  }, []);

  const closeRsvp = useCallback(() => {
    setRsvpFor(null);
  }, []);

  return (
    <div className="tfl" data-theme={theme}>
      <StickyNav show={stickyOn} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <div className="hero-to-services-grid">
          <HeroSection
            menuOpen={menuOpen}
            onMenuToggle={() => setMenuOpen((o) => !o)}
            onMenuClose={() => setMenuOpen(false)}
            heroRef={heroRef}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <AboutSection />
          <WhoSection />
          <ServicesSection />
        </div>

        <WorkSection tab={tab} onTabChange={setTab} />
        <RoomsSection />
        <ProcessSection />
        <EventsSection onRsvp={openRsvp} />
        <ContactSection />
      </main>

      <Footer onToggleTheme={toggleTheme} theme={theme} />

      <BackToTop show={stickyOn} />

      <RsvpModal event={rsvpFor} onClose={closeRsvp} />
    </div>
  );
}
