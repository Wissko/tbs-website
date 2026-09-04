import { brand } from "../lib/brand";
import { services } from "../lib/services";

/**
 * Schema.org data for search engines, built from the brand and the service
 * list so it can never drift from the site. Alternate names cover the ways
 * people actually search for the studio.
 */
export default function StructuredData() {
  const site = brand.siteUrl;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: `${brand.name} Agency`,
        alternateName: [brand.name, "TO BE SEEN", "TBS", brand.short, "tobeseen", "tobeseen agency"],
        url: site,
        email: brand.contact.email,
        description: brand.description,
        logo: `${site}/icon.png`,
        image: `${site}/opengraph-image.png`,
        foundingDate: String(brand.foundedYear),
        sameAs: brand.contact.social.map((account) => account.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: `${brand.name} Agency`,
        alternateName: [brand.name, "tobeseen agency"],
        publisher: { "@id": `${site}/#organization` },
        inLanguage: "en-AU",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site}/#service`,
        name: `${brand.name} Agency`,
        url: site,
        email: brand.contact.email,
        image: `${site}/opengraph-image.png`,
        areaServed: "Australia",
        availableLanguage: ["English", "French"],
        description: brand.description,
        priceRange: "$$$",
        parentOrganization: { "@id": `${site}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${brand.name} services`,
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.short,
              url: `${site}/services/${service.slug}`,
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Schema.org payload, built from our own data above.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
