import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { UNITS } from "@/data/units";

const NAV_LINKS = [
  { label: "Exames", href: "#servicos" },
  { label: "A Clínica", href: "#beneficios" },
  { label: "Unidades", href: "#clinicas" },
  { label: "Dúvidas", href: "#faq" },
];

// Full brand badges rather than outlines: colour is what makes these
// recognisable at a glance, which is the whole job of a social icon.
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/clinicaroe_/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full">
        <defs>
          <linearGradient id="instagram-badge" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.25" stopColor="#FA7E1E" />
            <stop offset="0.5" stopColor="#D62976" />
            <stop offset="0.75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#instagram-badge)" />
        <g fill="none" stroke="#ffffff" strokeWidth="1.5">
          <rect x="6" y="6" width="12" height="12" rx="3.6" />
          <circle cx="12" cy="12" r="3.1" />
        </g>
        <circle cx="17.1" cy="6.9" r="1" fill="#ffffff" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/roelilian.raiox",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full">
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path
          fill="#ffffff"
          d="M13.5 21.9v-7.2h2.4l.36-2.8h-2.76v-1.79c0-.81.22-1.36 1.39-1.36h1.48V6.25c-.26-.03-1.14-.11-2.16-.11-2.13 0-3.59 1.3-3.59 3.69v2.06H8.2v2.8h2.42v7.2z"
        />
      </svg>
    ),
  },
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
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} da Clínica ROE`}
                      className="block size-11 rounded-xl outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
                    >
                      {social.icon}
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
                      <a
                        href={`https://wa.me/${unit.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Falar com a ${unit.name} no WhatsApp`}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-roe-white outline-none transition-colors duration-200 hover:bg-roe-whatsapp focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink"
                      >
                        <WhatsAppIcon className="size-4" />
                        Falar no WhatsApp
                      </a>
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              >
                <path d="M12 20V4M6 10l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
