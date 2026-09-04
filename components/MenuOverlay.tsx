"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavLink } from "../lib/nav";

type Props = {
  links: NavLink[];
  services: NavLink[];
  email: string;
  bookingHref: string;
  ctaLabel: string;
  line: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Full-screen menu as an overlay: the page underneath is kept, closing returns
 * to it, Escape closes, focus goes in and comes back out.
 */
export default function MenuOverlay({ links, services, email, bookingHref, ctaLabel, line }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const id = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
      >
        ( Menu ) <span aria-hidden="true">+</span>
      </button>

      <div
        id={id}
        className={`menu-overlay tone-ink${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="menu-panel">
          <div className="menu-head">
            <span className="menu-wordmark display">TBS°</span>
            <button type="button" className="menu-close" onClick={() => setOpen(false)}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="menu-nav" aria-label="Main">
            <ul>
              {links.map((link, index) => (
                <li key={link.href} style={{ "--i": index } as React.CSSProperties}>
                  <Link
                    href={link.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  >
                    <span className="display">{link.label}</span>
                    <em aria-hidden="true">→</em>
                  </Link>
                </li>
              ))}
              <li style={{ "--i": links.length } as React.CSSProperties}>
                <a className="menu-cta" href={bookingHref}>
                  <span className="display">{ctaLabel}</span>
                  <em aria-hidden="true">→</em>
                </a>
              </li>
            </ul>
          </nav>

          <aside className="menu-aside">
            <div className="menu-col">
              <h2 className="eyebrow">Services</h2>
              <ul>
                {services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} aria-current={isActive(pathname, service.href) ? "page" : undefined}>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-col">
              <h2 className="eyebrow">Write to us</h2>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </aside>

          <p className="menu-foot display">{line}</p>
        </div>
      </div>
    </>
  );
}
