import Image from "next/image";

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

const STATS = [
  { value: "4.5", suffix: "/5", label: "Avaliação Média" },
  { value: "30+", label: "Anos de Serviço" },
  { value: "5K+", label: "Pacientes Atendidos" },
  { value: "10+", label: "Equipe Especializada" },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr_auto] lg:items-center lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Por que escolher a clínica ROE?
            </h2>
            <p className="mt-3 max-w-md text-sm text-gray-600 sm:text-base">
              Confiada por milhares de pacientes para exames precisos e humanizados.
            </p>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-roe-yellow"
                  >
                    <path d="M4 12.5 9.5 18 20 6.5" />
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/images/benefits/exame-4.webp"
              alt="Paciente posicionada em um aparelho de raio-x panorâmico"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-1 lg:gap-9">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <p className="text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg font-medium text-gray-500">{stat.suffix}</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-gray-600">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
