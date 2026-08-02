import Image from "next/image";
import { ClockIcon, PinIcon, RouteIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { UNITS } from "@/data/units";

// Ink rather than the brand yellow this section used to be: the Mogi Guaçu
// facade is itself a yellow building, so on yellow the subject dissolved into
// the page. A dark ground turns both facades back into photographs, and it lets
// the yellow finally be used as type at 10:1 instead of 1.9:1.
export default function Clinics() {
  return (
    <>
      {/* The old sand strips were sand-on-sand against Benefits above — invisible
          padding. A yellow hairline is the footer's idiom and actually bookends
          the dark block. Kept outside the section so #clinicas still lands where
          scroll-mt-32 expects it. */}
      <div className="h-1 bg-roe-yellow" aria-hidden="true" />

      <Section
        id="clinicas"
        className="relative overflow-hidden bg-roe-ink py-16"
        containerClassName="relative max-w-7xl"
        bleed={
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
            style={{
              backgroundImage:
                "radial-gradient(50% 100% at 50% 0%, rgba(230,175,46,0.16) 0%, rgba(230,175,46,0) 70%)",
            }}
          />
        }
      >
        <SectionHeader
          className="max-w-2xl"
          eyebrow="Unidades"
          title="Nossas Clínicas"
          description="Duas unidades no centro de Mogi Guaçu e Mogi Mirim, com o mesmo padrão de exame e atendimento."
          titleClassName="text-roe-white"
          descriptionClassName="mt-3 text-sm text-white/70 sm:text-base"
        />

          {/* Full-width rows, not a 2-up grid: at 2-up the image column of a split
              card is only ~237px, which is the cramped shape that made these look
              thin. Full width gives a near-square well — the right shape for one
              square photo and one portrait one, neither of which survives 16:9. */}
          <ul className="mt-12 grid gap-6 lg:gap-8">
            {UNITS.map((unit, index) => (
              // Reveal owns the transform of the li, so the hover lift lives on
              // the card inside it — h-full because the li is what stretches.
              <Reveal as="li" key={unit.id} delay={index * 140}>
                <div
                  className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-roe-yellow/40 hover:bg-white/[0.06] hover:shadow-2xl sm:flex-row lg:min-h-[380px] ${
                    // Alternating side, so the two rows do not read as a list of
                    // identical blocks. Both class names are written out in full,
                    // so Tailwind's scanner sees them.
                    index % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="relative aspect-16/11 w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5 lg:w-[36%]">
                    <Image
                      src={unit.image}
                      alt={unit.imageAlt}
                      fill
                      sizes="(min-width: 640px) 40vw, 100vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* Keeps the yellow facade from bleeding into the card edge,
                        and gives the badge something to sit on. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r sm:from-black/30 sm:via-transparent sm:to-transparent"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-roe-yellow uppercase">
                      Unidade {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-xl font-bold tracking-tight text-roe-white sm:text-2xl">
                      {unit.name}
                    </h3>

                    {/* Full-width hairline rows rather than a short stacked list:
                        the content column runs the best part of 700px here, and
                        two loose lines of text left most of that empty. */}
                    <ul className="mt-6 flex flex-col divide-y divide-white/10 border-y border-white/10 text-sm">
                      <li className="flex gap-3 py-4">
                        <PinIcon className="mt-0.5 size-4 shrink-0 text-roe-yellow" />
                        <span className="min-w-0">
                          <span className="block font-medium text-roe-white">{unit.street}</span>
                          <span className="mt-0.5 block text-white/60">{unit.cityLine}</span>
                        </span>
                      </li>
                      <li className="flex gap-3 py-4">
                        <ClockIcon className="mt-0.5 size-4 shrink-0 text-roe-yellow" />
                        <span className="text-white/75">{unit.hours}</span>
                      </li>
                    </ul>

                    {/* mt-auto pins the actions to the bottom, so both cards line
                        their buttons up however long the address runs. */}
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <a
                        href={unit.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-roe-yellow px-5 py-2.5 text-sm font-semibold text-gray-950 shadow-md shadow-black/20 outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-roe-yellow-hover hover:shadow-lg hover:shadow-roe-yellow/20 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink active:translate-y-0 active:shadow-md"
                      >
                        <RouteIcon className="size-4" />
                        Como chegar
                      </a>

                      {/* The neutral pill that turns WhatsApp green on hover is
                          the footer's chip. MobileActionBar sends people here
                          expecting a per-unit number, so this has to stay an
                          obvious button — not the floating badge it replaced,
                          which sat on top of the address text. */}
                      {unit.whatsapp && (
                        <WhatsAppLink
                          phone={unit.whatsapp}
                          unitName={unit.name}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-roe-white outline-none transition-colors duration-200 hover:border-transparent hover:bg-roe-whatsapp focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
                        >
                          <WhatsAppIcon className="size-4" />
                          WhatsApp
                        </WhatsAppLink>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
      </Section>

      <div className="h-1 bg-roe-yellow" aria-hidden="true" />
    </>
  );
}
