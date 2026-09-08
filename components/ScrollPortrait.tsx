"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import motionConfig from "../config/portrait-motion.json";

/** Scroll-controlled photographic relief, not a generated head-turn or film. */
export default function ScrollPortrait() {
  const trackRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  const filterId = `portrait-ink-${useId().replace(/:/g, "")}`;
  const whitePoint = Math.max(0.1, Math.min(1, motionConfig.whitePoint));

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const figure = figureRef.current;
    const layer = layerRef.current;
    if (!motion || !track || !figure || !layer) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (document.hidden) return;
      const top = parseFloat(getComputedStyle(figure).top) || 0;
      const distance = Math.max(1, track.offsetHeight - figure.offsetHeight);
      const raw = Math.max(0, Math.min(1, (top - track.getBoundingClientRect().top) / distance));
      // Smooth endpoints while retaining a deterministic, reversible scroll position.
      const progress = raw * raw * (3 - 2 * raw);
      const settings = window.matchMedia("(max-width: 820px)").matches
        ? motionConfig.mobile : motionConfig.desktop;
      layer.style.transform = `translate3d(${progress * settings.translateX}px, ${progress * settings.translateY}px, 0) rotate(${progress * settings.rotate}deg) scale(${1 + progress * (settings.scale - 1)})`;
      figure.dataset.progress = progress.toFixed(3);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    document.addEventListener("visibilitychange", request);
    const resize = new ResizeObserver(request);
    resize.observe(track);
    request();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      document.removeEventListener("visibilitychange", request);
      layer.style.transform = "";
    };
  }, [motion]);

  return (
    <div ref={trackRef} className="portrait-track" data-motion={motion || undefined}>
      <figure ref={figureRef} className="hero-photo hero-photo--scrub" style={{ background: motionConfig.background }}>
        <Image
          className="portrait-original"
          src="/images/uploads/tbs-photo-01.jpg"
          alt="Portrait éditorial en noir et blanc, visage partiellement caché par les cheveux"
          fill priority sizes="(max-width: 820px) 100vw, 40vw"
        />
        {motion && <>
          <svg className="portrait-filter-definitions" aria-hidden="true" width="0" height="0">
            <defs>
              <filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
                {/* Pale paper becomes transparent; fine dark strands remain, without a hard cutout. */}
                <feColorMatrix type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-0.2126 / whitePoint} ${-0.7152 / whitePoint} ${-0.0722 / whitePoint} 0 1`} />
              </filter>
            </defs>
          </svg>
          <div ref={layerRef} className="portrait-relief" aria-hidden="true">
            <Image src="/images/uploads/tbs-photo-01.jpg" alt="" fill priority
              sizes="(max-width: 820px) 100vw, 40vw" style={{ filter: `url(#${filterId})` }} />
          </div>
        </>}
      </figure>
    </div>
  );
}
