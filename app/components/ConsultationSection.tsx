'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/app/lib/data';
import Kicker from './Kicker';

interface ConsultationCardItem {
  number: string;
  badge: string;
  title: string;
  description: string;
  takeaway: string;
}

const CONSULTATION_CARDS: ConsultationCardItem[] = [
  {
    number: '01 / 03',
    badge: 'AUDIT',
    title: 'Your Profile, Reviewed',
    description:
      "We'll look at your headline, bio and positioning. Find out what's working, what's missing and what needs to change.",
    takeaway: 'A clear profile improvement checklist.',
  },
  {
    number: '02 / 03',
    badge: 'CONTENT',
    title: 'Three Posts You Should Be Writing',
    description:
      "We'll find three content angles from your experience, industry and opinions that give people a reason to follow you.",
    takeaway: 'Three personalised post ideas.',
  },
  {
    number: '03 / 03',
    badge: 'POSITIONING',
    title: 'The People You Want to Reach',
    description:
      "Investors, potential clients, founders or industry peers. We'll discuss who matters to your business and how your content can reach them.",
    takeaway: 'A clearer direction for your LinkedIn presence.',
  },
];

export default function ConsultationSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number[]>(() =>
    CONSULTATION_CARDS.map(() => 0)
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      // On mobile screens (< 768px), disable 3D stacking scale for clean native vertical flow
      if (window.innerWidth < 768) {
        setProgress(CONSULTATION_CARDS.map(() => 0));
        return;
      }

      const cards = Array.from(wrap.querySelectorAll<HTMLElement>('[data-stack-item]'));
      const next = cards.map((card, i) => {
        let totalCover = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const nextCard = cards[j];
          const nextRect = nextCard.getBoundingClientRect();
          const nextPinTop = parseFloat(getComputedStyle(nextCard).top) || 0;
          const dist = nextRect.top - nextPinTop;
          const range = nextRect.height || 340;
          if (dist <= 0) {
            totalCover += 1;
          } else if (dist < range) {
            totalCover += 1 - dist / range;
            break;
          } else {
            break;
          }
        }
        return totalCover;
      });
      setProgress(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="consultation" className="consultation-section">
      <div className="wrap">
        <div className="consultation-header">
          <Kicker>1-on-1 Consultation</Kicker>
          <h2>30 Minutes. Let&apos;s See What Your Profile Is Missing.</h2>
          <p className="lede">
            You&apos;ve built the experience. Let&apos;s see whether your LinkedIn profile reflects it.
          </p>
        </div>

        {/* Stacking scroll container */}
        <div ref={wrapRef} className="consultation-stack-container">
          {CONSULTATION_CARDS.map((card, index) => {
            const p = progress[index] || 0;
            // Subtle depth effect: cards underneath shrink slightly and dim
            const scale = 1 - p * 0.035;
            const opacity = Math.max(0.4, 1 - p * 0.15);

            return (
              <div
                key={card.number}
                data-stack-item=""
                className={`consultation-stack-item step-${index}`}
                style={{
                  top: `calc(84px + ${index * 24}px)`,
                  zIndex: index + 1,
                }}
              >
                <div
                  className={`consultation-card step-${index}`}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    opacity,
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  }}
                >
                  {/* Top Specular Edge Glow */}
                  <div className="consultation-card-top-glow" aria-hidden="true" />

                  {/* Ambient Radial Spotlight */}
                  <div className="consultation-card-spotlight" aria-hidden="true" />

                  {/* Left Column: Index, Divider & Title */}
                  <div className="consultation-col-left">
                    <div className="consultation-meta">
                      <span className="consultation-index">{card.number}</span>
                      <span className="consultation-pill">{card.badge}</span>
                    </div>
                    <div className="consultation-card-divider" />
                    <h3 className="consultation-card-title">{card.title}</h3>
                  </div>

                  {/* Right Column: Description Body & Takeaway */}
                  <div className="consultation-col-right">
                    <p className="consultation-desc">{card.description}</p>
                    <div className="consultation-deliverable">
                      <span className="deliverable-label">YOU GET:</span>
                      <span className="deliverable-text">{card.takeaway}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div id="consultation-cta" className="consultation-cta">
          <a
            href={SITE.consultationPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-consultation"
          >
            Book Your 30-Minute Discovery Call ↗
          </a>
        </div>
      </div>
    </section>
  );
}
