import Link from "next/link";
import { bookingHref, brand } from "../lib/brand";

type Props = {
  title?: string;
  text?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "ink" | "paper";
};

/** The one closing call to action, same words everywhere. */
export default function CtaBand({
  title = "Let's get you seen.",
  text = "A short call is enough to tell you what we would build first, and why.",
  secondaryHref = "/services",
  secondaryLabel = brand.cta.secondary,
  tone = "ink",
}: Props) {
  return (
    <section className={`cta-band tone-${tone}`} aria-labelledby="cta-title">
      <div className="container cta-band-inner">
        <div>
          <h2 id="cta-title" className="display">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <a className="btn btn--primary" href={bookingHref}>
            {brand.cta.primary} <span aria-hidden="true">→</span>
          </a>
          <Link className="arrow-link" href={secondaryHref}>
            {secondaryLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
