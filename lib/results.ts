/**
 * "What changes": the four things a business gets back when its digital
 * systems work together. These are outcomes we design for, not metrics we
 * claim. Measured results belong in `lib/work.ts`, per client.
 */
export type ResultItem = {
  slug: string;
  metric: string;
  label: string;
  title: string;
  short: string;
  src: string;
  alt: string;
  detail: string;
  why: string;
  proof: string[];
  next: string;
  nextHref: string;
};

export const resultItems: ResultItem[] = [
  {
    slug: "better-first-impression",
    metric: "01",
    label: "Trust",
    title: "A first impression that matches your work",
    short: "A precise website and clear positioning make the business easy to trust from the first click.",
    src: "/images/uploads/tbs-photo-02.jpg",
    alt: "Black and white portrait emerging from darkness, lit by fine particles",
    detail:
      "People decide in seconds whether a business feels established. A sharper website, a stronger visual structure and an obvious next step remove hesitation before a prospect ever speaks to you.",
    why: "This matters most when the current website looks older, vaguer or cheaper than the real business. The page should create confidence, explain the offer fast and point to a clean next step.",
    proof: ["Editorial website structure", "Clear service positioning", "Hierarchy built for trust", "One obvious call to action"],
    next: "Start with Website Creation when presentation is the main bottleneck.",
    nextHref: "/services/website-creation",
  },
  {
    slug: "faster-response-time",
    metric: "02",
    label: "Speed",
    title: "Bookings while intent is still high",
    short: "Booking and contact flows remove the wait, so prospects can act without a phone call.",
    src: "/images/uploads/tbs-photo-05.jpg",
    alt: "Liquid frozen mid-splash in a glass column, black and white",
    detail:
      "Manual enquiry loops cost momentum. When bookings, contact routes and calendars are connected, an interested customer can move while they still care.",
    why: "A clean scheduling experience across the site, the search listing and your calendar makes the next action obvious. It also removes the admin created by repeated messages, missed calls and unclear availability.",
    proof: ["Automated booking flow", "Cleaner contact routes", "Calendar-aware scheduling", "Less manual coordination"],
    next: "Start with Automated Bookings when leads are slowed down by back-and-forth.",
    nextHref: "/services/automated-bookings",
  },
  {
    slug: "less-admin-drag",
    metric: "03",
    label: "Operations",
    title: "Less admin, a calmer team",
    short: "Connected systems remove repetitive work and make the customer journey feel effortless.",
    src: "/images/uploads/tbs-photo-03.jpg",
    alt: "Concrete building with a lone figure on the roof under dramatic light",
    detail:
      "A business should not depend on scattered manual tasks to look responsive. When website, booking, follow-up and loyalty share the same data, the team stops chasing small tasks.",
    why: "Disconnected tools burn energy on coordination instead of customers. One coherent system keeps the key actions structured: enquiries, reminders, reviews, returns.",
    proof: ["Connected customer journey", "Structured reminders", "Cleaner internal handoff", "Fewer repetitive follow-ups"],
    next: "Start with the Full System when several weak points need to work as one.",
    nextHref: "/services/full-digitalisation-bundle",
  },
  {
    slug: "more-repeat-revenue",
    metric: "04",
    label: "Retention",
    title: "Regulars you can actually see",
    short: "Loyalty Pass and structured follow-up turn one-time customers into people who come back.",
    src: "/images/uploads/tbs-photo-07.jpg",
    alt: "Face seen through water and reflections, black and white",
    detail:
      "Repeat revenue is usually already inside the customer base; nothing is prompting it. Loyalty Pass and follow-up journeys keep customers visible and reachable.",
    why: "A pass in Apple or Google Wallet is a direct line to the customer. Follow-up messages, review prompts and return reminders turn a single visit into a relationship.",
    proof: ["Loyalty Pass in the wallet", "Visit tracking", "Follow-up journeys", "Review and return prompts"],
    next: "Start with Loyalty Pass or Client Follow-Up when retention is the main leak.",
    nextHref: "/services/loyalty-pass",
  },
];

export function getResult(slug: string) {
  return resultItems.find((item) => item.slug === slug);
}
