/** Builds a wa.me deep link. `phone` is digits only, with country and area code. */
export function whatsappUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
