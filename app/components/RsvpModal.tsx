'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE, EMAIL_RE, WEB3FORMS_ACCESS_KEY } from '@/app/lib/data';
import type { Event, FormState, RsvpPayload } from '@/app/lib/types';

async function postOrMail(
  endpoint: string,
  payload: Record<string, unknown>,
  subject: string,
  body: string,
  eventInfo?: Event,
): Promise<{ ok: boolean; mailed?: boolean; errors?: Record<string, string>; message?: string }> {
  const web3Key = WEB3FORMS_ACCESS_KEY;

  // Direct client-side submission to Web3Forms using FormData (guaranteed CORS compatibility)
  if (web3Key) {
    try {
      const fd = new FormData();
      fd.append('access_key', web3Key);
      fd.append('subject', subject);
      fd.append('from_name', 'The Foundry Loom RSVP');
      fd.append('replyto', String(payload.email || ''));
      fd.append('event', eventInfo?.title || String(payload.event || ''));
      fd.append('event_date', eventInfo ? `${eventInfo.day} ${eventInfo.mon} ${eventInfo.year}` : '');
      fd.append('event_location', eventInfo?.where || '');
      fd.append('name', String(payload.name || ''));
      fd.append('email', String(payload.email || ''));
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
      return { ok: false, message: json.message || 'RSVP submission failed. Please try again.' };
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

interface RsvpModalProps {
  event: Event | null;
  onClose: () => void;
}

export default function RsvpModal({ event, onClose }: RsvpModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [rsvpState, setRsvpState] = useState<FormState>({ kind: 'idle', msg: '' });

  // Open / close the native dialog
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (event && !d.open) {
      d.showModal ? d.showModal() : d.setAttribute('open', '');
      setRsvpState({ kind: 'idle', msg: '' });
    }
    if (!event && d.open) d.close();
  }, [event]);

  // Sync Escape key from native dialog
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handler = () => onClose();
    d.addEventListener('close', handler);
    return () => d.removeEventListener('close', handler);
  }, [onClose]);

  async function submitRsvp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!event) return;
    const fd = new FormData(e.currentTarget);
    const data: RsvpPayload = {
      event: event.id,
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      website: fd.get('website') as string | null,
    };

    if (!data.name) return setRsvpState({ kind: 'err', msg: 'Add your name so we can save your seat.' });
    if (!EMAIL_RE.test(data.email)) return setRsvpState({ kind: 'err', msg: 'Enter a valid email address, like you@company.com.' });

    setRsvpState({ kind: 'sending', msg: '' });
    const r = await postOrMail(
      '/api/rsvp',
      data as unknown as Record<string, unknown>,
      `Seat request: ${event.title}`,
      `Name: ${data.name}\nEmail: ${data.email}`,
      event,
    );

    if (r.ok && r.mailed) {
      onClose();
      return;
    }
    if (r.ok) {
      setRsvpState({ kind: 'ok', msg: `Seat saved. We\u2019ll email the details to ${data.email}.` });
      setTimeout(() => onClose(), 1800);
    } else {
      setRsvpState({ kind: 'err', msg: r.errors ? Object.values(r.errors).join(' ') : (r.message ?? 'Something went wrong.') });
    }
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="tfl-rsvp-title" onClose={onClose}>
      {event && (
        <form className="dlg" onSubmit={submitRsvp} noValidate>
          <h3 id="tfl-rsvp-title">Save a seat</h3>
          <p className="lede" style={{ fontSize: '.95rem' }}>
            {event.title}, {event.day} {event.mon} {event.year}
          </p>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px' }}
          />
          <label>
            Full name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Work email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <p className={noteClass(rsvpState)} role="status" aria-live="polite">{rsvpState.msg}</p>
          <div className="actions">
            <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={rsvpState.kind === 'sending'}
            >
              {rsvpState.kind === 'sending' ? 'Saving\u2026' : 'Save my seat'}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
