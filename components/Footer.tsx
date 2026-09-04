import Image from "next/image";
import Link from "next/link";
import { brand, copyrightLine } from "../lib/brand";
import { legalNav, primaryNav } from "../lib/nav";

export default function Footer() {
  return (
    <footer className="site-footer tone-ink" aria-label="Site footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="footer-wordmark display" href="/">{brand.short}</Link>
            <p className="footer-tagline">
              {brand.tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <a className="footer-mail" href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-star" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <figure className="footer-sphere" aria-hidden="true">
            <Image src="/images/uploads/tbs-footer-sphere.jpg" alt="" fill sizes="(max-width: 760px) 220px, 300px" />
          </figure>
          <span className="footer-plus" aria-hidden="true">+</span>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">{copyrightLine}</p>
          <nav className="footer-links" aria-label="Legal">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
