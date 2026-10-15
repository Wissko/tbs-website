'use client';

import Link from 'next/link';
import {useState} from 'react';
import {projectBySlug} from '@/lib/data';
import {DragScroller} from '../drag-scroller';
import {ProjectTile} from '../media';
import {MetaBar, pad2} from '../ui';

const picks = ['kobble-cottage', 'eva-meszoly', 'wissem-os', 'niumi-distributors', 'loyalty-pass'];

/** Five projects in a row you can drag; the bar below counts where you are. */
export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const list = picks.map(slug => projectBySlug(slug)!);

  return (
    <section className="featured" aria-labelledby="featured-title">
      <h2 id="featured-title" className="visually-hidden">Featured work</h2>
      <DragScroller label="Featured work" className="featured__track" progress={false} onIndex={setIndex}>
        {list.map(project => (
          <article key={project.slug} className="tile">
            <div className="tile__media frame">
              <ProjectTile project={project} sizes="(min-width: 1280px) 30vw, (min-width: 720px) 45vw, 80vw" />
            </div>
            <div className="tile__info">
              <h3 className="t-h5 tile__name">
                <Link href={`/work/${project.slug}`} className="tile__link">{project.name}</Link>
              </h3>
              <p className="t-small tile__text">{project.summary}</p>
            </div>
          </article>
        ))}
      </DragScroller>
      <div className="wrap featured__meta">
        <MetaBar left={pad2(index + 1)} middle={`/${pad2(list.length)}`} />
      </div>
    </section>
  );
}
