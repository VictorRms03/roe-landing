"use client";

import type { FormEvent, ReactNode } from "react";
import { UNITS } from "@/data/units";

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

// A unit with no WhatsApp number has nowhere to send the booking.
const BOOKABLE_UNITS = UNITS.filter((unit) => unit.whatsapp !== null);

function Select({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={id}
        defaultValue=""
        required
        className={`${FIELD_CLASS} appearance-none pr-10 invalid:text-gray-500`}
      >
        <option value="" disabled>
          {label}
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
  );
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return day ? `${day}/${month}/${year}` : value;
}

export default function BookingForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const unit = BOOKABLE_UNITS.find((candidate) => candidate.id === data.get("unidade"));
    if (!unit?.whatsapp) return;

    const message = [
      "Olá! Gostaria de agendar um exame.",
      "",
      `Nome: ${data.get("nome")}`,
      `E-mail: ${data.get("email")}`,
      `Data desejada: ${formatDate(String(data.get("data")))}`,
      `Tipo de exame: ${data.get("tipo")}`,
      `Unidade: ${unit.shortName}`,
    ].join("\n");

    const url = `https://wa.me/${unit.whatsapp}?text=${encodeURIComponent(message)}`;

    // This runs from a submit gesture, so it is not treated as a pop-up. The
    // fallback covers browsers that block it anyway.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
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
            required
            className={FIELD_CLASS}
          />
        </div>
      ))}

      <Select id="tipo" label="Tipo de Exame">
        {EXAM_TYPES.map((exam) => (
          <option key={exam} value={exam}>
            {exam}
          </option>
        ))}
      </Select>

      <Select id="unidade" label="Unidade">
        {BOOKABLE_UNITS.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.shortName}
          </option>
        ))}
      </Select>

      <button
        type="submit"
        className="mt-3 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-roe-white transition-colors duration-200 hover:bg-roe-yellow hover:text-gray-900"
      >
        Enviar pelo WhatsApp
      </button>

      <p className="text-xs leading-relaxed text-gray-600">
        Ao enviar, o WhatsApp abre com a mensagem pronta para você conferir e confirmar.
      </p>
    </form>
  );
}
