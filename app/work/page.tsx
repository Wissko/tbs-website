import Image from "next/image";
import Link from "next/link";

const works = [
  { n: "01", title: "MAISON NOIR", type: "WEBSITE", src: "/mockups/work-card-01.jpg", className: "work-card small" },
  { n: "02", title: "NEXUS AI", type: "BRANDING", src: "/mockups/work-card-02.jpg", className: "work-card small" },
  { n: "03", title: "DUPONT", type: "CAMPAIGN", src: "/mockups/work-card-03.jpg", className: "work-card tall" },
  { n: "04", title: "VANTA", type: "BRANDING", src: "/mockups/work-card-04.jpg", className: "work-card small" },
  { n: "05", title: "ALPHA SOURCE", type: "EXPERIENCE", src: "/mockups/work-card-05.jpg", className: "work-card small" },
];

function Header() {
  return (
    <header className="work-header">
      <Link className="work-brand" href="/">TBS°</Link>
      <p className="work-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="work-plus">+</span>
      <a className="work-menu" href="/menu">( MENU ) <span>+</span></a>
    </header>
  );
}

export default function WorkPage() {
  return (
    <main className="work-shell">
      <section className="work-canvas">
        <Header />

        <section className="work-content" aria-label="All works">
          <h1>ALL WORKS</h1>
          <nav className="work-filters" aria-label="Work filters">
            <a className="active" href="#all">ALL</a>
            <a href="#branding">BRANDING</a>
            <a href="#websites">WEBSITES</a>
            <a href="#campaigns">CAMPAIGNS</a>
            <a href="#systems">SYSTEMS</a>
            <a href="#digital-products">DIGITAL PRODUCTS</a>
          </nav>

          <div className="work-grid">
            {works.map((work) => (
              <article className={work.className} key={work.n}>
                <Image src={work.src} alt={`${work.title} ${work.type}`} fill sizes="(max-width: 900px) 100vw, 32vw" />
                <span className="work-number sr-only">[{work.n}]</span>
                <div className="work-caption sr-only">
                  <h2>{work.title}</h2>
                  <p>{work.type}</p>
                </div>
              </article>
            ))}
          </div>

          <footer className="work-stats">
            <div><strong>+48</strong><span>PROJECTS</span></div>
            <div><strong>+21</strong><span>CLIENTS</span></div>
            <div><strong>07</strong><span>COUNTRIES</span></div>
            <a href="#load">VIEW LOAD MORE <span>→</span></a>
          </footer>
        </section>
      </section>
    </main>
  );
}
