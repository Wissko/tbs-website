export type Media = {src: string; width: number; height: number; position?: string; alt?: string};

/** Device mockups made from captures of the live sites (scripts/mockups/build.cjs, public/projects/mockups). */
export type Mockups = {
  /** Mac and iPhone on the project's colour, 16:10. With `layered`, the same scene without the phone and the phone
   *  alone, so the project's recording plays on the Mac screen beneath the phone. */
  opening: Media;
  layered?: {base: Media; layer: Media};
  /** Every screen in perspective (Loyalty Pass: the pass beside the phone). */
  wide?: Media;
  /** Two browser windows, then the Mac face on. */
  pair?: [Media, Media];
  /** The iPhone upright on a transparent ground; `framed` for a plain screenshot that needs the drawn frame. */
  phone: Media & {framed?: boolean};
  /** Three iPhones. */
  closing?: Media;
  /** The iPhone tilted, 4:5, for tiles and the menu. */
  tile: Media;
};

export type Project = {
  slug: string;
  id: string;
  name: string;
  type: string;
  category: 'Websites' | 'Products' | 'Experiments';
  line: string;
  summary: string;
  intro: string;
  approach: string;
  focus: string[];
  /** The live site, or a page of this one when the work is private (then `visit` names the link). */
  url: string;
  visit?: string;
  /** Case-study opening, sampled from the project's own palette. */
  color: {bg: string; fg: string};
  /** Single-colour mask of the client mark (public/logos), width / height. */
  logo: {src: string; ratio: number};
  mockup: Mockups;
  /** A recording of the live site (public/motion), played on the opening's Mac. */
  motion?: string;
  /** What the product does, shown as numbered points on the case study. */
  highlights?: {title: string; body: string}[];
  /** What the same scope costs off the shelf, as sourced estimates (never the client's accounts). */
  costCase?: {lead: string; figures: {value: string; label: string}[]; basis: string};
  /** Identity work by the studio: the logo on a board with its colours, and a line about it. */
  identity?: {board: Media; text: string};
  note?: string;
};

const scene = (id: string, name: string, alt?: string): Media => ({src: `/projects/mockups/${id}-${name}.jpg`, width: 2400, height: 1500, alt});
const mockups = (id: string, {layered = false, wide = false, pair = false, closing = false} = {}): Mockups => ({
  opening: scene(id, 'opening'),
  layered: layered ? {base: scene(id, 'base'), layer: {src: `/projects/mockups/${id}-layer.png`, width: 2400, height: 1500}} : undefined,
  wide: wide ? scene(id, 'wide') : undefined,
  pair: pair ? [scene(id, 'pair-1'), scene(id, 'pair-2')] : undefined,
  phone: {src: `/projects/mockups/${id}-phone.png`, width: 840, height: 1560},
  closing: closing ? scene(id, 'closing') : undefined,
  tile: {src: `/projects/mockups/${id}-tile.jpg`, width: 1200, height: 1500},
});

export const projects: Project[] = [
  {
    slug: 'eva-meszoly', id: 'eva', name: 'Eva Meszoly', type: 'Creative portfolio', category: 'Websites',
    line: 'A creative world, without the noise.',
    summary: 'An image-led portfolio that puts a creative world first',
    intro: 'An image-led portfolio that gives each project room to speak. Strong typography and a pared-back structure put the work first.',
    approach: 'The experience moves between a bold opening, a considered project selection and direct contact. Large imagery sets the rhythm; navigation stays out of its way.',
    focus: ['Art direction', 'Portfolio experience', 'Responsive development'],
    url: 'https://www.evameszoly.com/',
    color: {bg: '#141414', fg: '#f3eee4'},
    logo: {src: '/logos/eva.png', ratio: 5.594},
    mockup: mockups('eva', {layered: true, wide: true, pair: true, closing: true}),
    motion: 'eva',
    note: 'Website design and development for Eva Meszoly. Brands shown within the site belong to her creative portfolio.',
  },
  {
    slug: 'kobble-cottage', id: 'kobble', name: 'Kobble Cottage', type: 'Hospitality', category: 'Websites',
    line: 'Some places deserve a slower introduction.',
    summary: 'A hospitality website that gives a countryside escape a slower introduction',
    intro: 'A digital arrival for a countryside escape. The website lets the setting, the spaces and the details lead the story.',
    approach: 'A calm visual pace makes room for the property. The practical path to planning a stay sits alongside the atmosphere, with a layout that carries naturally onto mobile.',
    focus: ['Hospitality website', 'Visual storytelling', 'Mobile experience'],
    url: 'https://kobble-cottage.vercel.app/',
    color: {bg: '#efe4d3', fg: '#4a1418'},
    logo: {src: '/logos/kobble.png', ratio: 3.724},
    mockup: mockups('kobble', {layered: true, wide: true, pair: true, closing: true}),
    motion: 'kobble',
  },
  {
    slug: 'wissem-os', id: 'wissem', name: 'Wissem OS', type: 'Experimental portfolio', category: 'Experiments',
    line: 'A portfolio you can play with.',
    summary: 'A studio experiment that turns a portfolio into a desktop',
    intro: 'An independent studio experiment that turns a portfolio into a desktop. Open a window, explore a project and find your own way through.',
    approach: 'Familiar desktop interactions become a different way to discover the work. The screen recordings shown here capture the real public experience.',
    focus: ['Creative development', 'Interaction design', 'Studio experiment'],
    url: 'https://portfolio-peach-five-wlgkr5fj19.vercel.app/',
    color: {bg: '#235bd6', fg: '#ffffff'},
    logo: {src: '/logos/wissem.png', ratio: 7.381},
    mockup: mockups('wissem', {layered: true, pair: true, closing: true}),
    motion: 'wissem',
    note: 'Independent portfolio experiment.',
  },
  {
    slug: 'niumi-distributors', id: 'niumi', name: 'Niumi Distributors', type: 'B2B distribution', category: 'Websites',
    line: 'Making a broad offer feel clear.',
    summary: 'A B2B website that brings a distributor’s brands and products into focus',
    intro: 'A B2B website for a distributor in Papua New Guinea, bringing brands, products and commercial enquiries into one clear experience.',
    approach: 'The design organises a wide-ranging offer into recognisable destinations. Product discovery and brand navigation support the commercial purpose of the site.',
    focus: ['Business website', 'Catalogue structure', 'Development'],
    url: 'https://niumidistributors.com/',
    color: {bg: '#d5222a', fg: '#ffffff'},
    logo: {src: '/logos/niumi.png', ratio: 1.869},
    mockup: mockups('niumi', {wide: true, pair: true, closing: true}),
  },
  {
    slug: 'blue-pacific', id: 'bluepacific', name: 'Blue Pacific', type: 'Sourcing & logistics', category: 'Websites',
    line: 'A clear route through a complex business.',
    summary: 'A logo and a clear digital presence for sourcing and trade services',
    intro: 'A new identity and a focused digital presence for sourcing and trade services. We designed the logo, then a website that makes the offer understandable and the next conversation easy to start.',
    approach: 'Clear service hierarchy and straightforward navigation turn a complex business into a readable web experience. The emphasis is on useful information, not unnecessary decoration.',
    focus: ['Logo design', 'Service architecture', 'Web design & development'],
    url: 'https://bluepacifictradesolutions.com/',
    color: {bg: '#062f63', fg: '#ffffff'},
    logo: {src: '/logos/bluepacific.png', ratio: 2.5},
    mockup: mockups('bluepacific', {wide: true, pair: true, closing: true}),
    // The studio designed the logo (confirmed by the owner, 2026-10-08); colours sampled from the published logo file.
    identity: {
      board: scene('bluepacific', 'identity', 'The Blue Pacific Trade Solutions logo on white, beside its navy, deep blue and blue'),
      text: 'We designed the Blue Pacific Trade Solutions logo: a BPTS monogram with a blue sweep through the P, the name set wide beneath it and a closing line for trade solutions.',
    },
  },
  {
    slug: 'loyalty-pass', id: 'loyalty', name: 'Loyalty Pass', type: 'A TBS product', category: 'Products',
    line: 'A reason to come back.',
    summary: 'A wallet loyalty product that gives customers a reason to return',
    intro: 'A digital loyalty product built around the wallet customers already carry. Apple Wallet and Google Wallet passes connect repeat visits with a simpler experience.',
    approach: 'The merchant app keeps the counter simple: scan, stamp, reward. Offers, rewards and the card itself are managed from the same phone, while an admin workspace follows the whole network.',
    focus: ['Product design', 'Wallet loyalty', 'Web application'],
    url: 'https://www.tbsloyaltypass.com/',
    color: {bg: '#060f90', fg: '#ffffff'},
    logo: {src: '/logos/loyalty.png', ratio: 5.094},
    mockup: {
      ...mockups('loyalty', {wide: true, pair: true, closing: true}),
      opening: scene('loyalty', 'opening', 'Loyalty Pass, the admin workspace on a laptop and the merchant app on a phone'),
      wide: scene('loyalty', 'wide', 'Loyalty Pass, the merchant app and the admin workspace in perspective'),
      pair: [scene('loyalty', 'pair-1', 'Loyalty Pass, the admin workspace in two browser windows'), scene('loyalty', 'pair-2', 'Loyalty Pass, the merchant app on a phone beside an illustration of the pass')],
    },
    // From the product's own screens (owner captures, 2026-10-08).
    highlights: [
      {title: 'A stamp in seconds', body: 'Counter mode scans the customer’s QR, identifies the card and validates the visit in three steps, by camera or pass code.'},
      {title: 'Know your regulars', body: 'Every customer with their stamps, their Wallet status and the rewards ready to claim. Search, filter and export to CSV.'},
      {title: 'A reason to return', body: 'Write an offer for web card and Wallet customers, test it on your own card, then schedule it for the right moment.'},
      {title: 'Rewards on your terms', body: 'Set the threshold and the stock; the reward is redeemed from the scanner once a customer reaches it.'},
      {title: 'Your card, always current', body: 'Logo, colours and rewards are edited in one place and installed Wallet cards update automatically. Cashiers get a scanner-only login.'},
      {title: 'Every merchant, one clear view', body: 'An admin workspace follows the whole network: activity, retention, Wallet adoption and a 14-day scan trend, with insights that suggest the next action.'},
    ],
    note: 'Product screens shown with demonstration data, labelled DEMO DATA: the figures are not results. The pass is a product illustration.',
  },
  {
    slug: 'howard-crm', id: 'howard', name: 'Howard Partners', type: 'Bespoke CRM', category: 'Products',
    line: 'A working day, better connected.',
    summary: 'A CRM built for one firm, around the way it prospects',
    intro: 'A CRM designed and built for Howard Partners: accounts, contacts, market signals, campaigns, pipeline and an AI copilot, shaped around the way the firm prospects.',
    approach: 'The work began with a precise analysis of the firm’s prospecting: where the hours went, which steps repeated, and what the tools on the market would cost for the same job. The system answers it point by point: one cockpit for the day, automation where the work repeats, and settings the firm adjusts itself.',
    focus: ['Bespoke business application', 'Process and cost analysis', 'AI copilot'],
    // The CRM is private: the link leads to a conversation about a system of your own.
    url: '/contact',
    visit: 'Talk about your system',
    color: {bg: '#cbd0d6', fg: '#101b37'},
    logo: {src: '/logos/howard.png', ratio: 2.25},
    // Screens of the real CRM from the owner's anonymised captures, only those an audit cleared (2026-10-08).
    mockup: {
      ...mockups('howard', {wide: true, pair: true, closing: true}),
      opening: scene('howard', 'opening', 'Howard Partners CRM: the cockpit on a laptop, Howard Prime on a phone'),
      wide: scene('howard', 'wide', 'Howard Partners CRM, screens in perspective'),
      pair: [scene('howard', 'pair-1', 'Howard Partners CRM: the reports and the data model in two windows'), scene('howard', 'pair-2', 'Howard Partners CRM: Howard Prime, the AI copilot, on a laptop')],
    },
    highlights: [
      {title: 'A cockpit for the day', body: 'Everything that needs doing now in one queue: market signals to sort, meetings, follow-ups, tasks and priorities, with the day’s agenda beside it.'},
      {title: 'Score and heat', body: 'Each account carries a fit score and a heat. The score says the fit, the heat says the moment; together they say the next action.'},
      {title: 'Campaigns on schedule', body: 'A sending window, a daily cap per mailbox and follow-up delays: messages leave on their own at the right hour, drafts land in Outlook.'},
      {title: 'A pipeline you can read', body: 'Weighted pipeline, funnel, monthly forecast, conversion stage by stage, loss reasons and client health, in reports the firm arranges itself.'},
      {title: 'Howard Prime, the AI copilot', body: 'Attach a record and ask: the CRM passes it on, Prime prepares the meeting or drafts the message, and nothing enters the CRM without the user’s say.'},
      {title: 'Built around the firm', body: 'Custom fields, record layouts, custom objects and the data model are set inside the CRM, and accounts stay in step with the public company registry.'},
    ],
    // Estimates from public list prices (October 2026); the basis is printed under the figures.
    costCase: {
      lead: 'What the same scope would cost off the shelf, before anything is adapted to the firm.',
      figures: [
        {value: '€20–44k', label: 'a year in licences for ten users: a CRM that allows a custom data model, sequences, an AI sales assistant and company signals.'},
        {value: '€3.5–40k', label: 'to set it up, from a vendor’s onboarding fee to an integrator’s project.'},
        {value: '€150–350', label: 'per user and per month, from the CRM edition alone to the same with sequences and an AI assistant.'},
      ],
      basis: 'Estimates from public list prices in October 2026, annual billing, before discounts: HubSpot Sales Hub Enterprise ($150 a seat, $3,500 onboarding) up to Salesforce Sales Cloud Enterprise with Sales Engagement and Agentforce ($175 + $50 + $125 a user), plus a company data and signals subscription (about €2,250 a year); integrator projects for small teams run $15,000 to $40,000. Dollar list prices are counted one for one in euros. These are not Howard Partners’ accounts.',
    },
    note: 'Screens from the real CRM, anonymised: names, companies and amounts shown are fictional.',
  },
];

export const projectBySlug = (slug: string) => projects.find(project => project.slug === slug);
export const projectNumber = (project: Project) => String(projects.indexOf(project) + 1).padStart(2, '0');

/** The work index, in the reference's numbered chapters: two projects each. */
export const groups = [
  {
    id: 'brand-websites', title: 'Brand websites',
    body: 'Image-led websites with a point of view, built to make the first impression and carry it all the way to the last click.',
    service: 'website-creation', projects: ['eva-meszoly', 'kobble-cottage'],
  },
  {
    id: 'business-websites', title: 'Business websites',
    body: 'Clear structures for broad offers and complex businesses, so the next conversation is easy to start.',
    service: 'full-digitalisation-bundle', projects: ['niumi-distributors', 'blue-pacific'],
  },
  {
    id: 'products', title: 'Products + applications',
    body: 'Wallet loyalty and bespoke tools, designed around the people who use them every day.',
    service: 'bespoke-crm', projects: ['loyalty-pass', 'howard-crm'],
  },
  {
    id: 'experiments', title: 'Experiments',
    body: 'Studio projects where we test new ways to discover work online. The next one could be yours.',
    service: null, projects: ['wissem-os'],
  },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  headline: string;
  intro: string;
  items: {name: string; body: string}[];
  project: string;
  /** A second project for the featured pair; null when only the first shows this work. */
  second?: string | null;
  image: Media;
};

export const services: Service[] = [
  {slug: 'website-creation', title: 'Websites', short: 'Your identity, built for the web.', headline: 'Not another website.', intro: 'A distinct digital home that makes your business clear, memorable and easy to engage with.', items: [{name: 'Direction first', body: 'We define the structure, visual language and content priorities around your business.'}, {name: 'Designed to explore', body: 'Clear navigation and considered interactions help people find what they need.'}, {name: 'Built to work', body: 'Responsive development, accessible foundations and practical performance checks prepare the site for everyday use.'}], project: 'eva-meszoly', image: scene('eva', 'pair-2')},
  {slug: 'brand-identity', title: 'Brand identity', short: 'A mark that is yours.', headline: 'Recognised at first glance.', intro: 'Logos and visual identities that give a business a face of its own, drawn to work on a website first and everywhere after.', items: [{name: 'The mark', body: 'A logo drawn for your name and your trade, legible from a browser tab to a shop front.'}, {name: 'The system', body: 'Colours, typography and simple rules, so every page, post and document looks like the same business.'}, {name: 'Ready to use', body: 'The identity goes straight into your website, with the files you need for everything else.'}], project: 'blue-pacific', second: null, image: scene('bluepacific', 'identity')},
  {slug: 'loyalty-pass', title: 'Loyalty', short: 'Turn a visit into a habit.', headline: 'Give them a reason to return.', intro: 'Digital loyalty for Apple Wallet and Google Wallet, designed around the relationship between your business and its customers.', items: [{name: 'In their wallet', body: 'A digital pass gives customers a familiar place to keep their loyalty card.'}, {name: 'A useful programme', body: 'Define the visits, rewards and customer experience that fit the way your business operates.'}, {name: 'Connected follow-up', body: 'Plan the customer journey beyond the first visit, with clear rules and practical administration.'}], project: 'loyalty-pass', image: scene('loyalty', 'opening')},
  {slug: 'automated-bookings', title: 'Bookings', short: 'Less back-and-forth. More bookings.', headline: 'Make the next step simple.', intro: 'A booking journey that brings your website, availability and customer communications together.', items: [{name: 'Easy discovery', body: 'Help people understand the service and find the right booking route.'}, {name: 'Clear availability', body: 'Connect suitable scheduling tools so visitors can choose a time without another phone call.'}, {name: 'Helpful reminders', body: 'Plan confirmations and reminders around the actual appointment experience.'}], project: 'kobble-cottage', image: scene('kobble', 'closing')},
  {slug: 'client-follow-up-crm', title: 'Client follow-up', short: 'Keep the conversation going.', headline: 'After the first hello.', intro: 'A considered follow-up system for enquiries, reviews, reminders and returning customers.', items: [{name: 'Organised contacts', body: 'Bring key contact information and next actions into a useful working view.'}, {name: 'Timely communication', body: 'Build appropriate follow-ups around real customer moments, not a stream of generic messages.'}, {name: 'Practical workflows', body: 'Make the next task clear, from responding to an enquiry to reconnecting after a visit.'}], project: 'howard-crm', image: scene('howard', 'opening')},
  {slug: 'seo-performance-insights', title: 'Search & performance', short: 'Be found. Be understood.', headline: 'Built to be found.', intro: 'Technical search foundations, local visibility and performance work that help your website do its job.', items: [{name: 'Search foundations', body: 'Structure content, metadata and indexing so search engines can understand the important pages.'}, {name: 'Local clarity', body: 'Align business information and relevant pages with how people look for your services.'}, {name: 'Useful insights', body: 'Measure what matters to your business and turn performance reviews into practical next steps.'}], project: 'niumi-distributors', image: scene('niumi', 'pair-1')},
  {slug: 'full-digitalisation-bundle', title: 'The full system', short: 'One connected digital experience.', headline: 'Made to work together.', intro: 'Your website, bookings, loyalty and client follow-up designed as a connected system rather than separate tasks.', items: [{name: 'Map the journey', body: 'Understand how people discover, contact, book and return to your business.'}, {name: 'Connect the essentials', body: 'Choose the right combination of website, scheduling, loyalty and customer workflows.'}, {name: 'Launch and follow through', body: 'Test the complete journey, hand over the tools and plan the next improvements.'}], project: 'blue-pacific', image: scene('bluepacific', 'opening')},
  {slug: 'bespoke-crm', title: 'Bespoke applications', short: 'Tools shaped around your business.', headline: 'Your workflow. Your tools.', intro: 'Custom business applications built from a precise analysis of the work and what it costs, with interfaces designed for the people using them.', items: [{name: 'Analyse first', body: 'We map how the work is really done, where the hours go and what the tools on the market would cost for the same job.'}, {name: 'Design for daily use', body: 'Clear screens, useful navigation and automation where the work repeats, so the team spends its time on the work itself.'}, {name: 'A system that pays its way', body: 'Built to your process and adjustable from inside, with a cost you can weigh against the licences and the hours it replaces.'}], project: 'howard-crm', image: scene('howard', 'opening')},
];

export const serviceBySlug = (slug: string) => services.find(service => service.slug === slug);

export const steps = [
  ['Conversation', 'We listen to what you do, where you are and what needs to change.'],
  ['Written scope', 'We agree the priorities, deliverables and a practical plan before building.'],
  ['Design & build', 'We develop the direction together, then turn it into a working experience.'],
  ['Launch & follow-up', 'We check the journeys, hand over the tools and support the first steps.'],
] as const;

export const email = 'Agency.tobeseen@gmail.com';
export const briefUrl = 'https://form.tobeseen.agency';
export const founded = 2024;
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tobeseen.agency';
/** Only the production build served on tobeseen.agency is open to search engines; previews and the tbs-website staging copy stay noindex. */
export const indexed = process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL === 'tobeseen.agency';
