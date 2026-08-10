export type SocialProfile = {
  /** Stable key. Maps the footer link to its icon. */
  id: "instagram" | "facebook";
  label: string;
  href: string;
};

// The footer renders these and the Organization JSON-LD lists them as `sameAs`,
// which is how Google ties the site to the clinic's social profiles. Kept here
// so the two can never disagree.
export const SOCIAL_PROFILES: SocialProfile[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/clinicaroe_/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/roelilian.raiox" },
];

export const SOCIAL_URLS: string[] = SOCIAL_PROFILES.map((profile) => profile.href);
