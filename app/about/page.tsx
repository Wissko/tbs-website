import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

export default function AboutPage() {
  return (
    <main className="simple-page-shell">
      <section className="simple-page-canvas">
        <header className="simple-page-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <div className="simple-page-content">
          <span>STUDIO PROFILE</span>
          <h1>ABOUT TBS</h1>
          <p>A digital creative studio shaping memorable identities, websites, campaigns and digital systems for ambitious brands.</p>
          <Link href="/" className="simple-page-back">← Back home</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
