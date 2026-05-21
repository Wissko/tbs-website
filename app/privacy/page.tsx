import Link from "next/link";

export default function PrivacyPage() {
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
          <h1>PRIVACY POLICY</h1>
          <p>This page outlines how TBS Studio handles privacy, data and communication requests.</p>
          <Link href="/" className="simple-page-back">← Back home</Link>
        </div>
      </section>
    </main>
  );
}
