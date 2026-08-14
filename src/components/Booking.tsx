import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import FeatureItem from "@/components/ui/FeatureItem";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { BOOKABLE_UNITS } from "@/data/units";

type Assurance = {
  title: string;
  description: string;
};

// What the form actually does, in the visitor's terms. Nothing here promises
// more than the WhatsApp link BookingForm builds already delivers.
const ASSURANCES: Assurance[] = [
  {
    title: "Sem cadastro",
    description: "Nada de login ou senha: cinco campos, mais o convênio se você tiver.",
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
    <Section id="agendar" className="bg-roe-sand py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Agendamento"
            title="Agende Seu Exame de Raio-X pelo WhatsApp"
            description="Preencha os dados ao lado e abrimos o WhatsApp com a mensagem pronta para você conferir e confirmar."
            titleClassName="text-black"
            descriptionClassName="mt-3 max-w-md text-sm text-black sm:text-base"
          />

          {/* Same row gap as the Benefits list, so the two topic lists on the
              page space their items identically. */}
          <ul className="mt-8 grid gap-y-9">
            {ASSURANCES.map((item, index) => (
              <FeatureItem
                key={item.title}
                title={item.title}
                description={item.description}
                delay={index * 100}
                titleClassName="text-base font-semibold text-black"
                descriptionClassName="mt-1 text-sm text-gray-700"
              />
            ))}
          </ul>

          <Reveal delay={300} className="mt-8 border-t border-black/10 pt-6">
            <p className="text-sm font-semibold text-black">Prefere falar direto?</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {BOOKABLE_UNITS.map((unit) => (
                <li key={unit.id}>
                  <WhatsAppLink
                    phone={unit.whatsapp}
                    unitName={unit.name}
                    className="bg-roe-whatsapp focus-visible:ring-offset-roe-sand inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md"
                  >
                    <WhatsAppIcon />
                    {unit.shortName}
                  </WhatsAppLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Cream card on sand: the same pairing the clinic cards use over yellow. */}
        <Reveal delay={120}>
          <div className="bg-roe-cream rounded-3xl p-6 shadow-xl shadow-black/10 sm:p-8">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
