import Link from "next/link";
import { bookingHref, brand } from "../lib/brand";
import { primaryNav } from "../lib/nav";
import { services } from "../lib/services";
import MenuOverlay from "./MenuOverlay";

/** The one header. Tone (paper / ink) is inherited from the surrounding `.sheet`. */
export default function Header() {
  return (
    <header className="site-header">
      <Link className="orb" href="/" aria-label={`${brand.short} — home`}>
        <span className="orb-center" />
        <span className="orb-ring" />
      </Link>
      <p className="site-tagline">
        {brand.tagline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <span className="header-plus" aria-hidden="true">+</span>
      <MenuOverlay
        links={primaryNav}
        services={services.map((service) => ({ label: service.title, href: `/services/${service.slug}` }))}
        email={brand.contact.email}
        bookingHref={bookingHref}
        ctaLabel={brand.cta.primary}
        line={brand.manifesto.line}
      />
    </header>
  );
}
