import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpIcon, FacebookIcon, InstagramIcon, type IconProps } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { NAV_LINKS } from "@/data/navigation";
import { SOCIAL_PROFILES, type SocialProfile } from "@/data/social";
import { GENERAL_MANAGER, UNITS } from "@/data/units";

// Keyed by profile id: the URLs live in `@/data/social` because the
// Organization JSON-LD lists them as `sameAs`.
const SOCIAL_ICONS: Record<SocialProfile["id"], (props: IconProps) => ReactNode> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

// One shared style for the three column titles.
const COLUMN_TITLE = "text-xs font-semibold uppercase tracking-[0.14em] text-roe-yellow";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // Ink, not white: the page runs sand → white → black, so the footer is what
    // finally closes it instead of blending into the FAQ above.
    <footer className="bg-roe-ink">
      {/* Outside the padded box so the brand rule runs edge to edge. */}
      <div className="bg-roe-yellow h-1" aria-hidden="true" />

      <div className="px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.6fr] lg:gap-12">
            <div>
              <Link
                href="/"
                className="focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-ink inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {/* 112 = 2x the 56px slot. `sizes` without `fill` made Next
                    build a srcset off deviceSizes and fetch far more than that. */}
                <Image
                  src="/logo.webp"
                  alt=""
                  aria-hidden="true"
                  width={112}
                  height={112}
                  className="size-14"
                />
                <span className="text-roe-white text-lg font-bold">Clínica ROE</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                Radiologia odontológica com imagens de alta definição e atendimento humanizado.
              </p>

              <ul className="mt-6 flex items-center gap-3">
                {SOCIAL_PROFILES.map(({ id, label, href }) => {
                  const Icon = SOCIAL_ICONS[id];
                  return (
                    <li key={id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} da Clínica ROE`}
                        className="focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-ink block size-11 rounded-xl transition-transform duration-200 ease-out outline-none hover:-translate-y-0.5 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <nav aria-label="Rodapé">
              <h3 className={COLUMN_TITLE}>Navegue</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    {/* Same growing underline the header links use, in yellow so
                        it reads on the dark. */}
                    <Link
                      href={link.href}
                      className="hover:text-roe-white after:bg-roe-yellow relative inline-block text-sm text-white/70 transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className={COLUMN_TITLE}>Unidades</h3>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                {UNITS.map((unit) => (
                  <li key={unit.id} className="text-sm leading-relaxed text-white/70">
                    <p className="text-roe-white font-semibold">{unit.shortName}</p>
                    <p className="mt-1.5">{unit.address}</p>
                    <p className="mt-1.5">{unit.hours}</p>
                    {/* Beside the address it answers for, rather than pooled
                        with the other unit's at the bottom: which dentist holds
                        which address is the whole point of publishing it. */}
                    <p className="mt-1.5 text-white/50">
                      Responsável técnica: {unit.technicalManager.name} ·{" "}
                      {unit.technicalManager.cro}
                    </p>
                    {unit.whatsapp && (
                      <WhatsAppLink
                        phone={unit.whatsapp}
                        unitName={unit.name}
                        className="text-roe-white hover:bg-roe-whatsapp focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-ink mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        <WhatsAppIcon className="size-4" />
                        Falar no WhatsApp
                      </WhatsAppLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* TODO: add the CNPJ. */}
            <div className="text-xs text-white/50">
              <p>© {year} Clínica ROE · Radiologia Odontológica</p>
              {/* Institutional, so it sits with the copyright rather than in
                  either unit's block — she answers for both. */}
              {/* Her name only: her CRO is already a few lines up, in the Mogi
                  Mirim block, and printing it twice in one footer reads as two
                  different facts. */}
              <p className="mt-1.5">Administração e coordenação geral: {GENERAL_MANAGER.name}</p>
            </div>

            {/* "#top" has no element behind it on purpose: with no match, the
                fragment is defined to mean the top of the document. */}
            <a
              href="#top"
              className="group hover:text-roe-yellow focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-ink inline-flex items-center gap-2 self-start rounded-full text-xs font-semibold text-white/60 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:self-auto"
            >
              Voltar ao topo
              <ArrowUpIcon className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
