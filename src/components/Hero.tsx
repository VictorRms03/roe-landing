import Image from "next/image";
import {
  ArrowRightIcon,
  ChatIcon,
  ClockIcon,
  PinIcon,
  StarIcon,
} from "@/components/Icons";

const INFO_ITEMS = [
  { icon: PinIcon, title: "Duas Unidades", detail: "Mogi Mirim e Mogi Guaçu" },
  { icon: ClockIcon, title: "Segunda a Sexta", detail: "8h às 12h · 13h às 17h" },
  { icon: ChatIcon, title: "Agende no WhatsApp", detail: "Respostas no horário comercial" },
];

// Two layers: a yellow bloom sitting behind the photography, and a vertical
// wash. The wash starts on the exact sand the transition strips used to be and
// ends on --color-roe-white, so this section now joins the navbar above and
// Services below without a seam — which is why it no longer carries strips of
// its own. Written as an inline style because a two-layer background with
// rgba() stops would need more underscore escaping than it is worth, and the
// file already reaches for `style` to set animation delays.
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
            <div className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-black/10 bg-roe-cream py-1.5 pr-4 pl-2.5 shadow-sm shadow-black/5 motion-reduce:animate-none">
              {/* Decorative: the sentence beside it already carries the rating. */}
              <span className="flex items-center gap-0.5 text-roe-yellow" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} className="size-3.5" />
                ))}
              </span>
              <span className="text-xs font-semibold text-gray-900 sm:text-sm">
                4,5/5 · mais de 30 anos de radiologia odontológica
              </span>
            </div>

            <h1
              style={{ animationDelay: "60ms" }}
              className="mt-6 max-w-[18ch] animate-fade-up text-[2.5rem] leading-[1.06] font-bold tracking-tight text-balance text-gray-950 motion-reduce:animate-none sm:text-5xl lg:text-[3.4rem]"
            >
              Imagens Precisas para{" "}
              {/* The accent is an underline rather than yellow type: yellow on
                  this cream sits at about 1.9:1, which is unreadable. */}
              <span className="relative inline-block">
                <span className="relative z-10">Diagnósticos Certos</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0.5 z-0 h-3 origin-left animate-draw-underline rounded-full bg-roe-yellow/70 motion-reduce:animate-none sm:h-4"
                />
              </span>
            </h1>

            <p
              style={{ animationDelay: "140ms" }}
              className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-gray-800 motion-reduce:animate-none"
            >
              Tecnologia de ponta em radiologia odontológica para oferecer imagens de alta
              precisão, laudos rápidos e um atendimento pensado no seu conforto.
            </p>

            {/* Focus is an outline here, not the site's ring + ring-offset: the
                offset needs a solid colour to sit on and this ground is a
                gradient. Every other section keeps the ring. */}
            <div
              style={{ animationDelay: "220ms" }}
              className="mt-8 flex animate-fade-up flex-wrap gap-4 motion-reduce:animate-none"
            >
              <a
                href="#agendar"
                className="inline-flex items-center rounded-full bg-black px-6 py-3 text-[16px] font-semibold text-white shadow-md shadow-black/10 outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:translate-y-0 active:shadow-md"
              >
                Agendar Exame
              </a>
              <a
                href="#servicos"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-900/15 bg-roe-cream/80 px-6 py-3 text-[16px] font-semibold text-gray-900 outline-none transition-all duration-300 ease-out hover:gap-3 hover:border-gray-900/70 hover:bg-roe-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Ver Exames
                <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* `isolate` is load-bearing: without its own stacking context the
              -z-10 frame below would paint behind the section background and
              disappear entirely. */}
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-3 -z-10 size-28 animate-float-slow rounded-3xl border-2 border-roe-yellow/60 motion-reduce:animate-none lg:size-40"
            />

            {/* Opacity only, no delay, no transform: this is the LCP element and
                anything else would push it back. */}
            <div className="relative aspect-4/3 animate-fade-in overflow-hidden rounded-[28px] shadow-2xl shadow-black/15 ring-1 ring-black/5 motion-reduce:animate-none">
              <Image
                src="/images/hero/exame.webp"
                alt="Profissional analisando uma tomografia odontológica em 3D"
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover object-center"
              />
            </div>

            {/* 247x458 native. Held to 144 CSS px so it renders about 1:1 at
                DPR 2 — any larger and the upscale shows. */}
            <div
              style={{ animationDelay: "380ms" }}
              className="absolute -bottom-8 -left-4 z-20 w-32 animate-fade-up overflow-hidden rounded-2xl shadow-xl shadow-black/20 ring-4 ring-roe-cream motion-reduce:animate-none sm:w-36 lg:-left-8">
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
              className="absolute right-4 bottom-4 z-20 animate-fade-up rounded-2xl border border-black/5 bg-roe-cream/95 px-4 py-3 shadow-xl shadow-black/20 motion-reduce:animate-none"
            >
              <p className="text-xl leading-none font-bold tracking-tight text-gray-900">
                5 mil<span className="text-roe-yellow">+</span>
              </p>
              <p className="mt-1 text-[11px] font-medium text-gray-600">pacientes atendidos</p>
            </div>
          </div>
        </div>

        {/* The top margin clears the portrait tile that overhangs by -bottom-8. */}
        <ul className="mt-16 grid divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-roe-cream shadow-lg shadow-black/5 sm:mt-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {INFO_ITEMS.map(({ icon: Icon, title, detail }, index) => (
            <li
              key={title}
              style={{ animationDelay: `${520 + index * 90}ms` }}
              className="flex animate-fade-up items-center gap-4 px-5 py-5 motion-reduce:animate-none"
            >
              {/* The same filled tile Services uses for its exam icons, scaled
                  down from size-16 — so the two sections read as one system. */}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-roe-yellow text-gray-900 shadow-sm shadow-black/10">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
