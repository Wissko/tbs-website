import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import {AutoVideo} from '@/components/auto-video';
import {ContactForm} from '@/components/contact-form';
import {Dot, Headline, Pill} from '@/components/ui';
import {briefUrl, email, founded} from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell To Be Seen what you have in mind. Websites, loyalty and connected experiences.',
  alternates: {canonical: '/contact'},
};

export default function Contact() {
  return (
    <div className="page-contact">
      <section className="contact wrap">
        <div className="contact__media">
          <div className="contact__film frame">
            <AutoVideo src="/motion/bottle.mp4" poster="/motion/bottle.webp" label="To Be Seen film: a gloved hand opens the To Be Seen bottle" />
          </div>
        </div>

        <div className="contact__body">
          <Headline as="h1" className="t-h1 contact__title" parts={['TBS', 'Contact']} />
          <p className="contact__legal t-small fade-in" style={{'--d': '350ms'} as CSSProperties}>
            Built to be seen.<br />Excellence deserves an audience.<br />To Be Seen, {founded} – {String(new Date().getFullYear()).slice(2)}©
          </p>

          <div className="contact__grid fade-in" style={{'--d': '500ms'} as CSSProperties}>
            <span className="contact__dot" aria-hidden="true"><Dot /></span>
            <div className="contact__item">
              <h2 className="t-h5">New projects</h2>
              <a className="text-link" href={`mailto:${email}`}>{email}</a>
              <p>We reply within two working days.</p>
            </div>
            <div className="contact__item">
              <h2 className="t-h5">Guided brief</h2>
              <a className="text-link" href={briefUrl} target="_blank" rel="noreferrer">form.tobeseen.agency</a>
              <p>A few questions, in your own time.</p>
              <Pill href={briefUrl} external className="contact__pill">Open the brief</Pill>
            </div>
          </div>

          <div className="contact__write">
            <h2 className="t-h5">Write to us</h2>
            <p className="contact__lead">A new idea. A fresh direction. A website that finally feels like you. Tell us about it.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
