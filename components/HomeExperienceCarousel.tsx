"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    eyebrow: "01 / BRAND SYSTEMS",
    title: "IDENTITIES THAT MOVE BEFORE THEY SPEAK.",
    body: "Strategic visual worlds built for launches, rituals and memorable digital presence.",
    image: "/images/uploads/tbs-photo-02.jpg",
    alt: "Editorial monochrome portrait for brand systems",
  },
  {
    eyebrow: "02 / DIGITAL EXPERIENCES",
    title: "SCROLLS THAT FEEL LIKE CINEMA.",
    body: "Interfaces with rhythm, tension and clarity — designed to be felt, not just visited.",
    image: "/images/uploads/tbs-photo-04.jpg",
    alt: "Abstract dark editorial image for digital experiences",
  },
  {
    eyebrow: "03 / CONTENT DIRECTION",
    title: "CAMPAIGNS BUILT AROUND THE AFTERIMAGE.",
    body: "Art direction, motion cues and social assets that keep the story alive after the click.",
    image: "/images/uploads/tbs-photo-06.jpg",
    alt: "Editorial visual for content direction",
  },
  {
    eyebrow: "04 / LAUNCH MOMENTS",
    title: "HIGH-CONTRAST MOMENTS FOR BOLD RELEASES.",
    body: "From concept to conversion, we shape the system around the one scene people remember.",
    image: "/images/uploads/tbs-photo-08.jpg",
    alt: "Monochrome image for launch moments",
  },
];

export default function HomeExperienceCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const wheelLockRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);

  const activeSlide = slides[active];

  const updateOffset = useCallback((index = activeRef.current) => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[index];
    if (!viewport || !card) return;

    const viewportCenter = viewport.clientWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    setOffset(viewportCenter - cardCenter);
  }, []);

  const setActiveSlide = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(slides.length - 1, index));
    activeRef.current = boundedIndex;
    setActive(boundedIndex);
    window.requestAnimationFrame(() => updateOffset(boundedIndex));
  }, [updateOffset]);

  const goToPrevious = () => setActiveSlide(activeRef.current - 1);
  const goToNext = () => setActiveSlide(activeRef.current + 1);

  useEffect(() => {
    updateOffset(activeRef.current);
    const onResize = () => updateOffset(activeRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateOffset]);

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15 || event.shiftKey;
    const strongEnough = Math.abs(event.deltaX) > 36 || (event.shiftKey && Math.abs(event.deltaY) > 36);
    if (!horizontalIntent || !strongEnough || wheelLockRef.current) return;

    event.preventDefault();
    wheelLockRef.current = true;
    setActiveSlide(activeRef.current + (event.deltaX > 0 || event.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 1500);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const horizontalSwipe = Math.abs(deltaX) > 58 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4;
    if (!horizontalSwipe) return;

    setActiveSlide(activeRef.current + (deltaX < 0 ? 1 : -1));
  };

  return (
    <section className="home-carousel-section" aria-labelledby="home-carousel-title">
      <div className="home-carousel-meta">
        <span>TBS° FIELD NOTES</span>
        <span>SWIPE / DRAG</span>
      </div>

      <div className="home-carousel-copy" aria-live="polite">
        <p key={`${active}-eyebrow`} className="home-carousel-eyebrow">
          {activeSlide.eyebrow}
        </p>
        <h2 key={`${active}-title`} id="home-carousel-title">
          {activeSlide.title}
        </h2>
        <p key={`${active}-body`} className="home-carousel-body">
          {activeSlide.body}
        </p>
      </div>

      <div className="home-carousel-controls" aria-label="Carousel controls">
        <button type="button" onClick={goToPrevious} aria-label="Previous slide" disabled={active === 0}>←</button>
        <button type="button" onClick={goToNext} aria-label="Next slide" disabled={active === slides.length - 1}>→</button>
      </div>

      <div
        ref={viewportRef}
        className="home-carousel-viewport"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { pointerStartRef.current = null; }}
      >
        <div
          ref={trackRef}
          className="home-carousel-track"
          style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <article
              ref={(node) => { cardRefs.current[index] = node; }}
              className={index === active ? "home-carousel-card is-active" : "home-carousel-card"}
              data-carousel-card
              key={slide.title}
            >
              <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 760px) 76vw, 330px" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
