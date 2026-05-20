import Image from "next/image";
import Link from "next/link";

const links = ["HOME", "ABOUT", "WORK", "JOURNAL", "LAB", "CONTACT"];

export default function MenuPage() {
  return (
    <main className="menu-page-shell">
      <section className="menu-page-canvas">
        <header className="menu-page-header">
          <Link className="menu-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="menu-page-close" href="/">CLOSE <span>×</span></Link>
        </header>

        <nav className="menu-page-nav" aria-label="Main menu">
          {links.map((link, index) => (
            <Link href={link === "HOME" ? "/" : `/${link.toLowerCase()}`} key={link}>
              <span>[{String(index + 1).padStart(2, "0")}]</span>
              <b>{link}</b>
              <em>→</em>
            </Link>
          ))}
        </nav>

        <aside className="menu-page-side">
          <figure><Image src="/mockups/menu-hero.jpg" alt="Menu editorial visual" fill priority sizes="493px" /></figure>
          <div className="menu-page-columns">
            <div><h2>LET&apos;S WORK TOGETHER</h2><p>hello@tbs.studio<br />+33 1 84 25 45 12<br />Paris, France</p></div>
            <div><h2>FOLLOW US</h2><p>LinkedIn<br />Instagram<br />X<br />Behance</p></div>
            <div><h2>INFO</h2><p>Privacy Policy<br />Terms of Service<br />Careers</p></div>
          </div>
        </aside>

        <footer className="menu-page-footer">
          <span>✳</span>
          <h2>SHAPING IDEAS.<br />BUILDING IMPACT.</h2>
          <p>© 2024 TBS STUDIO<br />All rights reserved.</p>
          <nav><a>PRIVACY POLICY</a><a>TERMS OF SERVICE</a><a>CAREERS</a></nav>
        </footer>
      </section>
    </main>
  );
}
