import Link from "next/link";

// Mobile only: the two things a visitor is here to do, parked in the thumb
// zone. The header keeps only the brand and the menu.
export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-roe-gray bg-roe-white px-4 pt-3 md:hidden"
      // Clears the iOS home indicator without a Tailwind arbitrary value.
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <Link
          href="#agendar"
          className="flex-1 rounded-lg bg-black py-3.5 text-center text-sm font-semibold text-roe-white transition-colors duration-200 active:bg-roe-yellow active:text-gray-900"
        >
          Agendar exame
        </Link>

        {/* Goes to the units section rather than one number: there are two, and
            picking one for the visitor would send half of them to the wrong desk. */}
        <Link
          href="#clinicas"
          aria-label="Ver o WhatsApp das unidades"
          className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#25d366]"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
            <path
              fill="#ffffff"
              d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.35A9.94 9.94 0 0 0 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2z"
            />
            <path
              fill="#25d366"
              d="M16.9 14.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
