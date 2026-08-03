"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { ChevronIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

const ARROW_CLASS =
  "flex size-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-gray-900 outline-none transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-roe-yellow active:scale-95 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2";

export default function Services() {
  const trackRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // No scrollbar and no trackpad on most phones means the only way to move
  // the mobile carousel is a swipe, so these buttons give mouse/keyboard
  // users the same reach without needing to expose the native scrollbar.
  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return;

    track.scrollBy({
      left: direction * (second.offsetLeft - first.offsetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <Section id="servicos" className="bg-roe-white py-4 md:py-8">
      <SectionHeader
        eyebrow="Exames"
        title="Raio-x para Cada Necessidade"
        description="Tecnologia avançada de imagem para todo tipo de diagnóstico odontológico."
        titleClassName="text-black"
        descriptionClassName="max-w-xl text-sm text-black sm:max-w-none sm:whitespace-nowrap sm:text-base"
      />

      <div className="mt-5">
        {/* Below sm: a snap-scroll carousel so 6 cards don't stack the section
            tall on mobile. The -mx-6/px-6 bleed lets it reach the viewport
            edge while the first card still lines up with the page padding.
            py-8 (instead of clipping at the edges) gives the hover lift and
            shadow room, since overflow-x-auto also clips the y axis.
            From sm up this reverts to the original grid, unchanged. */}
        <ul
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto overscroll-x-contain px-6 py-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {EXAMS.map((exam, index) => (
            // Reveal owns the transform of the li, so the hover lift lives on
            // the card inside it — h-full because the li is what stretches.
            <Reveal
              as="li"
              key={exam.name}
              delay={index * 80}
              className="w-[78%] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none"
            >
              <div className="group bg-roe-clay h-full rounded-3xl px-8 py-6 shadow-[0_2px_5px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                <span className="bg-roe-yellow flex size-16 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-110">
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

      <div className="mt-2 flex justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Exame anterior"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Próximo exame"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5" />
        </button>
      </div>
    </Section>
  );
}
