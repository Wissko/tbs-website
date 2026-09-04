/** Rotating circular text with a cross in the middle. Decorative. */
export default function Seal({ id, text, className = "" }: { id: string; text: string; className?: string }) {
  return (
    <span className={`seal ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="270" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span>+</span>
    </span>
  );
}
