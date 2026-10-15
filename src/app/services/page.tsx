import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import {services, steps} from '@/lib/data';
import {PageIntro} from '@/components/page-parts';
import {ServiceRows} from '@/components/service-rows';
import {MetaBar, pad2} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Distinctive websites, digital loyalty, bookings, client follow-up and bespoke applications. Design and development by To Be Seen.',
  alternates: {canonical: '/services'},
};

export default function Services() {
  return (
    <div className="page-services">
      <PageIntro
        title={['Look good.', {dot: true, text: 'Work hard.'}]}
        left={
          <nav className="intro__nav" aria-label="Sections">
            <a href="#what-we-do">What we do</a>
            <a href="#how-we-work">How we work</a>
          </nav>
        }
        aside="A strong first impression is the beginning. We build what comes next, too: the bookings, the loyalty, the follow-up and the tools behind them."
      />

      <section id="what-we-do" className="split wrap" aria-labelledby="services-title">
        <MetaBar left="Sec." middle="/A" />
        <div className="split__row split__row--head">
          <h2 id="services-title" className="t-h2 split__title">What we do</h2>
          <p className="t-statement" data-reveal="up">{pad2(services.length)} services, one studio. Each one can stand alone or join the rest as a connected system.</p>
        </div>
        <ServiceRows />
      </section>

      <section id="how-we-work" className="split wrap" aria-labelledby="process-title">
        <MetaBar left="Sec." middle="/B" />
        <div className="split__row">
          <h2 id="process-title" className="t-h2 split__title">How we work</h2>
          <p className="t-statement process__intro" data-reveal="up">A clear way forward, agreed in writing before anything is built.</p>
        </div>
        <ol className="process">
          {steps.map(([title, body], index) => (
            <li key={title} className="process__item" data-reveal="up" style={{'--d': `${index * 90}ms`} as CSSProperties}>
              <span className="process__num">{pad2(index + 1)}</span>
              <h3 className="t-h5">{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
