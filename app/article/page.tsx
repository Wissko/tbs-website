import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="article-header">
      <Link className="article-brand" href="/">TBS°</Link>
      <p className="article-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="article-plus">+</span>
      <Link className="article-menu" href="/menu">( MENU ) <span>+</span></Link>
    </header>
  );
}

export default function ArticlePage() {
  return (
    <main className="article-shell">
      <section className="article-canvas">
        <Header />
        <nav className="article-nav">
          <Link href="/journal">← BACK TO JOURNAL</Link>
          <a href="#next">NEXT ARTICLE →</a>
        </nav>

        <article className="article-body">
          <div className="article-copy">
            <time>MAY 16, 2024</time>
            <h1>THE NEW LANGUAGE<br />OF DIGITAL CULTURE</h1>
            <p className="article-intro">Digital culture is evolving faster than ever. The rules are shifting, the platforms are multiplying, and the way we communicate is being rewritten.</p>
            <div className="article-rule" />
            <div className="article-columns">
              <p>We&apos;re entering a new era where attention is fragmented, communities are fluid, and authenticity is the new currency.<br /><br />Brands that listen, adapt and participate meaningfully will lead the conversation.</p>
              <p>It&apos;s no longer about broadcasting messages. It&apos;s about building relevance, sparking dialogue and creating impact.<br /><br />This is the new language. Are you speaking it?</p>
            </div>
            <Link className="article-button" href="/journal">VIEW ALL ARTICLES <span>→</span></Link>
          </div>
          <figure className="article-image">
            <Image src="/mockups/article-hero.jpg" alt="Blurred figure in motion" fill priority sizes="706px" />
          </figure>
        </article>

        <footer className="article-share">
          <span>SHARE THIS ARTICLE</span>
          <b /> <a>X</a> <b /> <a>in</a> <b /> <a>◎</a> <b /> <a>↗</a>
        </footer>
      </section>
    </main>
  );
}
