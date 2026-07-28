"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-gray-100 bg-white/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Image src="/logo.webp" alt="Clínica ROE" width={100} height={100} preload />
          <span className="text-[22px] font-bold text-gray-900">Clínica ROE</span>
        </Link>

        <nav className="hidden items-center gap-14 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contato"
          className="hidden rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:scale-105 md:block"
        >
          Agendar Exame
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-gray-900 md:hidden"
        >
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-200 ease-in-out ${
              isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 shadow-lg">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 60}ms` : "0ms" }}
              className={`rounded-lg px-4 py-4 text-lg font-medium text-gray-700 transition-all duration-300 ease-out active:bg-gray-100 ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contato"
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${NAV_LINKS.length * 60}ms` : "0ms" }}
            className={`mt-2 rounded-full bg-black px-5 py-4 text-center text-lg font-semibold text-white transition-all duration-300 ease-out active:bg-gray-800 ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            Agendar Exame
          </Link>
          <div
            className={`mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? `${(NAV_LINKS.length + 1) * 60}ms` : "0ms" }}
            aria-hidden="true"
          />
        </nav>
      </div>
    </header>
  );
}
