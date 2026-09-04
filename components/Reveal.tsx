"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "figure";
  className?: string;
  delay?: number;
};

/**
 * Reveals a block once it scrolls into view. Content is visible by default
 * (no JavaScript, reduced motion, or already on screen); only blocks below the
 * fold are hidden, and only after hydration.
 */
export default function Reveal({ children, as = "div", className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    element.classList.add("reveal-ready");
    const show = () => {
      element.classList.add("reveal-in");
      observer.disconnect();
      window.clearTimeout(safety);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(element);
    // Never leave content hidden if the observer misbehaves.
    const safety = window.setTimeout(show, 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return createElement(
    as,
    { ref, className, "data-reveal": "", style: { "--reveal-delay": `${delay}ms` } as CSSProperties },
    children
  );
}
