import Link from 'next/link';
import type {ReactNode} from 'react';
import type {Project} from '@/lib/data';
import {ProjectTile} from './media';
import {Headline, TbsMark} from './ui';

type Part = string | {dot: true; text: string};

/** Opening of an inner page: the headline rises, then a quiet foot (links on the left, a paragraph on the right). */
export function PageIntro({title, left, aside, className = ''}: {title: Part[]; left?: ReactNode; aside?: ReactNode; className?: string}) {
  return (
    <section className={`intro wrap ${className}`}>
      <Headline as="h1" className="t-h1 intro__title" parts={title} />
      {(left || aside) && (
        <div className="intro__foot fade-in" style={{'--d': '450ms'} as React.CSSProperties}>
          <div className="intro__left">{left}</div>
          {aside && <p className="intro__aside">{aside}</p>}
        </div>
      )}
    </section>
  );
}

/** A project in a two-up grid: tall frame, the name in capitals, one line. */
export function WorkTile({project, sizes = '(min-width: 1280px) 30vw, (min-width: 720px) 40vw, 90vw'}: {project: Project; sizes?: string}) {
  return (
    <article className="work-tile" data-reveal="up">
      <div className="work-tile__media frame">
        <ProjectTile project={project} sizes={sizes} />
      </div>
      <div className="work-tile__info">
        <h3 className="t-h5 work-tile__name">
          <Link href={`/work/${project.slug}`} className="work-tile__link">{project.name}</Link>
        </h3>
        <p className="t-small work-tile__text">{project.type} — {project.line}</p>
      </div>
    </article>
  );
}

/** The empty seat in a chapter: an invitation, not a fake project. */
export function NextTile() {
  return (
    <article className="work-tile work-tile--next" data-reveal="up">
      <div className="work-tile__media work-tile__next-media"><TbsMark label={null} /></div>
      <div className="work-tile__info">
        <h3 className="t-h5 work-tile__name"><Link href="/contact" className="work-tile__link">Your project</Link></h3>
        <p className="t-small work-tile__text">Next in line — tell us what you have in mind.</p>
      </div>
    </article>
  );
}
