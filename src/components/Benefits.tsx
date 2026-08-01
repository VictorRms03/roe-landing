import Image from "next/image";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

const BENEFITS = [
  {
    title: "Foco no Paciente",
    description: "Seu conforto sempre em primeiro lugar.",
  },
  {
    title: "Equipamentos Modernos",
    description: "Tecnologia de ponta para melhores laudos.",
  },
];

// `target`/`decimals` feed CountUp; `suffix` is static text tacked on after
// the animated digits (so "K+" or "/5" never gets counted up itself).
const STATS = [
  { target: 4.5, decimals: 1, suffix: "/5", label: "Avaliação Média" },
  { target: 30, suffix: "+", label: "Anos de Serviço" },
  { target: 5, suffix: "K+", label: "Pacientes Atendidos" },
  { target: 10, suffix: "+", label: "Equipe Especializada" },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-32 bg-[#EAE4D7] px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_auto] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <p className="text-2xl font-semibold text-roe-yellow sm:text-3xl">Diferenciais</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
                Por que escolher a clínica ROE?
              </h2>
              <p className="mt-3 max-w-md text-xs text-black sm:text-sm">
                Confiada por milhares de pacientes para exames precisos e humanizados.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {BENEFITS.map((benefit, index) => (
                // No hover on these, so the reveal can sit on the li itself.
                <Reveal as="li" key={benefit.title} delay={index * 100} className="flex gap-3">
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
                    <h3 className="text-lg font-semibold text-black">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-black">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-8 lg:gap-8">
            {/* Photo and stats reveal side by side rather than nested, so their
                translations never stack on top of each other. */}
            <Reveal delay={120} className="relative">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:w-[380px]">
                <Image
                  src="/images/benefits/exame-4.webp"
                  alt="Paciente posicionada em um aparelho de raio-x panorâmico"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div
                className="absolute -right-[18px] inset-y-3 hidden w-1 rounded-full bg-roe-yellow lg:block"
                aria-hidden="true"
              />
            </Reveal>

            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:h-[285px] lg:flex lg:flex-col lg:justify-between lg:gap-0">
              {STATS.map((stat, index) => (
                <Reveal as="li" key={stat.label} delay={200 + index * 90}>
                  <p className="text-2xl font-bold tracking-tight text-gray-900">
                    <CountUp to={stat.target} decimals={stat.decimals} />
                    <span className="text-lg font-medium text-gray-500">{stat.suffix}</span>
                  </p>
                  <p className="text-xs text-gray-800">{stat.label}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
