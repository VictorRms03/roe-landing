import Image from "next/image";
import type { ComponentProps } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * A SectionHeader with the mascot beside it. He points left, so whatever he is
 * meant to indicate has to sit to his left — put him anywhere else and he points
 * off the page. Decorative either way, hence the empty alt: the heading already
 * says everything he could.
 *
 * He therefore changes anchor with the breakpoint rather than just reflowing:
 *
 * - From sm up there is room alongside the whole block, so he stands to the
 *   right of it, centred, aiming back at the title.
 * - Below sm a column that narrow can only stack him underneath, where he cost
 *   107px of height per section and pointed into the left margin at nothing. So
 *   he moves onto the eyebrow's line instead — the eyebrow is two or three words,
 *   the space to its right is already empty, and he aims straight at it.
 *
 * Two instances rather than one moved by CSS: no single position in the DOM is
 * both a sibling of the eyebrow and a sibling of the whole header. They are the
 * same file, so the browser fetches it once, and both are aria-hidden.
 */

const MASCOT = { src: "/icone-apontando.png", width: 224, height: 244 };

export default function MascotHeader(props: ComponentProps<typeof SectionHeader>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-7">
      <SectionHeader
        {...props}
        eyebrowAside={
          <Image {...MASCOT} alt="" aria-hidden="true" className="w-16 shrink-0 sm:hidden" />
        }
      />

      <Image {...MASCOT} alt="" aria-hidden="true" className="hidden w-28 shrink-0 sm:block" />
    </div>
  );
}
