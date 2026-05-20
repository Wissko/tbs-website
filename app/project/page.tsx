import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="project-header">
      <Link className="project-brand" href="/">TBS°</Link>
      <p className="project-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="project-plus">+</span>
      <a className="project-menu" href="#menu">( MENU ) <span>+</span></a>
    </header>
  );
}

export default function ProjectPage() {
  return (
    <main className="project-shell">
      <section className="project-canvas">
        <Header />

        <nav className="project-nav" aria-label="Project navigation">
          <Link href="/work">← BACK TO ALL WORKS</Link>
          <a href="#next">NEXT PROJECT →</a>
        </nav>

        <aside className="project-info">
          <h1>MAISON<br />NOIR<br />WEBSITE</h1>
          <p className="project-meta">WEB DESIGN — 2024</p>
          <div className="project-tags"><span>WEB DESIGN</span><span>DEVELOPMENT</span></div>

          <p className="project-desc">A digital experience crafted for Maison Noir, a visionary brand blending minimal design with timeless sophistication.</p>

          <section>
            <h2>THE CHALLENGE</h2>
            <p>Create a high-end website that captures the dark, artistic universe of Maison Noir while ensuring a seamless and immersive user experience.</p>
          </section>

          <section>
            <h2>THE SOLUTION</h2>
            <p>A minimalistic website with bold visuals, smooth interactions and a focus on storytelling.</p>
          </section>
        </aside>

        <figure className="project-hero-image">
          <Image src="/mockups/project-hero.jpg" alt="Maison Noir project visual" fill priority sizes="849px" />
        </figure>

        <a className="project-view" href="#view"><span>VIEW PROJECT</span><b>→</b></a>
      </section>
    </main>
  );
}
