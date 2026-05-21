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
};

export const services: TbsService[] = [
  {
    n: "01",
    slug: "website-creation",
    title: "Website Creation",
    label: "Web design",
    short: "Fast, premium websites built to create trust and move visitors toward a clear enquiry.",
    bestFor: "Businesses with an outdated website, weak first impression, or unclear conversion path.",
    outcome: "A sharper first impression and a cleaner route from interest to enquiry.",
    detail: "We design and build premium websites that make your business easier to understand, easier to trust, and easier to contact. The site is structured around clarity, credibility, speed, and the next commercial action.",
    bullets: ["Premium visual direction", "Clear enquiry paths", "Responsive build", "Performance foundations"],
  },
  {
    n: "02",
    slug: "wallet-loyalty",
    title: "Wallet-First Loyalty",
    label: "Retention",
    short: "A direct connection in Apple and Google Wallets to track visits and drive predictable repeat revenue.",
    bestFor: "Businesses losing retention and missing repeat revenue from customers they cannot easily re-engage.",
    outcome: "More return visits, better visibility on loyal clients, and less reliance on one-time traffic.",
    detail: "We create loyalty systems that live inside native Apple and Google Wallets. Clients can keep rewards close, businesses can track repeat visits, and retention becomes easier to manage.",
    bullets: ["Apple Wallet passes", "Google Wallet passes", "Visit and reward tracking", "Repeat-client activation"],
  },
  {
    n: "03",
    slug: "automated-bookings",
    title: "Automated Bookings",
    label: "Scheduling",
    short: "A cleaner scheduling experience across your site, search listings, and existing calendar.",
    bestFor: "Teams losing time to back-and-forth messages, missed appointments, and unclear booking flows.",
    outcome: "Faster bookings, fewer manual loops, and a calmer operation for your team.",
    detail: "We design booking flows that remove friction for clients and admin drag for the business. The system can connect to the website, search listings, calendar tools, and reminder flows.",
    bullets: ["Online scheduling", "Calendar integration", "Reminder flows", "Reduced no-shows"],
  },
  {
    n: "04",
    slug: "client-follow-up-crm",
    title: "Client Follow-Up CRM",
    label: "CRM",
    short: "Structured messages and reminders that turn one-time clients into repeat business.",
    bestFor: "Businesses with past clients in the database but no consistent follow-up prompting action.",
    outcome: "More repeat revenue from people who already know and trust the business.",
    detail: "We build follow-up journeys that re-engage past clients, request reviews, and keep the relationship active after the first purchase or visit.",
    bullets: ["Reactivation journeys", "Review requests", "Reminder messages", "Simple CRM structure"],
  },
  {
    n: "05",
    slug: "seo-performance-insights",
    title: "SEO & Performance Insights",
    label: "SEO",
    short: "Technical foundations, search visibility, and reporting that make decisions easier.",
    bestFor: "Businesses that need cleaner visibility, faster pages, and better insight into what is working.",
    outcome: "A stronger technical base and clearer decisions from practical performance data.",
    detail: "We improve the foundations that help clients find, trust, and choose you: technical SEO, page speed, local search basics, and simple reporting.",
    bullets: ["Technical SEO", "Performance cleanup", "Search visibility", "Simple reporting"],
  },
  {
    n: "06",
    slug: "full-digitalisation-bundle",
    title: "Full Digitalisation Bundle",
    label: "Bundle",
    short: "A complete operating layer where website, loyalty, bookings, and follow-up work as one system.",
    bestFor: "Businesses ready to replace scattered digital tools with one coherent client journey.",
    outcome: "A joined-up digital system from first click to repeat booking.",
    detail: "We connect the core pieces into one coherent system: website, wallet loyalty, booking flow, follow-up, and performance insight. The goal is less leakage, less admin, and a business that feels easier to buy from.",
    bullets: ["Website system", "Wallet loyalty", "Booking automation", "Follow-up CRM"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
