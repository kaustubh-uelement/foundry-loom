import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_RE, EVENTS, WEB3FORMS_ACCESS_KEY } from '@/app/lib/data';

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

  // Reject bots silently
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
  const receivedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Log submission
  console.log('[rsvp]', {
    event: event.title,
    name,
    email,
    receivedAt,
  });

  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY;

  if (web3FormsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `New Event RSVP: ${event.title} - ${name} [thefoundryloom.com]`,
          from_name: 'The Foundry Loom RSVP',
          event: event.title,
          event_date: `${event.day} ${event.mon} ${event.year}`,
          event_location: event.where,
          name,
          email,
          replyto: email,
          received_at: `${receivedAt} IST`,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        return NextResponse.json({ ok: true });
      }

      console.error('[rsvp] Web3Forms API error:', result);
      return NextResponse.json(
        { ok: false, error: result.message || 'Failed to process RSVP via Web3Forms.' },
        { status: 500 }
      );
    } catch (err: unknown) {
      console.error('[rsvp] Web3Forms exception:', err);
      return NextResponse.json({ ok: false, error: 'Failed to process RSVP.' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
