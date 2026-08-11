import Image from "next/image";
import { ClockIcon, PinIcon, RouteIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { UNITS } from "@/data/units";

// Sand, with a white section above and below, so the yellow rules now bracket
// the one tinted block on this stretch of the page rather than fencing a dark
// one — either way they mark the boundary. The radial bloom the ink version
// carried is gone; it existed to lift a dark ground.
export default function Clinics() {
  return (
    <>
      {/* Outside the section so #clinicas still lands where scroll-mt-32 expects. */}
      <div className="bg-roe-yellow h-1" aria-hidden="true" />

      <Section id="clinicas" className="bg-roe-sand py-16 md:py-20">
        <SectionHeader
          className="max-w-2xl"
          eyebrow="Unidades"
          title="Nossas Clínicas em Mogi Guaçu e Mogi Mirim"
          description="Duas unidades no centro de Mogi Guaçu e Mogi Mirim, com o mesmo padrão de exame e atendimento."
          titleClassName="text-black"
          descriptionClassName="mt-3 text-sm text-gray-700 sm:text-base"
        />

        {/* Full-width rows, not a 2-up grid: at 2-up the image column is only
              ~237px, too cramped for either photo. */}
        <ul className="mt-12 grid gap-6 lg:gap-8">
          {UNITS.map((unit, index) => (
            // Reveal owns the li's transform, so the hover lift lives on the
            // card inside it — h-full because the li is what stretches.
            <Reveal as="li" key={unit.id} delay={index * 140}>
              <div
                className={`group hover:border-roe-yellow/60 bg-roe-cream flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 shadow-lg shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:flex-row lg:min-h-[380px] ${
                  // Alternating side, so the rows do not read as identical blocks.
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
                  {/* Keeps the yellow facade off the card edge and gives the
                        badge something to sit on. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r sm:from-black/30 sm:via-transparent sm:to-transparent"
                  />
                  <span className="text-roe-yellow absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase">
                    Unidade {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
                    {unit.name}
                  </h3>

                  {/* Hairline rows rather than a stacked list: the content
                        column runs close to 700px, which two loose lines leave empty. */}
                  <ul className="mt-6 flex flex-col divide-y divide-black/10 border-y border-black/10 text-sm">
                    <li className="flex gap-3 py-4">
                      {/* Dark, not yellow: yellow marks this small on cream sit
                          near 1.9:1. Every light section on the site puts yellow
                          behind dark content, never yellow on light. */}
                      <PinIcon className="mt-0.5 size-4 shrink-0 text-gray-900" />
                      <span className="min-w-0">
                        <span className="block font-medium text-gray-900">{unit.street}</span>
                        <span className="mt-0.5 block text-gray-600">{unit.cityLine}</span>
                      </span>
                    </li>
                    <li className="flex gap-3 py-4">
                      <ClockIcon className="mt-0.5 size-4 shrink-0 text-gray-900" />
                      <span className="text-gray-700">{unit.hours}</span>
                    </li>
                  </ul>

                  {/* mt-auto pins the actions to the bottom, so both cards line
                        their buttons up however long the address runs. */}
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <a
                      href={unit.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-roe-yellow hover:bg-roe-yellow-hover hover:shadow-roe-yellow/20 focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-cream inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-950 shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md"
                    >
                      <RouteIcon className="size-4" />
                      Como chegar
                    </a>

                    {/* MobileActionBar sends people here expecting a per-unit
                          number, so this has to stay an obvious button. */}
                    {unit.whatsapp && (
                      <WhatsAppLink
                        phone={unit.whatsapp}
                        unitName={unit.name}
                        className="bg-roe-white hover:bg-roe-whatsapp focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-cream inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors duration-200 outline-none hover:border-transparent hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
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

      <div className="bg-roe-yellow h-1" aria-hidden="true" />
    </>
  );
}
