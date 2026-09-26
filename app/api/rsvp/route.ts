import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_RE, EVENTS } from '@/app/lib/data';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const eventId = String(body.event ?? '').trim();
  const honeypot = String(body.website ?? '').trim();

  // Reject bots
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Validate
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (!EVENTS.find((ev) => ev.id === eventId)) errors.event = 'Unknown event ID.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const event = EVENTS.find((ev) => ev.id === eventId)!;

  // Log submission (no email transport configured: add Nodemailer/Resend here)
  console.log('[rsvp]', {
    event: event.title,
    name,
    email,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
