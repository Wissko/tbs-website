export type ResultItem = {
  slug: string;
  metric: string;
  label: string;
  title: string;
  short: string;
  src: string;
  detail: string;
  why: string;
  proof: string[];
  next: string;
};

export const resultItems: ResultItem[] = [
  {
    slug: "better-first-impression",
    metric: "01",
    label: "Trust",
    title: "Better first impression",
    short: "A premium website and clearer positioning make the business easier to trust from the first click.",
    src: "/mockups/journal-01.jpg",
    detail: "TO BE SEEN is built around one commercial truth: people decide very quickly whether a business feels established. A sharper website, stronger visual structure and clearer enquiry path reduce hesitation before a prospect even speaks to the team.",
    why: "This matters when the current website looks old, unclear or disconnected from the quality of the real business. The page should create confidence, explain the offer fast and move visitors toward a clean next step.",
    proof: ["Premium website structure", "Clear service positioning", "Visual hierarchy made for trust", "CTA paths toward enquiry or booking"],
    next: "Start with Website Creation when trust and presentation are the main bottleneck.",
  },
  {
    slug: "faster-response-time",
    metric: "02",
    label: "Speed",
    title: "Faster response time",
    short: "Booking and contact flows remove friction so prospects can act without waiting for manual back-and-forth.",
    src: "/mockups/journal-02.jpg",
    detail: "Manual enquiry loops cost momentum. TO BE SEEN structures bookings, contact routes and calendar flows so interested clients can move while intent is still high.",
    why: "A cleaner scheduling experience across the site, search listings and existing calendar makes the next action obvious. It also reduces the admin load created by repeated messages, missed calls and unclear availability.",
    proof: ["Automated booking flow", "Cleaner contact routes", "Calendar-aware scheduling", "Less manual coordination"],
    next: "Start with Automated Bookings when too many leads are slowed down by back-and-forth.",
  },
  {
    slug: "less-admin-drag",
    metric: "03",
    label: "Operations",
    title: "Less admin drag",
    short: "Digital systems reduce repetitive work for the team and make the client journey feel calmer.",
    src: "/mockups/journal-03.jpg",
    detail: "A business should not depend on scattered manual tasks to look responsive. TO BE SEEN connects website, booking, CRM and follow-up into a calmer operating layer.",
    why: "When tools are disconnected, the team spends energy chasing small tasks instead of serving customers. A coherent system keeps key actions structured: enquiries, reminders, reviews, returns and client follow-up.",
    proof: ["Connected client journey", "Structured reminders", "Cleaner internal handoff", "Reduced repetitive follow-up"],
    next: "Start with the Full Digitalisation Bundle when several weak points need to work as one system.",
  },
  {
    slug: "more-repeat-revenue",
    metric: "04",
    label: "Retention",
    title: "More repeat revenue",
    short: "Wallet loyalty and CRM journeys bring past clients back instead of letting demand go quiet.",
    src: "/mockups/journal-04.jpg",
    detail: "Repeat revenue is often already inside the customer base, but nothing is prompting action. TO BE SEEN uses wallet loyalty and structured CRM journeys to keep customers visible and reachable.",
    why: "Apple and Google Wallet loyalty creates a direct customer connection. Follow-up messages, review prompts and return journeys help convert one-time clients into recurring value.",
    proof: ["Wallet-first loyalty", "Apple and Google Wallet passes", "CRM follow-up journeys", "Review and return prompts"],
    next: "Start with Wallet-First Loyalty or Client Follow-Up CRM when retention is the main leak.",
  },
];

export function getResult(slug: string) {
  return resultItems.find((item) => item.slug === slug);
}
