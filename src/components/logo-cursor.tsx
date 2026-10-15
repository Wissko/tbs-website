'use client';

import {useEffect, useRef} from 'react';
import {EYE, PUPIL} from './eye-path';

/**
 * The TBS mark, small, as the site's cursor. The letters are a mask of the traced logo without its pupil;
 * the pupil and a lid are drawn over the eye, and the lid closes the eye for a blink on every click.
 */
export function LogoCursor({blinks}: {blinks: number}) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!blinks || !element) return;
    element.classList.remove('is-blinking');
    void element.getBoundingClientRect();
    element.classList.add('is-blinking');
  }, [blinks]);

  return (
    <span ref={root} className="logo-cursor" onAnimationEnd={() => root.current?.classList.remove('is-blinking')}>
      <span className="logo-cursor__body" />
      <svg className="logo-cursor__eye" viewBox="0 0 1078 374" aria-hidden="true" focusable="false">
        <path className="logo-cursor__pupil" d={PUPIL} />
        <path className="logo-cursor__lid" d={EYE} />
      </svg>
    </span>
  );
}
