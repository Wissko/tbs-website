import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

/** The paper (or ink) sheet every page is printed on, with the one Header and the one Footer. */
export default function PageShell({
  tone = "paper",
  children,
  className = "",
}: {
  tone?: "paper" | "ink";
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <main id="main" className={`sheet tone-${tone} ${className}`.trim()}>
        <Header />
        {children}
      </main>
      <Footer />
    </>
  );
}
