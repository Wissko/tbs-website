import type {Metadata, Viewport} from 'next';
import type {CSSProperties} from 'react';
import {notFound} from 'next/navigation';
import {projectBySlug, projects} from '@/lib/data';
import {CaseRoom} from '@/components/case-room';
import {NextProject} from '@/components/next-project';
import {Headline, MetaBar, Pill, pad2} from '@/components/ui';

export function generateStaticParams() {
  return projects.map(project => ({slug: project.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const project = projectBySlug(slug);
  return {title: project?.name || 'Project not found', description: project?.intro, alternates: {canonical: `/work/${slug}`}};
}

export async function generateViewport({params}: {params: Promise<{slug: string}>}): Promise<Viewport> {
  const {slug} = await params;
  return {themeColor: projectBySlug(slug)?.color.bg ?? '#f4f4f4'};
}

/** The project `offset` places away from this one, round the seven. */
const around = (index: number, offset: number) => projects[(index + offset + projects.length) % projects.length];

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const {bg, fg} = project.color;
  const style = {'--case-bg': bg, '--case-fg': fg} as CSSProperties;

  return (
    <article className="case" style={style} data-cursor-ink={fg}>
      {/* The whole page takes the project's colour: header, takeover and the fade into the next case read it. */}
      <style>{`body{--bg:${bg};--fg:${fg}}`}</style>
      <CaseRoom project={project} index={index} total={projects.length} prev={around(index, -1)} next={around(index, 1)} />

      <section id="story" className="case__overview wrap" aria-label="The story">
        <MetaBar left={project.name} middle="/ The story" right={null} className="meta-bar--half" />
        <div className="case__split">
          <div className="case__lead" data-reveal="up">
            <h2 className="t-h5">The brief</h2>
            <p className="t-h3">{project.intro}</p>
            <ul className="case__scope t-small" aria-label="Scope">
              {project.focus.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="case__story" data-reveal="up" style={{'--d': '120ms'} as CSSProperties}>
            <h2 className="t-h5">The approach</h2>
            <p className="t-large">{project.approach}</p>
            {project.identity && (
              <>
                <h2 className="t-h5">The logo</h2>
                <p className="t-large">{project.identity.text}</p>
              </>
            )}
            <Pill href={project.url} external={project.url.startsWith('http')} arrow className="case__visit">{project.visit ?? 'Visit the website'}</Pill>
            {project.note && <p className="case__note t-small">{project.note}</p>}
          </div>
        </div>
      </section>

      {project.costCase && (
        <section className="case__cost wrap" aria-labelledby="cost-title">
          <MetaBar left={project.name} middle="/ The cost case" right={null} className="meta-bar--half" />
          <Headline as="h2" id="cost-title" className="t-h2" parts={['The cost case']} onView />
          <p className="t-large case__cost-lead" data-reveal="up">{project.costCase.lead}</p>
          <ul className="case__cost-list">
            {project.costCase.figures.map((figure, i) => (
              <li key={figure.value} data-reveal="up" style={{'--d': `${i * 90}ms`} as CSSProperties}>
                <b className="case__cost-value">{figure.value}</b>
                <span>{figure.label}</span>
              </li>
            ))}
          </ul>
          <p className="case__note case__cost-basis t-small">{project.costCase.basis}</p>
        </section>
      )}

      {project.highlights && (
        <section className="case__inside wrap" aria-labelledby="inside-title">
          <MetaBar left={project.name} middle="/ Inside the product" right={null} className="meta-bar--half" />
          <Headline as="h2" id="inside-title" className="t-h2 case__inside-title" parts={[`Inside ${project.name}`]} onView />
          <ol className="case__inside-list">
            {project.highlights.map((item, i) => (
              <li key={item.title} data-reveal="up" style={{'--d': `${(i % 3) * 90}ms`} as CSSProperties}>
                <span className="t-small t-bold">{pad2(i + 1)}</span>
                <h3 className="t-h5">{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="wrap case__end">
        <MetaBar left="To Be Seen" middle="/ Scroll for the next project" right={null} className="meta-bar--half" />
      </div>
      <NextProject next={around(index, 1)} index={(index + 1) % projects.length} total={projects.length} prev={project} after={around(index, 2)} />
    </article>
  );
}
