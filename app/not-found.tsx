import Link from "next/link";
import Marks from "../components/Marks";
import PageShell from "../components/PageShell";
import { brand } from "../lib/brand";

export default function NotFound() {
  return (
    <PageShell tone="ink">
      <section className="container notfound">
        <Marks />
        <p className="eyebrow">404</p>
        <h1 className="display ink-title">
          This page<br />is not here.
        </h1>
        <p className="lede">The link may be old, or the page has moved. Everything that exists is one tap away.</p>
        <div className="hero-actions">
          <Link className="btn btn--primary" href="/">Back home <span aria-hidden="true">→</span></Link>
          <Link className="arrow-link" href="/services">{brand.cta.secondary} <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </PageShell>
  );
}
