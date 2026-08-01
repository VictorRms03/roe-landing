import Image from "next/image";
import BookingForm from "@/components/BookingForm";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-10 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-10 shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-10 shrink-0">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </svg>
  );
}

const INFO_ITEMS = [
  { icon: PinIcon, title: "Duas Unidades", detail: "Mogi Mirim e Mogi Guaçu" },
  { icon: ClockIcon, title: "Segunda à Sexta", detail: "8h às 12h e 13hr às 17h" },
  { icon: ChatIcon, title: "Agende no WhatsApp", detail: "Respostas no horário comercial" },
];

export default function Hero() {
  return (
    <>
      <div className="h-10 bg-[#EAE4D7]" aria-hidden="true" />

      <section className="bg-roe-yellow px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
                Imagens Precisas
                <br />
                para Diagnósticos Certos
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-800">
                Tecnologia de ponta em radiologia odontológica para oferecer imagens de alta
                precisão, laudos rápidos e um atendimento pensado no seu conforto.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#agendar"
                  className="rounded-full bg-black px-5 py-2.5 text-[16px] text-white shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 active:translate-y-0 active:shadow-md"
                >
                  Agendar Exame
                </a>
                <a
                  href="#servicos"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-transparent bg-roe-gray px-5 py-2.5 text-[16px] font-semibold text-gray-900 transition-all duration-300 ease-out hover:gap-3 hover:border-black hover:bg-transparent"
                >
                  Ver Exames
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-[1.5fr_1fr] gap-4">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-16/9 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero/exame.webp"
                    alt="Profissional analisando uma tomografia odontológica em 3D"
                    fill
                    preload
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-16/9 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero/exame-2.webp"
                    alt="Molde odontológico em detalhe"
                    fill
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/exame-3.webp"
                  alt="Paciente realizando exame de tomografia odontológica"
                  fill
                  sizes="(min-width: 1024px) 20vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {INFO_ITEMS.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex items-center justify-center gap-3 rounded-sm bg-[#EAE4D7] px-5 py-6"
              >
                <Icon />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-700">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10 bg-[#EAE4D7]" aria-hidden="true" />

      <div id="agendar" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-roe-gray p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">Agende Seu Exame</h2>
          <BookingForm />
        </div>
      </div>
    </>
  );
}
