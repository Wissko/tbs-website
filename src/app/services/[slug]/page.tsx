import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {founded, projectBySlug, projects, serviceBySlug, services} from '@/lib/data';
import {WorkTile} from '@/components/page-parts';
import {Arrow, Headline, MetaBar, Pill, pad2} from '@/components/ui';

export function generateStaticParams() {
  return services.map(service => ({slug: service.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const service = serviceBySlug(slug);
  return {title: service?.title || 'Service not found', description: service?.intro, alternates: {canonical: `/services/${slug}`}};
}

export default async function Service({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const index = services.indexOf(service);
  const lead = projectBySlug(service.project)!;
  // A second project from the same family keeps the two-up grid honest, unless only the lead shows this work.
  const second = service.second === null ? null : (service.second ? projectBySlug(service.second) : null)
    ?? projects.find(project => project.slug !== lead.slug && project.category === lead.category) ?? projects.find(project => project.slug !== lead.slug)!;
  const others = services.filter(item => item.slug !== slug);

  return (
    <div className="page-service">
      <section className="service-intro wrap">
        <p className="service-intro__index fade-in" aria-hidden="true"><span>{pad2(index + 1)}</span><span>/{pad2(services.length)}</span></p>
        <Headline as="h1" className="t-h1 service-intro__title" parts={[service.title]} />
        <p className="service-intro__legal t-small fade-in" style={{'--d': '400ms'} as React.CSSProperties}>Built to be seen.<br />Excellence deserves an audience.<br />To Be Seen, {founded} – {String(new Date().getFullYear()).slice(2)}©</p>
      </section>

      <section className="split wrap" aria-labelledby="overview-title">
        <MetaBar left="Sec." middle="/A" />
        <div className="split__row">
          <h2 id="overview-title" className="t-h2 split__title">Overview</h2>
          <div className="service-overview" data-reveal="up">
            <p className="t-statement">{service.headline} {service.short}</p>
            <p className="t-large">{service.intro}</p>
            <Pill href="/contact">Start a project</Pill>
          </div>
        </div>
      </section>

      <section className="split wrap" aria-labelledby="included-title">
        <MetaBar left="Sec." middle="/B" />
        <div className="split__row">
          <h2 id="included-title" className="t-h2 split__title">What’s included</h2>
          <ol className="included">
            {service.items.map((item, itemIndex) => (
              <li key={item.name} data-reveal="up" style={{'--d': `${itemIndex * 90}ms`} as React.CSSProperties}>
                <span className="included__num t-small">{pad2(itemIndex + 1)}</span>
                <h3 className="t-h5">{item.name}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="split wrap" aria-labelledby="featured-title">
        <MetaBar left="Sec." middle="/C" />
        <div className="split__row">
          <h2 id="featured-title" className="t-h2 split__title">Featured work</h2>
          <div className="chapter__work chapter__work--flush">
            <WorkTile project={lead} />
            {second && <WorkTile project={second} />}
          </div>
        </div>
      </section>

      <section className="split wrap" aria-labelledby="others-title">
        <MetaBar left="Sec." middle="/D" />
        <div className="split__row">
          <h2 id="others-title" className="t-h2 split__title">Other services</h2>
          <ul className="others">
            {others.map(item => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="others__link">
                  <span>{item.title}</span>
                  <span className="others__arrow"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
