"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/navigation";

const MOBILE_MENU_ID = "mobile-menu";

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
      {/* Padding outside, max-width inside: the same nesting the sections use, so
          the logo lands on the exact left edge of the headings below it. */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            {/* No preload and no eager: both make Next emit a <link rel=preload>,
                and this 32px logo should not race the hero image for bandwidth.
                It sits in the initial viewport, so the browser fetches it at
                once regardless. */}
            {/* Decorative: the span beside it already says the name, so alt
                text here would just make a screen reader say it twice. */}
            <Image
              src="/logo.webp"
              alt=""
              aria-hidden="true"
              width={180}
              height={180}
              className="size-8 md:size-14"
            />
            <span className="text-[22px] font-bold text-gray-900">Clínica ROE</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            <nav className="flex items-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-200 hover:text-gray-900 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#agendar"
              className="rounded-full bg-black px-6 py-2.5 text-[17px] font-semibold text-white shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25 active:translate-y-0 active:shadow-md"
            >
              Agendar Exame
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
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
      </div>

      {/* `inert` while closed: the panel is only visually collapsed, so without
          it the links stay in the tab order with nothing to see. The open cap is
          a fixed height so the panel can transition: keep it above what the
          links actually measure, or overflow-hidden clips the last one. */}
      <div
        id={MOBILE_MENU_ID}
        inert={!isOpen}
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
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
          {/* No "Agendar Exame" here on purpose: MobileActionBar keeps it on
              screen at all times, so repeating it in the menu is noise. */}
          <div
            className={`mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? `${NAV_LINKS.length * 60}ms` : "0ms",
            }}
            aria-hidden="true"
          />
        </nav>
      </div>
    </header>
  );
}
