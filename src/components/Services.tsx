import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Exam = {
  name: string;
  description: string;
  icon: ReactNode;
};

// Each icon is drawn to the same 24x24 grid and inherits the wrapper's stroke
// below, so only the shapes differ between cards.
const EXAMS: Exam[] = [
  {
    name: "Raio-X Panorâmico",
    description: "Visão completa da arcada dentária em uma única imagem.",
    icon: (
      <>
        <path d="M3 5c0 18 18 18 18 0" />
        <path d="M7.5 5c0 11 9 11 9 0" />
      </>
    ),
  },
  {
    name: "Raio-X Periapical",
    description: "Detalha um dente inteiro, da coroa à ponta da raiz.",
    icon: (
      <path d="M12 2.5C8.2 2.5 4.5 4 4.5 8C4.5 11 5.6 13.5 6.2 17C6.6 19.4 7 21.5 8.3 21.5C9.6 21.5 9.9 19.3 10.2 17.2C10.5 15.2 10.9 14 12 14C13.1 14 13.5 15.2 13.8 17.2C14.1 19.3 14.4 21.5 15.7 21.5C17 21.5 17.4 19.4 17.8 17C18.4 13.5 19.5 11 19.5 8C19.5 4 15.8 2.5 12 2.5Z" />
    ),
  },
  {
    name: "Raio-X Interproximal",
    description: "Mostra o contato entre dentes vizinhos para flagrar cáries.",
    icon: (
      <>
        <rect x="4" y="5" width="6.5" height="14" rx="2.2" />
        <rect x="13.5" y="5" width="6.5" height="14" rx="2.2" />
        <path d="M12 9v6" />
      </>
    ),
  },
  {
    name: "Telerradiografia",
    description: "Perfil do crânio usado no planejamento ortodôntico.",
    icon: (
      <>
        <path d="M4 20h16" />
        <path d="M4 20 17 6" />
        <path d="M10 20a6 6 0 0 0-1.9-4.4" />
      </>
    ),
  },
  {
    name: "Tomografia",
    description: "Reconstrução em 3D para implantes e casos complexos.",
    icon: (
      <>
        <path d="M12 2 21 7v10l-9 5-9-5V7z" />
        <path d="M12 12 21 7" />
        <path d="M12 12 3 7" />
        <path d="M12 12v10" />
      </>
    ),
  },
  {
    name: "Documentação Ortodôntica",
    description: "Conjunto de exames e fotos para montar o tratamento.",
    icon: (
      <>
        <rect x="7" y="3" width="14" height="14" rx="2.5" />
        <rect x="3" y="7" width="14" height="14" rx="2.5" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <Section id="servicos" className="bg-roe-white py-12">
      <SectionHeader
        eyebrow="Exames"
        title="Raio-x para Cada Necessidade"
        description="Tecnologia avançada de imagem para todo tipo de diagnóstico odontológico."
        titleClassName="text-black"
        descriptionClassName="max-w-xl text-sm text-black sm:max-w-none sm:whitespace-nowrap sm:text-base"
      />

      <div className="mt-5">
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMS.map((exam, index) => (
            // Reveal owns the transform of the li, so the hover lift lives on
            // the card inside it — h-full because the li is what stretches.
            <Reveal as="li" key={exam.name} delay={index * 80}>
              <div className="group h-full rounded-3xl bg-roe-clay px-8 py-6 shadow-[0_2px_5px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                <span className="flex size-16 items-center justify-center rounded-xl bg-roe-yellow transition-transform duration-300 ease-out group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-9 text-gray-900"
                  >
                    {exam.icon}
                  </svg>
                </span>
                <h3 className="mt-6 text-lg font-semibold text-black">{exam.name}</h3>
                <p className="mt-1.5 text-sm text-black">{exam.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
