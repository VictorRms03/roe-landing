import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ROE",
  description: "Landing page da clínica ROE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      {/* Bottom padding keeps the fixed action bar from covering the footer. */}
      <body className="pb-24 font-sans md:pb-0">
        <Navbar />
        {children}
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
