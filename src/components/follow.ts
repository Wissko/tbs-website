'use client';

import {useEffect, useRef} from 'react';

/**
 * Makes `dot` trail the pointer inside `area` (mouse only). Until the pointer first enters, the dot rests
 * at (restX, restY), fractions of the area; with restX null it waits out of sight. Returns refs to attach.
 */
export function useFollow<A extends HTMLElement, D extends HTMLElement>(restX: number | null = .5, restY = .5, ease = .16) {
  const area = useRef<A>(null);
  const dot = useRef<D>(null);

  useEffect(() => {
    const zone = area.current;
    const element = dot.current;
    if (!zone || !element) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let target = {x: 0, y: 0};
    let current = {x: 0, y: 0};
    let entered = false;
    const place = () => element.style.setProperty('transform', `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`);
    const settle = () => {
      if (restX === null) return;
      const box = zone.getBoundingClientRect();
      target = {x: box.width * restX, y: box.height * restY};
      current = {...target};
      place();
    };
    const tick = () => {
      const k = reduce.matches ? 1 : ease;
      current = {x: current.x + (target.x - current.x) * k, y: current.y + (target.y - current.y) * k};
      place();
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .2 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const box = zone.getBoundingClientRect();
      target = {x: event.clientX - box.left, y: event.clientY - box.top};
      if (!entered) { entered = true; if (restX === null) { current = {...target}; place(); } }
      zone.dataset.pointer = 'in';
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => { delete zone.dataset.pointer; };
    settle();
    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    const resize = new ResizeObserver(() => { if (!entered) settle(); });
    resize.observe(zone);
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [restX, restY, ease]);

  return {area, dot};
}
