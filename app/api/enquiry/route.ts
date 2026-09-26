import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_RE } from '@/app/lib/data';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const goal = String(body.goal ?? '').trim();
  const honeypot = String(body.website ?? '').trim();

  // Reject bots
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

  // Log submission (no email transport configured: add Nodemailer/Resend here)
  console.log('[enquiry]', {
    name,
    email,
    company: String(body.company ?? '').trim(),
    role: body.role,
    channels: body.channels,
    goal,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
