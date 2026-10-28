'use client';

import { SITE } from '@/app/lib/data';
import Kicker from './Kicker';

const CONSULTATION_CARDS = [
  {
    number: '01',
    title: 'Your Profile, Reviewed',
    description:
      "We'll look at your headline, bio and positioning. Find out what's working, what's missing and what needs to change.",
    takeaway: 'A clear profile improvement checklist.',
  },
  {
    number: '02',
    title: 'Three Posts You Should Be Writing',
    description:
      "We'll find three content angles from your experience, industry and opinions that give people a reason to follow you.",
    takeaway: 'Three personalised post ideas.',
  },
  {
    number: '03',
    title: 'The People You Want to Reach',
    description:
      "Investors, potential clients, founders or industry peers. We'll discuss who matters to your business and how your content can reach them.",
    takeaway: 'A clearer direction for your LinkedIn presence.',
  },
];

export default function ConsultationSection() {
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

        <div className="consultation-grid">
          {CONSULTATION_CARDS.map((card) => (
            <div key={card.number} className="consultation-card glass">
              <div className="consultation-badge">{card.number}</div>
              <h3>{card.title}</h3>
              <p className="consultation-desc">{card.description}</p>
              <div className="consultation-deliverable">
                <span className="deliverable-label">YOU GET:</span> {card.takeaway}
              </div>
            </div>
          ))}
        </div>

        <div className="consultation-cta">
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
