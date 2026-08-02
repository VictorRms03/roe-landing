import Image from "next/image";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { UNITS } from "@/data/units";

export default function Clinics() {
  return (
    <>
      <div className="h-10 bg-[#EAE4D7]" aria-hidden="true" />

      <section id="clinicas" className="scroll-mt-32 bg-roe-yellow px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Nossas Clínicas
            </h2>
            <p className="mt-2 max-w-xl text-sm text-black sm:text-base">
              Duas unidades para atender você com foco e precisão.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {UNITS.map((unit, index) => (
              <Reveal as="li" key={unit.name} delay={index * 120}>
                <div className="group h-full rounded-2xl bg-[#FFFCF5] shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-16/9 overflow-hidden rounded-2xl">
                    <Image
                      src={unit.image}
                      alt={unit.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="relative p-6 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
                    <p className="mt-2 text-sm text-gray-700">{unit.address}</p>
                    <p className="mt-2 text-sm text-gray-700">{unit.hours}</p>

                    {unit.whatsapp && (
                      <a
                        href={`https://wa.me/${unit.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Falar com a ${unit.name} no WhatsApp`}
                        className="absolute bottom-3 right-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25d366] shadow-md shadow-black/10 outline-none transition-all duration-200 ease-out hover:scale-110 hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF5]"
                      >
                        <WhatsAppIcon className="size-7" />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-10 bg-[#EAE4D7]" aria-hidden="true" />
    </>
  );
}
