import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

const results = [
  { metric: "01", title: <>BETTER FIRST<br />IMPRESSION</>, text: "A sharper website and clearer positioning make the business easier to trust from the first click.", src: "/mockups/journal-01.jpg" },
  { metric: "02", title: <>FASTER RESPONSE<br />TIME</>, text: "Booking and contact flows remove friction so prospects can act without waiting for manual back-and-forth.", src: "/mockups/journal-02.jpg" },
  { metric: "03", title: <>LESS ADMIN<br />DRAG</>, text: "Automated scheduling, reminders, and follow-up reduce repetitive work for the team.", src: "/mockups/journal-03.jpg" },
  { metric: "04", title: <>MORE REPEAT<br />REVENUE</>, text: "Wallet loyalty and CRM journeys bring past clients back instead of letting demand go quiet.", src: "/mockups/journal-04.jpg" },
];

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
    <main className="journal-shell">
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
            {results.map((item) => (
              <article className="journal-row results-row" key={item.metric}>
                <Image src={item.src} alt="Decorative business system visual" width={304} height={118} />
                <div>
                  <time>{item.metric} / WHY IT WORKS</time>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
                <Link href="/contact" aria-label="Book a strategy call">→</Link>
              </article>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
