import Link from 'next/link';
import {services, type Service} from '@/lib/data';
import {Fill} from './media';
import {Arrow, pad2} from './ui';

/** Editorial rows: a picture, a line in capitals, the service and its number, an arrow that pushes through. */
export function ServiceRows({items = services}: {items?: Service[]}) {
  return (
    <ul className="rows">
      {items.map(service => (
        <li key={service.slug} className="row" data-reveal="up">
          <Link href={`/services/${service.slug}`} className="row__link">
            <div className="row__media frame">
              <Fill media={service.image} alt="" sizes="(min-width: 1280px) 30vw, (min-width: 720px) 25vw, 90vw" />
            </div>
            <div className="row__body">
              <h3 className="row__title">{service.short}</h3>
              <p className="row__meta t-small"><b>{service.title}</b> {pad2(services.indexOf(service) + 1)}</p>
              <span className="row__arrow"><Arrow /></span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
