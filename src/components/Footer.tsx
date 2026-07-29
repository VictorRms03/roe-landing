import Image from "next/image";
import Link from "next/link";
import { UNITS } from "@/data/units";

const NAV_LINKS = [
  { label: "Exames", href: "#servicos" },
  { label: "A Clínica", href: "#beneficios" },
  { label: "Unidades", href: "#clinicas" },
  { label: "Dúvidas", href: "#faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-roe-gray bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.2fr_0.8fr_1.4fr]">
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
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-sm font-semibold text-gray-900">Navegue</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">Unidades</h2>
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
        </div>

        {/* TODO: add CNPJ and the responsável técnico with their CRO once confirmed. */}
        <p className="mt-10 border-t border-roe-gray pt-6 text-xs text-gray-500">
          © {year} Clínica ROE · Radiologia Odontológica
        </p>
      </div>
    </footer>
  );
}
