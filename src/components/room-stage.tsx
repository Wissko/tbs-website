import Image from 'next/image';
import Link from 'next/link';
import type {CSSProperties} from 'react';
import type {Media, Project} from '@/lib/data';
import {Fill, OpeningScene} from './media';
import {Arrow, Headline, TbsMark, pad2} from './ui';

type Plate = {key: string; ratio: number; caption: string} & (
  | {kind: 'opening'}
  | {kind: 'scene'; media: Media; alt: string}
  | {kind: 'phone'; media: Media & {framed?: boolean}; alt: string}
  | {kind: 'line'}
);

/** Captions that say more than the device: what the product screens are. */
const captions: Record<string, Record<string, string>> = {
  wissem: {opening: 'The desktop on Mac and iPhone'},
  loyalty: {opening: 'Admin workspace and merchant app', wide: 'Merchant app and admin workspace', 'pair-1': 'The admin workspace', 'pair-2': 'The merchant app beside the pass, an illustration'},
  howard: {opening: 'The cockpit, and Howard Prime on iPhone', wide: 'Screens of the CRM', 'pair-1': 'The reports and the data model', 'pair-2': 'Howard Prime, the AI copilot', phone: 'Sign-in on the iPhone', closing: 'Cockpit, copilot and reports on iPhone'},
};

/** The reel: the project's mockups in a set order, with its line as a plate of type after the opening. */
export function platesFor(project: Project): Plate[] {
  const {name, mockup: {wide, pair, phone, closing, tile}} = project;
  const caption = (key: string, fallback: string) => captions[project.id]?.[key] ?? fallback;
  const scene = (key: string, media: Media, alt: string, fallback: string, ratio = 1.6): Plate => ({kind: 'scene', key, ratio, media, alt, caption: caption(key, fallback)});
  const plates: Plate[] = [
    {kind: 'opening', key: 'opening', ratio: 1.6, caption: caption('opening', 'Mac and iPhone')},
    {kind: 'line', key: 'line', ratio: 1, caption: 'The idea'},
  ];
  if (project.identity) plates.push(scene('identity', project.identity.board, `${name} logo`, 'The logo and its colours'));
  if (wide) plates.push(scene('wide', wide, `${name}, every screen of the website in perspective`, 'Every screen'));
  if (pair) plates.push(scene('pair-1', pair[0], `${name} in two browser windows`, 'Two windows'));
  plates.push({kind: 'phone', key: 'phone', ratio: .8, media: phone, alt: `${name}, ${captions[project.id]?.phone?.toLowerCase() ?? 'on a phone'}`, caption: caption('phone', 'On the iPhone')});
  if (pair) plates.push(scene('pair-2', pair[1], `${name} on a laptop`, 'On the Mac'));
  plates.push(closing ? scene('closing', closing, `${name} on three phones`, 'Three screens on iPhone') : scene('tile', tile, `${name}, ${caption('tile', 'On the iPhone').toLowerCase()}, tilted`, 'On the iPhone', .8));
  return plates;
}

/**
 * The case room: the project on its colour, its work on a reel between the coordinates and the name.
 * `live` is the case page itself (links, the recording playing); without it the same picture is drawn inert, for the
 * end of the previous case, so scrolling into it hands over without a jump.
 */
export function RoomStage({project, index, total, prev, next, live = false}: {
  project: Project; index: number; total: number; prev: Project; next: Project; live?: boolean;
}) {
  const plates = platesFor(project);
  const visit = project.visit ?? 'Visit the website';
  const external = project.url.startsWith('http');
  return (
    <div className="room__stage">
      <div className="room__top t-small fade-in" style={{'--d': '150ms'} as CSSProperties}>
        <p className="room__focus">{project.focus.join(', ')}</p>
        <p className="room__type">{project.type}</p>
        <p className="room__count"><span className="visually-hidden">Project </span>{pad2(index + 1)} / {pad2(total)}</p>
        {live ? <Link href="/work" className="room__link">All work</Link> : <span className="room__link">All work</span>}
      </div>

      <div className="room__reel">
        <ol className="room__track" aria-label={live ? `${project.name}, the work` : undefined}>
          {plates.map((plate, i) => (
            <li key={plate.key} className="room__plate" style={{'--ratio': plate.ratio, '--i': i} as CSSProperties}>
              <div className={`room__frame room__frame--${plate.kind}`}>
                <PlateBody plate={plate} project={project} live={live} first={i < 3} />
              </div>
              <span className="room__caption t-small"><b>{pad2(i + 1)}</b>{plate.caption}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="room__foot">
        <div className="room__rule" aria-hidden="true"><span /></div>
        <Headline as={live ? 'h1' : 'span'} className="room__name" parts={[project.name]} />
        <div className="room__row">
          <p className="room__summary fade-in" style={{'--d': '250ms'} as CSSProperties}>{project.summary}.</p>
          <div className="room__actions fade-in" style={{'--d': '350ms'} as CSSProperties}>
            {live ? <a href="#story" className="room__link">Read the story</a> : <span className="room__link">Read the story</span>}
            <Steps prev={prev} next={next} live={live} />
            {live
              ? external
                ? <a className="pill" href={project.url} target="_blank" rel="noreferrer"><span>{visit}</span><Arrow /></a>
                : <Link className="pill" href={project.url}><span>{visit}</span><Arrow /></Link>
              : <span className="pill"><span>{visit}</span><Arrow /></span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlateBody({plate, project, live, first}: {plate: Plate; project: Project; live: boolean; first: boolean}) {
  const sizes = plate.ratio > 1 ? '(min-width: 1024px) 56vw, 92vw' : '(min-width: 1024px) 30vw, 70vw';
  switch (plate.kind) {
    case 'opening':
      return <div className="room__media"><OpeningScene project={project} live={live} priority={live} decorative={!live} /></div>;
    case 'line':
      return (
        <>
          <TbsMark label={null} className="room__line-mark" />
          <blockquote className="room__line">{project.line}</blockquote>
        </>
      );
    case 'phone':
      return (
        <div className="room__media">
          {plate.media.framed
            ? <span className="room__phone room__phone--framed" style={{aspectRatio: `${plate.media.width} / ${plate.media.height}`}}><Fill media={plate.media} alt={live ? plate.alt : ''} sizes="(min-width: 1024px) 20vw, 50vw" /></span>
            : <Image className="room__phone" src={plate.media.src} alt={live ? plate.alt : ''} width={plate.media.width} height={plate.media.height} sizes="(min-width: 1024px) 20vw, 50vw" quality={82} />}
        </div>
      );
    default:
      return <div className="room__media"><Fill media={plate.media} alt={live ? plate.alt : ''} sizes={sizes} priority={live && first} /></div>;
  }
}

/** Previous and next project, two round buttons; the name of the one you point at rises above it. */
function Steps({prev, next, live}: {prev: Project; next: Project; live: boolean}) {
  const steps = [['prev', 'Previous', prev], ['next', 'Next', next]] as const;
  return (
    <span className="room__steps">
      {steps.map(([key, word, target]) => {
        const body = <><span className="room__disc"><Arrow /></span><span className="room__step-name t-small" aria-hidden="true">{target.name}</span></>;
        return live
          ? <Link key={key} href={`/work/${target.slug}`} className={`room__step room__step--${key}`} aria-label={`${word} project: ${target.name}`}>{body}</Link>
          : <span key={key} className={`room__step room__step--${key}`}>{body}</span>;
      })}
    </span>
  );
}
