"use server";

import { brand, mailto } from "../../lib/brand";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string; values: Values }
  | { status: "fallback"; message: string; mailto: string; values: Values };

const read = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

/**
 * Sends the contact form. Delivery goes through Resend when RESEND_API_KEY is
 * set; otherwise the visitor gets a pre-filled e-mail link so the message is
 * never silently lost.
 *
 * Environment: RESEND_API_KEY, CONTACT_TO (defaults to the brand e-mail),
 * CONTACT_FROM (a verified sender on your Resend domain).
 */
export async function sendMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const values: Values = {
    firstName: read(formData, "firstName"),
    lastName: read(formData, "lastName"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    message: read(formData, "message"),
  };

  // Honeypot filled: a bot. Pretend everything went fine.
  if (read(formData, "website")) return { status: "sent" };

  const missing = [
    !values.firstName && "your first name",
    !values.lastName && "your last name",
    !values.email && "your e-mail",
    !values.message && "a message",
    !formData.get("consent") && "your consent",
  ].filter(Boolean) as string[];

  if (missing.length) {
    return { status: "error", message: `Please add ${missing.join(", ")}.`, values };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { status: "error", message: "That e-mail address does not look right. Please check it.", values };
  }

  const subject = `New enquiry from ${values.firstName} ${values.lastName}${values.company ? ` (${values.company})` : ""}`;
  const text = [
    `Name: ${values.firstName} ${values.lastName}`,
    `E-mail: ${values.email}`,
    values.company ? `Business: ${values.company}` : null,
    "",
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? brand.contact.email;
  const from = process.env.CONTACT_FROM ?? "To Be Seen <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      status: "fallback",
      message: "The site's mailbox is not connected yet. Your message is ready to send from your own e-mail app:",
      mailto: mailto(subject, text),
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: values.email, subject, text }),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return { status: "sent" };
  } catch {
    return {
      status: "fallback",
      message: "We could not send this from the site just now. You can send it from your e-mail app instead:",
      mailto: mailto(subject, text),
      values,
    };
  }
}
