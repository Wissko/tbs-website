import Image from "next/image";
import Link from "next/link";
import HomeExperienceCarousel from "../components/HomeExperienceCarousel";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <main className="home-shell" aria-label="TBS homepage">
      <section className="home-canvas">
        <header className="home-header">
          <div className="home-brand">TBS°</div>
          <p className="home-kicker">
            Digital Creative Studio<br />
            Building Bold Experiences<br />
            And Brands.
          </p>
          <span className="home-plus home-plus-top">+</span>
          <Link className="home-menu" href="/menu">( MENU ) <span>+</span></Link>
        </header>

        <div className="home-hero">
          <div className="home-copy">
            <h1 className="home-title-a11y">BUILT TO BE SEEN.</h1>
            <figure className="home-title-art" aria-hidden="true">
              <Image
                src="/images/uploads/home-title-design.png"
                alt=""
                fill
                priority
                sizes="(max-width: 560px) 92vw, 540px"
              />
            </figure>
            <p className="home-intro">
              We build premium digital systems<br />
              that make businesses easier to trust,<br />
              easier to contact, and easier to choose.
            </p>
            <a className="home-cta" href="/work">EXPLORE SYSTEMS <span>→</span></a>
          </div>

          <figure className="home-image" aria-label="TBS editorial hero image">
            <Image
              src="/images/uploads/tbs-photo-01.jpg"
              alt="Tall dark editorial figure on a pale background"
              fill
              priority
              sizes="(max-width: 760px) 84vw, 370px"
            />
          </figure>
        </div>

        <span className="home-plus home-plus-mid">+</span>

        <div className="scroll-mark" aria-hidden="true">
          <svg viewBox="0 0 120 120" role="img">
            <defs>
              <path id="scroll-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
            </defs>
            <text>
              <textPath href="#scroll-circle">SCROLL &amp; EXPLORE · SCROLL &amp; EXPLORE · </textPath>
            </text>
          </svg>
          <span>+</span>
        </div>

        <footer className="home-footer">
          <p>TBS®</p>
          <p>ALWAYS × 24.365° C</p>
        </footer>
      </section>
      <HomeExperienceCarousel />
      <SiteFooter />
    </main>
  );
}
