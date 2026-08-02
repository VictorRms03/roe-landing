"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  /** Milliseconds to hold this element back, to stagger the items of a grid. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

// Fades content up the first time it reaches the viewport. The server renders
// the hidden state, so anything wrapped in here must not be above the fold —
// waiting for hydration up there would only delay the first paint.
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: Props) {
  const node = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shown = revealed || prefersReducedMotion;

  useEffect(() => {
    const element = node.current;
    if (!element || prefersReducedMotion) return;

    // One shot: once it has played there is nothing left to watch, so the
    // observer disconnects itself and the page settles with none running.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Tag
      // Typed on the supertype so this renders a div or an li without a cast.
      ref={(element: HTMLElement | null) => {
        node.current = element;
      }}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      // motion-reduce kills the transition too: showing early only skips the
      // wait, the 700ms of movement would still play.
      className={`reveal transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
