import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import { getService, services } from "../../../lib/services";

type ServiceParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: ServiceParams }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | TBS°`,
    description: service.short,
  };
}

export default async function ServicePage({ params }: { params: ServiceParams }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="service-shell">
      <section className="service-canvas">
        <header className="simple-page-header service-header">
          <Link className="simple-page-brand" href="/">TBS°</Link>
          <p>Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
          <Link className="simple-page-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <nav className="service-nav" aria-label="Service navigation">
          <Link href="/work">← ALL SERVICES</Link>
          <Link href="/contact">BOOK A CALL →</Link>
        </nav>

        <section className="service-hero">
          <span>{service.n} / {service.label}</span>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
        </section>

        <section className="service-detail-grid">
          <article>
            <h2>What it does</h2>
            <p>{service.detail}</p>
          </article>
          <article>
            <h2>Best for</h2>
            <p>{service.bestFor}</p>
          </article>
          <article>
            <h2>Outcome</h2>
            <p>{service.outcome}</p>
          </article>
          <article>
            <h2>Includes</h2>
            <ul>
              {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </article>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
