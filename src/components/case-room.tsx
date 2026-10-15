'use client';

import {useEffect, useRef, useState} from 'react';
import type {Project} from '@/lib/data';
import {RoomStage} from './room-stage';

/** Below this height (a phone held sideways, a small phone) the room cannot hold its stage: it is not pinned. */
const SHORT = '(max-height: 600px)';

/**
 * The case room, pinned while its reel runs: scrolling down moves the work sideways, with a light glide, each
 * picture drifting a little inside its frame, and the rule under the reel filling as you go. Without script, or on a
 * screen too short to hold the stage, the reel is a plain horizontal scroller you swipe; under reduced motion it
 * follows the scroll without glide or drift.
 */
export function CaseRoom(props: {project: Project; index: number; total: number; prev: Project; next: Project}) {
  const room = useRef<HTMLElement>(null);
  const [short, setShort] = useState(false);

  useEffect(() => {
    const query = matchMedia(SHORT);
    const sync = () => setShort(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const element = room.current;
    const reel = element?.querySelector<HTMLElement>('.room__reel');
    const track = element?.querySelector<HTMLElement>('.room__track');
    if (!element || !reel || !track || short) return;
    const plates = Array.from(track.children) as HTMLElement[];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let distance = 0;
    let target = 0;
    let current = 0;
    let frame = 0;
    let boxes: {left: number; width: number}[] = [];

    const apply = () => {
      track.style.transform = `translate3d(${(-current).toFixed(1)}px, 0, 0)`;
      element.style.setProperty('--progress', distance ? (current / distance).toFixed(4) : '0');
      if (reduce.matches) return;
      const half = reel.clientWidth / 2;
      plates.forEach((plate, i) => {
        const box = boxes[i];
        const shift = Math.max(-1, Math.min(1, (box.left + box.width / 2 - current - half) / (half * 2)));
        plate.style.setProperty('--shift', shift.toFixed(3));
      });
    };
    const tick = () => {
      current += (target - current) * (reduce.matches ? 1 : .14);
      if (Math.abs(target - current) < .3) current = target;
      apply();
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const read = () => {
      target = Math.max(0, Math.min(distance, -element.getBoundingClientRect().top));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      distance = Math.max(0, track.offsetWidth - reel.clientWidth);
      boxes = plates.map(plate => ({left: plate.offsetLeft, width: plate.offsetWidth}));
      element.style.setProperty('--distance', `${distance}px`);
      read();
    };

    element.classList.add('is-pinned');
    reel.scrollLeft = 0;
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(reel);
    resize.observe(track);
    addEventListener('scroll', read, {passive: true});
    return () => {
      removeEventListener('scroll', read);
      resize.disconnect();
      cancelAnimationFrame(frame);
      // Back to a plain scroller (unmounting, or the screen turning sideways): no transform left behind.
      element.classList.remove('is-pinned');
      track.style.removeProperty('transform');
      element.style.removeProperty('--distance');
      plates.forEach(plate => plate.style.removeProperty('--shift'));
    };
  }, [short]);

  return (
    <section ref={room} className="room" data-header-fg={props.project.color.fg} aria-label={`${props.project.name}, the case`}>
      <RoomStage {...props} live />
    </section>
  );
}
