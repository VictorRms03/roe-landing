"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronIcon } from "@/components/Icons";
import type { Insurer } from "@/data/insurers";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  insurers: Insurer[];
};

// Same trick as TestimonialsCarousel: the list is repeated so the reader never
// reaches an edge, and the track rewinds by whole copies once the scroll
// settles. Three copies rather than five — twenty cards make one copy several
// viewports wide already, so the runway is there without tripling the DOM again.
//
// TODO: the loop mechanics below are now written twice. They are worth pulling
// into a hook once a third carousel appears; today the two differ enough
// (reviews scale the centred card, these do not) that sharing would mean a
// props-shaped fork of the same code.
const COPIES = 3;
const SETTLE = 120; // ms of quiet before rewinding, so we never fight momentum

// The copy the track rests on, and so the only one worth exposing to assistive
// tech — the others are duplicates scrolled out of view.
const HOME_COPY = Math.floor(COPIES / 2);

const ARROW_CLASS =
  "flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white outline-none transition-[background-color,transform,color] duration-200 ease-out hover:scale-105 hover:bg-roe-yellow hover:text-gray-900 active:scale-95 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-roe-ink";

/**
 * Initials, used until a licensed logo file exists for a plan. Two letters,
 * which is what keeps all twenty badges distinct: one per word where there are
 * two — that is what tells the three "Rede …" plans apart — and the first two
 * otherwise, so SulAmérica and Solidente do not both come out as "S".
 *
 * A name that is an acronym on its own is the exception twice over: it keeps
 * its own letters when it carries another word ("KR Saúde"), and gives up all
 * but the first when it stands alone, or the card would read "CDA" twice.
 */
function monogram(name: string) {
  const [first, second] = name.split(" ");
  const isAcronym = first === first.toUpperCase();

  if (second) return isAcronym ? first : `${first[0]}${second[0]}`;
  return isAcronym ? first[0] : first.slice(0, 2).toUpperCase();
}

// Width of one copy, gap included. offsetLeft dodges the trailing-margin quirks
// of a flex scroll container.
function copyWidth(track: HTMLUListElement, perCopy: number) {
  const first = track.children[0] as HTMLElement | undefined;
  const nextCopy = track.children[perCopy] as HTMLElement | undefined;
  return first && nextCopy ? nextCopy.offsetLeft - first.offsetLeft : 0;
}

export default function InsurersCarousel({ insurers }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const perCopy = insurers.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let settle = 0;

    const rewind = () => {
      const span = copyWidth(track, perCopy);
      if (!span) return;

      // Snap back to within half a copy of home, however far the fling went.
      // The copies are identical, so the jump is invisible.
      const drift = Math.round((track.scrollLeft - span * HOME_COPY) / span);
      if (drift !== 0) track.scrollLeft -= drift * span;
    };

    const onScroll = () => {
      clearTimeout(settle);
      settle = window.setTimeout(rewind, SETTLE);
    };

    // Start on the middle copy so the first click has room in either direction.
    track.scrollLeft = copyWidth(track, perCopy) * HOME_COPY;

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", rewind);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", rewind);
      clearTimeout(settle);
    };
  }, [perCopy]);

  /**
   * A page at a time, not a card: twenty plans behind a one-card step is a lot
   * of clicking, and moving the whole visible row keeps the eye's place better
   * than sliding everything along by one.
   *
   * The page is whatever actually fits, so this stays right at every width —
   * five across on a desktop, one on a phone, where a card and a half is all
   * there is and a "page" of one is the honest answer.
   */
  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return;

    const pitch = second.offsetLeft - first.offsetLeft;
    // clientWidth counts the track's own padding, which never shows a card.
    const styles = getComputedStyle(track);
    const room =
      track.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const perPage = Math.max(1, Math.floor(room / pitch));

    track.scrollBy({
      left: direction * perPage * pitch,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Convênios atendidos"
        className="focus-visible:inset-ring-roe-yellow mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-6 py-6 outline-none focus-visible:inset-ring-2 sm:gap-5 md:px-12 lg:px-16 [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          insurers.map((insurer) => (
            <li
              key={`${insurer.id}-${copy}`}
              aria-hidden={copy !== HOME_COPY || undefined}
              className="w-[172px] shrink-0 snap-center sm:w-[200px]"
            >
              {/* White cards on the ink ground, like the review cards on white:
                  a licensed logo dropped in here lands on the background its
                  artwork already assumes. */}
              <div className="group hover:ring-roe-yellow/60 flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white p-5 text-center shadow-lg ring-1 shadow-black/20 ring-black/5 transition duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none">
                {insurer.logo ? (
                  // The box is fixed so twenty aspect ratios cannot become
                  // twenty card heights; inside it the logo keeps its own,
                  // capped by the card width so a wide wordmark does not spill.
                  <span className="flex h-14 w-full items-center justify-center">
                    <Image
                      // Decorative: the plan's name is spelled out right below,
                      // so alt text here would only make a screen reader say it
                      // twice — the same call the header logo makes.
                      src={insurer.logo.src}
                      alt=""
                      aria-hidden="true"
                      // Measured, never `fill` with a pixel `sizes`: that pair
                      // makes next/image offer every width it knows up to 3840,
                      // and a browser that takes the top of that list has the
                      // optimiser render a 4K copy of a 160px logo. Real numbers
                      // get a 1x/2x srcset and nothing else.
                      width={insurer.logo.width}
                      height={insurer.logo.height}
                      // The optimizer refuses SVG unless `dangerouslyAllowSVG`
                      // is on, and turning that on for the whole site to serve a
                      // handful of logos is the wrong trade: serve those as-is.
                      unoptimized={insurer.logo.src.endsWith(".svg")}
                      // Lazy loading decides what is "near the viewport" from
                      // vertical distance, and inside a horizontal scroller it
                      // leaves cards blank that the reader is looking straight
                      // at. The copy on screen is fetched outright — twenty
                      // logos of a few KB each — and the duplicate copies stay
                      // lazy because they repeat these exact URLs from cache.
                      loading={copy === HOME_COPY ? "eager" : "lazy"}
                      // Eager, but never ahead of the hero: this section is
                      // several screens down.
                      fetchPriority="low"
                      className="h-full w-auto max-w-full object-contain"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="bg-roe-yellow flex size-12 shrink-0 items-center justify-center rounded-full text-base font-bold tracking-tight text-gray-900"
                  >
                    {monogram(insurer.name)}
                  </span>
                )}

                {/* Kept even when a logo is present: it is the accessible name
                    for the mark and what someone scanning for their plan reads. */}
                <span className="text-sm leading-snug font-semibold text-balance text-gray-900">
                  {insurer.name}
                </span>
              </div>
            </li>
          )),
        )}
      </ul>

      <div className="mx-auto mt-2 flex max-w-7xl justify-center gap-3 px-6 md:px-12 lg:px-16">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Convênios anteriores"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Próximos convênios"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5" />
        </button>
      </div>
    </>
  );
}
