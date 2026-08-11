export type NavLink = {
  label: string;
  href: string;
};

// Shared by the header and the footer, which carried identical copies. Every
// href must match a section id rendered on the page.
export const NAV_LINKS: NavLink[] = [
  { label: "Exames", href: "#servicos" },
  { label: "A Clínica", href: "#beneficios" },
  { label: "Digital", href: "#digital" },
  { label: "Unidades", href: "#clinicas" },
  { label: "Dúvidas", href: "#faq" },
];
