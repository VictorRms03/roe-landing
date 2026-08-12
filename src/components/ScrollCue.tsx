"use client";

import { useEffect, useRef, useState } from "react";

// How far down the page still counts as "at the top", and the minimum amount of
// hidden page below the fold that makes the hint worth showing at all.
const AT_TOP = 40;
const WORTH_HINTING = 80;
// The in-flow cue has to clear the fold by this much to count as usable. Landing
// a pixel or two above the edge passes a strict comparison but reads as cut off,
// and a window's last few pixels are the first thing OS chrome eats into.
const CLEARANCE = 24;

/**
 * Distance from the top of the document to an element's bottom edge, summed
 * through the offsetParent chain. `offsetTop` ignores transforms, so this is not
 * thrown off by the fade-up the cue animates in with, the way a bounding rect
 * would be while that animation is still running.
 */
function documentBottom(el: HTMLElement): number {
  let y = el.offsetHeight;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    y += node.offsetTop;
  }
  return y;
}

/**
 * Wayfinding for the fold. The cue stays where it always was — last thing in the
 * hero, in flow — and a pill fixed to the viewport appears only when that
 * position is actually off-screen.
 *
 * The switch is measured, not guessed at a breakpoint. How tall a window has to
 * be for the in-flow cue to clear the fold depends on the width: the hero's
 * bottom edge sits at 1015px at 1024px wide but at 883px at 1920px wide, because
 * narrower columns wrap taller. No single min-height is right for both, so this
 * asks the layout where the cue ended up instead.
 */
export default function ScrollCue() {
  const cueRef = useRef<HTMLDivElement>(null);
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = cueRef.current;
      if (!el) return;

      const room = document.documentElement.scrollHeight - window.innerHeight;
      // Below sm the in-flow cue is display:none, which makes this 0 — and 0 is
      // never past the fold, so no pill. That is what we want there: the
      // MobileActionBar already owns the bottom of the screen.
      const pastTheFold = documentBottom(el) > window.innerHeight - CLEARANCE;

      setShowPill(window.scrollY < AT_TOP && room > WORTH_HINTING && pastTheFold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    // A resize changes both which side of the fold the cue falls on and whether
    // the page scrolls at all.
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      {/* Unchanged from before this component existed. Hidden below sm: at that
          width the hero is already tight on vertical space. */}
      <div ref={cueRef} className="mt-16 hidden justify-center sm:flex">
        <a
          href="#servicos"
          style={{ animationDelay: "820ms" }}
          className="animate-fade-up group flex flex-col items-center gap-2 motion-reduce:animate-none"
        >
          <span className="text-xs font-medium tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-800">
            Desça para ver mais
          </span>
          <MouseGlyph />
        </a>
      </div>

      {showPill && <Pill />}
    </>
  );
}

/**
 * Only rendered while the in-flow cue is below the fold, so it never competes
 * with it. From md up: below that the MobileActionBar is already down there.
 */
function Pill() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex">
      {/* A pill rather than bare type: this floats over whatever the hero has at
          the bottom of a short window, and needs its own ground to stay legible. */}
      <a
        href="#servicos"
        className="group bg-roe-cream/95 hover:bg-roe-cream animate-fade-in pointer-events-auto flex items-center gap-3 rounded-full border border-black/10 py-2 pr-5 pl-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 motion-reduce:animate-none"
      >
        <MouseGlyph className="[&>span]:h-8" />
        <span className="text-xs font-semibold tracking-widest text-gray-700 uppercase transition-colors group-hover:text-gray-900">
          Desça para ver mais
        </span>
      </a>
    </div>
  );
}

/** The mouse outline with the wheel travelling inside it. */
function MouseGlyph({ className = "" }: { className?: string }) {
  return (
    <span className={`animate-bounce-slow motion-reduce:animate-none ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-gray-400/70 pt-1.5 transition-colors group-hover:border-gray-700"
      >
        <span className="animate-scroll-wheel size-1 rounded-full bg-gray-400/70 transition-colors group-hover:bg-gray-700 motion-reduce:animate-none" />
      </span>
    </span>
  );
}
