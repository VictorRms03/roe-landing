import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Testimonials() {
  return (
    <>
      {/* No horizontal padding on the section: the carousel bleeds past the edges. */}
      <section id="depoimentos" className="scroll-mt-32 bg-roe-white py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
            O Que Nossos Clientes Dizem?
          </h2>
        </div>

        <TestimonialsCarousel />
      </section>

      <div className="h-10 bg-[#EAE4D7]" aria-hidden="true" />
    </>
  );
}
