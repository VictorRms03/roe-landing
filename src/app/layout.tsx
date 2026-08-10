import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import { siteSchema } from "@/lib/schema";
import { IS_PRODUCTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Leads with the service and both cities: this is the line Google shows, and
// "raio-x odontológico em <cidade>" is the query the clinic is actually chasing.
// ~60 characters, so it survives without being truncated.
const TITLE = "Raio-X Odontológico em Mogi Guaçu e Mogi Mirim | Clínica ROE";
const DESCRIPTION =
  "Radiologia odontológica em Mogi Guaçu e Mogi Mirim: raio-x panorâmico, periapical, interproximal, telerradiografia e tomografia com imagens de alta precisão e laudos rápidos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Radiologia Odontológica",
  keywords: [
    "raio-x odontológico",
    "radiologia odontológica",
    "tomografia odontológica",
    "raio-x panorâmico",
    "documentação ortodôntica",
    "clínica ROE",
    "Mogi Guaçu",
    "Mogi Mirim",
  ],
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    // No `images` here on purpose: `opengraph-image.tsx` fills in og:image and
    // twitter:image together, with the right width, height and type.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    // A preview deployment serves the same copy as production, so keep it out
    // of the index rather than let it compete with the real site.
    index: IS_PRODUCTION,
    follow: IS_PRODUCTION,
    googleBot: {
      index: IS_PRODUCTION,
      follow: IS_PRODUCTION,
      // Without these Google clips the snippet and shows only a thumbnail.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set the token in the environment to verify Search Console without a code
  // change. Empty means no meta tag is emitted at all.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  // `metadata.themeColor` has been deprecated since Next 14; this is where it
  // lives now. Matches the manifest so an installed app and the browser
  // chrome agree.
  themeColor: "#e6af2e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-scroll-behavior` hands Next 16 the smooth scrolling set in
    // globals.css, so a real route change still jumps instantly.
    <html lang="pt-BR" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="pb-24 font-sans md:pb-0">
        <noscript>
          {/* The reveal observer never runs without JS, so show everything. */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Cookieless, so no LGPD consent banner. Speed Insights reports the
            field Core Web Vitals that feed ranking. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
