/**
 * Project types: the kinds of businesses we build for, and what each one
 * gets. Every entry is based on a system we have actually delivered; clients
 * are not named on the site.
 */
import type { Shots } from "../components/ProjectShots";

export type ProjectType = {
  slug: string;
  /** The kind of business, used as the title. */
  title: string;
  /** The shape of the project, in a few words. */
  kind: string;
  /** Service slugs from lib/services.ts */
  services: string[];
  summary: string;
  situation: string;
  built: string[];
  /** Editorial fallback when no screenshots exist yet. */
  image: string;
  alt: string;
  /** Screenshots of the delivered site (see scripts in README to re-capture). */
  shots?: Shots;
};

export const projectTypes: ProjectType[] = [
  {
    slug: "beauty-salon",
    title: "Beauty salon",
    kind: "Website · Bookings · Loyalty Pass",
    services: ["website-creation", "automated-bookings", "loyalty-pass"],
    summary: "A salon presence built to be booked, not just admired.",
    situation:
      "A salon does careful, high-quality work. Online, that quality needs to be visible at a glance and bookable in a few taps, without the team spending the day on the phone.",
    built: [
      "An editorial website that shows the work and the team first",
      "Online booking connected to the salon's calendar",
      "A Loyalty Pass in Apple and Google Wallet for regular clients",
    ],
    image: "/images/uploads/tbs-photo-08.jpg",
    alt: "Woman with closed eyes and water droplets suspended around her face, black and white",
  },
  {
    slug: "creative-portfolio",
    title: "Creative portfolio",
    kind: "Website · Search & performance",
    services: ["website-creation", "seo-performance-insights"],
    summary: "A portfolio that puts the work first and the contact one click away.",
    situation:
      "An independent creative needs a site that gets out of the way of the work, loads instantly on a phone, and makes getting in touch obvious for the right people.",
    built: [
      "A portfolio structure led by the work itself",
      "Fast, accessible build with clean image handling",
      "Search and performance foundations for discoverability",
    ],
    image: "/images/uploads/tbs-photo-06.jpg",
    alt: "Portrait half hidden behind rippled glass, black and white",
    shots: {
      url: "https://eva-portfolio-seven.vercel.app/",
      desktop: "/images/projects/creative-portfolio-desktop.jpg",
      mobile: "/images/projects/creative-portfolio-mobile.jpg",
    },
  },
  {
    slug: "holiday-cottage",
    title: "Holiday cottage",
    kind: "Website · Direct bookings · Guest follow-up",
    services: ["website-creation", "automated-bookings", "client-follow-up-crm"],
    summary: "A cottage website that turns lookers into bookers, and guests into returning guests.",
    situation:
      "A holiday rental competes with platforms that take a cut of every stay. It needs a direct presence guests trust enough to book with, and a reason to come back next season.",
    built: [
      "A website that shows the place, the area and the availability",
      "Direct booking flow with confirmations and reminders",
      "Guest follow-up: reviews after the stay, a message before next season",
    ],
    image: "/images/uploads/tbs-photo-03.jpg",
    alt: "Concrete building with a lone figure on the roof under dramatic light",
    shots: {
      url: "https://kobble-cottage.vercel.app/",
      desktop: "/images/projects/holiday-cottage-desktop.jpg",
      mobile: "/images/projects/holiday-cottage-mobile.jpg",
    },
  },
];

export function getProjectType(slug: string) {
  return projectTypes.find((item) => item.slug === slug);
}

export function projectTypesForService(serviceSlug: string) {
  return projectTypes.filter((item) => item.services.includes(serviceSlug));
}
