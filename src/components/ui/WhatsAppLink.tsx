import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  /** Digits only, with country and area code. */
  phone: string;
  /** Full unit name, used to build the accessible label. */
  unitName: string;
  className: string;
  children: ReactNode;
};

// Three places opened a unit's WhatsApp with the same href, target, rel and
// aria-label template, and each spelled all four out.
export default function WhatsAppLink({ phone, unitName, className, children }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(phone)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${unitName} no WhatsApp`}
      className={className}
    >
      {children}
    </a>
  );
}
