export type IconProps = { className?: string };

// Every icon draws to the same 24x24 grid and inherits `currentColor`, so the
// caller sets the size and the colour and nothing else. Services keeps its own
// path fragments: they share one wrapper inside that file rather than each
// carrying an <svg>.

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

// Solid, not outlined: a hollow star reads as "not yet rated".
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

export function ChevronIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({
  className = "mt-0.5 size-[22px] shrink-0 text-roe-yellow",
}: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2.5} className={className}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

// Brand marks keep their literal colours: recognising them at a glance is the
// entire job, so they do not inherit currentColor like the line icons above.
export function GoogleIcon({ className = "size-3.5 shrink-0" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.4 5.4 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "size-full" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="instagram-badge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#instagram-badge)" />
      <g fill="none" stroke="#ffffff" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="3.6" />
        <circle cx="12" cy="12" r="3.1" />
      </g>
      <circle cx="17.1" cy="6.9" r="1" fill="#ffffff" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-full" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        fill="#ffffff"
        d="M13.5 21.9v-7.2h2.4l.36-2.8h-2.76v-1.79c0-.81.22-1.36 1.39-1.36h1.48V6.25c-.26-.03-1.14-.11-2.16-.11-2.13 0-3.59 1.3-3.59 3.69v2.06H8.2v2.8h2.42v7.2z"
      />
    </svg>
  );
}

export function ArrowUpIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} className={className}>
      <path d="M12 20V4M6 10l6-6 6 6" />
    </svg>
  );
}
