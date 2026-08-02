import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/Icons";

type FeatureItemProps = {
  title: string;
  description: string;
  delay?: number;
  /** Benefits sets its titles a size larger than Booking does. */
  titleClassName?: string;
  descriptionClassName?: string;
};

// The reveal sits on the <li> itself, which only works because these rows have
// no hover of their own to fight over the transform.
export default function FeatureItem({
  title,
  description,
  delay = 0,
  titleClassName = "",
  descriptionClassName = "",
}: FeatureItemProps) {
  return (
    <Reveal as="li" delay={delay} className="flex gap-3">
      <CheckIcon />
      <div>
        <h3 className={titleClassName}>{title}</h3>
        <p className={descriptionClassName}>{description}</p>
      </div>
    </Reveal>
  );
}
