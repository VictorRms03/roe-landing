import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-roe-gray bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-10 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.2fr_0.8fr_1.4fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt=""
                aria-hidden="true"
                width={256}
                height={256}
                sizes="56px"
                className="size-14"
              />
              <span className="text-lg font-bold text-gray-900">Clínica ROE</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-600">
              Radiologia odontológica com imagens de alta definição e atendimento humanizado.
            </p>

            <ul className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} da Clínica ROE`}
                    className="block size-11 rounded-xl outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-white"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="text-sm font-semibold text-gray-900">Navegue</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {/* Same growing underline the header links use. */}
                  <Link
                    href={link.href}
                    className="relative inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Unidades</h3>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2">
              {UNITS.map((unit) => (
                <li key={unit.id} className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">{unit.shortName}</p>
                  <p className="mt-1.5">{unit.address}</p>
                  <p className="mt-1.5">{unit.hours}</p>
                  {unit.whatsapp && (
                    <a
                      href={`https://wa.me/${unit.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block font-semibold text-gray-900 underline underline-offset-2 transition-colors duration-200 hover:text-roe-yellow"
                    >
                      Falar no WhatsApp
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* TODO: add CNPJ and the responsável técnico with their CRO once confirmed. */}
        <p className="mt-10 border-t border-roe-gray pt-6 text-xs text-gray-500">
          © {year} Clínica ROE · Radiologia Odontológica
        </p>
      </div>
    </footer>
  );
}
