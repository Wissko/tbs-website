import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="TBS studio footer">
      <div className="site-footer-line site-footer-line-top" aria-hidden="true" />
      <div className="site-footer-main">
        <div className="site-footer-brand-block">
          <Link className="site-footer-logo" href="/">TBS°</Link>
          <p className="site-footer-tagline">
            Digital Creative Studio<br />
            Building Bold Experiences<br />
            And Brands.
          </p>
        </div>

        <div className="site-footer-star" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <figure className="site-footer-sphere" aria-hidden="true">
          <Image
            src="/images/uploads/tbs-footer-sphere.jpg"
            alt=""
            fill
            sizes="(max-width: 760px) 240px, 310px"
          />
        </figure>

        <span className="site-footer-plus" aria-hidden="true">+</span>
      </div>
      <div className="site-footer-line site-footer-line-bottom" aria-hidden="true" />

      <div className="site-footer-bottom">
        <p className="site-footer-legal">
          © 2024 TBS STUDIO.<br />
          All rights reserved.
        </p>
        <nav className="site-footer-links" aria-label="Footer links">
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true" />
          <Link href="/terms">Terms of Service</Link>
          <span aria-hidden="true" />
          <Link href="/careers">Careers</Link>
        </nav>
      </div>
    </footer>
  );
}
