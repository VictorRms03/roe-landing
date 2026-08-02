import Image from "next/image";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import FeatureItem from "@/components/ui/FeatureItem";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Benefit = {
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Foco no Paciente",
    description: "Seu conforto sempre em primeiro lugar.",
  },
  {
    title: "Equipamentos Modernos",
    description: "Tecnologia de ponta para melhores laudos.",
  },
];

type Stat = {
  target: number;
  /** Decimal places for the animated digits. */
  decimals?: number;
  /** Static text after the digits, so "K+" or "/5" is never counted up. */
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 4.5, decimals: 1, suffix: "/5", label: "Avaliação Média" },
  { target: 30, suffix: "+", label: "Anos de Serviço" },
  { target: 5, suffix: "K+", label: "Pacientes Atendidos" },
  { target: 10, suffix: "+", label: "Equipe Especializada" },
];

export default function Benefits() {
  return (
    <Section id="beneficios" className="bg-roe-sand py-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_auto] lg:items-center lg:gap-12">
        <div>
          <SectionHeader
            eyebrow="Diferenciais"
            title="Por que escolher a clínica ROE?"
            description="Confiada por milhares de pacientes para exames precisos e humanizados."
            titleClassName="text-black"
            descriptionClassName="mt-3 max-w-md text-xs text-black sm:text-sm"
          />

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <FeatureItem
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                delay={index * 100}
                titleClassName="text-lg font-semibold text-black"
                descriptionClassName="mt-1 text-sm text-black"
              />
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
    </Section>
  );
}
