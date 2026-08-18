/** One continuous stretch the door stays open, as 24h "HH:MM" times. */
type OpeningWindow = { opens: string; closes: string };

/** A unit's week, in the three forms the site needs. */
export type OpeningHours = {
  /** The windows on their own: "8h às 12h e 13h às 17h30". Derived. */
  time: string;
  /** What the page shows, days included. Derived. */
  label: string;
  /** The days the doors stay shut, which the page never said out loud. Derived. */
  closed: string;
  /** schema.org openingHours, the compact string form. Derived. */
  schema: string;
  /**
   * The same hours as `openingHoursSpecification` entries. Google prefers this
   * expanded form, and unlike the string it can express the midday close
   * without ambiguity.
   */
  specification: readonly OpeningWindow[];
  /** The days the windows apply to, as schema.org DayOfWeek names. */
  days: readonly string[];
};

/** Neither unit opens on the weekend, so every window runs Monday to Friday. */
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

/** "08:00" → "8h" and "17:30" → "17h30", the way the clinic writes its hours. */
function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  return minute === "00" ? `${Number(hour)}h` : `${Number(hour)}h${minute}`;
}

/**
 * The two units no longer keep the same hours, so a unit declares its own — and
 * declares only the windows, with every display form derived from them. Typing
 * the label out beside the specification is what would let the page and the
 * JSON-LD drift apart.
 */
function weekdayHours(...windows: OpeningWindow[]): OpeningHours {
  const time = windows
    .map((window) => `${formatTime(window.opens)} às ${formatTime(window.closes)}`)
    .join(" e ");
  return {
    time,
    label: `Segunda a Sexta · ${time}`,
    // The other half of WEEKDAYS: this factory only builds Monday-to-Friday
    // weeks, so the weekend line states the same fact the schema already carries.
    closed: "Sábados e domingos: fechado",
    schema: `Mo-Fr ${windows.map((window) => `${window.opens}-${window.closes}`).join(",")}`,
    specification: windows,
    days: WEEKDAYS,
  };
}

export type TechnicalManager = {
  name: string;
  /** With the "CRO-SP" prefix, which is how the council itself writes it. */
  cro: string;
};

/**
 * One record per dentist, referenced by each role she holds, so a registration
 * number is never typed twice and cannot drift between the places it appears.
 */
const LILIAN: TechnicalManager = {
  name: "Dra. Lilian Maria Polettini Setoguchi",
  cro: "CRO-SP 47136",
};

/**
 * Coordination of the clinic as a whole, which is not a unit's responsibility —
 * hence a reference of its own rather than a reach into `UNITS`. It happens to
 * be the same dentist who answers for Mogi Mirim today; the day one of the two
 * roles changes hands, only that reference moves.
 */
export const GENERAL_MANAGER = LILIAN;

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
  /** This unit's own hours — the two no longer keep the same ones. */
  hours: OpeningHours;
  image: string;
  imageAlt: string;
  /** Digits only, with country and area code. Null hides WhatsApp for this unit. */
  whatsapp: string | null;
  /**
   * The dentist who answers for this address before the CRO. Per unit rather
   * than per clinic because that is how the responsibility is actually held:
   * one name is on file for Mogi Guaçu and a different one for Mogi Mirim.
   */
  technicalManager: TechnicalManager;
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
    hours: weekdayHours({ opens: "08:00", closes: "12:00" }, { opens: "13:00", closes: "17:30" }),
    image: "/images/clinics/clinica-guacu.webp",
    imageAlt: "Fachada amarela da unidade de Mogi Guaçu",
    // TODO: read off the clinic's own signage in the photo. Confirm before launch.
    whatsapp: "5519998807176",
    technicalManager: {
      name: "Dra. Daniela Brait Silva Ladeira",
      cro: "CRO-SP 62495",
    },
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
    hours: weekdayHours({ opens: "08:00", closes: "18:00" }),
    image: "/images/clinics/clinica-mogi.webp",
    imageAlt: "Fachada em pedra e tijolo da unidade de Mogi Mirim",
    whatsapp: "5519998863332",
    technicalManager: LILIAN,
  }),
];

/** A unit with no number has nowhere to send a booking, so narrow it away once. */
export type BookableUnit = Unit & { whatsapp: string };

export const BOOKABLE_UNITS: BookableUnit[] = UNITS.filter(
  (unit): unit is BookableUnit => unit.whatsapp !== null,
);
