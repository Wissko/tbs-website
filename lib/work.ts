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
    slug: "beauty-retail",
    title: "Beauty retail",
    // TO CONFIRM: which systems we actually delivered here beyond the storefront.
    kind: "Online store · Brand presence · Search",
    services: ["website-creation", "seo-performance-insights"],
    summary: "A hair-care store built to be browsed, trusted and reordered.",
    situation:
      "A beauty retailer competes with marketplaces on every product. It needs a storefront that carries the brand, makes a wide catalogue easy to navigate, and turns a first order into a habit.",
    built: [
      "A storefront that leads with the brand, not the product grid",
      "Catalogue navigation by range, brand and bestsellers",
      "First-order incentive and newsletter capture",
      "Search and performance foundations, with local currency and shipping",
    ],
    image: "/images/uploads/tbs-photo-08.jpg",
    alt: "Woman with closed eyes and water droplets suspended around her face, black and white",
    shots: {
      url: "https://trendsbeauty.com.au/",
      desktop: "/images/projects/beauty-retail-desktop.jpg",
      mobile: "/images/projects/beauty-retail-mobile.jpg",
    },
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
      url: "https://eva-meszoly-v2.vercel.app/",
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
