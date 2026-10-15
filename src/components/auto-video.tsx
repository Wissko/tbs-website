'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * A muted loop that plays only while in view, never by itself under reduced motion,
 * and can always be paused (the toggle shows on hover and keyboard focus).
 */
export function AutoVideo({src, poster, label, className = '', position, toggle = true}: {
  src: string; poster: string; label: string; className?: string; position?: string; toggle?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const choice = useRef<'play' | 'pause' | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      const wanted = choice.current ? choice.current === 'play' : !reduce.matches;
      if (visible && wanted) {
        if (!element.getAttribute('src')) element.src = src;
        element.play().catch(() => {});
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: .2});
    observer.observe(element);
    reduce.addEventListener('change', sync);
    return () => { observer.disconnect(); reduce.removeEventListener('change', sync); element.pause(); };
  }, [src]);

  const onToggle = () => {
    const element = video.current;
    if (!element) return;
    if (playing) { choice.current = 'pause'; element.pause(); }
    else {
      choice.current = 'play';
      if (!element.getAttribute('src')) element.src = src;
      element.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={video}
        className={className}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        style={position ? {objectPosition: position} : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {toggle && (
        <button type="button" className="video-toggle t-small" onClick={onToggle} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}>
          {playing ? 'Pause' : 'Play'}
        </button>
      )}
    </>
  );
}
