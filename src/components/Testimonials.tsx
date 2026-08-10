import Reveal from "@/components/Reveal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { REVIEWS } from "@/data/reviews";

export default function Testimonials() {
  return (
    <>
      {/* No horizontal padding on the section: the carousel bleeds past the edges. */}
      <section id="depoimentos" className="bg-roe-white scroll-mt-32 py-12">
        <Reveal className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <h2 className="text-center text-3xl leading-tight font-bold tracking-tight text-black sm:text-4xl">
            O Que Nossos Pacientes Dizem
          </h2>
        </Reveal>

        {/* Outside any Reveal: the carousel measures its cards, and a
            translating ancestor would skew that. */}
        <TestimonialsCarousel reviews={REVIEWS} />
      </section>

      <div className="bg-roe-sand h-10" aria-hidden="true" />
    </>
  );
}
