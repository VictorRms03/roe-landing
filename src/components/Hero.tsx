import Image from "next/image";
import BookingForm from "@/components/BookingForm";

export default function Hero() {
  return (
    <section className="bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Imagens Precisas
            <br />
            para Diagnósticos Certos
          </h1>
          <p className="max-w-md text-base text-gray-600 md:pb-2 lg:text-lg">
            Raio-x odontológico de alta definição, laudos rápidos e conforto em cada exame.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="rounded-2xl bg-roe-gray p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Agende Seu Exame</h2>
            <BookingForm />
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="/images/hero/exame.webp"
              alt="Profissional analisando uma tomografia odontológica em 3D"
              fill
              preload
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
