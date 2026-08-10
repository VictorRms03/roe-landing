export type Exam = {
  /** Stable key. Maps the card to its icon and gives the JSON-LD a `@id` suffix. */
  id: string;
  name: string;
  description: string;
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
