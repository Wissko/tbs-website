import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "../../../components/CtaBand";
import PageShell from "../../../components/PageShell";
import { brand } from "../../../lib/brand";
import { getService } from "../../../lib/services";
import { caseStudies, getCaseStudy } from "../../../lib/work";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) return {};
  return {
    title: `${item.client} · Work`,
    description: item.summary,
    openGraph: { title: `${item.client} · ${brand.short}`, description: item.summary },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) notFound();

  const index = caseStudies.findIndex((entry) => entry.slug === item.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const deliveredServices = item.services.map(getService).filter((service) => service !== undefined);

  return (
    <PageShell tone="paper">
      <nav className="page-nav" aria-label="Case navigation">
        <Link href="/work">← All work</Link>
        <Link href={`/work/${next.slug}`}>Next: {next.client} →</Link>
      </nav>

      <section className="detail-hero" aria-labelledby="case-title">
        <div className="detail-hero-copy">
          <p className="eyebrow">{item.sector}</p>
          <h1 id="case-title" className="display h1 ink-title">{item.client}</h1>
          <p className="lede">{item.summary}</p>
        </div>
        <figure className="detail-media">
          <Image src={item.image} alt={item.alt} fill priority sizes="(max-width: 820px) 100vw, 45vw" />
        </figure>
      </section>

      <section className="container" aria-label="Project facts">
        <dl className="facts">
          <div>
            <dt>Client</dt>
            <dd>{item.client}</dd>
          </div>
          <div>
            <dt>Sector</dt>
            <dd>{item.sector}</dd>
          </div>
          <div>
            <dt>Systems</dt>
            <dd>
              {deliveredServices.map((service, serviceIndex) => (
                <span key={service.slug}>
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  {serviceIndex < deliveredServices.length - 1 ? ", " : ""}
                </span>
              ))}
            </dd>
          </div>
          {item.year && (
            <div>
              <dt>Year</dt>
              <dd>{item.year}</dd>
            </div>
          )}
          {item.url && (
            <div>
              <dt>Live</dt>
              <dd>
                <a href={item.url} rel="noopener">{item.url.replace(/^https?:\/\//, "")}</a>
              </dd>
            </div>
          )}
        </dl>
      </section>

      <section className="section container two-col" aria-label="The project">
        <div>
          <p className="eyebrow">The brief</p>
          <p className="lede">{item.brief}</p>
        </div>
        <div>
          <p className="eyebrow">What we built</p>
          <ul className="dash-list">
            {item.built.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      {item.outcomes && item.outcomes.length > 0 && (
        <section className="container" aria-label="Outcomes">
          <div className="outcome-tiles">
            {item.outcomes.map((outcome) => (
              <div key={outcome.label}>
                <b>{outcome.value}</b>
                <span>{outcome.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {item.quote && (
        <section className="section container" aria-label="Client words">
          <blockquote className="quote">
            <p>“{item.quote.text}”</p>
            <footer>{item.quote.author}</footer>
          </blockquote>
        </section>
      )}

      <CtaBand title="Your business, next." text="Tell us what you do and where it leaks. We will tell you what we would build first." secondaryHref="/work" secondaryLabel="More work" />
    </PageShell>
  );
}
