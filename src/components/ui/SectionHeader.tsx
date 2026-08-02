import Reveal from "@/components/Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Wrapper classes, e.g. the max-width Clinics puts on its header. */
  className?: string;
  eyebrowClassName?: string;
  /** Sections sit on different grounds, so the heading colour travels with the call site. */
  titleClassName?: string;
  descriptionClassName?: string;
};

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
  eyebrowClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      <p className={`${EYEBROW} ${eyebrowClassName}`}>{eyebrow}</p>
      <h2 className={`${TITLE} ${titleClassName}`}>{title}</h2>
      <p className={descriptionClassName}>{description}</p>
    </Reveal>
  );
}
