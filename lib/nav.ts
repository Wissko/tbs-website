export type NavLink = { label: string; href: string };

/** Primary navigation, in reading order. Used by the menu overlay and the footer. */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Legal notice", href: "/legal" },
];
