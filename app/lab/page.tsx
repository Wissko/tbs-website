import Link from "next/link";

export default function LabPage() {
  return (
    <main className="simple-page-shell">
      <section className="simple-page-canvas">
        <header className="simple-page-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <div className="simple-page-content">
          <span>EXPERIMENTS</span>
          <h1>TBS LAB</h1>
          <p>A space for experiments, motion studies, interface prototypes and emerging creative technology.</p>
          <Link href="/" className="simple-page-back">← Back home</Link>
        </div>
      </section>
    </main>
  );
}
