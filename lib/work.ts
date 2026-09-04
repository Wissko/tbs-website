/**
 * Real client work. Only publish what is true: outcomes and quotes are
 * optional and the pages hide those blocks when they are empty.
 *
 * TO CONFIRM with the studio before launch (marked below):
 *   – sector, services delivered and year for each client
 *   – live URLs and real screenshots (replace the editorial placeholders)
 *   – measured outcomes and a client quote, if they can be published
 */
export type Outcome = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  year?: string;
  /** Service slugs from lib/services.ts */
  services: string[];
  summary: string;
  brief: string;
  built: string[];
  outcomes?: Outcome[];
  quote?: { text: string; author: string };
  url?: string;
  image: string;
  alt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trend-beauty",
    client: "Trend Beauty",
    sector: "Beauty salon", // TO CONFIRM
    services: ["website-creation", "automated-bookings", "loyalty-pass"], // TO CONFIRM
    summary: "A salon presence built to be booked, not just admired.",
    brief:
      "Trend Beauty does careful, high-quality work. Online, that quality needed to be visible at a glance and bookable in a few taps, without the salon spending its day on the phone.",
    built: [
      "An editorial website that shows the work and the team first",
      "Online booking connected to the salon's calendar",
      "A Loyalty Pass in Apple and Google Wallet for regular clients",
    ],
    image: "/images/uploads/tbs-photo-08.jpg",
    alt: "Woman with closed eyes and water droplets suspended around her face, black and white",
  },
  {
    slug: "eva-portfolio",
    client: "Eva",
    sector: "Independent creative · portfolio", // TO CONFIRM
    services: ["website-creation", "seo-performance-insights"], // TO CONFIRM
    summary: "A portfolio that puts the work first and the contact one click away.",
    brief:
      "An independent creative needs a site that gets out of the way of the work, loads instantly on a phone, and makes getting in touch obvious for the right people.",
    built: [
      "A portfolio structure led by the work itself",
      "Fast, accessible build with clean image handling",
      "Search and performance foundations for discoverability",
    ],
    image: "/images/uploads/tbs-photo-06.jpg",
    alt: "Portrait half hidden behind rippled glass, black and white",
  },
  {
    slug: "kobble-cottage",
    client: "Kobble Cottage",
    sector: "Holiday cottage · hospitality", // TO CONFIRM
    services: ["website-creation", "automated-bookings", "client-follow-up-crm"], // TO CONFIRM
    summary: "A cottage website that turns lookers into bookers, and guests into returning guests.",
    brief:
      "A holiday cottage competes with platforms that take a cut of every stay. Kobble Cottage needed a direct presence guests would trust enough to book with, and a reason to come back next season.",
    built: [
      "A website that shows the place, the area and the availability",
      "Direct booking flow with confirmations and reminders",
      "Guest follow-up: reviews after the stay, a message before next season",
    ],
    image: "/images/uploads/tbs-photo-03.jpg",
    alt: "Concrete building with a lone figure on the roof under dramatic light",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function caseStudiesForService(serviceSlug: string) {
  return caseStudies.filter((item) => item.services.includes(serviceSlug));
}
