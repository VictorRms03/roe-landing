import Reveal from "@/components/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { DIGITAL_STAGES } from "@/data/services";

// The Hero's move, reused: a yellow bloom over a vertical wash. The wash starts
// on Services' exact roe-white and lands on Benefits' exact roe-sand, so both
// seams disappear. The bloom is centred at 46% of the height with a 48% radius
// so its last stop lands inside the section on both the top and the bottom
// edge — a bloom still carrying alpha at y=0 would reintroduce the seam it is
// this section's whole job to hide. Inline rather than an arbitrary Tailwind
// value: two layers with rgba() stops would need more underscore escaping than
// it is worth.
const BACKGROUND =
  "radial-gradient(60% 48% at 74% 46%, rgba(230,175,46,0.24) 0%, rgba(230,175,46,0.08) 45%, rgba(230,175,46,0) 72%), linear-gradient(180deg, #FEFDFF 0%, #F5EDDD 55%, #EAE4D7 100%)";

/**
 * A rail with numbered nodes instead of the card grid Services uses: this
 * content is an actual sequence — scan, files, printed model — and a grid of
 * peers would say the opposite. With the ground now light like its neighbours,
 * the rail and the mono numerals carry the whole distinction, so nothing here
 * gets a coloured icon tile.
 */
export default function Digital() {
  return (
    <Section
      id="digital"
      className="relative overflow-hidden py-16"
      containerClassName="relative max-w-7xl"
      bleed={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: BACKGROUND }}
        />
      }
    >
      <SectionHeader
        className="max-w-2xl"
        eyebrow="Fluxo Digital"
        title="Do Escaneamento ao Modelo"
        description="Além dos exames de imagem, a ROE escaneia, entrega os arquivos digitais e imprime o modelo — tudo na mesma clínica."
        titleClassName="text-black"
        descriptionClassName="mt-3 text-sm text-gray-700 sm:text-base"
      />

      {/* The rails sit outside the <ol> so the list holds three items, not five.
          Two of them rather than one rotated: the nodes run down the left on a
          phone and across the top from sm up. Only the horizontal one draws
          itself in — draw-underline scales on X, so it has no vertical
          equivalent, and a rail that arrives fully formed is the safer default
          anyway. */}
      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="bg-roe-yellow/70 absolute top-2 bottom-2 left-2 w-px sm:hidden"
        />
        <div
          aria-hidden="true"
          className="animate-draw-underline bg-roe-yellow/70 absolute top-2 right-0 left-2 hidden h-px origin-left motion-reduce:animate-none sm:block"
        />

        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {DIGITAL_STAGES.map(({ id, step, name, description, tags }, index) => (
            <Reveal
              as="li"
              key={id}
              delay={index * 140}
              className="relative pl-10 sm:pt-10 sm:pl-0"
            >
              {/* A solid disc with an outline halo rather than a ring filled with
                  the page colour: the ground here is a gradient, so no single
                  fill would match it at all three node positions. */}
              <span
                aria-hidden="true"
                className="bg-roe-yellow outline-roe-yellow/25 absolute top-2 left-2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full outline-4"
              />

              {/* gray-600, not 500: at 12px on this ground 500 lands at 4.2:1. */}
              <p className="font-mono text-xs tracking-[0.2em] text-gray-600">{step}</p>
              <h3 className="mt-2 text-xl font-semibold text-black">{name}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-700">{description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-black/10 bg-white/60 px-2 py-1 font-mono text-xs text-gray-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* One quiet line rather than a second row of tiles: resolution is an
          attribute of everything above, not a fourth stage. */}
      <Reveal delay={420}>
        <p className="mt-14 border-t border-black/10 pt-6 text-sm leading-relaxed text-gray-600">
          Todas as imagens são digitais e em alta resolução · Os arquivos vão para o seu dentista
          nos formatos que ele já usa!
        </p>
      </Reveal>
    </Section>
  );
}
