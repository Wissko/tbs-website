import Image from "next/image";
import Link from "next/link";

const articles = [
  { date: "MAY 16, 2024", title: <>THE NEW LANGUAGE<br />OF DIGITAL CULTURE</>, src: "/mockups/journal-01.jpg" },
  { date: "APR 30, 2024", title: <>WHY AUTHENTICITY IS<br />THE NEW DIFFERENTIATION</>, src: "/mockups/journal-02.jpg" },
  { date: "APR 12, 2024", title: <>DESIGNING FOR THE FUTURE<br />OF CONNECTION</>, src: "/mockups/journal-03.jpg" },
  { date: "MAR 25, 2024", title: <>THE ROLE OF AI IN CREATIVITY:<br />A HUMAN PERSPECTIVE</>, src: "/mockups/journal-04.jpg" },
];

function Header() {
  return (
    <header className="journal-header">
      <Link className="journal-brand" href="/">TBS°</Link>
      <p className="journal-kicker">Digital Creative Studio<br />Building Bold Experiences<br />And Brands.</p>
      <span className="journal-plus">+</span>
      <a className="journal-menu" href="/menu">( MENU ) <span>+</span></a>
    </header>
  );
}

export default function JournalPage() {
  return (
    <main className="journal-shell">
      <section className="journal-canvas">
        <Header />

        <aside className="journal-side">
          <Link className="journal-back" href="/">← BACK TO ALL PAGES</Link>
          <h1>JOURNAL</h1>
          <p>Insights, ideas and inspiration on design, technology and culture. Stories that inform, challenge and shape what&apos;s next.</p>
        </aside>

        <section className="journal-main" aria-label="Journal articles">
          <nav className="journal-tabs" aria-label="Journal categories">
            <div>
              <a className="active" href="#all">ALL</a>
              <a href="#insights">INSIGHTS</a>
              <a href="#design">DESIGN</a>
              <a href="#technology">TECHNOLOGY</a>
              <a href="#culture">CULTURE</a>
            </div>
            <a href="#all-articles">VIEW ALL ARTICLES →</a>
          </nav>

          <div className="journal-list">
            {articles.map((article, index) => (
              <article className="journal-row" key={index}>
                <Image src={article.src} alt="Journal article visual" width={304} height={118} />
                <div>
                  <time>{article.date}</time>
                  <h2>{article.title}</h2>
                </div>
                <a href={`/article`} aria-label="Read article">→</a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
