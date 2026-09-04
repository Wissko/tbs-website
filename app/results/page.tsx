import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import Seal from "../../components/Seal";
import { resultItems } from "../../lib/results";

export const metadata: Metadata = {
  title: "What changes",
  description:
    "The four leaks that quietly cost independent businesses their customers, and what closes each one: trust, speed, operations, retention.",
};

export default function ResultsPage() {
  return (
    <PageShell tone="paper">
      <section className="page-hero page-hero--grid" aria-labelledby="results-title">
        <div className="page-hero-copy">
          <p className="eyebrow">What changes</p>
          <div className="title-wrap">
            <Marks />
            <h1 id="results-title" className="display h1 ink-title">
              What<br />changes
            </h1>
          </div>
          <p className="lede">
            We do not sell features. We remove the four things that quietly cost independent businesses their customers: weak trust, slow response, manual admin, and no reason to come back.
          </p>
        </div>
        <Seal id="results-seal" text="What changes · Four leaks · " />
      </section>

      <section className="container" aria-label="The four changes">
        <ul className="outcomes">
          {resultItems.map((item) => (
            <li key={item.slug} id={item.label.toLowerCase()}>
              <Link href={`/results/${item.slug}`} className="outcome-row">
                <span className="outcome-index">
                  <strong>{item.metric}</strong>
                  <span>{item.label}</span>
                </span>
                <figure className="outcome-media">
                  <Image src={item.src} alt="" fill sizes="(max-width: 820px) 100vw, 30vw" />
                </figure>
                <span className="outcome-copy">
                  <h2 className="display">{item.title}</h2>
                  <p>{item.short}</p>
                </span>
                <span className="outcome-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand secondaryHref="/work" secondaryLabel="See the work" />
    </PageShell>
  );
}
