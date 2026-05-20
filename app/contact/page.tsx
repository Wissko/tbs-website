import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="contact-header">
      <Link className="contact-brand" href="/">TBS°</Link>
      <p className="contact-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="contact-plus">+</span>
      <a className="contact-menu" href="#menu">( MENU ) <span>+</span></a>
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
          <h1>LET&apos;S BUILD<br />SOMETHING ICONIC<br />TOGETHER</h1>
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

        <footer className="contact-footer">
          <div className="star">✳</div>
          <h2>SHAPING IDEAS.<br />BUILDING IMPACT.</h2>
          <p>© 2024 TBS STUDIO<br />All rights reserved.</p>
          <nav><a>PRIVACY POLICY</a><a>TERMS OF SERVICE</a><a>CAREERS</a></nav>
        </footer>
      </section>
    </main>
  );
}
