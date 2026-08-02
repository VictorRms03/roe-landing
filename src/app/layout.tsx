import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import { OPENING_HOURS, UNITS } from "@/data/units";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const TITLE = "ROE - Raio-X Odontológico Especializado";
const DESCRIPTION =
  "Radiologia odontológica em Mogi Guaçu e Mogi Mirim: raio-x panorâmico, periapical, interproximal, telerradiografia e tomografia com imagens de alta precisão e laudos rápidos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "raio-x odontológico",
    "radiologia odontológica",
    "tomografia odontológica",
    "clínica ROE",
    "Mogi Guaçu",
    "Mogi Mirim",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Clínica ROE",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 1024,
        height: 1024,
        alt: "Logo da Clínica ROE",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = UNITS.map((unit) => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: unit.name,
  image: `${SITE_URL}${unit.image}`,
  url: SITE_URL,
  hasMap: unit.mapsUrl,
  telephone: unit.whatsapp ? `+${unit.whatsapp}` : undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: unit.street,
    addressLocality: unit.city,
    addressRegion: unit.state,
    postalCode: unit.postalCode,
    addressCountry: "BR",
  },
  openingHours: OPENING_HOURS.schema,
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-scroll-behavior` is what tells Next 16 it owns the smooth scrolling
    // set in globals.css: it drops back to an instant jump on a real route
    // change, and leaves the in-page anchors alone.
    <html lang="pt-BR" data-scroll-behavior="smooth" className={inter.variable}>
      {/* Bottom padding keeps the fixed action bar from covering the footer. */}
      <body className="pb-24 font-sans md:pb-0">
        <noscript>
          {/* The reveal observer never runs without JS, so show everything. */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
