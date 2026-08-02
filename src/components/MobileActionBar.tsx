import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Mobile only: the two things a visitor is here to do, parked in the thumb
// zone. The header keeps only the brand and the menu.
export default function MobileActionBar() {
  return (
    <div
      className="border-roe-gray bg-roe-white fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 md:hidden"
      // Clears the iOS home indicator without a Tailwind arbitrary value.
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <Link
          href="#agendar"
          className="text-roe-white active:bg-roe-yellow flex-1 rounded-lg bg-black py-3.5 text-center text-sm font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98] active:text-gray-900"
        >
          Agendar exame
        </Link>

        {/* Goes to the units section rather than one number: there are two, and
            picking one for the visitor would send half of them to the wrong desk. */}
        <Link
          href="#clinicas"
          aria-label="Ver o WhatsApp das unidades"
          className="bg-roe-whatsapp flex size-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-150 ease-out active:scale-95"
        >
          <WhatsAppIcon className="size-7" />
        </Link>
      </div>
    </div>
  );
}
