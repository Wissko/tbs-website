'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {projects} from '@/lib/data';
import {DragScroller} from './drag-scroller';
import {TbsMark, pad2} from './ui';

const nav = [
  ['/work', 'Work'],
  ['/about', 'Studio'],
  ['/services', 'Services'],
  ['/contact', 'Contact'],
] as const;

const year = String(new Date().getFullYear()).slice(2);

/**
 * Fixed header: the mark, four words, the three dots. It hides while you read down, returns when you
 * scroll up, turns transparent over an opening that sets data-header-fg, and opens the menu panel.
 */
export function SiteHeader() {
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const navigating = useRef(false);
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => path === href || path.startsWith(`${href}/`);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    let last = scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = scrollY;
      let over = '';
      for (const opening of document.querySelectorAll<HTMLElement>('[data-header-fg]')) {
        const box = opening.getBoundingClientRect();
        if (box.top <= 1 && box.bottom > element.offsetHeight * .6) {
          over = opening.dataset.headerFg || '';
          break;
        }
      }
      if (over) element.style.setProperty('--header-fg', over);
      else element.style.removeProperty('--header-fg');
      element.dataset.transparent = String(!!over);
      if (y < 60) element.dataset.hidden = 'false';
      else if (y > last + 3) element.dataset.hidden = 'true';
      else if (y < last - 3) element.dataset.hidden = 'false';
      element.dataset.solid = String(!over && y > 10);
      last = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, {passive: true});
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [path]);

  // A route change closes the menu without pulling focus back to the trigger.
  useEffect(() => {
    navigating.current = true;
    setOpen(false);
    const reset = setTimeout(() => { navigating.current = false; }, 0);
    return () => clearTimeout(reset);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const outside = [document.getElementById('main'), document.querySelector('.site-footer'), header.current];
    outside.forEach(element => element?.setAttribute('inert', ''));
    document.documentElement.classList.add('menu-open');
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    const focus = setTimeout(() => close.current?.focus(), 60);
    return () => {
      clearTimeout(focus);
      outside.forEach(element => element?.removeAttribute('inert'));
      document.documentElement.classList.remove('menu-open');
      removeEventListener('keydown', onKey);
      if (!navigating.current) trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header ref={header} className="site-header" data-hidden="false" data-solid="false" data-transparent="false">
        <div className="site-header__bg" aria-hidden="true" />
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo" aria-label="To Be Seen, home">
            <TbsMark label={null} />
          </Link>
          <nav className="site-header__nav" aria-label="Main">
            <ul>
              {nav.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} aria-current={isCurrent(href) ? 'page' : undefined}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={trigger}
            type="button"
            className="site-header__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <span className="site-header__menu-word">Menu</span>
            <svg viewBox="0 0 21 5" aria-hidden="true"><circle cx="2.5" cy="2.5" r="2.5" /><circle cx="10.5" cy="2.5" r="2.5" /><circle cx="18.5" cy="2.5" r="2.5" /></svg>
            <span className="visually-hidden">Open the menu and selected work</span>
          </button>
        </div>
      </header>

      <div id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" data-open={open}>
        <div className="menu__panel">
          <div className="menu__top">
            <Link href="/" className="menu__logo" aria-label="To Be Seen, home"><TbsMark label={null} /></Link>
            <div className="menu__meta t-small">
              <span className="dot" aria-hidden="true" />
              <p>({pad2(projects.length)}) Selected work<br />©{year} c/o To Be Seen</p>
              <p className="menu__about">A collection of websites, products and experiments by To Be Seen.</p>
            </div>
            <button ref={close} type="button" className="menu__close" onClick={() => setOpen(false)} aria-label="Close the menu">
              <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19.25" /><path d="M14 14l12 12M26 14L14 26" /></svg>
            </button>
          </div>

          <nav className="menu__nav" aria-label="Menu">
            <ul>
              {nav.map(([href, label]) => (
                <li key={href}><Link href={href} aria-current={isCurrent(href) ? 'page' : undefined}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <DragScroller label="Selected work" className="menu__work" progress={false}>
            {projects.map((project, index) => (
              <article key={project.slug} className="menu-card">
                <Link href={`/work/${project.slug}`} className="menu-card__link">
                  <span className="menu-card__media frame">
                    <Image
                      src={project.mockup.tile.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 28vw, 70vw"
                      quality={75}
                    />
                  </span>
                  <span className="menu-card__head">
                    <span className="menu-card__name">{project.name}</span>
                    <span className="menu-card__kind">{project.category === 'Websites' ? 'Website' : project.category === 'Products' ? 'Product' : 'Experiment'}</span>
                  </span>
                  <span className="menu-card__type t-small">{project.type}</span>
                </Link>
                <span className="menu-card__index t-small" aria-hidden="true">{pad2(index + 1)}</span>
              </article>
            ))}
          </DragScroller>

          <div className="menu__foot t-small">
            <span>To Be Seen</span>
            <span>24 - {year}©</span>
          </div>
        </div>
      </div>
    </>
  );
}
