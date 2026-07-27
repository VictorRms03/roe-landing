import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
