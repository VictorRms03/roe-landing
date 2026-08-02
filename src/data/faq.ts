export type FaqItem = {
  question: string;
  answer: string;
};

// The accordion and the FAQPage structured data both read from here, so what
// Google indexes can never drift from what the page shows.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O exame de raio-x dói?",
    answer:
      "Não. O panorâmico e a tomografia são feitos com você em pé, sem nada dentro da boca, e duram menos de um minuto. Nos exames intrabucais, um sensor pequeno é apoiado próximo ao dente e pode incomodar um pouco, mas sem dor.",
  },
  {
    // TODO: trocar pela lista real de convênios aceitos.
    question: "Vocês aceitam convênio?",
    answer:
      "Fale com a gente pelo WhatsApp para confirmarmos se o seu convênio está entre os aceitos e quais exames ele cobre.",
  },
  {
    // TODO: informar o prazo real de entrega do laudo.
    question: "Quanto tempo leva para sair o laudo?",
    answer:
      "O prazo varia conforme o exame e é combinado com você no momento do agendamento.",
  },
  {
    question: "Qual a diferença entre panorâmico e tomografia 3D?",
    answer:
      "O panorâmico é uma imagem única e plana de toda a arcada, ótima para uma visão geral. A tomografia 3D reconstrói a região em volume, mostrando profundidade e a posição exata de cada estrutura — é o que se usa para planejar implantes, avaliar dentes inclusos e casos mais complexos.",
  },
];
