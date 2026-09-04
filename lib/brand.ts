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
  /**
   * The business is registered in Australia, so the legal notice is built
   * around an ABN and a registered office rather than an EU-style publisher
   * block. Fill these in before launch: every line below is hidden while it
   * is undefined, so the page never shows a placeholder.
   */
  legal: {
    /** Registered business or company name, exactly as registered. */
    entity: "To Be Seen",
    /** Legal form, e.g. "Pty Ltd" for a company or "sole trader". */
    form: undefined as string | undefined,
    /** Australian Business Number, 11 digits. */
    abn: undefined as string | undefined,
    /** Australian Company Number, 9 digits. Companies only. */
    acn: undefined as string | undefined,
    /** Registered office address, including state and postcode. */
    address: undefined as string | undefined,
    /** State or territory whose law governs these terms, e.g. "Queensland". */
    state: undefined as string | undefined,
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
