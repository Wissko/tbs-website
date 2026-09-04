import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "../../../components/CtaBand";
import PageShell from "../../../components/PageShell";
import ProjectShots from "../../../components/ProjectShots";
import { brand } from "../../../lib/brand";
import { getService } from "../../../lib/services";
import { getProjectType, projectTypes } from "../../../lib/work";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projectTypes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getProjectType(slug);
  if (!item) return {};
  return {
    title: `${item.title} · Projects`,
    description: item.summary,
    openGraph: { title: `${item.title} · ${brand.short}`, description: item.summary },
  };
}

export default async function ProjectTypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getProjectType(slug);
  if (!item) notFound();

  const index = projectTypes.findIndex((entry) => entry.slug === item.slug);
  const next = projectTypes[(index + 1) % projectTypes.length];
  const systems = item.services.map(getService).filter((service) => service !== undefined);

  return (
    <PageShell tone="paper">
      <nav className="page-nav" aria-label="Project navigation">
        <Link href="/work">← All projects</Link>
        <Link href={`/work/${next.slug}`}>Next: {next.title} →</Link>
      </nav>

      <section className="detail-hero" aria-labelledby="project-title">
        <div className="detail-hero-copy">
          <p className="eyebrow">{item.kind}</p>
          <h1 id="project-title" className="display h1 ink-title">{item.title}</h1>
          <p className="lede">{item.summary}</p>
        </div>
        {item.shots ? (
          <ProjectShots shots={item.shots} alt={`${item.title} website, desktop and mobile`} wide priority />
        ) : (
          <figure className="detail-media">
            <Image src={item.image} alt={item.alt} fill priority sizes="(max-width: 820px) 100vw, 45vw" />
          </figure>
        )}
      </section>

      <section className="container" aria-label="Project facts">
        <dl className="facts">
          <div>
            <dt>Business</dt>
            <dd>{item.title}</dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{item.kind}</dd>
          </div>
          <div>
            <dt>Systems</dt>
            <dd>
              {systems.map((service, serviceIndex) => (
                <span key={service.slug}>
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  {serviceIndex < systems.length - 1 ? ", " : ""}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="section container two-col" aria-label="The project">
        <div>
          <p className="eyebrow">The situation</p>
          <p className="lede">{item.situation}</p>
        </div>
        <div>
          <p className="eyebrow">What we build</p>
          <ul className="dash-list">
            {item.built.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Your business, next."
        text="Tell us what you do and where it leaks. We will tell you what we would build first."
        secondaryHref="/work"
        secondaryLabel="More projects"
      />
    </PageShell>
  );
}
