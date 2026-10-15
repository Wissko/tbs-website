import Link from 'next/link';
import {projectBySlug, projects, founded} from '@/lib/data';
import {AutoVideo} from '../auto-video';
import {DragScroller} from '../drag-scroller';
import {ServiceRows} from '../service-rows';
import {ClientMark, Headline, Pill, TbsMark} from '../ui';

const recognition = [
  ['kobble-cottage', 'Hospitality website'],
  ['niumi-distributors', 'B2B website and catalogue'],
  ['howard-crm', 'Bespoke CRM'],
] as const;

/** Three client marks, each with what we made for them. */
export function Recognition() {
  return (
    <section className="recognition wrap" aria-label="Selected clients">
      <ul>
        {recognition.map(([slug, caption], index) => {
          const project = projectBySlug(slug)!;
          return (
            <li key={slug} data-reveal="up" style={{'--d': `${index * 90}ms`} as React.CSSProperties}>
              <Link href={`/work/${slug}`} className="recognition__link">
                <span className="recognition__figure"><ClientMark src={project.logo.src} ratio={project.logo.ratio} name={project.name} /></span>
                <span className="recognition__caption">{caption}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Who we are, beside the mark at full size. */
export function Overview() {
  return (
    <section className="overview wrap" aria-label="The studio">
      <div className="overview__line" data-reveal="line" />
      <div className="overview__row">
        <div className="overview__body" data-reveal="up">
          <p className="t-h3">
            To Be Seen is an independent design and development studio building websites, products and loyalty
            experiences that turn a first impression into a lasting connection.
          </p>
          <Pill href="/work" className="overview__button">See the work</Pill>
        </div>
        <div className="overview__mark" data-reveal="up" style={{'--d': '120ms'} as React.CSSProperties}><TbsMark /></div>
      </div>
    </section>
  );
}

/** The studio's art direction at full width, between who we are and the work: the portrait crossed by a glass ribbon. */
export function Interlude() {
  return (
    <div className="interlude frame" data-reveal="wipe">
      <div className="interlude__film wipe">
        <AutoVideo src="/motion/ribbon.mp4" poster="/motion/ribbon.webp" label="To Be Seen film: a portrait crossed by a glass ribbon edged in wine" />
      </div>
    </div>
  );
}

/** Every engagement: the client's mark, its name, a few lines and the way into the case study. */
export function Engagements() {
  return (
    <section className="engagements" aria-labelledby="engagements-title">
      <div className="wrap">
        <Headline as="h2" id="engagements-title" className="t-h2 engagements__title" parts={['Featured engagements']} onView />
      </div>
      <DragScroller label="Featured engagements" className="engagements__track">
        {projects.map(project => (
          <article key={project.slug} className="engagement">
            <div className="engagement__logo"><ClientMark src={project.logo.src} ratio={project.logo.ratio} name={project.name} /></div>
            <h3 className="t-h5 engagement__name">{project.name}</h3>
            <p className="engagement__text">
              {project.intro} Read the full case study <Link href={`/work/${project.slug}`} className="text-link">here</Link>.
            </p>
          </article>
        ))}
      </DragScroller>
    </section>
  );
}

/** The page turns dark while this chapter holds the screen. */
export function Spotlight() {
  return (
    <section className="spotlight wrap" data-theme-section="dark" aria-labelledby="spotlight-title">
      <div className="spotlight__row">
        <div className="spotlight__media frame" data-reveal="wipe">
          <div className="spotlight__film wipe">
            <AutoVideo src="/motion/eyes.mp4" poster="/motion/eyes.webp" label="To Be Seen film: five eyes in the dark, the largest with a wine iris" />
          </div>
        </div>
        <div className="spotlight__text">
          <Headline as="h2" id="spotlight-title" className="spotlight__quote" parts={['Excellence deserves ● an audience.']} onView />
          <p className="spotlight__label">Independent studio <b>since {founded}</b></p>
          <Pill href="/about" className="spotlight__button">About us</Pill>
        </div>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  return (
    <section className="what wrap" aria-labelledby="what-title">
      <div className="what__head">
        <Headline as="h2" id="what-title" className="t-h2 what__title" parts={['What we do']} onView />
        <Pill href="/services">View all</Pill>
      </div>
      <ServiceRows />
    </section>
  );
}
