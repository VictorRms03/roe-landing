"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  decimals?: number;
  duration?: number;
};

// Counts up from 0 to `to` the first time it reaches the viewport, then holds.
// Mirrors Reveal's one-shot IntersectionObserver so the two stay in sync when
// used side by side in the same grid.
export default function CountUp({ to, decimals = 0, duration = 1200 }: Props) {
  const node = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = node.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(to * eased);
          if (progress < 1) frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [to, duration]);

  return <span ref={node}>{value.toFixed(decimals)}</span>;
}
