'use client';

import {useEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {useFollow} from './follow';

/**
 * A horizontal track that scrolls natively (touch, trackpad, keyboard) and can be dragged with a mouse.
 * The round cursor says DRAG and grows carets while dragging; a thin bar shows where you are.
 */
export function DragScroller({children, label, className = '', progress = true, onIndex}: {
  children: ReactNode; label: string; className?: string; progress?: boolean; onIndex?: (index: number) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const {area, dot} = useFollow<HTMLDivElement, HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [overLink, setOverLink] = useState(false);

  useEffect(() => {
    const track = stage.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      if (thumb.current) {
        const share = track.scrollWidth ? track.clientWidth / track.scrollWidth : 1;
        thumb.current.style.width = `${share * 100}%`;
        thumb.current.style.transform = `translateX(${max > 0 ? (track.scrollLeft / max) * ((1 - share) / share) * 100 : 0}%)`;
      }
      if (onIndex) {
        const first = track.children[0] as HTMLElement | undefined;
        const second = track.children[1] as HTMLElement | undefined;
        const step = first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
        onIndex(Math.min(track.children.length - 1, Math.round(track.scrollLeft / Math.max(step, 1))));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    track.addEventListener('scroll', onScroll, {passive: true});
    const resize = new ResizeObserver(onScroll);
    resize.observe(track);
    return () => { track.removeEventListener('scroll', onScroll); resize.disconnect(); cancelAnimationFrame(frame); };
  }, [onIndex]);

  useEffect(() => {
    const track = stage.current;
    if (!track) return;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    let velocity = 0;
    let lastX = 0;
    let lastT = 0;
    let glide = 0;
    let active = false;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      cancelAnimationFrame(glide);
      active = true;
      moved = 0;
      startX = lastX = event.clientX;
      lastT = performance.now();
      startScroll = track.scrollLeft;
      velocity = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (!active) return;
      const dx = event.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) {
        if (!track.hasPointerCapture(event.pointerId)) { track.setPointerCapture(event.pointerId); setDragging(true); }
        track.scrollLeft = startScroll - dx;
        const now = performance.now();
        velocity = (event.clientX - lastX) / Math.max(now - lastT, 1);
        lastX = event.clientX;
        lastT = now;
      }
    };
    const onUp = (event: PointerEvent) => {
      if (!active) return;
      active = false;
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      setDragging(false);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let v = velocity * 16;
      const step = () => {
        if (Math.abs(v) < .5) return;
        track.scrollLeft -= v;
        v *= .92;
        glide = requestAnimationFrame(step);
      };
      glide = requestAnimationFrame(step);
    };
    // A drag is not a click on the card under it.
    const onClick = (event: MouseEvent) => {
      if (moved > 6) { event.preventDefault(); event.stopPropagation(); moved = 0; }
    };
    const onOver = (event: PointerEvent) => setOverLink(!!(event.target as HTMLElement).closest('a, button'));
    const onDragStart = (event: DragEvent) => event.preventDefault();
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('pointermove', onMove);
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
    track.addEventListener('click', onClick, true);
    track.addEventListener('pointerover', onOver);
    track.addEventListener('dragstart', onDragStart);
    return () => {
      cancelAnimationFrame(glide);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      track.removeEventListener('click', onClick, true);
      track.removeEventListener('pointerover', onOver);
      track.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  return (
    <div ref={area} className={`drag ${className}`} data-dragging={dragging} data-over-link={overLink}>
      <div ref={stage} className="drag__stage" tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
      {progress && (
        <div className="drag__progress" aria-hidden="true"><span ref={thumb} /></div>
      )}
      <div ref={dot} className="drag__cursor" aria-hidden="true">
        <span className="drag__body">
          <span className="drag__carets"><Caret /><Caret /></span>
          <span className="drag__label">Drag</span>
        </span>
      </div>
    </div>
  );
}

function Caret() {
  return <svg viewBox="0 0 5.66 11.31" aria-hidden="true"><path d="M5.66 11.31 0 5.66 5.66 0z" /></svg>;
}
