"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  reviews: Review[];
};

// The list is repeated so the reader never reaches an edge: we sit on the middle
// copy and rewind by whole copies whenever we drift off it. Five gives a hard
// fling two copies of runway before it could out-run the settle below.
const COPIES = 5;
const SETTLE = 120; // ms of quiet before rewinding, so we never fight momentum

// The copy the track actually rests on, and so the only one worth exposing to
// assistive tech — the other four are duplicates scrolled out of view.
const HOME_COPY = Math.floor(COPIES / 2);

// `idle` is what the server renders — the highlight only exists once we can
// measure which card sits in the middle.
const CARD_STATE = {
  idle: "shadow-lg shadow-black/5",
  on: "scale-105 shadow-xl shadow-black/10",
  off: "scale-95 opacity-70 shadow-lg shadow-black/5",
};

const ARROW_CLASS =
  "flex size-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-gray-900 outline-none transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-roe-yellow active:scale-95 focus-visible:ring-2 focus-visible:ring-roe-yellow focus-visible:ring-offset-2";

// Width of one copy of the list, gap included. Measuring two siblings' offsetLeft
// dodges the trailing-margin quirks of a flex scroll container, and transforms do
// not affect it — so the card scaling cannot throw the math off.
function copyWidth(track: HTMLUListElement, perCopy: number) {
  const first = track.children[0] as HTMLElement | undefined;
  const nextCopy = track.children[perCopy] as HTMLElement | undefined;
  return first && nextCopy ? nextCopy.offsetLeft - first.offsetLeft : 0;
}

export default function TestimonialsCarousel({ reviews }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);
  const prefersReducedMotion = usePrefersReducedMotion();
  const perCopy = reviews.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let settle = 0;

    const highlight = () => {
      frame = 0;
      const box = track.getBoundingClientRect();
      const middle = box.left + box.width / 2;
      let closest = 0;
      let shortest = Infinity;

      Array.from(track.children).forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - middle);
        if (distance < shortest) {
          shortest = distance;
          closest = index;
        }
      });

      setActive(closest);
    };

    const rewind = () => {
      const span = copyWidth(track, perCopy);
      if (!span) return;

      // Snap back to within half a copy of home, however far the fling went. The
      // copies are identical, so the jump is invisible.
      const drift = Math.round((track.scrollLeft - span * HOME_COPY) / span);
      if (drift !== 0) track.scrollLeft -= drift * span;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(highlight);
      clearTimeout(settle);
      settle = window.setTimeout(rewind, SETTLE);
    };

    const onResize = () => {
      rewind();
      highlight();
    };

    // Start on the middle copy so the first click has room in either direction.
    track.scrollLeft = copyWidth(track, perCopy) * HOME_COPY;
    highlight();

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [perCopy]);

  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return;

    track.scrollBy({
      left: direction * (second.offsetLeft - first.offsetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Avaliações de clientes no Google"
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain py-12 outline-none [scrollbar-width:none] focus-visible:inset-ring-2 focus-visible:inset-ring-roe-yellow sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          reviews.map((review, position) => {
            const index = copy * perCopy + position;
            const state = active < 0 ? "idle" : index === active ? "on" : "off";

            return (
              <li
                key={`${review.name}-${copy}`}
                aria-hidden={copy !== HOME_COPY || undefined}
                className={`flex w-[300px] shrink-0 snap-center flex-col rounded-2xl border border-black/5 bg-white p-6 transition duration-300 ease-out motion-reduce:transition-none sm:w-[340px] ${CARD_STATE[state]}`}
              >
                <div
                  role="img"
                  aria-label={`${review.rating} de 5 estrelas`}
                  className="flex gap-0.5 text-roe-yellow"
                >
                  {Array.from({ length: review.rating }, (_, star) => (
                    <StarIcon key={star} />
                  ))}
                </div>

                <p className="mb-6 mt-4 text-sm italic leading-relaxed text-gray-700">
                  “{review.text}”
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-black/10 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-roe-yellow text-sm font-semibold text-gray-900"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{review.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                      <GoogleIcon />
                      Avaliação do Google
                    </p>
                  </div>
                </div>
              </li>
            );
          }),
        )}
      </ul>

      <div className="mx-auto mt-4 flex max-w-7xl justify-center gap-3 px-6 md:px-12 lg:px-16">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Avaliação anterior"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Próxima avaliação"
          className={ARROW_CLASS}
        >
          <ChevronIcon className="size-5" />
        </button>
      </div>
    </>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.4 5.4 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
