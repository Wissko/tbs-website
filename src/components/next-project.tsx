'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useRef} from 'react';
import type {CSSProperties} from 'react';
import type {Project} from '@/lib/data';
import {RoomStage} from './room-stage';

/**
 * The end of a case study fades into the next project's room, drawn exactly like that page's top (inert, the
 * recording still on its first frame). Scroll it all the way up and you are there; it is also a plain link.
 * `index`, `prev` and `after` place the next project among the seven, as its own page does.
 */
export function NextProject({next, index, total, prev, after}: {next: Project; index: number; total: number; prev: Project; after: Project}) {
  const router = useRouter();
  const opening = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = opening.current;
    if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    router.prefetch(`/work/${next.slug}`);
    let done = false;
    let frame = 0;
    const check = () => {
      frame = 0;
      if (done) return;
      if (element.getBoundingClientRect().top <= 0) {
        done = true;
        // The next page opens exactly where this block sits: its opening must not replay.
        document.documentElement.dataset.initial = 'false';
        document.documentElement.dataset.seamless = 'true';
        router.push(`/work/${next.slug}`);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    addEventListener('scroll', onScroll, {passive: true});
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [next.slug, router]);

  const style = {'--next-bg': next.color.bg, '--next-fg': next.color.fg} as CSSProperties;
  return (
    <section className="case-next footer-flush" style={style} aria-label="Next project">
      <div className="case-next__fade" aria-hidden="true" />
      <Link ref={opening} href={`/work/${next.slug}`} className="case-next__opening room" data-header-fg={next.color.fg} data-cursor-ink={next.color.fg}>
        <span className="visually-hidden">Next project: {next.name}</span>
        <div aria-hidden="true"><RoomStage project={next} index={index} total={total} prev={prev} next={after} /></div>
      </Link>
    </section>
  );
}
