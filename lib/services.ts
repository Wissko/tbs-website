import type { Shots } from "../components/ProjectShots";

export type TbsService = {
  n: string;
  slug: string;
  title: string;
  label: string;
  short: string;
  bestFor: string;
  outcome: string;
  detail: string;
  bullets: string[];
  image: string;
  alt: string;
  /** True for the systems shown on the home page. */
  core?: boolean;
  /** Screenshots of the product itself, shown instead of the editorial photo on the service page. */
  shots?: Shots;
};

/** The way every engagement runs. Shared by all service pages. */
export const process = [
  {
    step: "Call",
    text: "A short call to understand the business, what is leaking and what a good result would look like for you.",
  },
  {
    step: "Scope",
    text: "A written proposal: what we build, what you need to provide, how long it takes and what it costs. No surprises later.",
  },
  {
    step: "Build",
    text: "Design and build in the open. You see progress as it happens and we adjust together before anything goes live.",
  },
  {
    step: "Launch & follow-up",
    text: "We launch, hand over, and stay close during the first weeks to tune what real customers do with it.",
  },
];

export const services: TbsService[] = [
  {
    n: "01",
    slug: "website-creation",
    title: "Website Creation",
    label: "Web design",
    short: "A fast, precise website that makes people trust you before they have met you, and shows them the next step.",
    bestFor: "Salons, restaurants, cottages and independents whose current site looks older than the work they actually do, or who have no site at all.",
    outcome: "A first impression that matches your real quality, and a clear route from interest to enquiry or booking.",
    detail:
      "We design and build websites that make your business easy to understand, easy to trust and easy to contact. Every page is structured around clarity, credibility, speed and the next commercial action, whether that is a call, a booking or a visit.",
    bullets: ["Editorial visual direction", "Copy written for your customers", "Responsive, accessible build", "Performance and search foundations"],
    image: "/images/uploads/tbs-photo-02.jpg",
    alt: "Black and white portrait emerging from darkness, lit by fine particles",
    core: true,
  },
  {
    n: "02",
    slug: "loyalty-pass",
    title: "Loyalty Pass",
    label: "Retention",
    short: "Our own loyalty system, living in Apple and Google Wallet: a card your customers keep, and visits you can finally see.",
    bestFor: "Businesses with regulars they cannot name, paper stamp cards that get lost, and repeat revenue left to chance.",
    outcome: "More return visits, a direct line to your loyal customers, and less dependence on one-time traffic.",
    detail:
      "Loyalty Pass is the system we developed for businesses that live on regulars. Customers add a card to their phone wallet in seconds; you track visits, trigger rewards and reach them with a message when it matters. No app to download, no plastic to print.",
    bullets: ["Apple Wallet and Google Wallet passes", "Visit and reward tracking", "Push messages to pass holders", "Simple dashboard for the team"],
    image: "/images/uploads/tbs-photo-04.jpg",
    alt: "Curved concrete facade catching a single band of light",
    core: true,
    shots: {
      url: "https://loyalty-pass-onboarding.vercel.app/",
      desktop: "/images/projects/loyalty-pass-desktop.jpg",
      mobile: "/images/projects/loyalty-pass-mobile.jpg",
    },
  },
  {
    n: "03",
    slug: "automated-bookings",
    title: "Automated Bookings",
    label: "Scheduling",
    short: "Bookings that happen on your site, from search results and from your existing calendar, without a phone call.",
    bestFor: "Teams losing time to back-and-forth messages, missed appointments and unclear availability.",
    outcome: "Faster bookings, fewer no-shows, and a calmer front desk.",
    detail:
      "We design booking flows that remove friction for the customer and admin for the business. The system connects to your website, your search listing, your calendar and your reminder messages, so the next available slot is always one tap away.",
    bullets: ["Online scheduling on your site", "Calendar integration", "Reminder and confirmation flows", "Deposit or prepayment when needed"],
    image: "/images/uploads/tbs-photo-05.jpg",
    alt: "Liquid frozen mid-splash in a glass column, black and white",
    core: true,
  },
  {
    n: "04",
    slug: "client-follow-up-crm",
    title: "Client Follow-Up",
    label: "CRM",
    short: "Structured messages, review requests and reminders that turn one-time customers into regulars.",
    bestFor: "Businesses with a list of past customers and no consistent reason for them to come back.",
    outcome: "More repeat revenue from people who already know and trust you.",
    detail:
      "We build follow-up journeys that keep the relationship alive after the first visit: a thank-you, a review request, a reminder when it is time to return, a message when something new arrives. Simple, automatic, in your voice.",
    bullets: ["Reactivation journeys", "Review requests", "Reminder messages", "A light CRM the team will actually use"],
    image: "/images/uploads/tbs-photo-07.jpg",
    alt: "Face seen through water and reflections, black and white",
    core: true,
  },
  {
    n: "05",
    slug: "seo-performance-insights",
    title: "Search & Performance",
    label: "Visibility",
    short: "Technical foundations, local search visibility and reporting that make decisions easier.",
    bestFor: "Businesses that need to be found in their area, load fast on a phone, and know what is actually working.",
    outcome: "A stronger technical base and clearer decisions from a handful of numbers that matter.",
    detail:
      "We take care of the foundations that help customers find, trust and choose you: technical search optimisation, page speed, local listings, and a simple monthly report you can read in five minutes.",
    bullets: ["Technical search optimisation", "Page speed and stability", "Local listing setup", "Simple monthly reporting"],
    image: "/images/uploads/tbs-photo-03.jpg",
    alt: "Concrete building with a lone figure on the roof under dramatic light",
  },
  {
    n: "06",
    slug: "full-digitalisation-bundle",
    title: "Full System",
    label: "Bundle",
    short: "Website, Loyalty Pass, bookings and follow-up designed as one system, from first click to repeat visit.",
    bestFor: "Businesses ready to replace scattered tools with one coherent customer journey.",
    outcome: "Less leakage, less admin, and a business that feels easier to buy from at every step.",
    detail:
      "We connect the core pieces into one system: website, Loyalty Pass, booking flow, follow-up and performance insight. The pieces share the same data, the same voice and the same look, so the customer never feels a seam.",
    bullets: ["Website", "Loyalty Pass", "Booking automation", "Follow-up and reporting"],
    image: "/images/uploads/tbs-photo-06.jpg",
    alt: "Portrait half hidden behind rippled glass, black and white",
  },
];

export const coreServices = services.filter((service) => service.core);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
