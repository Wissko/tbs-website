import Image from "next/image";

export default function Home() {
  return (
    <main className="home-shell" aria-label="TBS homepage">
      <section className="home-canvas">
        <header className="home-header">
          <div className="home-brand">TBS®</div>
          <p className="home-kicker">
            Digital Creative Studio<br />
            Building Bold Experiences<br />
            And Brands.
          </p>
          <span className="home-plus home-plus-top">+</span>
          <a className="home-menu" href="#menu">( MENU ) <span>+</span></a>
        </header>

        <div className="home-hero">
          <div className="home-copy">
            <h1>
              WE<br />
              SHAPE<br />
              WHAT<br />
              PEOPLE<br />
              REMEMBER.
            </h1>
            <p className="home-intro">
              A digital creative studio partnering<br />
              with visionary brands and entrepreneurs<br />
              to design the future. Let&apos;s build it.
            </p>
            <a className="home-cta" href="/work">VIEW OUR WORK <span>→</span></a>
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
          <p>TBS® HQ<br />PARIS, FRANCE</p>
          <p>ALWAYS × 24.365° C</p>
        </footer>
      </section>
    </main>
  );
}
