import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4EEE9' },
    { media: '(prefers-color-scheme: dark)', color: '#160D07' },
  ],
};

export const metadata: Metadata = {
  title: 'The Foundry Loom: Personal Branding for Founders, Investors & Experts',
  description:
    'The Foundry Loom is a Mumbai-based personal branding agency. We build LinkedIn, X, YouTube, Instagram and Newsletter presence for founders, investors and domain experts so the people who matter know what you know.',
  metadataBase: new URL('https://thefoundryloom.com'),
  openGraph: {
    title: 'The Foundry Loom: Forged in substance. Woven into influence.',
    description:
      'We build the personal brands of founders, investors and domain experts across LinkedIn, X, YouTube, Instagram and Newsletter.',
    url: 'https://thefoundryloom.com',
    siteName: 'The Foundry Loom',
    images: [
      {
        url: '/logo-dark.png',
        width: 1200,
        height: 630,
        alt: 'The Foundry Loom',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Foundry Loom',
    description:
      'Personal branding for founders, investors and domain experts: LinkedIn, X, YouTube, Instagram, Newsletter.',
    images: ['/logo-dark.png'],
  },
  keywords: [
    'personal branding',
    'LinkedIn management',
    'content agency',
    'founder branding',
    'thought leadership',
    'Mumbai',
    'India',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
