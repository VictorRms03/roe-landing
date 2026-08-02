import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { BOOKABLE_UNITS } from "@/data/units";

// What the form actually does, in the visitor's terms. Nothing here promises
// more than the WhatsApp link BookingForm builds already delivers.
const ASSURANCES = [
  {
    title: "Sem cadastro",
    description: "Nada de login ou senha: são cinco campos e pronto.",
  },
  {
    title: "Você confere antes de enviar",
    description: "O WhatsApp abre com a mensagem escrita, ainda sem enviar.",
  },
  {
    title: "Você escolhe a unidade",
    description: "O pedido vai direto para o número de Mogi Guaçu ou de Mogi Mirim.",
  },
];

export default function Booking() {
  return (
    // Sand rather than white: this is where the page's colour rhythm resumes,
    // and the strip Testimonials leaves behind melts into it as top breathing room.
    <section id="agendar" className="scroll-mt-32 bg-roe-sand px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="text-2xl font-semibold text-roe-yellow sm:text-3xl">Agendamento</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
                Agende Seu Exame
              </h2>
              <p className="mt-3 max-w-md text-sm text-black sm:text-base">
                Preencha os dados ao lado e abrimos o WhatsApp com a mensagem pronta para você
                conferir e confirmar.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-6">
              {ASSURANCES.map((item, index) => (
                // No hover on these, so the reveal can sit on the li itself.
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 100}
                  className="flex gap-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 size-[22px] shrink-0 text-roe-yellow"
                  >
                    <path d="M4 12.5 9.5 18 20 6.5" />
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold text-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={300} className="mt-8 border-t border-black/10 pt-6">
              <p className="text-sm font-semibold text-black">Prefere falar direto?</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {BOOKABLE_UNITS.map((unit) => (
                  <li key={unit.id}>
                    <a
                      href={`https://wa.me/${unit.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Falar com a ${unit.name} no WhatsApp`}
                      className="inline-flex items-center gap-2 rounded-full bg-roe-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/10 outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 active:shadow-md focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-roe-sand"
                    >
                      <WhatsAppIcon />
                      {unit.shortName}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Cream card on sand: the same pairing the clinic cards use over yellow. */}
          <Reveal delay={120}>
            <div className="rounded-3xl bg-roe-cream p-6 shadow-xl shadow-black/10 sm:p-8">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
