import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import Reveal from "../../components/Reveal";
import { brand } from "../../lib/brand";
import { process, services } from "../../lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six systems for independent businesses: website creation, Loyalty Pass, automated bookings, client follow-up, search and performance, and the full system.",
};

export default function ServicesPage() {
  return (
    <PageShell tone="paper">
      <section className="page-hero" aria-labelledby="services-title">
        <p className="eyebrow">Services</p>
        <div className="title-wrap">
          <Marks />
          <h1 id="services-title" className="display h1 ink-title">Services</h1>
        </div>
        <p className="lede">
          Six systems for {brand.audiences.join(", ")}. Start with the one that fixes your biggest leak; add the others when they pay for themselves.
        </p>
      </section>

      <section className="container" aria-label="All services">
        <ul className="service-grid">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 80}>
              <Link href={`/services/${service.slug}`} className="service-card">
                <p className="service-n">
                  <span>{service.n}</span>
                  <span>{service.label}</span>
                </p>
                <figure className="service-media">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                </figure>
                <h2 className="display">{service.title}</h2>
                <p>{service.short}</p>
                <span className="arrow-link">
                  View service <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
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
          {process.map((step, index) => (
            <li className="process-step" key={step.step}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3 className="display">{step.step}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand secondaryHref="/work" secondaryLabel="See the work" />
    </PageShell>
  );
}
