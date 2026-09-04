import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import MenuOverlay from "../components/MenuOverlay";
import ScrollFx from "../components/ScrollFx";
import StructuredData from "../components/StructuredData";
import { bookingHref, brand } from "../lib/brand";
import { primaryNav } from "../lib/nav";
import { services } from "../lib/services";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const text = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} — ${brand.claim}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [
    "to be seen",
    "to be seen agency",
    "tobeseen",
    "tobeseen agency",
    "TBS",
    "digital agency",
    "agence digitale",
    "loyalty pass",
    "wallet loyalty",
    "website creation",
    "booking automation",
    "client follow-up",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${brand.name} Agency`,
    url: brand.siteUrl,
    title: `${brand.name} — ${brand.claim}`,
    description: brand.description,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {/* Sprayed-ink edge used by `.ink-title`. Defined once, referenced by CSS. */}
        <svg className="svg-defs" aria-hidden="true" focusable="false" width="0" height="0">
          <filter id="ink-spray" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.028 0.95" numOctaves="2" seed="7" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
        {/* Always reachable: the menu button is fixed, outside the page transition wrapper. */}
        <MenuOverlay
          links={primaryNav}
          services={services.map((service) => ({ label: service.title, href: `/services/${service.slug}` }))}
          email={brand.contact.email}
          bookingHref={bookingHref}
          ctaLabel={brand.cta.primary}
          line={brand.manifesto.line}
        />
        <ScrollFx />
        <StructuredData />
      </body>
    </html>
  );
}
