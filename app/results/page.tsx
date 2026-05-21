import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { resultItems } from "../../lib/results";

function Header() {
  return (
    <header className="journal-header">
      <Link className="journal-brand" href="/">TBS°</Link>
      <p className="journal-kicker">Premium Business Systems<br />Website · Wallet Loyalty<br />Bookings · Follow-Up</p>
      <span className="journal-plus">+</span>
      <Link className="journal-menu" href="/menu">( MENU ) <span>+</span></Link>
    </header>
  );
}

export default function ResultsPage() {
  return (
    <main className="journal-shell results-shell">
      <section className="journal-canvas results-canvas">
        <Header />

        <aside className="journal-side results-side">
          <Link className="journal-back" href="/">← BACK TO HOME</Link>
          <h1>RESULTS</h1>
          <p>We remove the digital weak points that quietly cost businesses revenue: weak trust, slow response, manual booking loops, and absent follow-up.</p>
        </aside>

        <section className="journal-main results-main" aria-label="Business results">
          <nav className="journal-tabs results-tabs" aria-label="Results categories">
            <div>
              <a className="active" href="#outcomes">OUTCOMES</a>
              <a href="#trust">TRUST</a>
              <a href="#speed">SPEED</a>
              <a href="#retention">RETENTION</a>
            </div>
            <Link href="/work">VIEW SERVICES →</Link>
          </nav>

          <div className="journal-list results-list" id="outcomes">
            {resultItems.map((item) => (
              <Link className="journal-row results-row" href={`/results/${item.slug}`} key={item.slug}>
                <Image src={item.src} alt="Decorative business system visual" width={304} height={118} />
                <div>
                  <time>{item.metric} / {item.label}</time>
                  <h2>{item.title}</h2>
                  <p>{item.short}</p>
                </div>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
