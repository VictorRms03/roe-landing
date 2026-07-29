import Link from "next/link";

// Fill this in with the accepted plans and the section renders the list instead
// of the "ask us" message below. Nothing else needs to change.
const INSURERS: string[] = [];

export default function Insurance() {
  return (
    <section id="convenios" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-roe-gray p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">Convênios</h2>

          {INSURERS.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {INSURERS.map((insurer) => (
                <li
                  key={insurer}
                  className="rounded-lg bg-roe-white px-3 py-1.5 text-sm text-gray-700"
                >
                  {insurer}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 max-w-2xl text-sm text-gray-700">
              Seu convênio cobre o exame? Confirme com a unidade antes de agendar — respondemos
              pelo WhatsApp.
            </p>
          )}

          <Link
            href="#clinicas"
            className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-semibold text-roe-white transition-colors duration-200 hover:bg-roe-yellow hover:text-gray-900"
          >
            Ver contatos das unidades
          </Link>
        </div>
      </div>
    </section>
  );
}
