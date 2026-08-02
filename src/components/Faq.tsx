import Reveal from "@/components/Reveal";
import { FAQ_ITEMS } from "@/data/faq";

// Feeds Google's FAQ rich result, alongside the Dentist blocks the layout
// emits. Built from the same array the accordion renders, so the two agree.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-32 bg-roe-white px-6 py-16 md:px-12 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-center text-2xl font-semibold text-roe-yellow sm:text-3xl">Dúvidas</p>
          <h2 className="mt-2 text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600 sm:text-base">
            Respostas rápidas para dúvidas comuns.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal as="li" key={item.question} delay={index * 80}>
              {/* <details> gives the open/close behaviour, keyboard support and
                  in-page find for free, with no client component involved. */}
              <details className="group rounded-2xl bg-roe-cream shadow-sm ring-1 ring-black/5 transition-shadow duration-300 ease-out hover:shadow-md open:shadow-lg open:ring-roe-yellow/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-5 text-base font-semibold text-gray-900 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-roe-yellow sm:px-6">
                  {item.question}
                  {/* A plus that folds into a minus: the upright bar unrotates
                      as the card opens, the flat one never moves. */}
                  <span
                    aria-hidden="true"
                    className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-roe-yellow/20 transition-colors duration-300 ease-out group-hover:bg-roe-yellow/40 group-open:bg-roe-yellow"
                  >
                    <span className="absolute h-0.5 w-3.5 rounded-full bg-gray-900" />
                    <span className="absolute h-0.5 w-3.5 rotate-90 rounded-full bg-gray-900 transition-transform duration-300 ease-out group-open:rotate-0 motion-reduce:transition-none" />
                  </span>
                </summary>

                <div className="px-5 pb-5 sm:px-6">
                  <p className="border-t border-black/5 pt-4 text-sm leading-relaxed text-gray-600 group-open:animate-fade-in-up motion-reduce:animate-none">
                    {item.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </ul>

        {/* The way out for everything the four answers above do not cover. */}
        <Reveal delay={120} className="mt-10 rounded-3xl bg-roe-sand p-6 text-center sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Não encontrou sua dúvida?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-700">
            Mande sua pergunta junto com o pedido de agendamento — a equipe responde no horário
            comercial.
          </p>
          <a
            href="#agendar"
            className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-roe-white shadow-md shadow-black/10 outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-roe-yellow hover:text-gray-900 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 active:shadow-md focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-roe-sand"
          >
            Falar com a gente
          </a>
        </Reveal>
      </div>
    </section>
  );
}
