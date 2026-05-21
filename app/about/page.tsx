import Link from "next/link";
import ScrollTimeline from "../../components/ScrollTimeline";
import SiteFooter from "../../components/SiteFooter";

export default function AboutPage() {
  return (
    <main className="simple-page-shell about-page-shell">
      <section className="simple-page-canvas about-hero-canvas">
        <header className="simple-page-header about-hero-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">[ MENU ] <span>+</span></Link>
        </header>

        <div className="about-hero-content">
          <span className="about-hero-eyebrow">STUDIO PROFILE</span>
          <span className="about-hero-cross" aria-hidden="true">+</span>
          <h1>ABOUT TBS</h1>
          <p>
            We build premium digital systems that make businesses easier to trust,
            easier to contact, and easier to choose.
          </p>
          <Link href="/work" className="about-hero-cta">DISCOVER OUR APPROACH <span>→</span></Link>
        </div>

        <div className="about-radar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <ScrollTimeline />
      <SiteFooter />
    </main>
  );
}
