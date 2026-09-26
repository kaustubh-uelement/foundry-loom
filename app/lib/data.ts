import type { Case, Event } from './types';

export const SITE = {
  email: 'ayushi@thefoundryloom.com',
  phone: '+91 88391 39799',
  phoneHref: 'tel:+918839139799',
  address: 'B12, Kalpataru Crest, LBS Marg, Bhandup West, Mumbai 400078',
  linkedin: 'https://www.linkedin.com/company/foundary-loom/posts/?feedView=all',
  youtube: 'https://www.youtube.com',
} as const;

export const NAV: [string, string][] = [
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#work', 'Work'],
  ['#process', 'Process'],
  ['#events', 'Events'],
];

export const STATS: [string, string][] = [
  ['50M+', 'Views generated for clients'],
  ['50+', 'Founders, CXOs and investors served'],
  ['300%+', 'Growth in client reach'],
  ['8', 'Sectors, from Web3 to manufacturing'],
];

export const SERVICES: [string, string, string][] = [
  ['linkedin', 'LinkedIn management', 'Profile positioning, ghostwritten posts, carousels and engagement, written in your voice and approved by you.'],
  ['x', 'X (Twitter)', 'Real-time commentary and threads for markets, Web3 and technology conversations.'],
  ['youtube', 'YouTube', 'Explainers, interviews and shorts that turn expertise into searchable, lasting authority.'],
  ['instagram', 'Instagram', 'Founder stories and behind-the-scenes content for consumer and lifestyle brands.'],
  ['newsletter', 'Newsletter', 'Editorial newsletters that turn your insights into an owned, recurring audience of decision-makers.'],
  ['target', 'Lead generation', 'Turning visibility into pipeline through targeted outreach and inbound capture, measured in meetings booked.'],
];

export const PERSONAS: [string, string, string][] = [
  ['Founders and CEOs', 'The Builder', 'Growth-stage leaders in AI, SaaS, hospitality and consumer brands who want hiring pull and investor visibility.'],
  ['Investors and VCs', 'The Allocator', 'Investors in Web3 and financial markets who want deal flow and credibility with founders and LPs.'],
  ['Domain experts', 'The Specialist', 'Leaders in BFSI, real estate and manufacturing who need authority with institutional audiences.'],
];

export const CASES: Case[] = [
  {
    tab: 'Web3 investor',
    meta: 'Web3, crypto and VC, January to July 2026',
    title: 'Growing a voice in one of LinkedIn\u2019s most crowded niches',
    body: 'A Middle East\u2013based Web3 investor wanted to grow in the right circles and be seen as a credible voice in crypto venture capital. Six months of consistent, thesis-led content compounded month on month, with the steepest gains once posting cadence and topic depth improved in May.',
    m: [['1.14M', 'Impressions in six months'], ['6,625', 'New followers']],
    wide: ['A quarter of engaged readers are founders, co-founders, CEOs or managing directors', 'Reach measured by who is reading, not only how many'],
  },
  {
    tab: 'Cloud kitchen founder',
    meta: 'Hospitality, F&B and cloud kitchens, April to July 2026',
    title: 'Turning operating numbers into credibility',
    body: 'An Indian cloud kitchen founder had deep hands-on experience in unit economics, quick-commerce margins and supply chain. Posts built on those real numbers consistently outperformed generic industry commentary, and follower growth tracked posting consistency week by week.',
    m: [['302K', 'Impressions in three months'], ['2,173', 'New followers']],
    wide: ['12,321 total followers', 'Up 20% on the previous 100 days'],
  },
  {
    tab: 'Digital assets leader',
    meta: 'Web3 and digital assets, February to July 2026',
    title: 'From 200 followers to a published byline',
    body: 'This client started with no public profile in the digital assets space. The brief was to build visibility from a near-zero base that editors, event organisers and podcast hosts would notice, not just other LinkedIn users.',
    m: [['200', 'Followers at the start'], ['1.02M', 'Impressions in six months']],
    wide: ['Article published in Asia Inc 500', 'Third-party credibility that content alone cannot buy'],
  },
  {
    tab: 'BFSI leader',
    meta: 'Banking, financial services and insurance, May to July 2026',
    title: 'Reaching the room that matters in BFSI',
    body: 'In a sector where credibility is earned in the room, not the feed, we translated a BFSI leader\u2019s domain expertise into posts that read as substantive to people who actually work in the industry.',
    m: [['227K', 'Impressions in 59 days'], ['9', 'Global BFSI and advisory firms among top engaged companies']],
    wide: ['JPMorgan Chase, HSBC, Citi, State Street and Morgan Stanley', 'Among the leading employers of engaged readers'],
  },
];

export const LADDER: [string, string][] = [
  ['Substance', 'Content built on your real numbers, theses and lessons.'],
  ['The right audience', 'Decision-makers in your sector, not simply a larger crowd.'],
  ['Recognition', 'Editors, organisers and podcast hosts begin to notice. Our clients have been published in Asia Inc 500 and invited onto leading industry stages.'],
  ['Opportunity', 'Panels, bylines, deals, hires and investor conversations.'],
];

export const STEPS: [string, string][] = [
  ['Discover', 'Deep-dive interviews to find your expertise, goals and the rooms that matter.'],
  ['Forge', 'Positioning, content pillars and a voice guide written for you alone.'],
  ['Weave', 'A weekly content calendar across channels, drafted by us and approved by you.'],
  ['Amplify', 'Engagement, community building, and outreach to editors, hosts and organisers.'],
  ['Measure', 'Monthly reports on reach, audience quality and the opportunities created.'],
];

// Sample sessions: replace with real events.
export const EVENTS: Event[] = [
  { id: 'building-a-founder-brand-on-linkedin', mon: 'OCT', day: '08', year: '2026', title: 'Building a founder brand on LinkedIn', where: 'Online, Zoom · 60 minutes', seats: 40 },
  { id: 'writing-with-numbers', mon: 'OCT', day: '22', year: '2026', title: 'Writing with numbers: content for operators', where: 'Mumbai studio, Bhandup West · 90 minutes', seats: 20 },
  { id: 'from-feed-to-stage', mon: 'NOV', day: '12', year: '2026', title: 'From feed to stage: getting invited to speak', where: 'Online, Zoom · 60 minutes', seats: 40 },
];

export const CHANNELS = ['LinkedIn', 'X', 'YouTube', 'Instagram', 'Newsletter', 'Lead generation'];
export const ROLES = ['Founder or CEO', 'Investor or VC', 'Domain expert or CXO', 'Something else'];
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ICONS: Record<string, string> = {
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.3 22 14.7V21h-4v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21h-4z',
  x: 'M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3zM17.7 20h1.7L7.4 3.9H5.6z',
  youtube: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  newsletter: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  pinterest: 'M12 2C6.5 2 3 5.9 3 10.1c0 2.6 1.4 4.8 3.6 5.6.36.14.55 0 .63-.37l.25-1c.07-.3.04-.4-.2-.66-.52-.62-.85-1.42-.85-2.55 0-3.3 2.46-6.25 6.4-6.25 3.5 0 5.4 2.13 5.4 4.98 0 3.75-1.66 6.9-4.12 6.9-1.36 0-2.38-1.12-2.05-2.5.39-1.65 1.15-3.43 1.15-4.62 0-1.06-.57-1.95-1.75-1.95-1.39 0-2.5 1.44-2.5 3.36 0 1.22.41 2.05.41 2.05l-1.66 7.04c-.49 2.08-.07 4.64-.04 4.9.02.15.21.19.3.07.13-.16 1.75-2.17 2.3-4.18.16-.57.9-3.5.9-3.5.44.84 1.73 1.58 3.1 1.58 4.09 0 6.86-3.73 6.86-8.72C21 5.6 17.8 2 12 2z',
  target: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
};
