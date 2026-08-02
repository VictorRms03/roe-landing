import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpIcon,
  FacebookIcon,
  InstagramIcon,
  type IconProps,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { NAV_LINKS } from "@/data/navigation";
import { UNITS } from "@/data/units";

type SocialLink = {
  label: string;
  href: string;
  Icon: (props: IconProps) => ReactNode;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/clinicaroe_/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/roelilian.raiox", Icon: FacebookIcon },
];

// One shared style for the three column titles.
const COLUMN_TITLE = "text-xs font-semibold uppercase tracking-[0.14em] text-roe-yellow";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // Ink, not white: the page runs sand → white → black, so the footer is what
    // finally closes it instead of blending into the FAQ above.
    <footer className="bg-roe-ink">
      {/* Outside the padded box so the brand rule runs edge to edge. */}
      <div className="h-1 bg-roe-yellow" aria-hidden="true" />

      <div className="px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.6fr] lg:gap-12">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
              >
                <Image
                  src="/logo.webp"
                  alt=""
                  aria-hidden="true"
                  width={256}
                  height={256}
                  sizes="56px"
                  className="size-14"
                />
                <span className="text-lg font-bold text-roe-white">Clínica ROE</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                Radiologia odontológica com imagens de alta definição e atendimento humanizado.
              </p>

              <ul className="mt-6 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} da Clínica ROE`}
                      className="block size-11 rounded-xl outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
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
                      className="relative inline-block text-sm text-white/70 transition-colors duration-200 hover:text-roe-white after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-roe-yellow after:transition-all after:duration-200 hover:after:w-full"
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
                    <p className="font-semibold text-roe-white">{unit.shortName}</p>
                    <p className="mt-1.5">{unit.address}</p>
                    <p className="mt-1.5">{unit.hours}</p>
                    {unit.whatsapp && (
                      <WhatsAppLink
                        phone={unit.whatsapp}
                        unitName={unit.name}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-roe-white outline-none transition-colors duration-200 hover:bg-roe-whatsapp focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
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
            {/* TODO: add CNPJ and the responsável técnico with their CRO once confirmed. */}
            <p className="text-xs text-white/50">
              © {year} Clínica ROE · Radiologia Odontológica
            </p>

            {/* "#top" has no element behind it on purpose: with no match, the
                fragment is defined to mean the top of the document. */}
            <a
              href="#top"
              className="group inline-flex items-center gap-2 self-start rounded-full text-xs font-semibold text-white/60 outline-none transition-colors duration-200 hover:text-roe-yellow focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink sm:self-auto"
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
