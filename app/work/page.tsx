import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import Reveal from "../../components/Reveal";
import { getService } from "../../lib/services";
import { caseStudies } from "../../lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, bookings and Loyalty Pass built for real independent businesses: Trend Beauty, Eva, Kobble Cottage.",
};

export default function WorkPage() {
  return (
    <PageShell tone="paper">
      <section className="page-hero" aria-labelledby="work-title">
        <p className="eyebrow">Work</p>
        <div className="title-wrap">
          <Marks />
          <h1 id="work-title" className="display h1 ink-title">Work</h1>
        </div>
        <p className="lede">
          Real businesses, real systems. A salon, an independent creative, a holiday cottage: each one needed to be found, trusted and chosen, and each one got the system that does exactly that.
        </p>
      </section>

      <section className="container" aria-label="Case studies">
        <ul className="cases">
          {caseStudies.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 90}>
              <Link href={`/work/${item.slug}`} className="case-card">
                <figure className="case-media">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" />
                </figure>
                <p className="case-meta">
                  <span>{item.sector}</span>
                  {item.services.map((slug) => {
                    const service = getService(slug);
                    return service ? <span key={slug}>{service.title}</span> : null;
                  })}
                </p>
                <h2 className="display">{item.client}</h2>
                <p>{item.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand title="Your business, next." text="Tell us what you do and where it leaks. We will tell you what we would build first." />
    </PageShell>
  );
}
