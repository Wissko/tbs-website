import Link from 'next/link';
import type {CSSProperties, ReactNode} from 'react';

export function Arrow({className = ''}: {className?: string}) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 30 30" aria-hidden="true" focusable="false">
      <path d="M1 15h27M17 4l11 11-11 11" />
    </svg>
  );
}

export function Dot() {
  return <span className="dot" aria-hidden="true" />;
}

/** The TBS mark as a mask, so it takes the current colour. */
export function TbsMark({className = '', label = 'To Be Seen'}: {className?: string; label?: string | null}) {
  const style = {'--mask': 'url(/brand/tbs-wordmark.svg)', aspectRatio: '1078 / 374'} as CSSProperties;
  return label
    ? <span className={`mark ${className}`} style={style} role="img" aria-label={label} />
    : <span className={`mark ${className}`} style={style} aria-hidden="true" />;
}

/** A client mark: single-colour mask from public/logos. */
export function ClientMark({src, ratio, name, className = ''}: {src: string; ratio: number; name: string; className?: string}) {
  return <span className={`mark ${className}`} style={{'--mask': `url(${src})`, '--ratio': ratio} as CSSProperties} role="img" aria-label={name} />;
}

type Part = string | {dot: true; text: string};

/**
 * A headline whose words rise out of their line on arrival (or, with `onView`, when it scrolls in).
 * Each part starts on its own line; a part with `dot` opens with the round punctuation, one column wide
 * on desktop; a lone ● inside the text is drawn inline.
 */
export function Headline({as: Tag = 'h1', parts, className = '', id, start = 0, onView = false}: {
  as?: 'h1' | 'h2' | 'p' | 'span'; parts: Part[]; className?: string; id?: string; start?: number; onView?: boolean;
}) {
  let index = start;
  return (
    <Tag className={`words ${className}`} id={id} {...(onView ? {'data-reveal': 'words'} : {})}>
      {parts.map((part, p) => {
        const text = typeof part === 'string' ? part : part.text;
        const words = text.split(' ');
        return (
          <span key={p} className="words__part">
            {typeof part !== 'string' && (
              <span className="dot-col" aria-hidden="true">
                <span className="w"><span style={{'--i': index++} as CSSProperties}><Dot /></span></span>
              </span>
            )}
            {words.map((word, w) => (
              <span key={w}>
                <span className="w"><span style={{'--i': index++} as CSSProperties}>{word === '●' ? <Dot /> : word}</span></span>
                {w < words.length - 1 ? ' ' : ''}
              </span>
            ))}
            {p < parts.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}

export function Pill({href, children, external = false, className = '', arrow = false, style}: {
  href: string; children: ReactNode; external?: boolean; className?: string; arrow?: boolean; style?: CSSProperties;
}) {
  const content = <><span>{children}</span>{arrow && <Arrow />}</>;
  if (external || href.startsWith('mailto:')) {
    return <a className={`pill ${className}`} href={href} style={style} {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}>{content}</a>;
  }
  return <Link className={`pill ${className}`} href={href} style={style}>{content}</Link>;
}

/** A rule, then the section's coordinates: left, middle (bold) and the dot on the right. */
export function MetaBar({left, middle, right = <Dot />, className = '', reveal = true}: {
  left: ReactNode; middle?: ReactNode; right?: ReactNode | null; className?: string; reveal?: boolean;
}) {
  return (
    <div className={`meta-bar ${className}`}>
      <div className="meta-bar__line" {...(reveal ? {'data-reveal': 'line'} : {})} />
      <div className="meta-bar__row">
        <div>{left}</div>
        <div>{middle}</div>
        {right !== null && <div>{right}</div>}
      </div>
    </div>
  );
}

export const pad2 = (value: number) => String(value).padStart(2, '0');
