type IconProps = { className?: string };

// Line icons shared by Hero and Clinics — the pin and the clock appear in both,
// which is what pulled them out of Hero into their own module. Services keeps
// its own inline path fragments: those share one wrapper inside that file, so
// they are a different shape of the same idea and merging them would only make
// both harder to read.
//
// Every icon draws to the same 24x24 grid and inherits `currentColor`, so the
// caller sets the size and the colour and nothing else.

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function PinIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...STROKE} className={className}>
      <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...STROKE} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ChatIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...STROKE} className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// A road bending away to a destination pin — the "Como chegar" affordance.
export function RouteIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...STROKE} className={className}>
      <path d="M5.5 21c0-6 6-4.5 6-9s-4-3-4-6" />
      <circle cx="7.5" cy="4" r="2" />
      <path d="M17 21s3.5-4.2 3.5-7a3.5 3.5 0 1 0-7 0c0 2.8 3.5 7 3.5 7z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Solid, not outlined: a hollow star reads as "not yet rated". Colour comes
// from `fill-current`, so the caller tints it like any other icon.
export function StarIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5l1.11-6.47L2.6 9.45l6.5-.95z"
      />
    </svg>
  );
}
