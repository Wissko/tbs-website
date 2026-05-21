import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

export default function CareersPage() {
  return (
    <main className="simple-page-shell">
      <section className="simple-page-canvas">
        <header className="simple-page-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <div className="simple-page-content">
          <span>JOIN THE STUDIO</span>
          <h1>CAREERS</h1>
          <p>We are always open to sharp creative minds, designers, developers and strategy profiles.</p>
          <Link href="/" className="simple-page-back">← Back home</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
