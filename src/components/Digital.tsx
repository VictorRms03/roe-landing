import Reveal from "@/components/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { DIGITAL_STAGES } from "@/data/services";

/**
 * A rail with numbered nodes instead of the card grid Services uses: this
 * content is an actual sequence — scan, files, printed model — and a grid of
 * peers would say the opposite. The ink ground is the other half of the
 * separation, which is why this sits between Services and Benefits rather than
 * next to the equally dark Clinics.
 */
export default function Digital() {
  return (
    <Section id="digital" className="bg-roe-ink py-16">
      <SectionHeader
        className="max-w-2xl"
        eyebrow="Fluxo Digital"
        title="Do Escaneamento ao Modelo"
        description="Além dos exames de imagem, a ROE escaneia, entrega os arquivos digitais e imprime o modelo — tudo na mesma clínica."
        titleClassName="text-roe-white"
        descriptionClassName="mt-3 text-sm text-white/70 sm:text-base"
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
          className="bg-roe-yellow/30 absolute top-2.5 bottom-2.5 left-2.5 w-px sm:hidden"
        />
        <div
          aria-hidden="true"
          className="animate-draw-underline bg-roe-yellow/30 absolute top-2.5 right-0 left-2.5 hidden h-px origin-left motion-reduce:animate-none sm:block"
        />

        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {DIGITAL_STAGES.map(({ id, step, name, description, tags }, index) => (
            <Reveal
              as="li"
              key={id}
              delay={index * 140}
              className="relative pl-10 sm:pt-10 sm:pl-0"
            >
              {/* Filled centre on the ink ground so the node reads as a station on
                the rail, not as a gap in it. */}
              <span
                aria-hidden="true"
                className="bg-roe-ink border-roe-yellow absolute top-0 left-0 flex size-5 items-center justify-center rounded-full border-2"
              >
                <span className="bg-roe-yellow size-1.5 rounded-full" />
              </span>

              <p className="text-roe-yellow font-mono text-xs tracking-[0.2em]">{step}</p>
              <h3 className="text-roe-white mt-2 text-xl font-semibold">{name}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">{description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-white/80"
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
        <p className="mt-14 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55">
          Todas as imagens são digitais e em alta resolução · os arquivos vão para o seu dentista
          nos formatos que ele já usa
        </p>
      </Reveal>
    </Section>
  );
}
