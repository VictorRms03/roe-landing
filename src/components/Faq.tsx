const QUESTIONS = [
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

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Perguntas Frequentes
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600 sm:text-base">
          Respostas rápidas para dúvidas comuns.
        </p>

        <div className="mt-10 border-t border-gray-300">
          {QUESTIONS.map((item) => (
            // <details> gives the open/close behaviour, keyboard support and
            // in-page find for free, with no client component involved.
            <details key={item.question} className="group border-b border-gray-300">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-gray-900 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-roe-yellow">
                {item.question}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-900 transition-transform duration-300 group-open:rotate-180"
                >
                  <path d="M12 4v16M6 14l6 6 6-6" />
                </svg>
              </summary>
              <p className="pb-5 pr-11 text-sm leading-relaxed text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
