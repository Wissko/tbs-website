'use client';

import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useRef} from 'react';
import {projects} from '@/lib/data';

const LEAVE_MS = 380;
const BLINK_MS = 460;

/**
 * Page-level behaviour, all progressive:
 * - internal links fade the page out before the route changes; the next page's words rise in. A link into a case
 *   study blinks instead: the lids close in the project's colour, like the mark's eye, and open on its room;
 * - a chapter with data-theme-section="dark" turns the whole page dark while it holds the middle of the screen;
 * - [data-reveal] blocks settle in once as they enter.
 */
export function Runtime() {
  const path = usePathname();
  const router = useRouter();
  const first = useRef(true);

  // Route leave: intercept plain same-origin clicks, fade out (or blink, into a case study), then navigate.
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let safety = 0;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      if (reduce.matches) return;
      event.preventDefault();
      const root = document.documentElement;
      delete root.dataset.seamless;
      const into = projects.find(project => url.pathname === `/work/${project.slug}`);
      if (into) root.style.setProperty('--blink', into.color.bg);
      const state = into ? 'is-blinking' : 'is-leaving';
      root.classList.add(state);
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), into ? BLINK_MS : LEAVE_MS);
      // Never leave the page blank (or shut) if navigation stalls.
      clearTimeout(safety);
      safety = window.setTimeout(() => root.classList.remove('is-leaving', 'is-blinking'), 4000);
    };
    document.addEventListener('click', onClick, true);
    return () => { document.removeEventListener('click', onClick, true); clearTimeout(safety); };
  }, [router]);

  // Arrival: after the first page, openings play with a short delay instead of after the logo takeover.
  useEffect(() => {
    const root = document.documentElement;
    if (first.current) { first.current = false; return; }
    root.dataset.initial = 'false';
    root.classList.remove('is-leaving', 'is-blinking');
  }, [path]);

  // Dark chapters.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme-section]'));
    const body = document.body;
    if (!sections.length) { delete body.dataset.theme; return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = innerHeight * .5;
      const active = sections.find(section => {
        const box = section.getBoundingClientRect();
        return box.top < middle && box.bottom > middle;
      });
      if (active) body.dataset.theme = active.dataset.themeSection;
      else delete body.dataset.theme;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, {passive: true});
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      delete body.dataset.theme;
    };
  }, [path]);

  // Reveals.
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { items.forEach(item => item.classList.add('is-in')); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); }
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: .01});
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [path]);

  return <div className="blink" aria-hidden="true" />;
}
