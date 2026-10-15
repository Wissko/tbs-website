import Link from 'next/link';
import {briefUrl, email, founded, projects, services} from '@/lib/data';
import {Arrow, TbsMark} from './ui';

const explore = [['/work', 'Work'], ['/about', 'Studio'], ['/services', 'Services'], ['/contact', 'Contact']] as const;
const year = new Date().getFullYear();

/** Dark under light pages, light under dark ones: the contact line, the brief, three lists. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content wrap">
        <div className="site-footer__row">
          <Link href="/" className="site-footer__logo" aria-label="To Be Seen, home"><TbsMark label={null} /></Link>
          <p className="site-footer__statement">
            We work with independent businesses and ambitious people. Let’s get you seen.{' '}
            <a className="site-footer__email" href={`mailto:${email}`}>{email}</a>
          </p>
        </div>

        <div className="site-footer__row">
          <div className="site-footer__col site-footer__brief">
            <h2 className="site-footer__label">Start a project</h2>
            <a className="site-footer__field" href={briefUrl} target="_blank" rel="noreferrer">
              <span>Open the project brief</span>
              <Arrow />
            </a>
          </div>
          <div className="site-footer__col">
            <h2 className="site-footer__label">Explore</h2>
            <ul className="site-footer__list">
              {explore.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            </ul>
          </div>
          <div className="site-footer__col">
            <h2 className="site-footer__label">Services</h2>
            <ul className="site-footer__list">
              {services.map(service => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>)}
            </ul>
          </div>
          <div className="site-footer__col">
            <h2 className="site-footer__label">Selected work</h2>
            <ul className="site-footer__list">
              {projects.map(project => <li key={project.slug}><Link href={`/work/${project.slug}`}>{project.name}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__copyright">
        <span>To Be Seen, {founded} – {String(year).slice(2)}©</span>
        <span>Built to be seen. Excellence deserves an audience.</span>
        <span><Link href="/legal">Legal</Link>, <Link href="/privacy">Privacy</Link></span>
      </div>
    </footer>
  );
}
