"use client";

import { useEffect } from "react";

const milestones = [
  {
    year: "2024",
    title: "TBS Studio is Founded",
    text: "A digital creative studio built to shape memorable identities, precise websites and high-impact brand systems.",
  },
  {
    year: "2025",
    title: "Process & Craft",
    text: "We refine our creative system around strategy, hierarchy, interaction and production discipline.",
  },
  {
    year: "2026",
    title: "Strategic Expansion",
    text: "TBS evolves into a sharper partner for ambitious brands that need websites, campaigns and digital products.",
  },
  {
    year: "NEXT",
    title: "What People Remember",
    text: "The next chapter is focused on designing experiences that stay in people’s heads long after the first visit.",
  },
];

export default function ScrollTimeline() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-timeline-item]"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.32, rootMargin: "0px 0px -12% 0px" }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="scroll-timeline-section" aria-label="TBS evolution timeline">
      <div className="scroll-timeline-intro">
        <span>Studio Evolution</span>
        <h2>Built progressively, revealed with intention.</h2>
      </div>

      <div className="scroll-timeline">
        {milestones.map((item, index) => (
          <article
            className={`scroll-timeline-item ${index % 2 === 0 ? "is-odd" : "is-even"}`}
            data-timeline-item
            key={item.title}
          >
            <div className="scroll-timeline-row">
              <span className="scroll-timeline-year">{item.year}</span>
              <span className="scroll-timeline-marker" aria-hidden="true" />
            </div>
            <div className="scroll-timeline-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
