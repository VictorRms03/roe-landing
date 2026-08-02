"use client";

import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { BOOKABLE_UNITS } from "@/data/units";
import { whatsappUrl } from "@/lib/whatsapp";

const EXAM_TYPES = [
  "Panorâmica",
  "Periapical",
  "Interproximal",
  "Oclusal",
  "Telerradiografia",
  "Tomografia",
  "Documentação Ortodôntica",
];

// White fields sit on a cream card, so they need the hairline ring to read as
// fields at all. Tailwind orders `hover:` before `focus:`, so the yellow focus
// ring still wins over the hover one when a pointer rests on the focused field.
const FIELD_CLASS =
  "w-full rounded-lg bg-roe-white px-4 py-3 text-sm text-gray-900 ring-1 ring-black/10 placeholder:text-gray-500 outline-none transition-shadow duration-200 hover:ring-black/25 focus:ring-2 focus:ring-roe-yellow";

// Visible labels rather than placeholders alone: the placeholder disappears the
// moment someone types, right when they still want to know what the field was.
function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Select({
  id,
  label,
  placeholder,
  children,
}: {
  id: string;
  label: string;
  placeholder: string;
  children: ReactNode;
}) {
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <select
          id={id}
          name={id}
          defaultValue=""
          required
          className={`${FIELD_CLASS} appearance-none pr-10 invalid:text-gray-500`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
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
    </Field>
  );
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return day ? `${day}/${month}/${year}` : value;
}

function buildChatUrl(form: HTMLFormElement) {
  const data = new FormData(form);
  const unit = BOOKABLE_UNITS.find((candidate) => candidate.id === data.get("unidade"));
  if (!unit) return null;

  const message = [
    "Olá! Gostaria de agendar um exame.",
    "",
    `Nome: ${data.get("nome")}`,
    `E-mail: ${data.get("email")}`,
    `Data desejada: ${formatDate(String(data.get("data")))}`,
    `Tipo de exame: ${data.get("tipo")}`,
    `Unidade: ${unit.shortName}`,
  ].join("\n");

  return whatsappUrl(unit.whatsapp, message);
}

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Written straight to the DOM after mount instead of rendered: the server has
  // no idea what "today" is in the visitor's timezone, so shipping its own date
  // in the HTML would only be a hydration mismatch waiting to happen. The
  // Swedish locale is the short path to the `YYYY-MM-DD` the input expects.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toLocaleDateString("sv-SE");
  }, []);

  // A real submit button means the browser runs the native validation before
  // this fires, so every required field is already filled by the time we build
  // the message.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const chatUrl = buildChatUrl(event.currentTarget);
    if (chatUrl) window.open(chatUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field id="nome" label="Nome completo">
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Como podemos te chamar"
          required
          className={FIELD_CLASS}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" label="E-mail">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            required
            className={FIELD_CLASS}
          />
        </Field>

        <Field id="data" label="Data desejada">
          <input
            id="data"
            name="data"
            type="date"
            ref={dateRef}
            required
            className={FIELD_CLASS}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="tipo" label="Tipo de exame" placeholder="Selecione o exame">
          {EXAM_TYPES.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </Select>

        <Select id="unidade" label="Unidade" placeholder="Selecione a unidade">
          {BOOKABLE_UNITS.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.shortName}
            </option>
          ))}
        </Select>
      </div>

      <button
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 text-center text-sm font-semibold text-roe-white shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:bg-roe-yellow hover:text-gray-900 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 active:shadow-md focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-cream"
      >
        <WhatsAppIcon />
        Enviar pelo WhatsApp
      </button>

      <p className="text-xs leading-relaxed text-gray-600">
        O WhatsApp abre com a mensagem pronta para você conferir e confirmar.
      </p>
    </form>
  );
}
