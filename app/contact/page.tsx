import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarCheck, Clock, Mail, MessageSquare, Wallet, Zap } from "lucide-react";
import ContactForm from "../../components/ContactForm";
import Marks from "../../components/Marks";
import PageShell from "../../components/PageShell";
import { bookingHref, brand, mailto } from "../../lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell ${brand.name} about your business. Book a call or send a message; we reply within two working days.`,
};

const helpItems = [
  { icon: ArrowUpRight, title: "New project", body: "A website, bookings or the full system, built for how your business really works." },
  { icon: Zap, title: "Existing system", body: "Something already in place that should work harder: we optimise, connect and automate." },
  { icon: Wallet, title: "Loyalty Pass", body: "Our wallet loyalty system, ready to add to any business with regulars." },
  { icon: MessageSquare, title: "Anything else", body: "Partnerships, press, a question. Write to us; a person answers." },
];

export default function ContactPage() {
  return (
    <PageShell tone="paper">
      <section className="page-hero page-hero--grid" aria-labelledby="contact-title">
        <div className="page-hero-copy">
          <p className="eyebrow">Contact</p>
          <div className="title-wrap">
            <Marks />
            <h1 id="contact-title" className="display h1 ink-title">
              Let's get<br />you seen.
            </h1>
          </div>
          <p className="lede">
            Tell us what you do and where it leaks. A short call is enough to say what we would build first, and why.
          </p>
        </div>
        <figure className="detail-media">
          <Image
            src="/images/uploads/tbs-photo-04.jpg"
            alt="Curved concrete facade catching a single band of light"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 40vw"
          />
        </figure>
      </section>

      <section className="contact-grid" aria-label="Contact options and form">
        <div className="contact-col">
          <h2>Get in touch</h2>
          <div className="contact-cards">
            <a className="contact-card" href={bookingHref}>
              <span className="icon"><CalendarCheck size={18} strokeWidth={2} aria-hidden="true" /></span>
              <span>
                <b>{brand.cta.primary}</b>
                <small>{brand.contact.bookingUrl ? "Pick a slot that suits you" : "Propose a time by e-mail"}</small>
              </span>
              <ArrowRight className="arrow" size={16} aria-hidden="true" />
            </a>
            <a className="contact-card" href={mailto("Hello To Be Seen")}>
              <span className="icon"><Mail size={18} strokeWidth={2} aria-hidden="true" /></span>
              <span>
                <b>E-mail</b>
                <small>{brand.contact.email}</small>
              </span>
              <ArrowRight className="arrow" size={16} aria-hidden="true" />
            </a>
            <div className="contact-card">
              <span className="icon"><Clock size={18} strokeWidth={2} aria-hidden="true" /></span>
              <span>
                <b>Response time</b>
                <small>{brand.contact.responseTime}</small>
              </span>
            </div>
          </div>
        </div>

        <div className="contact-col">
          <h2>Send a message</h2>
          <ContactForm />
        </div>

        <div className="contact-col">
          <h2>We can help with</h2>
          <ul>
            {helpItems.map(({ icon: Icon, title, body }) => (
              <li className="help-item" key={title}>
                <span className="icon"><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
