/** Both units keep the same hours, in the three forms the site needs. */
export const OPENING_HOURS = {
  /** What the page shows. */
  label: "Segunda a Sexta · 8h às 12h e 13h às 17h",
  /** schema.org openingHours, the compact string form. */
  schema: "Mo-Fr 08:00-12:00,13:00-17:00",
  /**
   * The same hours as `openingHoursSpecification` entries. Google prefers this
   * expanded form, and unlike the string it can express the midday close
   * without ambiguity.
   */
  specification: [
    { opens: "08:00", closes: "12:00" },
    { opens: "13:00", closes: "17:00" },
  ],
  /** The days both windows apply to, as schema.org DayOfWeek names. */
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
} as const;

export type Unit = {
  id: string;
  /** Full name, for headings. */
  name: string;
  /** Just the city, for compact places like form options. */
  shortName: string;
  street: string;
  neighborhood: string;
  city: string;
  /** Two-letter state code, as schema.org addressRegion expects. */
  state: string;
  postalCode: string;
  hours: string;
  image: string;
  imageAlt: string;
  /** Digits only, with country and area code. Null hides WhatsApp for this unit. */
  whatsapp: string | null;
  /** Full one-line address. Derived. */
  address: string;
  /** The quieter half of `address`, so the card can weight the street on its own. Derived. */
  cityLine: string;
  /** Google Maps directions deep link. Derived. */
  mapsUrl: string;
};

type UnitSeed = Omit<Unit, "address" | "cityLine" | "mapsUrl">;

// The three display/link strings used to be typed out by hand next to the parts
// they were built from, so they could drift. Deriving them also gives the
// JSON-LD a real PostalAddress instead of one collapsed streetAddress.
function buildUnit(seed: UnitSeed): Unit {
  const { street, neighborhood, city, state, postalCode } = seed;
  return {
    ...seed,
    address: `${street} - ${neighborhood} - ${city} - ${state} - ${postalCode}`,
    cityLine: `${neighborhood} · ${city} - ${state} · ${postalCode}`,
    // `/maps/dir/` and not `/maps/search/`: the button says "Como chegar", so it
    // routes from wherever the visitor is. `api=1` is the documented form and
    // deep-links into the app when it is installed.
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(`${street} - ${neighborhood}, ${city} - ${state}, ${postalCode}`),
  };
}

export const UNITS: Unit[] = [
  buildUnit({
    id: "mogi-guacu",
    name: "Clínica Mogi Guaçu",
    shortName: "Mogi Guaçu",
    street: "Rua Chico de Paula, 684",
    neighborhood: "Centro",
    city: "Mogi Guaçu",
    state: "SP",
    postalCode: "13840-001",
    hours: OPENING_HOURS.label,
    image: "/images/clinics/clinica-guacu.webp",
    imageAlt: "Fachada amarela da unidade de Mogi Guaçu",
    // TODO: read off the clinic's own signage in the photo. Confirm before launch.
    whatsapp: "5519998807176",
  }),
  buildUnit({
    id: "mogi-mirim",
    name: "Clínica Mogi Mirim",
    shortName: "Mogi Mirim",
    street: "Rua Coronel Leitão, 367",
    neighborhood: "Centro",
    city: "Mogi Mirim",
    state: "SP",
    postalCode: "13800-040",
    hours: OPENING_HOURS.label,
    image: "/images/clinics/clinica-mogi.webp",
    imageAlt: "Fachada em pedra e tijolo da unidade de Mogi Mirim",
    whatsapp: "5519998863332",
  }),
];

/** A unit with no number has nowhere to send a booking, so narrow it away once. */
export type BookableUnit = Unit & { whatsapp: string };

export const BOOKABLE_UNITS: BookableUnit[] = UNITS.filter(
  (unit): unit is BookableUnit => unit.whatsapp !== null,
);
