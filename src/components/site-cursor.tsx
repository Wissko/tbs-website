'use client';

import {useEffect, useRef, useState} from 'react';
import {LogoCursor} from './logo-cursor';

/**
 * The pointer is the TBS mark across the site (mouse and trackpad only). It inverts against what it crosses, stays
 * plain white over the opening film, grows over anything clickable and blinks on every click. Text fields keep the
 * system caret; drag tracks show their own DRAG cursor.
 */
export function SiteCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [blinks, setBlinks] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const html = document.documentElement;
    html.classList.add('has-cursor');
    let frame = 0;
    let target = {x: 0, y: 0};
    let current = {x: 0, y: 0};
    let seen = false;
    const place = () => element.style.setProperty('transform', `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`);
    const tick = () => {
      const k = reduce.matches ? 1 : .35;
      current = {x: current.x + (target.x - current.x) * k, y: current.y + (target.y - current.y) * k};
      place();
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .2 ? requestAnimationFrame(tick) : 0;
    };
    // What lies under the pointer decides how the mark looks; read again on scroll, as the page moves beneath it.
    const read = (node: Element | null) => {
      element.toggleAttribute('data-visible', !!node && !node.closest('input, textarea, select, [contenteditable="true"], .drag'));
      element.toggleAttribute('data-hover', !!node?.closest('a, button, [role="button"], label, summary'));
      // Over the film (header included) plain white; on a case study's colour, the colour its text takes; over its
      // pictures and elsewhere inverted.
      const film = document.querySelector('.hero__stage')?.getBoundingClientRect();
      const overFilm = !!film && target.x >= film.left && target.x <= film.right && target.y >= film.top && target.y <= film.bottom;
      const page = node?.closest('.site-header') ? document.querySelector<HTMLElement>('main [data-cursor-ink]') : null;
      const inked = node?.closest('.room__frame, img, video, .pill, .room__step') ? null : node?.closest<HTMLElement>('[data-cursor-ink]') ?? page;
      element.dataset.tone = overFilm ? 'plain' : inked ? 'ink' : 'invert';
      if (inked) element.style.setProperty('--cursor-ink', inked.dataset.cursorInk || '#fff');
      else element.style.removeProperty('--cursor-ink');
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      target = {x: event.clientX, y: event.clientY};
      if (!seen) { seen = true; current = {...target}; place(); }
      read(event.target as Element);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (seen) read(document.elementFromPoint(target.x, target.y)); };
    const onOut = (event: MouseEvent) => { if (!event.relatedTarget) element.removeAttribute('data-visible'); };
    const onDown = (event: PointerEvent) => { if (event.pointerType === 'mouse') setBlinks(count => count + 1); };
    addEventListener('pointermove', onMove, {passive: true});
    addEventListener('pointerdown', onDown, {passive: true});
    addEventListener('scroll', onScroll, {passive: true});
    document.addEventListener('mouseout', onOut);
    return () => {
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerdown', onDown);
      removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onOut);
      html.classList.remove('has-cursor');
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="site-cursor" aria-hidden="true">
      <div className="site-cursor__scale"><LogoCursor blinks={blinks} /></div>
    </div>
  );
}
