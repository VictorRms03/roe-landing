export type Unit = {
  id: string;
  /** Full name, for headings. */
  name: string;
  /** Just the city, for compact places like form options. */
  shortName: string;
  address: string;
  hours: string;
  image: string;
  imageAlt: string;
  /** Digits only, with country and area code. Null hides WhatsApp for this unit. */
  whatsapp: string | null;
};

export const UNITS: Unit[] = [
  {
    id: "mogi-guacu",
    name: "Clínica Mogi Guaçu",
    shortName: "Mogi Guaçu",
    address: "Rua Chico de Paula, 684 - Centro - Mogi Guaçu - SP - 13840-001",
    hours: "Segunda a Sexta · 8h às 12h e 13h às 17h",
    image: "/images/hero/clinica-guacu.webp",
    imageAlt: "Fachada amarela da unidade de Mogi Guaçu",
    // Read off the clinic's own signage in the photo. Confirm before launch.
    whatsapp: "5519998807176",
  },
  {
    id: "mogi-mirim",
    name: "Clínica Mogi Mirim",
    shortName: "Mogi Mirim",
    address: "Rua Coronel Leitão, 367 - Centro - Mogi Mirim - SP - 13800-040",
    hours: "Segunda a Sexta · 8h às 12h e 13h às 17h",
    image: "/images/hero/clinica-mogi.webp",
    imageAlt: "Fachada em pedra e tijolo da unidade de Mogi Mirim",
    whatsapp: "5519998863332",
  },
];
