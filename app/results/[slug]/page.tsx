import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import { getResult, resultItems } from "../../../lib/results";

type ResultParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return resultItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: ResultParams }) {
  const { slug } = await params;
  const item = getResult(slug);
  if (!item) return {};
  return {
    title: `${item.title} | TBS° Results`,
    description: item.short,
  };
}

function Header() {
  return (
    <header className="article-header result-detail-header">
      <Link className="article-brand" href="/">TBS°</Link>
      <p className="article-kicker">Premium Business Systems<br />Website · Wallet Loyalty<br />Bookings · Follow-Up</p>
      <span className="article-plus">+</span>
      <Link className="article-menu" href="/menu">( MENU ) <span>+</span></Link>
    </header>
  );
}

export default async function ResultDetailPage({ params }: { params: ResultParams }) {
  const { slug } = await params;
  const item = getResult(slug);
  if (!item) notFound();

  return (
    <main className="article-shell result-detail-shell">
      <section className="article-canvas result-detail-canvas">
        <Header />

        <nav className="article-nav result-detail-nav">
          <Link href="/results">← BACK TO RESULTS</Link>
          <Link href="/contact">BOOK A CALL →</Link>
        </nav>

        <article className="article-body result-detail-body">
          <div className="article-copy result-detail-copy">
            <time>{item.metric} / {item.label}</time>
            <h1>{item.title}</h1>
            <p className="article-intro">{item.short}</p>
            <div className="article-rule" />
            <div className="article-columns result-detail-columns">
              <p>{item.detail}<br /><br />{item.why}</p>
              <div>
                <h2>What changes</h2>
                <ul>
                  {item.proof.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <p>{item.next}</p>
              </div>
            </div>
            <Link className="article-button" href="/contact">BOOK A STRATEGY CALL <span>→</span></Link>
          </div>
          <figure className="article-image result-detail-image">
            <Image src={item.src} alt="Decorative business system visual" fill priority sizes="(max-width: 900px) 100vw, 620px" />
          </figure>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
