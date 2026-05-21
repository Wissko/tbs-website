"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const activeSlide = slides[active];

  const updateActiveSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackBox = track.getBoundingClientRect();
    const trackCenter = trackBox.left + trackBox.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-card]")).forEach((card, index) => {
      const cardBox = card.getBoundingClientRect();
      const cardCenter = cardBox.left + cardBox.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActive(nearestIndex);
  }, []);

  return (
    <section className="home-carousel-section" aria-labelledby="home-carousel-title">
      <div className="home-carousel-meta">
        <span>TBS° FIELD NOTES</span>
        <span>DRAG / SCROLL</span>
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

      <div
        ref={trackRef}
        className="home-carousel-track"
        onScroll={updateActiveSlide}
      >
        {slides.map((slide, index) => (
          <article
            className={index === active ? "home-carousel-card is-active" : "home-carousel-card"}
            data-carousel-card
            key={slide.title}
          >
            <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 760px) 72vw, 360px" />
          </article>
        ))}
      </div>
    </section>
  );
}
