"use client";

import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { BOOKABLE_UNITS } from "@/data/units";
import { whatsappUrl } from "@/lib/whatsapp";

// The last three are not exams, which is why the field is labelled "exame ou
// serviço" and the message says "Serviço".
const EXAM_TYPES: string[] = [
  "Panorâmica",
  "Periapical",
  "Interproximal",
  "Oclusal",
  "Telerradiografia",
  "Tomografia",
  "Documentação Ortodôntica",
  "Escaneamento iTero / Invisalign",
  "Escaneamento intraoral (STL)",
  "Impressão de modelo em resina",
];

// Field names, kept in one place because buildChatUrl reads them back by string.
const FIELD = {
  name: "name",
  email: "email",
  date: "date",
  examType: "examType",
  unit: "unit",
} as const;

// White fields on a cream card need the hairline ring to read as fields at all.
// Tailwind orders `hover:` before `focus:`, so the yellow focus ring still wins
// while a pointer rests on the focused field.
const FIELD_CLASS =
  "w-full rounded-lg bg-roe-white px-4 py-3 text-sm text-gray-900 ring-1 ring-black/10 placeholder:text-gray-500 outline-none transition-shadow duration-200 hover:ring-black/25 focus:ring-2 focus:ring-roe-yellow";

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
};

// Visible labels rather than placeholders alone: a placeholder disappears the
// moment someone types, right when they still want to know what the field was.
function Field({ id, label, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

type SelectProps = FieldProps & {
  placeholder: string;
};

function Select({ id, label, placeholder, children }: SelectProps) {
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
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-500"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  );
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return day ? `${day}/${month}/${year}` : value;
}

function buildChatUrl(form: HTMLFormElement): string | null {
  const data = new FormData(form);
  const unit = BOOKABLE_UNITS.find((candidate) => candidate.id === data.get(FIELD.unit));
  if (!unit) return null;

  const message = [
    "Olá! Gostaria de fazer um agendamento.",
    "",
    `Nome: ${data.get(FIELD.name)}`,
    `E-mail: ${data.get(FIELD.email)}`,
    `Data desejada: ${formatDate(String(data.get(FIELD.date)))}`,
    `Serviço: ${data.get(FIELD.examType)}`,
    `Unidade: ${unit.shortName}`,
  ].join("\n");

  return whatsappUrl(unit.whatsapp, message);
}

export default function BookingForm() {
  const dateRef = useRef<HTMLInputElement>(null);

  // Written to the DOM after mount rather than rendered: the server cannot know
  // the visitor's timezone, so shipping a date in the HTML would be a hydration
  // mismatch. The Swedish locale is the short path to the YYYY-MM-DD the input
  // expects.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toLocaleDateString("sv-SE");
  }, []);

  // Native validation runs before this fires, so every required field is filled.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const chatUrl = buildChatUrl(event.currentTarget);
    if (chatUrl) window.open(chatUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field id={FIELD.name} label="Nome completo">
        <input
          id={FIELD.name}
          name={FIELD.name}
          type="text"
          placeholder="Como podemos te chamar"
          required
          className={FIELD_CLASS}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={FIELD.email} label="E-mail">
          <input
            id={FIELD.email}
            name={FIELD.email}
            type="email"
            placeholder="voce@email.com"
            required
            className={FIELD_CLASS}
          />
        </Field>

        <Field id={FIELD.date} label="Data desejada">
          <input
            id={FIELD.date}
            name={FIELD.date}
            type="date"
            ref={dateRef}
            required
            className={FIELD_CLASS}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          id={FIELD.examType}
          label="Tipo de exame ou serviço"
          placeholder="Selecione o exame ou serviço"
        >
          {EXAM_TYPES.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </Select>

        <Select id={FIELD.unit} label="Unidade" placeholder="Selecione a unidade">
          {BOOKABLE_UNITS.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.shortName}
            </option>
          ))}
        </Select>
      </div>

      <button
        type="submit"
        className="text-roe-white hover:bg-roe-yellow focus-visible:ring-roe-yellow focus-visible:ring-offset-roe-cream mt-2 flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 text-center text-sm font-semibold shadow-md shadow-black/10 transition-all duration-300 ease-out outline-none hover:-translate-y-0.5 hover:text-gray-900 hover:shadow-lg hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md"
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
