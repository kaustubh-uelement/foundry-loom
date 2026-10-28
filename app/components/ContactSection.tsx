'use client';

import { useState } from 'react';
import { SITE, CHANNELS, ROLES, EMAIL_RE, WEB3FORMS_ACCESS_KEY } from '@/app/lib/data';
import type { FormState, EnquiryPayload } from '@/app/lib/types';
import Arrow from './Arrow';
import Kicker from './Kicker';

async function postOrMail(
  endpoint: string,
  payload: Record<string, unknown>,
  subject: string,
  body: string,
): Promise<{ ok: boolean; mailed?: boolean; errors?: Record<string, string>; message?: string }> {
  const web3Key = WEB3FORMS_ACCESS_KEY;

  // Direct client-side submission to Web3Forms using FormData (guaranteed CORS compatibility)
  if (web3Key) {
    try {
      const fd = new FormData();
      fd.append('access_key', web3Key);
      fd.append('subject', subject);
      fd.append('from_name', 'The Foundry Loom Website');
      fd.append('replyto', String(payload.email || ''));
      fd.append('name', String(payload.name || ''));
      fd.append('email', String(payload.email || ''));
      fd.append('company', String(payload.company || 'Not specified'));
      fd.append('role', String(payload.role || 'Not specified'));
      fd.append(
        'channels',
        Array.isArray(payload.channels) ? payload.channels.join(', ') : String(payload.channels || 'None'),
      );
      fd.append('goal', String(payload.goal || ''));
      fd.append(
        'received_at',
        `${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
      );

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        return { ok: true };
      }
      return { ok: false, message: json.message || 'Submission failed. Please try again.' };
    } catch {
      /* Fallback to endpoint or mailto */
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const json = await res.json().catch(() => ({}));
    if (json?.errors) return { ok: false, errors: json.errors };
    if (json?.error) return { ok: false, message: json.error };
  } catch {
    /* no backend: fall through to email */
  }
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, mailed: true };
}

function noteClass(s: FormState) {
  return `form-note${s.kind === 'ok' ? ' ok' : s.kind === 'err' ? ' err' : ''}`;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ kind: 'idle', msg: '' });

  async function submitEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const data: EnquiryPayload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim(),
      role: String(fd.get('role') ?? ''),
      channels: fd.getAll('channels') as string[],
      goal: String(fd.get('goal') ?? '').trim(),
      website: fd.get('website') as string | null,
    };

    if (!data.name) return setForm({ kind: 'err', msg: 'Add your name so we know who to reply to.' });
    if (!EMAIL_RE.test(data.email)) return setForm({ kind: 'err', msg: 'Enter a valid email address, like you@company.com.' });
    if (!data.goal) return setForm({ kind: 'err', msg: 'Tell us in a line what you want to be known for.' });

    setForm({ kind: 'sending', msg: '' });

    const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nRole: ${data.role}\nChannels: ${data.channels.join(', ')}\n\nWhat I want to be known for:\n${data.goal}`;
    const r = await postOrMail('/api/enquiry', data as unknown as Record<string, unknown>, `Enquiry from ${data.name}`, body);

    if (r.ok && r.mailed) {
      setForm({ kind: 'ok', msg: 'Your email app has opened with the enquiry filled in. Press send there to reach us.' });
    } else if (r.ok) {
      f.reset();
      setForm({ kind: 'ok', msg: `Thanks, ${data.name.split(' ')[0]}. We\u2019ll reply within two working days.` });
    } else {
      setForm({ kind: 'err', msg: r.errors ? Object.values(r.errors).join(' ') : (r.message ?? 'Something went wrong. Please try again.') });
    }
  }

  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap panel">
        <div className="contact">
          <div className="contact-info">
            <Kicker>Contact</Kicker>
            <h2>Tell us what you want to be known for</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Share a little about yourself and we&apos;ll reply within two working days to set up a discovery call.
            </p>
            <dl>
              <div>
                <dt>Call</dt>
                <dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>{SITE.address}</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={submitEnquiry} noValidate>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px' }}
            />
            <div className="row2">
              <label>
                Full name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Work email
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <div className="row2">
              <label>
                Company
                <input name="company" autoComplete="organization" />
              </label>
              <label>
                You are a
                <select name="role">
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                Channels you&apos;re interested in
              </legend>
              <div className="chips">
                {CHANNELS.map((c) => (
                  <label key={c}>
                    <input type="checkbox" name="channels" value={c} defaultChecked={c === 'LinkedIn'} />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
            <label>
              What do you want to be known for?
              <textarea
                name="goal"
                required
                placeholder="For example: the operator who understands quick-commerce margins better than anyone"
              />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit" disabled={form.kind === 'sending'}>
                {form.kind === 'sending' ? 'Sending\u2026' : 'Send enquiry'}{' '}
                <span className="dot"><Arrow /></span>
              </button>
              <p className={noteClass(form)} role="status" aria-live="polite">{form.msg}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
