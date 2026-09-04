/**
 * Single source of truth for the brand.
 * Every header, footer, title and CTA reads from here so the site
 * says exactly the same thing on every page.
 */

const productionUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://tobeseen.agency");

export const brand = {
  /** Short mark used in headers and the footer. */
  short: "TBS°",
  /** Full name used in prose, metadata and legal text. */
  name: "To Be Seen",
  claim: "Built to be seen.",
  /** Three-line tagline shown next to the logo on every page. */
  tagline: ["Digital systems for", "independent businesses.", "Websites · Loyalty Pass · Bookings · Follow-up"],
  description:
    "To Be Seen builds the digital systems that make independent businesses easier to find, easier to trust and easier to choose: websites, Loyalty Pass, online bookings and client follow-up.",
  /** Who we build for. Named on the home page and in the services. */
  audiences: ["salons", "restaurants", "cottages", "independents"],
  manifesto: {
    line: "Excellence deserves an audience.",
    body: [
      "The best salons, the best tables and the best independents are often the least visible online.",
      "We build the systems that fix that: a website people trust, a Loyalty Pass they keep, bookings that happen without a phone call, and follow-up that brings them back.",
      "Nothing decorative. Everything built to be seen.",
    ],
  },
  cta: {
    primary: "Book a call",
    secondary: "See the services",
  },
  contact: {
    email: "Agency.tobeseen@gmail.com",
    /** Scheduling link (Cal.com, Calendly…). Leave undefined to fall back to e-mail. */
    bookingUrl: undefined as string | undefined,
    /** Honest commitment shown on the contact page. */
    responseTime: "We reply within two working days.",
    /** Social profiles. Add {label, href} entries when the accounts exist. */
    social: [] as { label: string; href: string }[],
  },
  legal: {
    entity: "To Be Seen",
    /** Complete before launch: legal form, registered address, registration number, publication director. */
    form: undefined as string | undefined,
    address: undefined as string | undefined,
    registration: undefined as string | undefined,
    director: undefined as string | undefined,
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States",
  },
  siteUrl: productionUrl,
  foundedYear: 2024,
} as const;

export const copyrightLine = `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`;

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${brand.contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Where "Book a call" points: the scheduling tool if configured, otherwise a pre-filled e-mail. */
export const bookingHref =
  brand.contact.bookingUrl ?? mailto("Booking a call with To Be Seen", "Hello,\n\nI would like to book a call. Here is what I have in mind:\n\n");
