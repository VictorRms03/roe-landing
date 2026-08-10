import Reveal from "@/components/Reveal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { REVIEWS } from "@/data/reviews";

export default function Testimonials() {
  return (
    <>
      {/* No horizontal padding on the section: the carousel bleeds past the edges. */}
      <section id="depoimentos" className="bg-roe-ink scroll-mt-32 py-12">
        <Reveal className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <h2 className="text-roe-white text-center text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            O Que Nossos Pacientes Dizem
          </h2>
        </Reveal>

        {/* Outside any Reveal: the carousel measures its cards, and a
            translating ancestor would skew that. */}
        <TestimonialsCarousel reviews={REVIEWS} />
      </section>

      {/* Now that the section above is ink, this is where Booking's sand starts
          rather than a melt between two light sections — it keeps the ink block
          from ending flush against the form. */}
      <div className="bg-roe-sand h-10" aria-hidden="true" />
    </>
  );
}
