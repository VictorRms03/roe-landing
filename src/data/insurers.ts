export type Insurer = {
  /** Stable key, and the basename the logo file is expected to use. */
  id: string;
  /** As the plan presents itself to the patient, which is how people search. */
  name: string;
  /**
   * Filled in by `Insurers.tsx` when a matching file is actually sitting in
   * `public/images/convenios/`. Never hand-written: an <Image> pointed at a
   * file that is not there 404s in the middle of the carousel, so a plan
   * without artwork falls back to its monogram.
   *
   * One object rather than three loose fields, so a logo cannot reach the card
   * without the measurements next/image needs to size its srcset.
   */
  logo?: { src: string; width: number; height: number };
};

// Alphabetical, so someone hunting for their own plan can stop scanning once
// they are past its letter. Written out rather than sorted at run time: the
// order is then plain to read here, and accents ("SulAmérica" after
// "Solidente") do not depend on the collation of whatever runs the build.
export const INSURERS: Insurer[] = [
  { id: "aesp-odonto", name: "Aesp Odonto" },
  { id: "amil", name: "Amil" },
  { id: "bradesco", name: "Bradesco" },
  { id: "caixa-seguradora", name: "Caixa Seguradora" },
  { id: "cda", name: "CDA" },
  { id: "hapvida", name: "Hapvida" },
  { id: "kr-saude", name: "KR Saúde" },
  { id: "mais-saude", name: "Mais Saúde" },
  { id: "metlife", name: "MetLife" },
  { id: "multimix", name: "Multimix" },
  { id: "odontoprev", name: "OdontoPrev" },
  { id: "porto-seguro", name: "Porto Seguro" },
  { id: "prodental", name: "Prodental" },
  { id: "rede-brasil-dental", name: "Rede Brasil Dental" },
  { id: "rede-odonto-empresa", name: "Rede Odonto Empresa" },
  { id: "rede-unna", name: "Rede Unna" },
  { id: "solidente", name: "Solidente" },
  { id: "sulamerica", name: "SulAmérica" },
  { id: "unimed-odonto", name: "Unimed Odonto" },
  { id: "uniodonto", name: "Uniodonto" },
];

// The same names as a running sentence, so the FAQ answer and the carousel can
// never drift — that answer feeds Google's FAQ rich result.
const NAMES = INSURERS.map((insurer) => insurer.name);
export const INSURERS_SENTENCE = `${NAMES.slice(0, -1).join(", ")} e ${NAMES[NAMES.length - 1]}`;
