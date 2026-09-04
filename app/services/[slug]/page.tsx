import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "../../../components/CtaBand";
import PageShell from "../../../components/PageShell";
import ProjectShots from "../../../components/ProjectShots";
import { bookingHref, brand } from "../../../lib/brand";
import { getService, process, services } from "../../../lib/services";
import { projectTypesForService } from "../../../lib/work";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    openGraph: { title: `${service.title} · ${brand.short}`, description: service.short },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projectTypesForService(service.slug);
  const index = services.findIndex((item) => item.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <PageShell tone="paper">
      <nav className="page-nav" aria-label="Service navigation">
        <Link href="/services">← All services</Link>
        <Link href={`/services/${next.slug}`}>Next: {next.title} →</Link>
      </nav>

      <section className="detail-hero" aria-labelledby="service-title">
        <div className="detail-hero-copy">
          <p className="eyebrow">
            {service.n} / {service.label}
          </p>
          <h1 id="service-title" className="display h1 ink-title">{service.title}</h1>
          <p className="lede">{service.short}</p>
          <a className="btn btn--primary" href={bookingHref}>
            {brand.cta.primary} <span aria-hidden="true">→</span>
          </a>
        </div>
        {service.shots ? (
          <ProjectShots shots={service.shots} alt={`${service.title}, desktop and mobile`} wide priority />
        ) : (
          <figure className="detail-media">
            <Image src={service.image} alt={service.alt} fill priority sizes="(max-width: 820px) 100vw, 45vw" />
          </figure>
        )}
      </section>

      <section className="container" aria-label="Service details">
        <div className="detail-grid">
          <article className="detail-block">
            <h2>What it does</h2>
            <p>{service.detail}</p>
          </article>
          <article className="detail-block">
            <h2>Best for</h2>
            <p>{service.bestFor}</p>
          </article>
          <article className="detail-block">
            <h2>Outcome</h2>
            <p>{service.outcome}</p>
          </article>
          <article className="detail-block">
            <h2>Includes</h2>
            <ul className="dash-list">
              {service.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section container" aria-labelledby="process-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="display h2">
              Four steps,<br />no surprises.
            </h2>
          </div>
          <p>The same simple path for every project, whatever its size.</p>
        </div>
        <ol className="process">
          {process.map((step, stepIndex) => (
            <li className="process-step" key={step.step}>
              <b>{String(stepIndex + 1).padStart(2, "0")}</b>
              <h3 className="display">{step.step}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {related.length > 0 && (
        <section className="section container" aria-labelledby="related-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">For example</p>
              <h2 id="related-title" className="display h2">
                A typical project.
              </h2>
            </div>
          </div>
          <ul className="cases">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/work/${item.slug}`} className="case-card">
                  {item.shots ? (
                    <ProjectShots shots={item.shots} alt={`${item.title} website, desktop and mobile`} />
                  ) : (
                    <figure className="case-media">
                      <Image src={item.image} alt={item.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" />
                    </figure>
                  )}
                  <p className="case-meta">
                    <span>{item.kind}</span>
                  </p>
                  <h3 className="display">{item.title}</h3>
                  <p>{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand
        title={`Is ${service.title} the right first step?`}
        text="Tell us about your business in a short call. We will say honestly whether this is where to start."
      />
    </PageShell>
  );
}
