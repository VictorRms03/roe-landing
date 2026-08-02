import Image from "next/image";
import { ArrowRightIcon, ChatIcon, ClockIcon, PinIcon, StarIcon } from "@/components/Icons";

const INFO_ITEMS = [
  { icon: PinIcon, title: "Duas Unidades", detail: "Mogi Mirim e Mogi Guaçu" },
  { icon: ClockIcon, title: "Segunda a Sexta", detail: "8h às 12h · 13h às 17h" },
  { icon: ChatIcon, title: "Agende no WhatsApp", detail: "Respostas no horário comercial" },
];

// A yellow bloom behind the photography over a vertical wash, running sand to
// roe-white so this section joins the navbar above and Services below without a
// seam. Inline rather than a utility: two layers with rgba() stops would need
// more underscore escaping than it is worth.
const BACKGROUND =
  "radial-gradient(60% 55% at 82% 22%, rgba(230,175,46,0.42) 0%, rgba(230,175,46,0.12) 45%, rgba(230,175,46,0) 72%), linear-gradient(180deg, #EAE4D7 0%, #F5EDDD 40%, #FEFDFF 100%)";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 pt-10 pb-16 md:px-12 md:pt-14 lg:px-16"
      style={{ backgroundImage: BACKGROUND }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* The opening cascade is pure CSS: the first fold cannot wait for
              hydration, so no Reveal anywhere in this section. */}
          <div>
            {/* A percentage max-width wouldn't do it here: this pill sits
                inside an auto-sized single-column grid track below sm, so a
                nowrap descendant's full width would inflate that track before
                any percentage of it could clamp back down. Anchoring to
                100vw (minus this section's own px-6) sidesteps that
                circularity and gives the flex row below an actual width to
                shrink the text span against. */}
            <div className="animate-fade-up bg-roe-cream inline-flex max-w-[calc(100vw-3rem)] items-center gap-2.5 rounded-full border border-black/10 py-1.5 pr-4 pl-2.5 shadow-sm shadow-black/5 motion-reduce:animate-none sm:max-w-none">
              {/* Decorative: the sentence beside it already carries the rating. */}
              <span className="text-roe-yellow flex shrink-0 items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} className="size-3.5" />
                ))}
              </span>
              <span className="min-w-0 overflow-hidden text-xs font-semibold whitespace-nowrap text-gray-900 motion-reduce:overflow-visible motion-reduce:whitespace-normal sm:min-w-fit sm:overflow-visible sm:text-sm sm:whitespace-normal">
                <span className="animate-marquee-peek inline-block motion-reduce:animate-none sm:animate-none">
                  4,5/5 · mais de 30 anos de radiologia odontológica
                </span>
              </span>
            </div>

            <h1
              style={{ animationDelay: "60ms" }}
              className="animate-fade-up mt-6 max-w-[18ch] text-[2.5rem] leading-[1.06] font-bold tracking-tight text-balance text-gray-950 motion-reduce:animate-none sm:text-5xl lg:text-[3.4rem]"
            >
              Imagens Precisas para{" "}
              {/* The accent is an underline rather than yellow type: yellow on
                  this cream sits at about 1.9:1, which is unreadable. */}
              <span className="relative inline-block">
                <span className="relative z-10">Diagnósticos Certos</span>
                <span
                  aria-hidden="true"
                  className="animate-draw-underline bg-roe-yellow/70 absolute inset-x-0 bottom-0.5 z-0 h-3 origin-left rounded-full motion-reduce:animate-none sm:h-4"
                />
              </span>
            </h1>

            <p
              style={{ animationDelay: "140ms" }}
              className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-gray-800 motion-reduce:animate-none"
            >
              Tecnologia de ponta em radiologia odontológica para oferecer imagens de alta precisão,
              laudos rápidos e um atendimento pensado no seu conforto.
            </p>

            {/* Focus is an outline here, not the site's ring + ring-offset: the
                offset needs a solid colour to sit on and this ground is a
                gradient. Every other section keeps the ring. */}
            <div
              style={{ animationDelay: "220ms" }}
              className="animate-fade-up mt-8 flex flex-wrap gap-4 motion-reduce:animate-none"
            >
              <a
                href="#agendar"
                className="inline-flex items-center rounded-full bg-black px-6 py-3 text-[16px] font-semibold text-white shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:translate-y-0 active:shadow-md"
              >
                Agendar Exame
              </a>
              <a
                href="#servicos"
                className="group bg-roe-cream/80 hover:bg-roe-cream inline-flex items-center gap-2 rounded-full border-2 border-gray-900/15 px-6 py-3 text-[16px] font-semibold text-gray-900 transition-all duration-300 ease-out outline-none hover:gap-3 hover:border-gray-900/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Ver Exames
                <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* `isolate` is load-bearing: without its own stacking context the
              -z-10 frame below would paint behind the section background. */}
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="animate-float-slow border-roe-yellow/60 absolute -top-4 -right-3 -z-10 size-28 rounded-3xl border-2 motion-reduce:animate-none lg:size-40"
            />

            {/* Opacity only, no delay: this is the LCP element. */}
            <div className="animate-fade-in relative aspect-4/3 overflow-hidden rounded-[28px] shadow-2xl ring-1 shadow-black/15 ring-black/5 motion-reduce:animate-none">
              <Image
                src="/images/hero/exame.webp"
                alt="Profissional analisando uma tomografia odontológica em 3D"
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover object-center"
              />
            </div>

            {/* 247x458 native, held to 144 CSS px so it renders ~1:1 at DPR 2. */}
            <div
              style={{ animationDelay: "380ms" }}
              className="animate-fade-up ring-roe-cream absolute -bottom-8 -left-4 z-20 w-32 overflow-hidden rounded-2xl shadow-xl ring-4 shadow-black/20 motion-reduce:animate-none sm:w-36 lg:-left-8"
            >
              <div className="relative aspect-3/4">
                <Image
                  src="/images/hero/exame-3.webp"
                  alt="Paciente realizando exame de tomografia odontológica"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </div>

            <div
              style={{ animationDelay: "460ms" }}
              className="animate-fade-up bg-roe-cream/95 absolute right-4 bottom-4 z-20 rounded-2xl border border-black/5 px-4 py-3 shadow-xl shadow-black/20 motion-reduce:animate-none"
            >
              <p className="text-xl leading-none font-bold tracking-tight text-gray-900">
                5 mil<span className="text-roe-yellow">+</span>
              </p>
              <p className="mt-1 text-[11px] font-medium text-gray-600">pacientes atendidos</p>
            </div>
          </div>
        </div>

        {/* The top margin clears the portrait tile that overhangs by -bottom-8. */}
        <ul className="bg-roe-cream mt-16 grid divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 shadow-lg shadow-black/5 sm:mt-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {INFO_ITEMS.map(({ icon: Icon, title, detail }, index) => (
            <li
              key={title}
              style={{ animationDelay: `${520 + index * 90}ms` }}
              className="animate-fade-up flex items-center gap-4 px-5 py-5 motion-reduce:animate-none"
            >
              {/* Services' exam tile, scaled down from size-16. */}
              <span className="bg-roe-yellow flex size-11 shrink-0 items-center justify-center rounded-xl text-gray-900 shadow-sm shadow-black/10">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">{detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Wayfinding, not pure decoration: it links to the next section
            rather than sitting there inert. Hidden below sm — the hero is
            already tight on vertical space at that width. */}
        <div className="mt-16 hidden justify-center sm:flex">
          <a
            href="#servicos"
            style={{ animationDelay: "820ms" }}
            className="animate-fade-up group flex flex-col items-center gap-2 motion-reduce:animate-none"
          >
            <span className="text-xs font-medium tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-800">
              Desça para ver mais
            </span>
            <span className="animate-bounce-slow motion-reduce:animate-none">
              <span
                aria-hidden="true"
                className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-gray-400/70 pt-1.5 transition-colors group-hover:border-gray-700"
              >
                <span className="animate-scroll-wheel size-1 rounded-full bg-gray-400/70 transition-colors group-hover:bg-gray-700 motion-reduce:animate-none" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
