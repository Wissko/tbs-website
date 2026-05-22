import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock, HelpCircle, Mail, MapPin, Phone, Zap } from "lucide-react";

const contactCards = [
  { icon: Mail, label: "EMAIL", value: "hello@tbs.studio" },
  { icon: Phone, label: "PHONE", value: "+33 1 64 25 45 12" },
  { icon: MapPin, label: "ADDRESS", value: "32 Rue de Turenne\n75003 Paris, France" },
  { icon: Clock, label: "HOURS", value: "Monday - Friday\n9:00 AM - 6:00 PM" },
];

const helpCards = [
  { icon: ArrowRight, title: "NEW PROJECT", body: "Let’s build a high-performing\ndigital system tailored to your goals." },
  { icon: Zap, title: "EXISTING SYSTEM", body: "Optimize, automate and scale\nwhat you already have." },
  { icon: BarChart3, title: "CONSULTING", body: "Get expert advice to make better\ndecisions, faster." },
  { icon: HelpCircle, title: "OTHER INQUIRIES", body: "Partnerships, press or anything\nelse — we’re all ears." },
];

function Header() {
  return (
    <header className="contact-v2-header">
      <Link className="contact-v2-brand" href="/">TBS°</Link>
      <p>Premium Business Systems<br />Website · Wallet Loyalty<br />Bookings · Follow-Up</p>
      <span className="contact-v2-plus">+</span>
      <Link className="contact-v2-menu" href="/menu">[ MENU ] <span>+</span></Link>
    </header>
  );
}

export default function ContactPage() {
  return (
    <main className="contact-v2-shell">
      <section className="contact-v2-canvas">
        <Header />

        <nav className="contact-v2-subnav" aria-label="Contact navigation">
          <Link href="/">← BACK TO ALL PAGES</Link>
          <div>
            <Link href="/results#outcomes">OUTCOMES</Link>
            <Link href="/results#trust">TRUST</Link>
            <Link href="/results#speed">SPEED</Link>
            <Link href="/results#retention">RETENTION</Link>
          </div>
          <Link href="/work">VIEW SERVICES →</Link>
        </nav>

        <div className="contact-v2-mobile-hero" aria-hidden="true">
          <strong>LET’S BUILD<br />SOMETHING ICONIC<br />TOGETHER</strong>
          <p>Have a project in mind or just want to say hello?<br />We’d love to hear from you.</p>
        </div>

        <span className="contact-v2-mark mark-a">+</span>
        <span className="contact-v2-mark mark-b">+</span>
        <span className="contact-v2-mark mark-c">+</span>
        <span className="contact-v2-mark mark-d">+</span>

        <section className="contact-v2-hero" aria-labelledby="contact-title">
          <div className="contact-v2-copy">
            <h1 id="contact-title">LET’S BUILD<br />SOMETHING ICONIC<br />TOGETHER</h1>
            <p>Have a project in mind or just want to say hello?<br />We’d love to hear from you.</p>
          </div>
          <figure className="contact-v2-image">
            <Image src="/images/uploads/contact-ref-hero.png" alt="Architectural concrete curve" fill priority sizes="502px" />
          </figure>
        </section>

        <section className="contact-v2-grid" aria-label="Contact options and form">
          <div className="contact-v2-column contact-v2-touch">
            <h2>GET IN TOUCH</h2>
            <div className="contact-v2-contact-cards">
              {contactCards.map(({ icon: Icon, label, value }) => (
                <a className="contact-v2-contact-card" href="#" key={label}>
                  <span className="contact-v2-card-icon"><Icon size={17} strokeWidth={2.2} /></span>
                  <span className="contact-v2-card-copy"><b>{label}</b>{value.split("\n").map((line) => <small key={line}>{line}</small>)}</span>
                  <ArrowRight className="contact-v2-card-arrow" size={15} />
                </a>
              ))}
            </div>
          </div>

          <form className="contact-v2-column contact-v2-form">
            <h2>SEND US A MESSAGE</h2>
            <div className="contact-v2-fields two">
              <label>FIRST NAME<input /></label>
              <label>LAST NAME<input /></label>
            </div>
            <label>EMAIL<input /></label>
            <label>COMPANY<input /></label>
            <label>MESSAGE<textarea /></label>
            <button type="button">SEND MESSAGE <ArrowRight size={15} /></button>
          </form>

          <div className="contact-v2-column contact-v2-help">
            <h2>WE’RE HERE TO HELP</h2>
            <div className="contact-v2-help-list">
              {helpCards.map(({ icon: Icon, title, body }) => (
                <article className="contact-v2-help-card" key={title}>
                  <span><Icon size={17} strokeWidth={2.2} /></span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-v2-faq" aria-label="FAQ">
          <figure>
            <Image src="/images/uploads/contact-faq-eye.png" alt="" fill sizes="170px" />
          </figure>
          <div>
            <h2>QUICKER ANSWERS</h2>
            <p>Check our FAQ or learn more about<br />what we can do for your business.</p>
          </div>
          <Link href="/about">VISIT FAQ <ArrowRight size={15} /></Link>
        </section>

        <span className="contact-v2-bottom-plus left">+</span>
        <span className="contact-v2-bottom-plus right">+</span>
      </section>
    </main>
  );
}
