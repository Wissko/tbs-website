import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { services } from "../../lib/services";

function Header() {
  return (
    <header className="work-header">
      <Link className="work-brand" href="/">TBS°</Link>
      <p className="work-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="work-plus">+</span>
      <Link className="work-menu" href="/menu">( MENU ) <span>+</span></Link>
    </header>
  );
}

export default function WorkPage() {
  return (
    <main className="work-shell">
      <section className="work-canvas">
        <Header />

        <section className="work-content work-services-content" aria-label="TBS services">
          <h1 className="services-title-a11y">SERVICES</h1>
          <figure className="services-title-art" aria-hidden="true">
            <Image
              src="/images/uploads/services-title-art.png"
              alt=""
              width={1536}
              height={620}
              priority
              sizes="(max-width: 900px) 92vw, 760px"
            />
          </figure>
          <nav className="work-filters" aria-label="Service filters">
            <a className="active" href="#core-offers">CORE OFFERS</a>
            <a href="#visibility">VISIBILITY</a>
            <a href="#retention">RETENTION</a>
            <a href="#scheduling">SCHEDULING</a>
            <a href="#crm">CRM</a>
            <a href="#bundle">BUNDLE</a>
          </nav>

          <div className="work-grid work-services-grid" id="core-offers">
            {services.map((service) => (
              <Link className="work-service-card" href={`/services/${service.slug}`} key={service.slug}>
                <span className="work-service-number">{service.n}</span>
                <span className="work-service-label">{service.label}</span>
                <h2>{service.title}</h2>
                <p>{service.short}</p>
                <b>VIEW SERVICE <span>→</span></b>
              </Link>
            ))}
          </div>

          <footer className="work-stats work-services-stats">
            <div><strong>06</strong><span>CORE OFFERS</span></div>
            <div><strong>01</strong><span>COHERENT SYSTEM</span></div>
            <div><strong>24</strong><span>HOUR STRUCTURE</span></div>
            <Link href="/contact">BOOK A CALL <span>→</span></Link>
          </footer>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
