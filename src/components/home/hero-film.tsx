'use client';

import {useEffect, useRef, useState} from 'react';

/** Upright screens (phones, tablets held upright) get the whole mark set across the width (scripts/reel, hero-tall). */
const UPRIGHT = '(orientation: portrait)';
const posterFor = (upright: boolean) => upright ? '/motion/hero-tall.webp' : '/motion/hero.webp';

/**
 * Full-screen opening: the art-direction film loops silently behind the header, without controls (the site cursor
 * turns plain white over it). Landscape screens get the film itself, upright ones a version that keeps the whole mark;
 * turning the screen switches between them. The still behind it is the matching first frame, so nothing jumps while
 * the film loads. A pause control exists for keyboard users only.
 */
export function HeroFilm() {
  const film = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const element = film.current;
    if (!element) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const upright = matchMedia(UPRIGHT);
    let visible = true;
    const sync = () => {
      if (!visible || userPaused.current || reduce.matches) element.pause();
      else element.play().catch(() => {});
    };
    // The sources are picked once per load: turning the screen loads the other one.
    const turn = () => { element.poster = posterFor(upright.matches); element.load(); sync(); };
    element.poster = posterFor(upright.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: .05});
    observer.observe(element);
    reduce.addEventListener('change', sync);
    upright.addEventListener('change', turn);
    sync();
    return () => { observer.disconnect(); reduce.removeEventListener('change', sync); upright.removeEventListener('change', turn); };
  }, []);

  const toggle = () => {
    const element = film.current;
    if (!element) return;
    if (element.paused) { userPaused.current = false; element.play().catch(() => {}); }
    else { userPaused.current = true; element.pause(); }
  };

  return (
    <section className="hero" data-header-fg="#252422" aria-labelledby="hero-title">
      <h1 id="hero-title" className="visually-hidden">To Be Seen, an independent design and development studio</h1>
      <div className="hero__stage">
        <picture className="hero__still" aria-hidden="true">
          <source media={UPRIGHT} srcSet="/motion/hero-tall.webp" />
          <img src="/motion/hero.webp" alt="" />
        </picture>
        <video
          ref={film}
          className="hero__video"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        >
          <source src="/motion/hero-tall.mp4" type="video/mp4" media={UPRIGHT} />
          <source src="/motion/hero.mp4" type="video/mp4" />
        </video>
        <button type="button" className="video-toggle hero__toggle" onClick={toggle}>
          {paused ? 'Play the opening film' : 'Pause the opening film'}
        </button>
      </div>
    </section>
  );
}
