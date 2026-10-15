import type {Metadata} from 'next';
import {groups, projectBySlug} from '@/lib/data';
import {NextTile, PageIntro, WorkTile} from '@/components/page-parts';
import {Pill, pad2} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Websites, products and experiments by To Be Seen. Seven projects, four chapters.',
  alternates: {canonical: '/work'},
};

/** The work in numbered chapters: what we make on the left, two projects on the right. */
export default function Work() {
  return (
    <div className="page-work">
      <PageIntro
        title={['Designed to be explored.', {dot: true, text: 'Built to be used.'}]}
        left={
          <nav className="intro__nav" aria-label="Chapters">
            {groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
          </nav>
        }
        aside="Every project starts with what makes a business worth noticing. We shape it into a website, a product or an experience people actually use."
      />

      <div className="chapters wrap">
        {groups.map((group, index) => (
          <section key={group.id} id={group.id} className="chapter" aria-labelledby={`${group.id}-title`}>
            <div className="chapter__line" data-reveal="line" />
            <div className="chapter__row">
              <div className="chapter__side">
                <p className="chapter__index t-h6" aria-hidden="true"><span>{pad2(index + 1)}</span><span>/{pad2(groups.length)}</span></p>
                <div className="chapter__copy" data-reveal="up">
                  <h2 id={`${group.id}-title`} className="t-h2">{group.title}</h2>
                  <p className="chapter__body">{group.body}</p>
                  {group.service
                    ? <Pill href={`/services/${group.service}`}>Learn more</Pill>
                    : <Pill href="/contact">Start a project</Pill>}
                </div>
              </div>
              <div className="chapter__work">
                {group.projects.map(slug => <WorkTile key={slug} project={projectBySlug(slug)!} />)}
                {group.projects.length === 1 && <NextTile />}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
