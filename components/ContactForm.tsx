"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "../app/contact/actions";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const values = "values" in state ? state.values : undefined;

  if (state.status === "sent") {
    return (
      <div className="form-status form-status--ok" role="status">
        <h3 className="display">Message sent.</h3>
        <p>Thank you. We read every message ourselves and will reply within two working days.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="form" aria-describedby="form-note">
      <div className="form-row">
        <label className="field">
          <span>First name</span>
          <input name="firstName" autoComplete="given-name" required defaultValue={values?.firstName} />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="lastName" autoComplete="family-name" required defaultValue={values?.lastName} />
        </label>
      </div>
      <label className="field">
        <span>E-mail</span>
        <input name="email" type="email" autoComplete="email" inputMode="email" required defaultValue={values?.email} />
      </label>
      <label className="field">
        <span>Business</span>
        <input name="company" autoComplete="organization" placeholder="Salon, restaurant, cottage…" defaultValue={values?.company} />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required defaultValue={values?.message} />
      </label>

      {/* Honeypot: hidden from people, filled by bots. */}
      <label className="field field--hp" aria-hidden="true">
        <span>Website</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="field field--check">
        <input type="checkbox" name="consent" required defaultChecked={values !== undefined} />
        <span>
          I agree that To Be Seen keeps this message to reply to me. <Link href="/privacy">Privacy policy</Link>.
        </span>
      </label>

      {state.status === "error" && (
        <p className="form-status form-status--error" role="alert">{state.message}</p>
      )}
      {state.status === "fallback" && (
        <div className="form-status" role="status">
          <p>{state.message}</p>
          <a className="btn btn--primary" href={state.mailto}>
            Open in your e-mail app <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
        <p id="form-note" className="form-note">We reply within two working days.</p>
      </div>
    </form>
  );
}
