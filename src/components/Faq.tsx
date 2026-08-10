import Reveal from "@/components/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
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
    <Section
      id="faq"
      className="bg-roe-white py-16"
      containerClassName="max-w-4xl"
      bleed={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      }
    >
      <SectionHeader
        eyebrow="Dúvidas"
        title="Perguntas Frequentes sobre Raio-X Odontológico"
        description="Respostas rápidas para dúvidas comuns."
        eyebrowClassName="text-center text-gray-900"
        titleClassName="text-center text-gray-900"
        descriptionClassName="mt-3 text-center text-sm text-gray-600 sm:text-base"
      />

      <ul className="mt-10 flex flex-col gap-3">
        {FAQ_ITEMS.map((item, index) => (
          <Reveal as="li" key={item.question} delay={index * 80}>
            {/* <details> gives open/close, keyboard support and in-page find
                  for free, with no client component involved. */}
            <details className="group bg-roe-cream open:ring-roe-yellow/50 rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow duration-300 ease-out open:shadow-lg hover:shadow-md">
              <summary className="focus-visible:ring-roe-yellow flex cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-5 text-base font-semibold text-gray-900 outline-none focus-visible:ring-2 sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.question}
                {/* A plus that folds into a minus: the upright bar unrotates
                      as the card opens, the flat one never moves. */}
                <span
                  aria-hidden="true"
                  className="bg-roe-yellow/20 group-hover:bg-roe-yellow/40 group-open:bg-roe-yellow relative flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-gray-900" />
                  <span className="absolute h-0.5 w-3.5 rotate-90 rounded-full bg-gray-900 transition-transform duration-300 ease-out group-open:rotate-0 motion-reduce:transition-none" />
                </span>
              </summary>

              <div className="px-5 pb-5 sm:px-6">
                <p className="group-open:animate-fade-in-up border-t border-black/5 pt-4 text-sm leading-relaxed text-gray-600 motion-reduce:animate-none">
                  {item.answer}
                </p>
              </div>
            </details>
          </Reveal>
        ))}
      </ul>

      {/* The way out for anything the answers above do not cover. */}
      <Reveal delay={120} className="bg-roe-sand mt-10 rounded-3xl p-6 text-center sm:p-8">
        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Não encontrou sua dúvida?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-700">
          Mande sua pergunta junto com o pedido de agendamento — a equipe responde no horário
          comercial.
        </p>
        <a
          href="#agendar"
          className="text-roe-white hover:bg-roe-yellow focus-visible:ring-offset-roe-sand mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:text-gray-900 hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md"
        >
          Falar com a gente
        </a>
      </Reveal>
    </Section>
  );
}
