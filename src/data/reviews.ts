export type Review = {
  name: string;
  rating: number;
  text: string;
};

// Kept out of the carousel component so the server can hand these down as
// props: the carousel is a client component, and inlining the copy there put
// every review into the JavaScript bundle as well as the HTML.
export const REVIEWS: Review[] = [
  {
    name: "Juliana Grasiele",
    rating: 5,
    text: "Gostei muito do atendimento. Os funcionários etendem o cliente, são muito educados, eu amei o atendimento da recepção, conversei com Elaine, muito gentil e atenciosa em me atender. Recomendo o serviço que é de qualidade!",
  },
  {
    name: "Paulo C.",
    rating: 5,
    text: "Ótimo local, fui muito bem atendido.!",
  },
  {
    name: "JulianEu",
    rating: 5,
    text: "Muito educados e prestativos no agendamento e a explicações sobre dúvidas, muito claras.",
  },
  {
    name: "Marcio Panciera",
    rating: 5,
    text: "Ótimo serviço e atendimento.",
  },
  {
    name: "Josi Kozlovski",
    rating: 5,
    text: "Atendimento super rápido.",
  },
];
