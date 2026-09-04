import Link from "next/link";
import { brand } from "../lib/brand";

/** The one header: orb, wordmark, a printer's cross. The menu button is fixed and lives in the root layout. */
export default function Header() {
  return (
    <header className="site-header">
      <Link className="orb" href="/" aria-label={`${brand.short} — home`}>
        <span className="orb-center" />
        <span className="orb-ring" />
      </Link>
      <Link className="site-wordmark display" href="/">{brand.short}</Link>
      <span className="header-plus" aria-hidden="true">+</span>
    </header>
  );
}
