import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "../../../components/CtaBand";
import PageShell from "../../../components/PageShell";
import { brand } from "../../../lib/brand";
import { getResult, resultItems } from "../../../lib/results";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return resultItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getResult(slug);
  if (!item) return {};
  return {
    title: `${item.title} · What changes`,
    description: item.short,
    openGraph: { title: `${item.title} · ${brand.short}`, description: item.short },
  };
}

export default async function ResultDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getResult(slug);
  if (!item) notFound();

  const index = resultItems.findIndex((entry) => entry.slug === item.slug);
  const next = resultItems[(index + 1) % resultItems.length];

  return (
    <PageShell tone="paper">
      <nav className="page-nav" aria-label="Section navigation">
        <Link href="/results">← What changes</Link>
        <Link href={`/results/${next.slug}`}>Next: {next.label} →</Link>
      </nav>

      <section className="detail-hero" aria-labelledby="result-title">
        <div className="detail-hero-copy">
          <p className="eyebrow">
            {item.metric} / {item.label}
          </p>
          <h1 id="result-title" className="display h1 ink-title">{item.title}</h1>
          <p className="lede">{item.short}</p>
        </div>
        <figure className="detail-media">
          <Image src={item.src} alt={item.alt} fill priority sizes="(max-width: 820px) 100vw, 45vw" />
        </figure>
      </section>

      <section className="section container two-col" aria-label="Why it matters">
        <div>
          <p className="eyebrow">Why it matters</p>
          <p className="lede">{item.detail}</p>
          <p className="mute">{item.why}</p>
        </div>
        <div>
          <p className="eyebrow">What changes</p>
          <ul className="dash-list">
            {item.proof.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mute">{item.next}</p>
          <Link className="arrow-link" href={item.nextHref}>
            View the service <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
