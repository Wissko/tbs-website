import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { resultItems } from "../../lib/results";

function Header() {
  return (
    <header className="results-reference-header">
      <Link className="results-reference-brand" href="/">TBS°</Link>
      <p>Premium Business Systems<br />Website · Wallet Loyalty<br />Booking · Follow-Up</p>
      <nav aria-label="Results sections">
        <a href="#outcomes">Outcome</a>
        <a href="#trust">Trust</a>
        <a href="#speed">Speed</a>
        <a href="#retention">Retention</a>
      </nav>
      <Link className="results-reference-services" href="/work">View services →</Link>
      <Link className="results-reference-menu" href="/menu">[ Menu ] <span>+</span></Link>
    </header>
  );
}

export default function ResultsPage() {
  return (
    <main className="results-reference-page">
      <section className="results-reference-canvas">
        <Header />

        <section className="results-reference-hero" aria-labelledby="results-title">
          <div>
            <Link className="results-reference-back" href="/">← Back to home</Link>
            <h1 id="results-title" className="results-title-a11y">RESULTS</h1>
            <figure className="results-reference-title-art" aria-hidden="true">
              <Image
                src="/images/uploads/results-title-art.png"
                alt=""
                width={1774}
                height={887}
                priority
                sizes="(max-width: 900px) 92vw, 760px"
              />
            </figure>
            <p>We remove the digital weak points that quietly cost businesses revenue: weak trust, slow response, manual booking loops, and absent follow-up.</p>
          </div>
          <div className="results-reference-seal" aria-hidden="true">
            <span>Premium systems · measurable outcomes ·</span>
            <b>+</b>
          </div>
        </section>

        <section className="results-reference-list" id="outcomes" aria-label="Business results">
          {resultItems.map((item) => (
            <Link className="results-reference-row" href={`/results/${item.slug}`} key={item.slug} id={item.label.toLowerCase()}>
              <div className="results-reference-index">
                <strong>{item.metric}</strong>
                <span>{item.label}</span>
              </div>
              <figure>
                <Image src={item.src} alt="Decorative black and white result visual" width={560} height={210} />
              </figure>
              <div className="results-reference-copy">
                <h2>{item.title}</h2>
                <p>{item.short}</p>
              </div>
              <span className="results-reference-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </section>

        <section className="results-reference-cta" aria-label="Next step">
          <h2>Let’s build systems<br />that drive results.</h2>
          <p>Site design, automation and digital structure built to improve the commercial backbone of your business.</p>
          <Link href="/work">View services →</Link>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
