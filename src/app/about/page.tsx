import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import Image from 'next/image';
import {founded, projects, services, steps} from '@/lib/data';
import {AutoVideo} from '@/components/auto-video';
import {Headline, MetaBar, Pill, TbsMark, pad2} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'We give good businesses the presence they deserve. To Be Seen is an independent design and development studio.',
  alternates: {canonical: '/about'},
};

/** The work beside the studio's own art direction: the tall frame plays the portrait film. */
const gallery: {src: string; alt: string; film?: string}[] = [
  {src: '/projects/mockups/kobble-pair-2.jpg', alt: 'Kobble Cottage on a laptop, the pool and gardens'},
  {src: '/motion/ribbon-portrait.webp', film: '/motion/ribbon-portrait.mp4', alt: 'To Be Seen film: a portrait crossed by a glass ribbon edged in wine'},
  {src: '/projects/mockups/wissem-pair-1.jpg', alt: 'Wissem OS in two browser windows'},
  {src: '/projects/mockups/niumi-pair-2.jpg', alt: 'Niumi Distributors on a laptop, the product ranges'},
];

const snapshot = [
  ['Selected work', pad2(projects.length), 'Websites, products and one experiment, each designed and built by the studio.'],
  ['Services', pad2(services.length), services.map(service => service.title).join('. ') + '.'],
  ['Since', String(founded), 'Bringing design and development together for independent businesses.'],
  ['Wallets', '02', 'Loyalty Pass lives where customers already are: Apple Wallet and Google Wallet.'],
  ['Working days', '02', 'The longest you will wait for our reply to a new enquiry.'],
  ['Steps', pad2(steps.length), steps.map(([title]) => title).join(', ') + '.'],
] as const;

const capabilities = [
  ['Design + development', ['Art direction', 'Logo design', 'Visual identity', 'Web design', 'Responsive development', 'Portfolio experiences', 'Catalogue structure', 'Service architecture', 'Interaction design', 'Creative development', 'Product design', 'Web applications']],
  ['Growth + retention', ['Wallet loyalty', 'Booking journeys', 'Client follow-up', 'CRM experience', 'Search foundations', 'Local visibility', 'Performance insights', 'Integrated guidance']],
] as const;

const principles = ['Character over convention', 'Clarity over clutter', 'Purpose behind the pixels'];

export default function About() {
  return (
    <div className="page-about" data-page-theme="dark">
      <section className="about-intro wrap">
        <div className="about-intro__row">
          <Headline as="h1" className="t-h1 about-intro__a" parts={['We give good businesses']} />
          <div className="about-intro__b">
            <Headline as="p" className="t-h1" parts={[{dot: true, text: 'the presence they deserve.'}]} start={4} />
            <p className="about-intro__text fade-in" style={{'--d': '600ms'} as CSSProperties}>
              <b>To Be Seen</b> is an independent digital studio. We bring design and development together to give
              businesses an online presence with character, clarity and purpose.
            </p>
          </div>
        </div>
        <div className="about-intro__mark fade-in" style={{'--d': '700ms'} as CSSProperties}><TbsMark label={null} /></div>
      </section>

      <div className="wrap"><MetaBar left={`${founded} -`} middle="Present" /></div>

      <section className="gallery wrap" aria-label="The studio and its work">
        <p className="gallery__note t-small">Built to be seen.<br />Excellence deserves an audience.<br />To Be Seen, {founded} – {String(new Date().getFullYear()).slice(2)}©</p>
        {gallery.map((item, index) => (
          <figure key={item.src} className={`gallery__item gallery__item--${index + 1}`} data-reveal="up" style={{'--d': `${index * 90}ms`} as CSSProperties}>
            <div className="gallery__frame frame">
              {item.film
                ? <AutoVideo src={item.film} poster={item.src} label={item.alt} />
                : <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1280px) 36vw, 70vw" quality={78} />}
            </div>
            <figcaption>({pad2(index + 1)})</figcaption>
          </figure>
        ))}
      </section>

      <section className="wordmark wrap" aria-label="To Be Seen">
        <div className="wordmark__line" data-reveal="line" />
        <div className="wordmark__mark" data-reveal="up"><TbsMark /></div>
      </section>

      <section className="split wrap" aria-labelledby="snapshot-title">
        <MetaBar left="Sec." middle="/A" />
        <div className="split__row">
          <h2 id="snapshot-title" className="t-h2 split__title">Studio snapshot</h2>
          <div className="snapshot">
            {snapshot.map(([label, value, text]) => (
              <div key={label} className="snapshot__item" data-reveal="up">
                <h3 className="t-h5">{label}</h3>
                <p className="snapshot__value">{value}</p>
                <p className="snapshot__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split wrap" aria-labelledby="capabilities-title">
        <MetaBar left="Sec." middle="/B" />
        <div className="split__row">
          <h2 id="capabilities-title" className="t-h2 split__title">Capabilities</h2>
          <div className="capabilities">
            {capabilities.map(([title, items]) => (
              <div key={title} data-reveal="up">
                <h3 className="t-h5 capabilities__title">{title}</h3>
                <ul className="capabilities__list">{items.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split wrap" aria-labelledby="principles-title">
        <MetaBar left="Sec." middle="/C" />
        <div className="split__row">
          <h2 id="principles-title" className="t-h2 split__title">Principles</h2>
          <div className="principles__intro" data-reveal="up">
            <p className="t-statement">We hold every project to the same three rules, from the first sketch to the final click.</p>
            <Pill href="/work">See them at work</Pill>
          </div>
        </div>
        <ol className="principles">
          {principles.map((item, index) => (
            <li key={item} data-reveal="up"><span>{item}</span><sup>/{pad2(index + 1)}</sup></li>
          ))}
        </ol>
      </section>
    </div>
  );
}
