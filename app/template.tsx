/** Wraps every route so navigation gets a short paper-to-ink transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
