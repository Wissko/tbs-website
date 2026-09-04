/** Printer's registration marks: four crop corners and two crosses. Decorative. */
export default function Marks({ className = "" }: { className?: string }) {
  return (
    <span className={`marks ${className}`.trim()} aria-hidden="true">
      <i className="mark mark--tl" />
      <i className="mark mark--tr" />
      <i className="mark mark--bl" />
      <i className="mark mark--br" />
      <i className="mark mark--plus mark--p1">+</i>
      <i className="mark mark--plus mark--p2">+</i>
    </span>
  );
}
