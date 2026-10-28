import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_RE, WEB3FORMS_ACCESS_KEY } from '@/app/lib/data';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const company = String(body.company ?? '').trim();
  const role = String(body.role ?? '').trim();
  const channels = Array.isArray(body.channels) ? body.channels.map(String) : [];
  const goal = String(body.goal ?? '').trim();
  const honeypot = String(body.website ?? '').trim();

  // Reject bots silently
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Validate
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (!goal) errors.goal = 'Tell us what you want to be known for.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const receivedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Log submission
  console.log('[enquiry]', {
    name,
    email,
    company,
    role,
    channels,
    goal,
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
          subject: `New Lead Enquiry from ${name} [thefoundryloom.com]`,
          from_name: 'The Foundry Loom Website',
          name,
          email,
          replyto: email,
          company: company || 'Not specified',
          role: role || 'Not specified',
          channels: channels.length > 0 ? channels.join(', ') : 'None',
          goal,
          received_at: `${receivedAt} IST`,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        return NextResponse.json({ ok: true });
      }

      console.error('[enquiry] Web3Forms API error:', result);
      return NextResponse.json(
        { ok: false, error: result.message || 'Failed to submit enquiry via Web3Forms.' },
        { status: 500 }
      );
    } catch (err: unknown) {
      console.error('[enquiry] Web3Forms exception:', err);
      return NextResponse.json({ ok: false, error: 'Failed to send enquiry.' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
