'use client';

import {useState} from 'react';
import {email} from '@/lib/data';

/** Prepares a draft in the visitor's own email app. Nothing is sent from the website. */
export function ContactForm() {
  const [prepared, setPrepared] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('business') || 'Not specified'}\n\n${data.get('message')}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('A new project for To Be Seen')}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__two">
        <label className="form__field"><span>Your name</span><input name="name" autoComplete="name" required /></label>
        <label className="form__field"><span>Your email</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label className="form__field"><span>Business <i>(optional)</i></span><input name="business" autoComplete="organization" /></label>
      <label className="form__field"><span>What do you have in mind?</span><textarea name="message" rows={3} required minLength={10} /></label>
      <p className="form__helper t-small">This prepares a message in your email app. Nothing is sent until you review it and press send.</p>
      <button type="submit" className="pill form__submit"><span>Prepare my email</span></button>
      {prepared && (
        <p role="status" className="form__status">
          Your email draft is ready to open. If your email app did not open, write directly to <a className="text-link" href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}
