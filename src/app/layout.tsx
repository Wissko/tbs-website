import type {Metadata, Viewport} from 'next';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {Runtime} from '@/components/runtime';
import {SiteCursor} from '@/components/site-cursor';
import {TbsMark} from '@/components/ui';
import {baseUrl, email, founded, indexed, services} from '@/lib/data';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/chrome.css';
import '../styles/home.css';
import '../styles/pages.css';

const description = 'To Be Seen is an independent design and development studio building websites, digital products and loyalty experiences for independent businesses.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {default: 'To Be Seen | Independent design & development studio', template: '%s | To Be Seen'},
  description,
  applicationName: 'To Be Seen',
  // The names people search the studio by, carried over from the previous site.
  keywords: ['to be seen', 'to be seen agency', 'tobeseen', 'tobeseen agency', 'TBS', 'design studio', 'digital agency', 'agence digitale', 'website creation', 'brand identity', 'loyalty pass', 'wallet loyalty', 'booking automation', 'client follow-up', 'bespoke CRM'],
  robots: indexed ? {index: true, follow: true} : {index: false, follow: false},
  openGraph: {type: 'website', siteName: 'To Be Seen', locale: 'en_AU', images: [{url: '/brand/tbs-full.jpg', width: 1200, height: 1200, alt: 'To Be Seen'}]},
  icons: {icon: '/brand/tbs-full.jpg', apple: '/brand/tbs-full.jpg'},
};

/** Schema.org graph for search engines, built from the site's own data so it cannot drift from the pages. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {'@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'To Be Seen', alternateName: ['To Be Seen Agency', 'TO BE SEEN', 'TBS', 'tobeseen', 'tobeseen agency'], url: baseUrl, email, description, logo: `${baseUrl}/brand/tbs-full.jpg`, image: `${baseUrl}/brand/tbs-full.jpg`, foundingDate: String(founded)},
    {'@type': 'WebSite', '@id': `${baseUrl}/#website`, url: baseUrl, name: 'To Be Seen', alternateName: ['To Be Seen Agency', 'tobeseen agency'], publisher: {'@id': `${baseUrl}/#organization`}, inLanguage: 'en-AU'},
    {
      '@type': 'ProfessionalService', '@id': `${baseUrl}/#service`, name: 'To Be Seen', url: baseUrl, email, image: `${baseUrl}/brand/tbs-full.jpg`, description,
      areaServed: 'Australia', availableLanguage: ['English', 'French'], parentOrganization: {'@id': `${baseUrl}/#organization`},
      hasOfferCatalog: {'@type': 'OfferCatalog', name: 'To Be Seen services', itemListElement: services.map(service => ({'@type': 'Offer', itemOffered: {'@type': 'Service', name: service.title, description: service.intro, url: `${baseUrl}/services/${service.slug}`}}))},
    },
  ],
};

export const viewport: Viewport = {themeColor: '#f4f4f4'};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en-AU" data-initial="true" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/public-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{__html: "document.documentElement.classList.add('js')"}} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="takeover" aria-hidden="true">
          <div className="takeover__mask"><div className="takeover__inner"><TbsMark label={null} className="takeover__mark" /></div></div>
        </div>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
        <Runtime />
        <SiteCursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
      </body>
    </html>
  );
}
