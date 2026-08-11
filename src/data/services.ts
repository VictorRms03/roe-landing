export type Exam = {
  /** Stable key. Maps the card to its icon and gives the JSON-LD a `@id` suffix. */
  id: string;
  name: string;
  description: string;
};

export type DigitalStage = Exam & {
  /** Ordinal shown on the rail. The digital flow is a real sequence. */
  step: string;
  /**
   * The formal service name for the structured data. `name` is a verb on the
   * rail ("Escanear"), which reads well in sequence but not as an offer.
   */
  service: string;
  /** File formats or product names this stage produces, set in a mono face. */
  tags: string[];
};

// The cards and the `hasOfferCatalog` in the Dentist structured data both read
// from here, for the same reason the FAQ does: what Google indexes can never
// drift from what the page shows. The icons stay in the component — they are
// JSX, and this file has to stay importable from plain data modules.
export const EXAMS: Exam[] = [
  {
    id: "panoramico",
    name: "Raio-X Panorâmico",
    description: "Visão completa da arcada dentária em uma única imagem.",
  },
  {
    id: "periapical",
    name: "Raio-X Periapical",
    description: "Detalha um dente inteiro, da coroa à ponta da raiz.",
  },
  {
    id: "interproximal",
    name: "Raio-X Interproximal",
    description: "Mostra o contato entre dentes vizinhos para flagrar cáries.",
  },
  {
    id: "telerradiografia",
    name: "Telerradiografia",
    description: "Perfil do crânio usado no planejamento ortodôntico.",
  },
  {
    id: "tomografia",
    name: "Tomografia",
    description: "Reconstrução em 3D para implantes e casos complexos.",
  },
  {
    id: "documentacao-ortodontica",
    name: "Documentação Ortodôntica",
    description: "Conjunto de exames e fotos para montar o tratamento.",
  },
];

// Kept apart from EXAMS rather than appended to it: none of these is a
// radiographic exam, and the Services carousel is titled as one. The rail in
// `Digital.tsx` and the offer catalog in `lib/schema` both read from here.
export const DIGITAL_STAGES: DigitalStage[] = [
  {
    id: "escaneamento-itero",
    step: "01",
    name: "Escanear",
    service: "Escaneamento intraoral iTero",
    description: "Escaneamento intraoral com iTero, na cadeira, sem moldagem com massa.",
    tags: ["iTero", "Invisalign"],
  },
  {
    id: "arquivos-digitais",
    step: "02",
    name: "Receber os arquivos",
    service: "Arquivos DICOM e STL",
    description:
      "A tomografia sai em DICOM e o escaneamento em STL — os volumes que abrem direto nos softwares de planejamento.",
    tags: [".dcm", ".stl"],
  },
  {
    id: "impressao-resina",
    step: "03",
    name: "Imprimir o modelo",
    service: "Impressão de modelo em resina",
    description: "Modelo físico em resina, impresso em 3D a partir do escaneamento.",
    tags: ["resina"],
  },
];
