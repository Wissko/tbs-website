import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="simple-page-shell">
      <section className="simple-page-canvas">
        <header className="simple-page-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <div className="simple-page-content">
          <span>LEGAL</span>
          <h1>TERMS OF SERVICE</h1>
          <p>General terms for browsing the TBS Studio website and engaging with our digital creative work.</p>
          <Link href="/" className="simple-page-back">← Back home</Link>
        </div>
      </section>
    </main>
  );
}
