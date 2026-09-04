"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-driven motion, one place.
 *
 * Writes two kinds of CSS variables that the stylesheet turns into parallax:
 *   --scroll  on <html>: the page scroll offset in pixels (seals and marks rotate with it)
 *   --pc      on every "scene": the scene's progress through the viewport, from -1
 *             (just below the fold) to 1 (just scrolled out at the top), 0 when centred.
 *
 * Only scenes currently on screen are updated, on animation frames. Nothing runs
 * when the visitor prefers reduced motion; the variables then stay at 0 and the
 * page is still.
 */
const SCENES = [
  ".hero",
  ".page-hero",
  ".detail-hero",
  ".section-head",
  ".system",
  ".cases > li",
  ".service-grid > li",
  ".manifesto",
  ".outcomes > li",
  ".two-col",
  ".cta-band",
].join(",");

export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("fx");
    const visible = new Set<HTMLElement>();
    let frame = 0;

    const update = () => {
      frame = 0;
      root.style.setProperty("--scroll", String(Math.round(window.scrollY)));
      const viewport = window.innerHeight;
      visible.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = (viewport - rect.top) / (viewport + rect.height); // 0 → 1 across the viewport
        const centred = Math.max(-1, Math.min(1, progress * 2 - 1));
        element.style.setProperty("--pc", centred.toFixed(4));
      });
    };
    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(element);
          else visible.delete(element);
        });
        request();
      },
      { rootMargin: "20% 0px 20% 0px" }
    );

    const scenes = Array.from(document.querySelectorAll<HTMLElement>(SCENES));
    scenes.forEach((scene) => {
      scene.classList.add("scene");
      observer.observe(scene);
    });

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("fx");
      scenes.forEach((scene) => {
        scene.classList.remove("scene");
        scene.style.removeProperty("--pc");
      });
    };
  }, [pathname]);

  return null;
}
