import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import ProjectShots from "../../components/ProjectShots";
import Reveal from "../../components/Reveal";
import { projectTypes } from "../../lib/work";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The kinds of businesses we build for and what each one gets: beauty retail, a creative portfolio, a holiday cottage. Websites, Loyalty Pass, bookings and follow-up.",
};

export default function ProjectsPage() {
  return (
    <PageShell tone="paper">
      <section className="page-hero" aria-labelledby="projects-title">
        <p className="eyebrow">Projects</p>
        <div className="title-wrap">
          <Marks />
          <h1 id="projects-title" className="display h1 ink-title">Projects</h1>
        </div>
        <p className="lede">
          The kinds of businesses we build for, and what each one gets. Every project here is based on a system we have delivered; yours will be shaped the same way, around how you actually work.
        </p>
      </section>

      <section className="container" aria-label="Project types">
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
                <h2 className="display">{item.title}</h2>
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
