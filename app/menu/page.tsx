import Image from "next/image";
import Link from "next/link";
import { services } from "../../lib/services";

const primaryLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "RESULTS", href: "/results" },
  { label: "CONTACT", href: "/contact" },
  { label: "BOOK A CALL", href: "/contact", cta: true },
];

export default function MenuPage() {
  return (
    <main className="menu-page-shell">
      <section className="menu-page-canvas menu-page-canvas-v2">
        <header className="menu-page-header">
          <Link className="menu-page-brand" href="/">TBS°</Link>
          <p>Premium Business Systems<br />Website · Wallet Loyalty<br />Bookings · Follow-Up</p>
          <Link className="menu-page-close" href="/">CLOSE <span>×</span></Link>
        </header>

        <nav className="menu-page-nav menu-page-nav-v2" aria-label="Main menu">
          {primaryLinks.map((link, index) => (
            <Link href={link.href} className={link.cta ? "menu-page-primary-cta" : undefined} key={link.label}>
              <span>[{String(index + 1).padStart(2, "0")}]</span>
              <b className={link.label === "SERVICES" ? "menu-services-art-label" : undefined}>{link.label}</b>
              <em>→</em>
            </Link>
          ))}
        </nav>

        <aside className="menu-page-side menu-page-side-v2">
          <figure><Image src="/mockups/menu-hero.jpg" alt="Menu editorial visual" fill priority sizes="493px" /></figure>
          <div className="menu-page-columns menu-page-services-columns">
            <div>
              <h2>CORE OFFERS</h2>
              <p>
                {services.map((service) => (
                  <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>
                ))}
              </p>
            </div>
            <div>
              <h2>NEXT STEP</h2>
              <p><Link href="/contact">Book a strategy call</Link><br />Built to be trusted<br />Structured for better growth</p>
            </div>
            <div>
              <h2>COMPANY</h2>
              <p><Link href="/about">About</Link><br /><Link href="/results">Results</Link><br /><Link href="/careers">Careers</Link><br /><Link href="/contact">Contact</Link></p>
            </div>
          </div>
        </aside>

        <footer className="menu-page-footer">
          <span>✳</span>
          <h2>EXCELLENCE DESERVES<br />AN AUDIENCE.</h2>
          <p>© 2026 TO BE SEEN<br />Premium business systems.</p>
          <nav>
            <Link href="/privacy">PRIVACY POLICY</Link>
            <Link href="/terms">TERMS OF SERVICE</Link>
            <Link href="/contact">BOOK A CALL</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
