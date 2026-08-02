import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** Background, vertical padding and any positioning this section needs. */
  className?: string;
  /** Defaults to max-w-7xl; the FAQ runs narrower. */
  containerClassName?: string;
  /** Rendered inside the section but outside the centred container. */
  bleed?: ReactNode;
  children: ReactNode;
};

// The horizontal padding, scroll offset and centred container were copied
// across five sections. Only the background and vertical rhythm ever differed.
export default function Section({
  id,
  className = "",
  containerClassName = "max-w-7xl",
  bleed,
  children,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-32 px-6 md:px-12 lg:px-16 ${className}`}>
      {bleed}
      <div className={`mx-auto ${containerClassName}`}>{children}</div>
    </section>
  );
}
