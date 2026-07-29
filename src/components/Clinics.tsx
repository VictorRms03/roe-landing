import Image from "next/image";
import { UNITS } from "@/data/units";

export default function Clinics() {
  return (
    <section id="clinicas" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Nossas Clínicas
        </h2>
        <p className="mt-3 max-w-xl text-sm text-gray-600 sm:text-base">
          Duas unidades para atender você com foco e precisão.
        </p>

        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {UNITS.map((unit) => (
            <li key={unit.name} className="overflow-hidden rounded-2xl bg-roe-gray">
              <div className="relative aspect-16/9">
                <Image
                  src={unit.image}
                  alt={unit.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
                  <p className="mt-2 text-sm text-gray-700">{unit.address}</p>
                  <p className="mt-2 text-sm text-gray-700">{unit.hours}</p>
                </div>

                {unit.whatsapp && (
                  <a
                    href={`https://wa.me/${unit.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Falar com a ${unit.name} no WhatsApp`}
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25d366] outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-roe-gray"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
                      <path
                        fill="#ffffff"
                        d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.35A9.94 9.94 0 0 0 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2z"
                      />
                      <path
                        fill="#25d366"
                        d="M16.9 14.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
