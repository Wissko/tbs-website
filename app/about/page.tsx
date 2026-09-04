import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "../../components/CtaBand";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import Reveal from "../../components/Reveal";
import { brand } from "../../lib/brand";
import { process } from "../../lib/services";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} is a studio building digital systems for independent businesses. Who we are, what we believe, how we work.`,
};

const beliefs = [
  {
    title: "Specific beats impressive.",
    text: "A salon does not need a “digital transformation”. It needs to be booked on a Tuesday afternoon. We build for the Tuesday afternoon.",
  },
  {
    title: "Own the relationship.",
    text: "Platforms rent you your customers and charge for the privilege. A website, a Loyalty Pass and a follow-up list are yours, and they stay.",
  },
  {
    title: "Fewer things, working together.",
    text: "One coherent system beats six subscriptions that ignore each other. Less admin for the team, no seams for the customer.",
  },
];

export default function AboutPage() {
  return (
    <PageShell tone="ink">
      <section className="page-hero" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <div className="title-wrap">
          <Marks />
          <h1 id="about-title" className="display h1 ink-title">To Be Seen</h1>
        </div>
        <p className="lede">
          A studio that builds the digital systems independent businesses actually need: a website people trust, a Loyalty Pass they keep, bookings that happen without a phone call, and follow-up that brings them back.
        </p>
      </section>

      <section className="manifesto tone-paper" aria-labelledby="about-manifesto">
        <div className="container manifesto-inner">
          <h2 id="about-manifesto" className="display ink-title">{brand.manifesto.line}</h2>
          <div className="manifesto-body">
            {brand.manifesto.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section container two-col" aria-labelledby="who-title">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 id="who-title" className="display h2">
            Small studio.<br />Whole system.
          </h2>
          <p className="lede">
            {brand.name} started in {brand.foundedYear} with a simple observation: the businesses that do the best work in their street are often the hardest to find, trust and book online. Not because they lack ambition, but because nobody built them the tools.
          </p>
          <p className="mute">
            We design and build those tools ourselves, end to end: the website, the Loyalty Pass, the booking flow, the follow-up. One team, one system, one point of contact.
          </p>
        </div>
        <Reveal as="figure" className="detail-media">
          <Image
            src="/images/uploads/tbs-photo-06.jpg"
            alt="Portrait half hidden behind rippled glass, black and white"
            fill
            sizes="(max-width: 820px) 100vw, 45vw"
          />
        </Reveal>
      </section>

      <section className="section container" aria-labelledby="beliefs-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">What we believe</p>
            <h2 id="beliefs-title" className="display h2">
              Three things<br />we won't trade.
            </h2>
          </div>
        </div>
        <ul className="process">
          {beliefs.map((belief, index) => (
            <Reveal as="li" key={belief.title} className="process-step" delay={index * 90}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3 className="display">{belief.title}</h3>
              <p>{belief.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="how-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 id="how-title" className="display h2">
              Four steps,<br />no surprises.
            </h2>
          </div>
          <p>The same simple path for every project, whatever its size.</p>
        </div>
        <ol className="process">
          {process.map((step, index) => (
            <li className="process-step" key={step.step}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3 className="display">{step.step}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand tone="paper" secondaryHref="/work" secondaryLabel="See the work" />
    </PageShell>
  );
}
