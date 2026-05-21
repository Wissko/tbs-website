import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

function Header() {
  return (
    <header className="contact-header">
      <Link className="contact-brand" href="/">TBS°</Link>
      <p className="contact-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="contact-plus">+</span>
      <Link className="contact-menu" href="/menu">( MENU ) <span>+</span></Link>
    </header>
  );
}

export default function ContactPage() {
  return (
    <main className="contact-shell">
      <section className="contact-canvas">
        <Header />
        <Link className="contact-back" href="/">← BACK TO ALL PAGES</Link>

        <section className="contact-left">
          <h1 className="contact-title-a11y">LET&apos;S BUILD SOMETHING ICONIC TOGETHER</h1>
          <figure className="contact-title-art" aria-hidden="true">
            <Image
              src="/images/uploads/contact-lets-build-title.png"
              alt=""
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 900px) 92vw, 580px"
            />
          </figure>
          <p className="contact-intro">Have a project in mind or just want to say hello?<br />We&apos;d love to hear from you.</p>
          <div className="contact-rule" />

          <div className="contact-bottom-grid">
            <aside className="contact-details">
              <h2>GET IN TOUCH</h2>
              <p><span>✉</span>hello@tbs.studio</p>
              <p><span>☏</span>+33 1 84 25 45 12</p>
              <p><span>⌖</span>32 Rue de Turenne<br />75003 Paris<br />France</p>
              <h2 className="follow-title">FOLLOW US</h2>
              <div className="socials"><a>in</a><a>◎</a><a>𝕏</a><a>Bē</a></div>
            </aside>

            <form className="contact-form">
              <div className="field-row">
                <label>NAME<input /></label>
                <label>EMAIL<input /></label>
              </div>
              <label>COMPANY<input /></label>
              <label>MESSAGE<textarea /></label>
              <button type="button">SEND MESSAGE <span>→</span></button>
            </form>
          </div>
        </section>

        <figure className="contact-image">
          <Image src="/mockups/contact-hero.jpg" alt="Architectural concrete curve" fill priority sizes="577px" />
        </figure>

      </section>
      <SiteFooter />
    </main>
  );
}
