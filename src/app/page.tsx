import type {Metadata} from 'next';
import {HeroFilm} from '@/components/home/hero-film';
import {FeaturedWork} from '@/components/home/featured-work';
import {Engagements, Interlude, Overview, Recognition, Spotlight, WhatWeDo} from '@/components/home/sections';

export const metadata: Metadata = {alternates: {canonical: '/'}};

/** Home: the opening film, three clients, the studio in one line, the ribbon film, the work, every engagement, a dark spotlight, what we do. */
export default function Home() {
  return (
    <div className="page-home">
      <HeroFilm />
      <Recognition />
      <Overview />
      <Interlude />
      <FeaturedWork />
      <Engagements />
      <Spotlight />
      <WhatWeDo />
    </div>
  );
}
