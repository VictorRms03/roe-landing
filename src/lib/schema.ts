import { DIGITAL_STAGES, EXAMS } from "@/data/services";
import { SOCIAL_URLS } from "@/data/social";
import { OPENING_HOURS, UNITS, type Unit } from "@/data/units";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

// Stable node ids. Search engines use these to tell the entities apart and to
// reconnect them across crawls, so they must not drift once published.
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const unitId = (unit: Unit) => `${SITE_URL}/#${unit.id}`;

// TODO: this is a verbatim copy of the DESCRIPTION in `app/layout.tsx`. The two
// have to be edited together until one of them becomes the single source.
const DESCRIPTION =
  "Radiologia odontológica em Mogi Guaçu e Mogi Mirim: raio-x, tomografia e escaneamento intraoral, com imagens em alta resolução, arquivos DICOM e STL.";

/** The cities each unit realistically draws from. */
const AREA_SERVED = ["Mogi Guaçu", "Mogi Mirim", "Itapira", "Estiva Gerbi", "Conchal"].map(
  (city) => ({ "@type": "City", name: city }),
);

// One `openingHoursSpecification` per window per day set, which is the shape
// Google documents. Both units keep identical hours.
const OPENING_HOURS_SPECIFICATION = OPENING_HOURS.specification.map((window) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [...OPENING_HOURS.days],
  opens: window.opens,
  closes: window.closes,
}));

/** The brand-level number: the first unit that actually has one, in E.164. */
const primaryWhatsApp = UNITS.map((unit) => unit.whatsapp).find(Boolean);
const PRIMARY_PHONE = primaryWhatsApp ? `+${primaryWhatsApp}` : undefined;

// Exams are procedures performed on a patient; scanning, file delivery and
// printing are services around them, so the two halves carry different
// `itemOffered` types inside the one catalog `hasOfferCatalog` accepts.
const OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Exames e serviços de imagem odontológica",
  itemListElement: [
    ...EXAMS.map((exam) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: exam.name,
        description: exam.description,
      },
    })),
    ...DIGITAL_STAGES.map((stage) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: stage.service,
        description: stage.description,
      },
    })),
  ],
};

function dentistNode(unit: Unit) {
  return {
    "@type": "Dentist",
    "@id": unitId(unit),
    name: `${SITE_NAME} — ${unit.shortName}`,
    description: DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl(unit.image),
    hasMap: unit.mapsUrl,
    // The clinic publishes no landline; WhatsApp is the number patients use.
    telephone: unit.whatsapp ? `+${unit.whatsapp}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: unit.street,
      addressLocality: unit.city,
      addressRegion: unit.state,
      postalCode: unit.postalCode,
      addressCountry: "BR",
    },
    // TODO: add `geo` with the real latitude/longitude of each unit — it is a
    // strong local-search signal, but the coordinates have to be read off
    // Google Maps rather than guessed.
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    areaServed: AREA_SERVED,
    availableLanguage: { "@type": "Language", name: "Portuguese", alternateName: "pt-BR" },
    medicalSpecialty: "Radiography",
    parentOrganization: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    sameAs: SOCIAL_URLS,
    hasOfferCatalog: OFFER_CATALOG,
  };
}

/**
 * One `@graph` instead of loose nodes, so the two clinics, the brand and the
 * site reference each other by `@id` rather than looking like four unrelated
 * businesses.
 *
 * Deliberately absent: `aggregateRating`. The page shows 4,5/5, but Google does
 * not treat self-serving reviews on a LocalBusiness as eligible for review rich
 * results, and re-publishing ratings collected elsewhere is what draws a manual
 * action. `priceRange` is absent for the simpler reason that nobody has set one.
 */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "ROE - Raio-X Odontológico Especializado",
      description: DESCRIPTION,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.webp"),
        width: 1024,
        height: 1024,
      },
      image: absoluteUrl("/opengraph-image"),
      telephone: PRIMARY_PHONE,
      areaServed: AREA_SERVED,
      sameAs: SOCIAL_URLS,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: { "@id": ORGANIZATION_ID },
    },
    ...UNITS.map(dentistNode),
  ],
};
