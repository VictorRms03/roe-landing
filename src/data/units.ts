export type Unit = {
  id: string;
  /** Full name, for headings. */
  name: string;
  /** Just the city, for compact places like form options. */
  shortName: string;
  /** Full one-line address, for the footer and the JSON-LD. */
  address: string;
  /** Street and number alone, so the card can give it its own weight. */
  street: string;
  /** Neighbourhood, city and postcode — the quieter half of `address`. */
  cityLine: string;
  hours: string;
  /** Google Maps directions deep link, built from `address`. */
  mapsUrl: string;
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
    street: "Rua Chico de Paula, 684",
    cityLine: "Centro · Mogi Guaçu - SP · 13840-001",
    hours: "Segunda a Sexta · 8h às 12h e 13h às 17h",
    // `/maps/dir/` and not `/maps/search/`: the button says "Como chegar", so it
    // should route from wherever the visitor is. The `api=1` form is the stable
    // documented one and deep-links into the app when it is installed.
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Rua%20Chico%20de%20Paula%2C%20684%20-%20Centro%2C%20Mogi%20Gua%C3%A7u%20-%20SP%2C%2013840-001",
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
    street: "Rua Coronel Leitão, 367",
    cityLine: "Centro · Mogi Mirim - SP · 13800-040",
    hours: "Segunda a Sexta · 8h às 12h e 13h às 17h",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Rua%20Coronel%20Leit%C3%A3o%2C%20367%20-%20Centro%2C%20Mogi%20Mirim%20-%20SP%2C%2013800-040",
    image: "/images/hero/clinica-mogi.webp",
    imageAlt: "Fachada em pedra e tijolo da unidade de Mogi Mirim",
    whatsapp: "5519998863332",
  },
];
