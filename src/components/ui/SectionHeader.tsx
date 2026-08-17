import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Wrapper classes, e.g. the max-width Clinics puts on its header. */
  className?: string;
  /**
   * Sits on the eyebrow's own line, to its right. Exists for the mascot on
   * narrow screens: the eyebrow is short, so the space beside it is free, and
   * anything parked there costs almost no height.
   */
  eyebrowAside?: ReactNode;
  eyebrowClassName?: string;
  /** Sections sit on different grounds, so the heading colour travels with the call site. */
  titleClassName?: string;
  descriptionClassName?: string;
};

// Yellow on every ground, dark or light, as the brand asks. Note for anyone
// tempted to override it per section: roe-yellow measures about 1.9:1 on the
// light grounds, under the 3:1 WCAG floor for large text, and a colour passed
// through eyebrowClassName only ties with this one on specificity — the winner
// would come down to the order Tailwind emits. Change it here, not at a call site.
const EYEBROW = "text-2xl font-semibold text-roe-yellow sm:text-3xl";
const TITLE = "mt-2 text-3xl leading-tight font-bold tracking-tight sm:text-4xl";

// Deliberately a thin wrapper: the eyebrow/heading/lede structure is identical
// everywhere, but the colours and lede spacing genuinely differ per section, so
// those stay with the caller rather than being flattened into a `tone` prop.
export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  eyebrowAside,
  eyebrowClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  const eyebrowLine = <p className={`${EYEBROW} ${eyebrowClassName}`}>{eyebrow}</p>;

  return (
    <Reveal className={className}>
      {eyebrowAside ? (
        <div className="flex items-center gap-3">
          {eyebrowLine}
          {eyebrowAside}
        </div>
      ) : (
        eyebrowLine
      )}
      <h2 className={`${TITLE} ${titleClassName}`}>{title}</h2>
      <p className={descriptionClassName}>{description}</p>
    </Reveal>
  );
}
