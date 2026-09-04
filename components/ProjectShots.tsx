import Image from "next/image";

export type Shots = {
  /** Live URL, kept for re-capturing. Not shown on the site. */
  url: string;
  desktop: string;
  mobile: string;
};

/**
 * Screenshots of a delivered site, composed as a desktop window and a phone,
 * in the site's own black-and-white, ink-bordered language.
 */
export default function ProjectShots({
  shots,
  alt,
  wide = false,
  priority = false,
  className = "",
}: {
  shots: Shots;
  alt: string;
  wide?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`shots${wide ? " shots--wide" : ""} ${className}`.trim()}>
      <span className="shots-desktop">
        <Image src={shots.desktop} alt={alt} fill priority={priority} sizes="(max-width: 820px) 100vw, 50vw" />
      </span>
      <span className="shots-mobile">
        <Image src={shots.mobile} alt="" fill sizes="(max-width: 820px) 34vw, 16vw" />
      </span>
    </figure>
  );
}
