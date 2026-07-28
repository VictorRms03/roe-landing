import Image from "next/image";

const FIELDS = [
  { id: "nome", label: "Nome Completo", type: "text" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "data", label: "Data", type: "date" },
];

const EXAM_TYPES = [
  "Panorâmica",
  "Periapical",
  "Interproximal",
  "Oclusal",
  "Telerradiografia",
  "Tomografia",
  "Documentação Ortodôntica",
];

const FIELD_CLASS =
  "w-full rounded-lg bg-roe-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-shadow duration-200 focus:ring-2 focus:ring-roe-yellow";

export default function Hero() {
  return (
    <section className="bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Imagens Precisas
            <br />
            para Diagnósticos Certos
          </h1>
          <p className="max-w-md text-base text-gray-600 md:pb-2 lg:text-lg">
            Raio-x odontológico de alta definição, laudos rápidos e conforto em cada exame.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="rounded-2xl bg-roe-gray p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Agende Seu Exame</h2>
            <form className="mt-6 flex flex-col gap-3">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="sr-only">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.label}
                    className={FIELD_CLASS}
                  />
                </div>
              ))}

              <div className="relative">
                <label htmlFor="tipo" className="sr-only">
                  Tipo de Exame
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  defaultValue=""
                  required
                  className={`${FIELD_CLASS} appearance-none pr-10 invalid:text-gray-500`}
                >
                  <option value="" disabled>
                    Tipo de Exame
                  </option>
                  {EXAM_TYPES.map((exam) => (
                    <option key={exam} value={exam}>
                      {exam}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                >
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <button
                type="submit"
                className="mt-3 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-roe-white transition-colors duration-200 hover:bg-roe-yellow hover:text-gray-900"
              >
                Enviar
              </button>
            </form>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="/images/hero/exame.webp"
              alt="Profissional analisando uma tomografia odontológica em 3D"
              fill
              preload
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
