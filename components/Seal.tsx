/** Rotating circular text with a cross in the middle. With `href`, a link that scrolls to the next section. */
export default function Seal({ id, text, className = "", href }: { id: string; text: string; className?: string; href?: string }) {
  const inner = (
    <>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="270" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span aria-hidden="true">+</span>
    </>
  );
  if (href) {
    return (
      <a className={`seal ${className}`.trim()} href={href} aria-label="Scroll to explore">
        {inner}
      </a>
    );
  }
  return (
    <span className={`seal ${className}`.trim()} aria-hidden="true">
      {inner}
    </span>
  );
}
