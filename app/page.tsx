import Image from "next/image";
import Link from "next/link";
import CtaBand from "../components/CtaBand";
import Marks from "../components/Marks";
import PageShell from "../components/PageShell";
import ProjectShots from "../components/ProjectShots";
import Reveal from "../components/Reveal";
import Seal from "../components/Seal";
import { bookingHref, brand } from "../lib/brand";
import { resultItems } from "../lib/results";
import { coreServices } from "../lib/services";
import { projectTypes } from "../lib/work";

export default function Home() {
  return (
    <PageShell tone="paper">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">For {brand.audiences.join(", ")}</p>
          <div className="title-wrap">
            <Marks />
            <h1 id="hero-title" className="display hero-title ink-title">
              Built<br />to be<br />seen.
            </h1>
          </div>
          <p className="hero-intro">
            We build the websites, <strong>Loyalty Pass</strong>, bookings and follow-up that make{" "}
            <strong>salons, restaurants, cottages and independents</strong> easier to find, easier to trust and easier to choose.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href={bookingHref}>
              {brand.cta.primary} <span aria-hidden="true">→</span>
            </a>
            <Link className="arrow-link" href="/services">
              {brand.cta.secondary} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <figure className="hero-photo">
          <Image
            src="/images/uploads/tbs-photo-01.jpg"
            alt="Silhouette of a person against a pale background, black and white"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 40vw"
          />
        </figure>

        <Seal id="hero-seal" className="hero-seal" text="Scroll & explore · TBS° · " href="#systems" />

        <div className="hero-foot">
          <span>{brand.short} · {brand.claim}</span>
          <span>{brand.tagline[2]}</span>
        </div>
      </section>

      <section className="section container" id="systems" aria-labelledby="systems-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 id="systems-title" className="display h2">
              Four systems.<br />One customer journey.
            </h2>
          </div>
          <p>Each one works on its own. Together they cover the whole path: being found, being trusted, being booked, being remembered.</p>
        </div>
        <ul className="systems">
          {coreServices.map((service, index) => (
            <Reveal as="li" key={service.slug} className="system" delay={index * 90}>
              <Link href={`/services/${service.slug}`} className="system-link">
                <figure className="system-media">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" />
                </figure>
                <p className="system-n">
                  <span>{service.n}</span>
                  <span>{service.label}</span>
                </p>
                <h3 className="display">{service.title}</h3>
                <p>{service.short}</p>
                <span className="arrow-link">
                  View service <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="work-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 id="work-title" className="display h2">
              Built for<br />businesses like yours.
            </h2>
          </div>
          <p>A beauty retailer, a creative, a holiday cottage: three kinds of business we have built for, and what each one gets.</p>
        </div>
        <ul className="cases">
          {projectTypes.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 90}>
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
            </Reveal>
          ))}
        </ul>
        <div className="section-foot">
          <Link className="arrow-link" href="/work">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="manifesto tone-ink" aria-labelledby="manifesto-title">
        <div className="container manifesto-inner">
          <h2 id="manifesto-title" className="display ink-title">{brand.manifesto.line}</h2>
          <div className="manifesto-body">
            {brand.manifesto.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="changes-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">What changes</p>
            <h2 id="changes-title" className="display h2">
              Four leaks,<br />closed.
            </h2>
          </div>
          <p>We do not sell features. We remove the four things that quietly cost independent businesses their customers.</p>
        </div>
        <ul className="outcomes">
          {resultItems.map((item) => (
            <li key={item.slug}>
              <Link href={`/results/${item.slug}`} className="outcome-row">
                <span className="outcome-index">
                  <strong>{item.metric}</strong>
                  <span>{item.label}</span>
                </span>
                <figure className="outcome-media">
                  <Image src={item.src} alt="" fill sizes="(max-width: 820px) 100vw, 30vw" />
                </figure>
                <span className="outcome-copy">
                  <h3 className="display">{item.title}</h3>
                  <p>{item.short}</p>
                </span>
                <span className="outcome-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </PageShell>
  );
}
